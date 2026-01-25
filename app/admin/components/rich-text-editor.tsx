"use client";

import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo } from "react";

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> | null }) {
  if (!editor) {
    return (
      <div className="rounded-lg min-h-[180px] animate-pulse bg-gray-200"></div>
    );
  }

  const setHeadingLevel = (level: 1 | 2 | 3 | "normal") => {
    if (level === "normal") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  const currentHeadingLevel = (
    editor.isActive("heading", { level: 1 })
      ? 1
      : editor.isActive("heading", { level: 2 })
        ? 2
        : editor.isActive("heading", { level: 3 })
          ? 3
          : "normal"
  ) as number | "normal";

  return (
    <div className=" border border-slate-300 rounded-t-lg px-2 py-2 flex flex-wrap gap-2">
      <select
        aria-label="Header"
        className="rounded border border-slate-300 px-2 py-1 text-sm"
        value={currentHeadingLevel}
        onChange={(e) => {
          const val = e.target.value;
          setHeadingLevel(
            val === "normal" ? "normal" : (Number(val) as 1 | 2 | 3),
          );
        }}
      >
        <option value="normal">Normal</option>
        <option value={1}>H1</option>
        <option value={2}>H2</option>
        <option value={3}>H3</option>
      </select>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("bold") ? "bg-slate-200" : "bg-slate-50"
          }`}
        >
          B
        </button>
        <button
          type="button"
          aria-label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("italic") ? "bg-slate-200" : "bg-slate-50"
          }`}
        >
          I
        </button>
        <button
          type="button"
          aria-label="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("underline") ? "bg-slate-200" : "bg-slate-50"
          }`}
        >
          U
        </button>
        <button
          type="button"
          aria-label="Strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("strike") ? "bg-slate-200" : "bg-slate-50"
          }`}
        >
          S
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("orderedList") ? "bg-slate-200" : "bg-slate-50"
          }`}
        >
          OL
        </button>
        <button
          type="button"
          aria-label="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("bulletList") ? "bg-slate-200" : "bg-slate-50"
          }`}
        >
          UL
        </button>
        <button
          type="button"
          aria-label="Outdent"
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          disabled={!editor.can().liftListItem("listItem")}
          className="px-2 py-1 text-sm rounded bg-slate-50 disabled:opacity-50"
        >
          −
        </button>
        <button
          type="button"
          aria-label="Indent"
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}
          className="px-2 py-1 text-sm rounded bg-slate-50 disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  );
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something...",
  className = "",
}: RichTextEditorProps) {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      OrderedList,
      BulletList,
      ListItem,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Placeholder.configure({ placeholder }),
    ],
    [placeholder],
  );

  const editor = useEditor({
    extensions,
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: true,
    editorProps: {
      attributes: {
        class: "min-h-[180px] outline-none px-3 py-2",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const html = editor.getHTML();
    if ((value || "") !== (html || "")) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div className={`${className}`}>
      <Toolbar editor={editor} />
      <div className=" rounded-b-lg border border-slate-300">
        <EditorContent editor={editor} className="" />
      </div>
    </div>
  );
}
