import React from 'react';
import localFont from 'next/font/local';
import './globals.css';
import NavigationWrapper from '@/components/NavigationWrapper';

const sans = localFont({
  src: [
    {
      path: '../../../public/fonts/ABCMonumentGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ABCMonumentGrotesk-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const mono = localFont({
  src: [
    {
      path: '../../../public/fonts/MonumentGrotesk-Mono.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
});

const display = localFont({
  src: [
    {
      path: '../../../public/fonts/HALColantTest-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/HALColantTest-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-display',
  display: 'swap',
});

const ballPill = localFont({
  src: [
    {
      path: '../../../public/fonts/BallPill-medium.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-ballPill',
  display: 'swap',
});

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const useCustomFonts = true;
  const htmlClass = useCustomFonts
    ? `${sans.variable} ${mono.variable} ${display.variable} ${ballPill.variable} font-sans bg-clay text-black`
    : '';
  return (
    <html lang="sv" className={htmlClass}>
      <body>
        <NavigationWrapper />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
