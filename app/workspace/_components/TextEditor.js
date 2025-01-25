"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorExtension from "./EditorExtension";

function TextEditor() {
  const editor = useEditor({
    extensions: [StarterKit
      ,
      Placeholder.configure({
        placeholder:'Write Your notes...'
      })
    ],
    
    
    editorProps:{
      attributes:{
        class:'focus:outline-none h-screen p-5'
      }
    }
  });
  return (
    <div>
      <EditorExtension editor={editor}  />
      <div className="overflow-y-scroll h-[88vh">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
