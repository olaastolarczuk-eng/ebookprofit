'use client'

import { useState, useEffect } from 'react'
import EbookEditor from '@/components/EbookEditor'
import MyEbooks from '@/components/MyEbooks'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {

const router = useRouter()

const [topic, setTopic] = useState('')
const [loading, setLoading] = useState(false)
const [ebook, setEbook] = useState('')
const [cover, setCover] = useState<string | null>(null)
const [progress, setProgress] = useState(0)
const [ebookId, setEbookId] = useState<string | null>(null)
const [userData, setUserData] = useState<any>(null)
const [authLoading, setAuthLoading] = useState(true)


/* =========================
   USER LOAD
========================= */

useEffect(() => {

const loadUser = async () => {

const { data } = await supabase.auth.getUser()

if (!data.user) {
router.push('/login')
return
}

const { data: profile } = await supabase
.from('profiles')
.select('*')
.eq('id', data.user.id)
.maybeSingle()

setUserData(profile)
setAuthLoading(false)

}

loadUser()

}, [router])


/* =========================
   AUTOSAVE
========================= */

useEffect(() => {

if (!ebookId) return

const timeout = setTimeout(async () => {

await fetch('/api/update', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
id: ebookId,
content: ebook,
topic
})
})

}, 2000)

return () => clearTimeout(timeout)

}, [ebook, topic, ebookId])


/* =========================
   OPEN EBOOK
========================= */

const openEbook = (ebookData: any) => {

setTopic(ebookData.topic)
setEbook(ebookData.content)
setEbookId(ebookData.id)

}


/* =========================
   GENERATE EBOOK
========================= */

const generateEbook = async () => {

if (!userData || userData.plan === 'Brak') {
alert('Musisz wykupić plan')
return
}

setLoading(true)
setProgress(10)
setEbook('')
setCover(null)

try {

const res = await fetch('/api/generate', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ topic })
})

const data = await res.json()

setProgress(80)
setEbook(data.text.replace(/\d+\./g, '\n\n$&'))

/* SAVE */

const saveRes = await fetch('/api/save', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: topic,
    topic,
    content: data.text,
    cover
  }),
})

const saved = await saveRes.json()
setEbookId(saved.id)

/* COVER */

if (userData.plan !== 'Podstawowy') {

const coverRes = await fetch('/api/cover', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: topic })
})

const coverData = await coverRes.json()
setCover(coverData.image)

}

setProgress(100)

} catch (err) {

alert('Błąd generowania')

}

setLoading(false)

}


/* =========================
   DOWNLOAD PDF
========================= */

const downloadPDF = async () => {

const res = await fetch('/api/pdf', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
text: ebook,
title: topic,
cover
})
})

const blob = await res.blob()
const url = URL.createObjectURL(blob)

const link = document.createElement('a')
link.href = url
link.download = 'ebook.pdf'
link.click()

}


/* =========================
   LOADING
========================= */

if (authLoading) {
return <div className="p-10">Ładowanie...</div>
}


/* =========================
   UI
========================= */

return (

<main className="min-h-screen bg-gray-100 p-8">


{/* USER PANEL */}

{userData && (

<div className="bg-white p-6 rounded shadow mb-8 flex justify-between items-center">

  <div>

    <p className="text-gray-500 text-sm">Zalogowany jako</p>
    <p className="font-semibold">{userData.email}</p>

    <div className="mt-2 flex gap-3 items-center">

      <span className="bg-black text-white px-2 py-1 rounded text-xs">
        Plan: {userData.plan}
      </span>

      <button
        onClick={() => router.push('/pricing')}
        className="text-sm text-blue-600 hover:underline"
      >
        Zmień plan
      </button>

    </div>

  </div>

  <button
    onClick={async () => {
      await supabase.auth.signOut()
      router.push('/login')
    }}
    className="text-red-500"
  >
    Wyloguj
  </button>

</div>

)}


{/* GENERATOR */}

<div className="bg-white p-6 rounded shadow mb-8">

<h1 className="text-2xl font-bold mb-4">
Generator eBooka
</h1>

<input
type="text"
placeholder="Podaj temat ebooka..."
value={topic}
onChange={(e) => setTopic(e.target.value)}
className="border p-3 rounded w-full max-w-xl mb-4"
/>

<button
onClick={generateEbook}
disabled={loading}
className="bg-black text-white px-6 py-3 rounded"
>

{loading ? 'Generowanie...' : 'Generuj ebook'}

</button>


{loading && (

<div className="mt-4">

<div className="bg-gray-200 h-3 rounded">

<div
className="bg-black h-3 rounded"
style={{ width: `${progress}%` }}
/>

</div>

<p className="text-sm mt-1">{progress}%</p>

</div>

)}

</div>


{/* RESULT */}

{ebook && (

<div className="bg-white p-6 rounded shadow mb-8">

<div className="flex gap-3 mb-4">

  {/* PDF */}
  <button
    onClick={downloadPDF}
    className="bg-green-600 text-white px-5 py-2 rounded"
  >
    Pobierz PDF
  </button>

  {/* DOCX */}
  <button
    onClick={async () => {

      const res = await fetch('/api/docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: ebook,
          title: topic || 'ebook',
        }),
      })

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'ebook.docx'
      document.body.appendChild(link)
      link.click()
      link.remove()

    }}
    className="bg-blue-600 text-white px-5 py-2 rounded"
  >
    Pobierz DOCX
  </button>

  {/* OKŁADKA */}
  {cover && (
    <button
      onClick={() => {

        const link = document.createElement('a')
        link.href = `data:image/png;base64,${cover}`
        link.download = 'okladka.png'
        document.body.appendChild(link)
        link.click()
        link.remove()

      }}
      className="bg-purple-600 text-white px-5 py-2 rounded"
    >
      Pobierz okładkę PNG
    </button>
  )}

  {/* GENERUJ KOLEJNY */}
  <button
    onClick={generateEbook}
    className="bg-black text-white px-5 py-2 rounded"
  >
    Generuj kolejny
  </button>

</div>

<EbookEditor content={ebook.replace(/===SPIS_TRESCI===|===KONIEC_SPISU===/g, '')} onChange={setEbook} />
</div>

)}


{/* MY EBOOKS */}

<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-bold mb-4">
Twoje ebooki
</h2>

<MyEbooks onOpen={openEbook} />

</div>


</main>

)

}