Dashboard

'use client'

import { useState, useEffect } from 'react'
import EbookEditor from '@/components/EbookEditor'
import StylePicker from '@/components/StylePicker'
import MyEbooks from '@/components/MyEbooks'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('minimal')
  const [loading, setLoading] = useState(false)
  const [ebook, setEbook] = useState('')
  const [cover, setCover] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [ebookId, setEbookId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)

  


useEffect(() => {
  const loadUser = async () => {
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      setAuthLoading(false)
      router.push('/login')
      return
    }

    const { data: profile, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', data.user.id)
  .maybeSingle()

if (error) {
  console.log('Profile error:', error)
  setAuthLoading(false)
  return
}

if (!profile) {
  console.log('Brak profilu — tworzę nowy')

  const { data: newProfile } = await supabase
    .from('profiles')
    .insert({
      id: data.user.id,
      email: data.user.email,
      plan: 'Brak',
      ebooks_this_month: 0,
    })
    .select()
    .single()

  setUserData(newProfile)
  setAuthLoading(false)
  return
}

    // 🔁 RESET MIESIĘCZNY
    const now = new Date()
    const resetDate = profile.month_reset
      ? new Date(profile.month_reset)
      : new Date()

    if (
      now.getMonth() !== resetDate.getMonth() ||
      now.getFullYear() !== resetDate.getFullYear()
    ) {
      await supabase
        .from('profiles')
        .update({
          ebooks_this_month: 0,
          month_reset: new Date().toISOString(),
        })
        .eq('id', profile.id)

      profile.ebooks_this_month = 0
    }

    // 🔒 Sprawdzenie wygaśnięcia planu
    if (profile.plan_expires) {
      const expires = new Date(profile.plan_expires)
      const now = new Date()

      if (now > expires) {
        await supabase
          .from('profiles')
          .update({ plan: 'Brak' })
          .eq('id', profile.id)

        profile.plan = 'Brak'
      }
    }

    setUserData(profile)
    setAuthLoading(false)
  }

  loadUser()
}, [router])


  
  // ===== AUTOZAPIS ZMIAN =====
useEffect(() => {
  if (!ebookId) return

  console.log('AUTOSAVE START', ebookId)

  const timeout = setTimeout(async () => {
    try {
      console.log('WYSYŁAM UPDATE')

      await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: ebookId,
          content: ebook,
          topic,
          style,
        }),
      })

      console.log('ZAPISANO')
    } catch (err) {
      console.log('Autosave error')
    }
  }, 2000)

  return () => clearTimeout(timeout)
}, [ebook, topic, style, ebookId])

  const openEbook = (ebookData: any) => {
  setTopic(ebookData.topic)
  setStyle(ebookData.style)
  setEbook(ebookData.content)
  setEbookId(ebookData.id) // ← konieczne do autosave
}
  const generateEbook = async () => {
  // 🔐 LIMIT PLANU
  if (!userData || userData.plan === 'Brak') {
  alert('Musisz wykupić plan, aby generować ebooki.')
  return
}
  if (userData) {
    const limit =
  userData.plan === 'Podstawowy'
    ? 5
    : userData.plan === 'Premium'
    ? 15
    : userData.plan === 'Pro+'
    ? 30
    : 0

        

    if (userData.ebooks_this_month >= limit) {
      alert('Osiągnięto limit ebooków dla Twojego planu 🚫')
      return
    }
  }

  setLoading(true)
  setEbook('')
  setProgress(5)
  setEbookId(null)

  const steps = [15, 30, 45, 60, 75, 90, 95]
  let i = 0

  const interval = setInterval(() => {
    if (i < steps.length) {
      setProgress(steps[i])
      i++
    }
  }, 1500)

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, style }),
    })

    const data = await res.json()

    clearInterval(interval)
    setProgress(100)
    setEbook(data.text)

    // ===== ZAPIS DO BAZY =====
    try {
      const saveRes = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: topic,
          topic,
          content: data.text,
          style,
        }),
      })

      const saved = await saveRes.json()
      setEbookId(saved.id)

      // 📈 zwiększ licznik (jeśli nie Pro+)
      if (userData?.plan !== 'Pro+') {
        await supabase
          .from('profiles')
          .update({
            ebooks_this_month: userData.ebooks_this_month + 1,
          })
          .eq('id', userData.id)

        setUserData({
          ...userData,
          ebooks_this_month: userData.ebooks_this_month + 1,
        })
      }

    } catch (err) {
      console.log('Save error')
    }

    // ===== OKŁADKA =====
    if (userData?.plan !== 'Podstawowy') {
      try {
        const coverRes = await fetch('/api/cover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: topic,
            style,
          }),
        })

        const coverData = await coverRes.json()
        setCover(coverData.image)

      } catch (err) {
        console.log('Cover error')
      }
    }

  } catch (err) {
    clearInterval(interval)
    alert('Błąd generowania ebooka')
  } finally {
    setLoading(false)
  }
}


  function textToHtml(text: string) {
    const lines = text.split('\n')
    let lastHeading = ''

    return lines
      .map((line) => {
        let clean = line.trim()
        if (!clean) return '<p></p>'

        // usuwanie markdownu
        clean = clean
          .replace(/^####\s*/, '')
          .replace(/^###\s*/, '')
          .replace(/^##\s*/, '')
          .replace(/^#\s*/, '')
          .replace(/\*\*/g, '')

        // nagłówki
        if (/^\d+(\.\d+)?\./.test(clean)) {
          if (clean === lastHeading) return ''
          lastHeading = clean
          return `<h2>${clean}</h2>`
        }

        // lista
        if (clean.startsWith('- ')) {
          return `<ul><li>${clean.replace('- ', '')}</li></ul>`
        }

        return `<p>${clean}</p>`
      })
      .join('')
  }

  if (authLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      Ładowanie...
    </div>
  )
}


  return (
  <main className="min-h-screen p-8 bg-gray-100">

    {/* ===== PANEL UŻYTKOWNIKA ===== */}
{userData && (
  <div className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-500">
        Zalogowany jako
      </p>

      <p className="font-semibold">
        {userData.email}
      </p>

      <div className="mt-2 text-sm">
        <span>Plan:</span>
        <span className="ml-2 px-2 py-1 rounded bg-black text-white text-xs">
          {userData.plan}
        </span>
      </div>

      <div className="mt-2 text-sm text-gray-600">
  Wykorzystano:
  <span className="ml-1 font-semibold">
    {userData.ebooks_this_month}
  </span>

  <span>
    {' / '}
    {userData.plan === 'Podstawowy'
      ? 5
      : userData.plan === 'Premium'
      ? 15
      : userData.plan === 'Pro+'
      ? 30
      : 0}
  </span>
</div>

      <button
        onClick={() => alert('https://ebookprofit.vercel.app/pricing')}
        className="mt-3 text-sm bg-black text-white px-3 py-1 rounded"
      >
        Zmień plan
      </button>
    </div>

    <button
      onClick={async () => {
        await supabase.auth.signOut()
        router.push('/login')
      }}
      className="text-red-600 text-sm"
    >
      Wyloguj się
    </button>
  </div>
)}


    {/* DALEJ MASZ SWÓJ H1 */}
    {userData?.plan === 'Brak' ? (
  <div className="bg-white p-10 rounded shadow text-center">
    <h2 className="text-xl font-bold mb-4">
      Wybierz plan aby rozpocząć 🚀
    </h2>

    <button
      onClick={() => router.push('/pricing')}
      className="bg-black text-white px-6 py-2 rounded"
    >
      Wybierz plan
    </button>
  </div>
) : (
  <>
    <h1 className="text-3xl font-bold mb-6">
      Generator eBooka
    </h1>


      <input
        type="text"
        placeholder="Podaj temat ebooka..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="p-2 border rounded w-full max-w-xl mb-4"
      />

      {/* WYBÓR STYLU */}
      <div className="mb-6">
        <p className="font-semibold mb-3">Wybierz styl ebooka:</p>
        <StylePicker value={style} onChange={setStyle} />
      </div>

      <button
        onClick={generateEbook}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? 'Generowanie eBooka...' : 'Generuj eBook'}
      </button>

      {loading && (
        <div className="mt-6 p-6 bg-white rounded shadow max-w-xl text-center">
          <p className="text-xl font-semibold mb-4">
            Twój eBook właśnie się generuje, to może potrwać kilka minut…
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-black h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-gray-600">{progress}%</p>
        </div>
      )}

      {ebook && (
        <div className="mt-8 max-w-3xl">
          {cover && userData?.plan !== 'Podstawowy' && (

            <div className="mb-6">
              <img
                src={`data:image/png;base64,${cover}`}
                alt="Okładka ebooka"
                className="w-64 shadow mb-4"
              />
              

              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = `data:image/png;base64,${cover}`
                  link.download = 'okladka.png'
                  link.click()
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Pobierz okładkę PNG
              </button>
            </div>
          )}

          {/* PRZYCISKI */}
          <div className="flex gap-3 mb-4"> 
            {userData?.plan !== 'Podstawowy' && (
  <button
    onClick={async () => {
      const res = await fetch('/api/pdf', {

                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    text: ebook,
                    title: topic || 'ebook',
                    style,
                    cover,
                  }),
                })

                const blob = await res.blob()
                const url = URL.createObjectURL(blob)

                const link = document.createElement('a')
                link.href = url
                link.download = 'ebook.pdf'
                document.body.appendChild(link)
                link.click()
                link.remove()
              }}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Pobierz PDF
            </button>
            )}

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
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Pobierz wersję do edycji (DOCX)
            </button>
          </div>
          {/* EDYTOR */}
          <EbookEditor
            content={textToHtml(ebook)}
            onChange={setEbook}
          />
        </div>
      )}
            <div className="mt-12">
        <MyEbooks onOpen={openEbook} />
      </div>
    </>
)}
</main>
)
}



