

import Header2 from "@/components/blocks/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header2 />
      {children}
    </>
  );
}
