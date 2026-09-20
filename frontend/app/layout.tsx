import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai, DM_Serif_Display } from "next/font/google";
import SessionWrapper from "./components/SessionWrapper";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansThai = Noto_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai"],
  variable: "--font-noto-sans-thai",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "Money Flow",
  description: "ติดตามค่าใช้จ่ายของคุณ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      className={`${inter.variable} ${notoSansThai.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
