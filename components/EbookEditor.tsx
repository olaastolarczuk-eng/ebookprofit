'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function EbookEditor({
  content,
  onChange,
}: {
  content: string
  onChange: (html: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false, // 🔴 naprawia błąd SSR
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="bg-white rounded shadow">
      {/* pasek narzędzi */}
      <div className="border-b p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 border rounded"
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 border rounded"
        >
          I
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-3 py-1 border rounded"
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="px-3 py-1 border rounded"
        >
          Lista
        </button>
      </div>

      {/* pole edycji */}
      <EditorContent
  editor={editor}
  className="p-6 min-h-[400px] prose max-w-none
             [&_h2]:text-2xl
             [&_h2]:font-bold
             [&_h2]:mt-8
             [&_p]:mb-4
             [&_ul]:list-disc
             [&_ul]:ml-6
             [&_li]:mb-2"
/>
    </div>
  )
}