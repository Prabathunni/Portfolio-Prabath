import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import IntroOverlay from "@/components/IntroOverlay";

const cairo = Cairo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cairo",
});

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
    <html lang="en" className={cairo.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        <IntroOverlay>
          <Nav />
          {children}
        </IntroOverlay>
      </body>
    </html>
  );
}
