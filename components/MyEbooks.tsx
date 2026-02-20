'use client'

import { useEffect, useState } from 'react'

export default function MyEbooks({ onOpen }: any) {
  const [ebooks, setEbooks] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/ebooks', {
  credentials: 'include',
})

        const data = await res.json()
        setEbooks(data.ebooks || [])
      } catch (err) {
        console.log('Błąd ładowania ebooków')
      }
    }

    load()
  }, [])

  if (!ebooks.length) {
    return <div className="text-gray-500">Brak ebooków</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {ebooks.map((ebook) => (
        <div
          key={ebook.id}
          className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => onOpen(ebook)}
        >
          <h3 className="font-semibold text-lg">
            {ebook.title}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {new Date(ebook.created_at).toLocaleDateString()}
          </p>

          <button
            onClick={async (e) => {
              e.stopPropagation()
              if (!confirm('Na pewno usunąć ebook?')) return

              await fetch('/api/delete-ebook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: ebook.id }),
              })

              setEbooks((prev) =>
                prev.filter((e) => e.id !== ebook.id)
              )
            }}
            className="mt-3 text-sm text-red-600 hover:text-red-800"
          >
            Usuń
          </button>
        </div>
      ))}
    </div>
  )
}