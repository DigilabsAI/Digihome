import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import type { Metadata } from "next";
import { ReactQueryProvider } from "@/lib/providers/reactQueryProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Digilab Solutions",
  description: "The fastest way to build apps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" expand visibleToasts={4} />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
