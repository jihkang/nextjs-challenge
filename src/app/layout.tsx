import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import main from "@/app/main.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={main.container}>
          <div className={main.container_space}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
