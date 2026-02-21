'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-6 flex flex-col md:flex-row justify-between items-center z-50">
      <p className="text-sm mb-4 md:mb-0">
        Używamy plików cookies w celach analitycznych i marketingowych.
      </p>
      <button
        onClick={accept}
        className="bg-purple-600 px-6 py-2 rounded"
      >
        Akceptuję
      </button>
    </div>
  )
}
