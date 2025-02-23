import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
  Bold,
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  ListIcon,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

import { toast } from "sonner";

function EditorExtension({ editor }) {
  const { fileId } = useParams();
  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const onAiClick = async () => {
    toast("AI is getting your answer");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    const result = await SearchAI({
      query: selectedText,
      fileId: fileId,
    });

    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAns = "";
    UnformattedAns &&
      UnformattedAns.forEach((item) => {
        AllUnformattedAns = AllUnformattedAns + item.pageContent;
      });

   console.log(process.env.NEXT_PUBLIC_PROMPT,"sele")
    const PROMPT = `You are a highly intelligent assistant designed to extract relevant information from any document and present it in a clean and understandable format. Based on the user's question: "${selectedText}", and the provided document content: "${AllUnformattedAns}", follow these steps:
  ${process.env.NEXT_PUBLIC_PROMPT}`;
    const AiModelResult = await chatSession.sendMessage(PROMPT);
    // console.log(AiModelResult.response.text());
    const FinalAnswer = AiModelResult.response
      .text()
      .replace("```", "")
      .replace("html", "")
      .replace("```", "");
    const AllText = editor.getHTML();
    // editor.commands.setContent(AllText+'<p><strong>Answer: </strong>'+FinalAnswer+'</p>');
    streamText(FinalAnswer, editor).then(() => {
      saveNotes({
        notes: editor.getHTML(),
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
    });
    async function streamText(FinalAnswer, editor) {
      let streamedText = "<p><strong>Answer: </strong>";

      for (let i = 0; i < FinalAnswer.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5));

        streamedText += FinalAnswer.charAt(i);

        editor.commands.setContent(AllText + streamedText + "</p>");
      }
    }
  };
  return (
    editor && (
      <div className="p-5 ">
        <div className="control-group">
          <div className="button-group flex gap-3">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""
              }
            >
              <Heading1 />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
              }
            >
              <Heading2 />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""
              }
            >
              <Heading3 />
            </button>
            {/* <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "text-blue-500" : ""}
            >
              <UnderlineIcon/>
            </button> */}
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "text-blue-500" : ""}
            >
              <CodeIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "text-blue-500" : ""}
            >
              <ListIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "text-blue-500" : ""}
            >
              <Bold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "text-blue-500" : ""}
            >
              <Italic />
            </button>
            <button
              onClick={() => onAiClick()}
              className={"hover:text-blue-500"}
            >
              <Sparkles />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtension;
