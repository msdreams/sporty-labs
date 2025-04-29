import type { Metadata } from "next";
import { Providers } from "@/Components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "SportyLabs App",
  description: "Make your life active",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
