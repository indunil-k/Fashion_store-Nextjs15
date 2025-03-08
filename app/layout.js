import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // Import the Link component
import "./globals.css";
import SearchBar from "@/components/SearchBar"; // Import the SearchBar component
import WhatsAppButton from "@/components/WhatsAppButton"; // Import the WhatsAppButton component

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
        {/* Navigation - Fixed at the top */}
        <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a] z-50 shadow-md py-4 px-6 flex justify-between items-center">
          {/* Left Section - App Name */}
          <div className="text-2xl font-bold text-[#ededed]">{appName}</div>

          {/* Center Section - Search Bar */}
          <div className="flex-grow flex justify-center mx-4">
            <SearchBar />
          </div>

          {/* Right Section - Navigation Buttons */}
          <div className="flex space-x-6">
            <Link href="/contact" className="text-lg font-semibold text-[#f54990] hover:text-[#ff7aa8] transition-all duration-200">
              Contact
            </Link>
            <Link href="/shop/1" className="text-lg font-semibold text-[#f54990] hover:text-[#ff7aa8] transition-all duration-200">
              Catalog
            </Link>
            <Link href="/" className="text-lg font-semibold text-[#f54990] hover:text-[#ff7aa8] transition-all duration-200">
              Home
            </Link>
            {/* WhatsApp Button */}
            <WhatsAppButton />
          </div>

          {/* Glittering Red Line - Now Under Navigation */}
          <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-pink-500 to-red-500 animate-glow"></div>
        </nav>

      

        {/* WhatsApp Button */}
        {/* <WhatsAppButton /> */}

        {/* Page Content - Adjusted for fixed navigation */}
        <main className="flex-grow pt-[calc(4rem+1px)]">{children}</main>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-500 border-t bg-[#0a0a0a]">
          © {appName}. Be simple, Be free..
        </footer>
      </body>
    </html>
  );
}