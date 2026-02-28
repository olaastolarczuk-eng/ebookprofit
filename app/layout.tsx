import './globals.css'
import CookieBanner from '@/components/CookieBanner'

export const metadata = {
  title: 'EbookProfit – Twórz ebooki w 10 minut',
  description:
    'Generator ebooków AI. Twórz, eksportuj i sprzedawaj własne ebooki bez pisania.',

  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),

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
        <CookieBanner />
      </body>
    </html>
  )
}
