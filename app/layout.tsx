import './globals.css'
import CookieBanner from '@/components/CookieBanner'

export const metadata = {
  title: 'EbookProfit – Twórz ebooki w 10 minut',
  description:
    'Generator ebooków AI. Twórz, eksportuj i sprzedawaj własne ebooki bez pisania.',

  metadataBase: new URL(
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
),
  openGraph: {
    title: 'EbookProfit',
    description:
      'Zamień swoją wiedzę w gotowy ebook w mniej niż 10 minut.',
    url: '/',
    siteName: 'EbookProfit',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },

   icons: {
    icon: '/favicon.ico',
  },
}
export const viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>
        {children}
        {/* FOOTER */}

        <footer className="text-sm text-gray-500 flex gap-6 justify-center mt-10 mb-6">

          <a href="/privacy">Polityka prywatności</a>

          <a href="/terms">Regulamin</a>

          <a href="/cookies">Cookies</a>

          <a href="/ai">AI</a>

        </footer>
        <CookieBanner />
      </body>
    </html>
  )
}
