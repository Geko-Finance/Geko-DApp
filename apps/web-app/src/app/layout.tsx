import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geko Protocol",
  description: "Geko DApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
