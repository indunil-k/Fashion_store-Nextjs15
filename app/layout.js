import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Default Store",
  description: "Welcome to our online store",
};

export default function RootLayout({ children }) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Default Store";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <NavBar appName={appName} />
        <main className="flex-grow pt-[calc(4rem+1px)]">{children}</main>
        <footer className="py-6 text-center text-gray-500 border-t bg-[#0a0a0a]">
          © {appName}. Be simple, Be free..
        </footer>
      </body>
    </html>
  );
}
