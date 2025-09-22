import React from 'react';
import localFont from 'next/font/local';
import './globals.css';
import NavigationWrapper from '@/components/NavigationWrapper';
import { NavigationData } from '@/components/Navigation';
import RevalidateButton from '@/components/RevalidateButton';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from 'next-themes';
import { UrlBasedTheme } from '@/components/UrlBasedTheme';
import { BackgroundLoader } from '@/components/BackgroundLoader';
import PayloadAPI from '@/lib/api';

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
      path: '../../../public/fonts/ABCMonumentGroteskMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ABCMonumentGroteskMono-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
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

// Force revalidation on every request
export const revalidate = 0;

// Disable caching for this layout
export const dynamic = 'force-dynamic';

async function getNavigation() {
  try {
    const response = await PayloadAPI.find({
      collection: 'navigation',
      depth: 3, // Populate nested navigation relationships
      limit: 1,
    });

    if (response.docs[0]) {
      return response.docs[0] as NavigationData;
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch navigation in layout:', error);
    return null;
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const navigation = await getNavigation();
  const useCustomFonts = true;
  const htmlClass = useCustomFonts
    ? `${sans.variable} ${mono.variable} ${display.variable} ${ballPill.variable} font-sans bg-bg dark:bg-dark-bg text-text dark:text-dark-text`
    : '';
  return (
    <html lang="sv" className={htmlClass} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <UrlBasedTheme>
            <BackgroundLoader>
              <NavigationWrapper navigation={navigation} />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <RevalidateButton />
            </BackgroundLoader>
          </UrlBasedTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
