import React from "react";
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

function UploadPdfDialogue({ children }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Pdf File</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-5">
                <h2 className="mt-5">Select a file to Upload</h2>
                <div className="gap-2 p-3 rounded-md border">
                  <input type="file"  accept="application/pdf"/>
                </div>
                <div className="mt-2">
                  <label>File Name</label>
                  <Input placeholder="Enter File Name" />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
                <Button type="button" variant="outline">

                Close
                </Button>
            </DialogClose>
            <Button>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UploadPdfDialogue;
