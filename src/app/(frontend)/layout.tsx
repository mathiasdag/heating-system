import React from 'react'
import localFont from 'next/font/local'
import './globals.css'

const sans = localFont({
  src: [
    { path: '../../../public/fonts/ABCMonumentGrotesk-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/ABCMonumentGrotesk-MediumItalic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
})
const customMono = localFont({
  src: [
    { path: '../../../public/fonts/MonumentGrotesk-Mono.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const useCustomFonts = true
  const htmlClass = useCustomFonts
    ? `${sans.variable} ${customMono.variable} font-sans bg-white`
    : ''
  return (
    <html lang="en" className={htmlClass}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
