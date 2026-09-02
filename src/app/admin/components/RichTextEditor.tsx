import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { normalizeRichHtmlForSave } from "../../utils/richText";

const PRESET_COLORS = [
  "#131313",
  "#313b2e",
  "#36474f",
  "#5a5a59",
  "#dc2626",
  "#2563eb",
  "#059669",
  "#d97706",
  "#9333ea",
];

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  placeholder?: string;
}

function ToolbarButton({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-lg text-[12px] font-semibold transition-colors disabled:opacity-30 ${
        active
          ? "bg-[#313b2e] text-white"
          : "text-[#5a5a59] hover:bg-[#f0f0ef] hover:text-[#131313]"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange, label, placeholder }: RichTextEditorProps) {
  const lastExternalValue = React.useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] px-3 py-2.5 outline-none text-[13px] text-[#131313] leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
        ...(placeholder ? { "data-placeholder": placeholder } : {}),
      },
    },
    onUpdate: ({ editor: ed }) => {
      const html = normalizeRichHtmlForSave(ed.getHTML());
      lastExternalValue.current = html;
      onChange(html);
    },
  });

  React.useEffect(() => {
    if (!editor) return;
    const normalized = normalizeRichHtmlForSave(value || "");
    const normalizedCurrent = normalizeRichHtmlForSave(editor.getHTML());
    if (normalized !== normalizedCurrent && value !== lastExternalValue.current) {
      editor.commands.setContent(value || "", { emitUpdate: false });
      lastExternalValue.current = value;
    }
  }, [editor, value]);

  return (
    <div className="min-w-0 w-full">
      {label && <label className="block text-[13px] font-medium text-[#131313] mb-2">{label}</label>}
      <div className="rounded-xl border border-[#e5e5e3] bg-[#fafaf9] overflow-hidden focus-within:border-[#313b2e] focus-within:ring-2 focus-within:ring-[#313b2e]/8">
        {editor && (
          <div className="flex flex-wrap items-center gap-1 px-2 py-2 border-b border-[#e5e5e3] bg-white">
            <ToolbarButton
              title="Negrito"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              B
            </ToolbarButton>
            <ToolbarButton
              title="Itálico"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <span className="italic font-serif">I</span>
            </ToolbarButton>
            <ToolbarButton
              title="Sublinhado"
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <span className="underline">U</span>
            </ToolbarButton>
            <ToolbarButton
              title="Título"
              active={editor.isActive("heading", { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              H2
            </ToolbarButton>
            <ToolbarButton
              title="Lista com marcas"
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              •
            </ToolbarButton>
            <ToolbarButton
              title="Lista numerada"
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              1.
            </ToolbarButton>
            <div className="w-px h-6 bg-[#e5e5e3] mx-1" />
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                title={`Cor ${color}`}
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="w-6 h-6 rounded-full border border-black/10 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
            <label className="relative ml-1 cursor-pointer" title="Escolher cor">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#e5e5e3] bg-white text-[11px] text-[#5a5a59] hover:border-[#313b2e]/30">
                +
              </span>
              <input
                type="color"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              />
            </label>
            <ToolbarButton
              title="Remover cor"
              onClick={() => editor.chain().focus().unsetColor().run()}
            >
              ✕
            </ToolbarButton>
            <div className="w-px h-6 bg-[#e5e5e3] mx-1" />
            <ToolbarButton
              title="Desfazer"
              disabled={!editor.can().chain().focus().undo().run()}
              onClick={() => editor.chain().focus().undo().run()}
            >
              ↶
            </ToolbarButton>
            <ToolbarButton
              title="Refazer"
              disabled={!editor.can().chain().focus().redo().run()}
              onClick={() => editor.chain().focus().redo().run()}
            >
              ↷
            </ToolbarButton>
          </div>
        )}
        <div className="bg-white [&_.ProseMirror]:min-h-[140px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-[#5a5a59]/60 [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0">
          <EditorContent editor={editor} />
        </div>
      </div>
      <p className="text-[12px] text-[#5a5a59] mt-2">
        Use negrito, sublinhado, cores e listas. O texto aparece formatado na página do produto.
      </p>
    </div>
  );
}
