'use client'

import { useRouter } from 'next/navigation'

export default function Success() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white text-center px-6">
      <h1 className="text-4xl font-bold mb-6 text-purple-400">
        🎉 Płatność zakończona sukcesem!
      </h1>

      <p className="text-gray-400 mb-8 max-w-xl">
        Twój plan został aktywowany.
        Możesz teraz generować ebooki w panelu.
      </p>

      <button
        onClick={() => router.push('/dashboard')}
        className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-xl text-lg font-semibold transition"
      >
        Przejdź do panelu
      </button>
    </div>
  )
}
