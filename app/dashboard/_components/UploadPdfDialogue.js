"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { getFileUrl } from "@/convex/fileStorage";
import axios from "axios";
import { toast } from "sonner";
function UploadPdfDialogue({ children, isMaxFile }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const AddFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const { user } = useUser();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };
  const onUpload = async () => {
    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();

    //step 3: Add the file entry to the database
    const fileId = uuidv4();
    const fileUrl = await getFileUrl({ storageId: storageId });
    const response = await AddFileEntry({
      fileId,
      storageId,
      fileName: fileName ?? "Untitle File",
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    // API Call to Fetch PDF Process Data:-
    const apiResponse = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
   // console.log(apiResponse.data.result);
    await embeddDocument({
      splitText: apiResponse.data.result,
      fileId: fileId,
    });

    setLoading(false);
    setOpen(false);
    toast("File is ready !");
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            disabled={isMaxFile}
            className="w-full"
          >
            + Upload PDF File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Pdf File</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-5">
                <h2 className="mt-5">Select a file to Upload</h2>
                <div className="gap-2 p-3 rounded-md border">
                  <input
                    type="file"
                    onChange={(event) => OnFileSelect(event)}
                    accept="application/pdf"
                  />
                </div>
                <div className="mt-2">
                  <label>File Name</label>
                  <Input
                    placeholder="Enter File Name"
                    required
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                onClick={() => setOpen(false)}
                type="button"
                variant="outline"
              >
                Close
              </Button>
            </DialogClose>
            <Button onClick={onUpload} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UploadPdfDialogue;
