import type { Metadata } from "next";
import "./globals.css";
import Scene from "@/components/scene/Scene";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Prabath.",
  icons: {
    icon: "/image/letter-p.png",
  },
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
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <Scene />
        <Nav />
        {children}
      </body>
    </html>
  );
}
