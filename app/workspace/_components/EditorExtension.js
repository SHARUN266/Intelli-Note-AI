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
  const {fileId}=useParams();
  const SearchAI=useAction(api.myAction.search);
  const saveNotes=useMutation(api.notes.AddNotes);
  const {user}=useUser()
  const onAiClick=async()=>{
     toast("AI is getting your answer")
     const selectedText=editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    )
   
    const result=await SearchAI({
      query:selectedText,
      fileId:fileId
    });
  
    const UnformattedAns=JSON.parse(result);
    let AllUnformattedAns=''
    UnformattedAns&&UnformattedAns.forEach(item=>{
      AllUnformattedAns=AllUnformattedAns+item.pageContent;
    })

   // console.log(selectedText,"sele")
    const PROMPT = `You are a highly intelligent assistant designed to extract relevant information from any document and present it in a clean and understandable format. Based on the user's question: "${selectedText}", and the provided document content: "${AllUnformattedAns}", follow these steps:
    ***Check***: Identify if the user's question is in their language (like hindi or roman hindi) that in English or your preference then give answer to *user* preference language.
    1. **Understand the Question**: Focus on the intent of the user's question and extract related information from the content.
    2. **Extract and Summarize**: Identify key details from the content, even if they are incomplete or messy, and create a concise, directly relevant answer.
    3. **Handle Missing Information**: If the content doesn't fully answer the question, acknowledge this clearly and provide the best response possible or find answer from Gemini API Database.
    4. **Format in HTML**: Use proper HTML tags to structure the response:
       - Use <p> for paragraphs.
       - Highlight important words or phrases with <b> or <strong>.
       - If the answer includes steps or lists, use <ul>/<ol>.
       - For code examples, wrap them in <pre> and <code> tags.
    5. **Avoid Irrelevance**: Do not include information that is not related to the user's question.
 
    **Please be polite while not answer not found**
    Return only the HTML-formatted answer without any extra text or explanation.`;
    const AiModelResult=await chatSession.sendMessage(PROMPT);
   // console.log(AiModelResult.response.text());
    const FinalAnswer=AiModelResult.response.text().replace("```",'').replace('html','').replace("```",'');
    const AllText=editor.getHTML();
   // editor.commands.setContent(AllText+'<p><strong>Answer: </strong>'+FinalAnswer+'</p>');
    streamText(FinalAnswer,editor).then(()=>{saveNotes({
      notes:editor.getHTML(),
      fileId:fileId,
      createdBy:user?.primaryEmailAddress?.emailAddress
    })})
    async function streamText(FinalAnswer, editor) {
      let streamedText = "<p><strong>Answer: </strong>";
    
      for (let i = 0; i < FinalAnswer.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5)); 
    
        streamedText += FinalAnswer.charAt(i); 
    
        editor.commands.setContent(AllText + streamedText + "</p>"); 
      }
    }
   
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
