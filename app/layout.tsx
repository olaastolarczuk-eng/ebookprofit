import './globals.css'
import CookieBanner from '@/components/CookieBanner'

export const metadata = {
  title: 'EbookProfit – Twórz ebooki w 10 minut',
  description:
    'Generator ebooków AI. Twórz, eksportuj i sprzedawaj własne ebooki bez pisania.',
  openGraph: {
    title: 'EbookProfit',
    description:
      'Zamień swoją wiedzę w gotowy ebook w mniej niż 10 minut.',
    url: 'https://twojadomena.pl',
    siteName: 'EbookProfit',
    type: 'website',
  },


icons: {
    icon: '/favicon.ico',
  },

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
