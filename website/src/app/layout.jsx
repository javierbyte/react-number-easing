import './globals.css';
import 'jbx/main.css';

import { GoogleAnalytics } from '@next/third-parties/google';

import GitHubCorner from '@/components/GitHubCorner.jsx';

const TITLE =
  'react-number-easing | React component for fancy number transitions';
const DESCRIPTION = 'React component for fancy number transitions.';
const CANONICAL = 'https://javier.xyz/react-number-easing';
const THUMBNAIL = 'https://javier.xyz/projects/react-number-easing.jpg';

// Absolute urls throughout: the canonical has to stay
// javier.xyz/react-number-easing with no trailing slash, so nothing is left to
// url resolution.
export const metadata = {
  metadataBase: new URL('https://javier.xyz'),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'react-number-easing',
    description: DESCRIPTION,
    url: CANONICAL,
    images: [THUMBNAIL],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'react-number-easing',
    description: DESCRIPTION,
    images: [THUMBNAIL],
  },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GitHubCorner />
        <GoogleAnalytics gaId="G-M2FT27FXS2" />
      </body>
    </html>
  );
}
