import "reflect-metadata";
import type { Metadata } from "next";
import { Inter, Montserrat, Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"] as const,
  weight: ["400", "500"] as const,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"] as const,
  weight: ["400"] as const,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"] as const,
  weight: ["400", "500", "600", "700"] as const,
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"] as const,
  weight: ["400"] as const,
});

export const metadata: Metadata = {
  title: "Nortus",
  description: "Plataforma Nortus Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${montserrat.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
