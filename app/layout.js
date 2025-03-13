import { Geist, Geist_Mono } from "next/font/google";
//import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/NavBar"; // Import the new Client Component
//import SearchBar from "@/components/SearchBar";
//import WhatsAppButton from "@/components/WhatsAppButton";

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <Navbar appName={appName} />
        <main className="flex-grow pt-[calc(4rem+1px)] md:pt-[calc(4.5rem+1px)]">
          {children}
        </main>
        <footer className="py-4 md:py-6 text-center text-gray-500 border-t bg-[#0a0a0a] text-sm md:text-base">
          © {appName}. Be simple, Be free..
        </footer>
      </body>
    </html>
  );
}