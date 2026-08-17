import type { Metadata } from "next";
import {
  Quando,
  Libre_Baskerville,
  Manrope,
} from "next/font/google";
import "./globals.css";

const quando = Quando({
  variable: "--font-quando",
  subsets: ["latin"],
  weight: "400",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Marez",
  description: "Marez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${quando.variable} ${libreBaskerville.variable} ${manrope.variable}`}
      >
        {children}
      </body>
    </html>
  );
}