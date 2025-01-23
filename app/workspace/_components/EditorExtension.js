import {
  Bold,
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  ListIcon,
  UnderlineIcon,
 
} from "lucide-react";
import React from "react";



function EditorExtension({ editor }) {
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
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtension;
