import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
      {children}
    </body>
    </html>
  );
}
