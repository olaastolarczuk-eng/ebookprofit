import './globals.css'
import CookieBanner from '@/components/CookieBanner'
import Script from 'next/script'

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
  <CookieBanner />

  {/* Google Analytics */}
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-Y75HMSY65J"
    strategy="afterInteractive"
  />

  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Y75HMSY65J');
    `}
  </Script>

 {/* Meta Pixel */}
<Script id="facebook-pixel" strategy="afterInteractive">
{`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1371863008071204');
fbq('track', 'PageView');
`}
</Script>

<noscript>
<img
height="1"
width="1"
style={{ display: 'none' }}
src="https://www.facebook.com/tr?id=1371863008071204&ev=PageView&noscript=1"
/>
</noscript>

</body>
    </html>
  )
}
