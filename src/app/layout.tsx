import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  title: "Fun Auth | The Ultimate Gamified Experience",
  description: "Navigate through 5 multi-layered, gamified authentication challenges. Featuring immersive physics, ultra-modern glassmorphism, and a deeply relaxing Shanti Mode.",
  keywords: ["Authentication", "Gamified", "Next.js", "React", "Framer Motion", "Shanti Mode", "UI/UX"],
  authors: [{ name: "Antigravity & You" }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Fun Auth | The Ultimate Gamified Experience",
    description: "Navigate through 5 multi-layered, gamified authentication challenges.",
    type: "website",
    siteName: "Fun Auth",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
