"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import EditorExtension from "./EditorExtension";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: `✨ How to Use Intelli-Note:-
    ✅ Type your query in the text box  
    ✅ Select the relevant text from your document  
    ✅ Click on the "AI" button to process it  
    🎯 Get an instant, AI-powered response from your document!
        `,
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });

  useEffect(() => {
    editor?.commands.setContent(notes?.notes);
  }, [notes]);

  return (
    <div>
      <EditorExtension editor={editor} />
      <div className="overflow-y-scroll h-[88vh">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
