import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
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



function EditorExtension({ editor }) {
  const {fileId}=useParams();
  const SearchAI=useAction(api.myAction.search);

  const onAiClick=async()=>{
     console.log("Ai button clicked");
     const selectedText=editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    )
   
    const result=await SearchAI({
      query:selectedText,
      fileId:fileId
    });
    console.log(result,"swe");
    const UnformattedAns=JSON.parse(result);
    let AllUnformattedAns=''
    UnformattedAns&&UnformattedAns.forEach(item=>{
      AllUnformattedAns=AllUnformattedAns+item.pageContent;
    })
    const PROMT=`For question : ${selectedText} and with given content as Answer please give appropriate answer in HTML format. The answer content is : ${AllUnformattedAns}`;
    const AiModelResult=await chatSession.sendMessage(PROMT);
    console.log(AiModelResult.response.text());
  }
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
            className={editor.isActive('code') ? 'text-blue-500' : ''}
          >
            <CodeIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'text-blue-500' : ''}
          >
            <ListIcon/>
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
