import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
        {/* Header */}
        <header className="border-b py-4 px-6 flex justify-between items-center">
          <div className="text-sm text-gray-500 text-center w-full">
            Welcome to our store
          </div>
        </header>

        {/* Navigation */}
        <nav className="py-4 px-6 flex justify-between items-center relative">
          <div className="text-2xl font-bold">{appName}</div>

          {/* Catalog & Contact Buttons - More Visible */}
          <div className="flex space-x-6">
            <Link href="/shop" className="text-lg font-semibold text-white-800 hover:text-red-600 transition-all duration-200">
              Sign in
            </Link>
            <Link href="/contact" className="text-lg font-semibold text-white-800 hover:text-red-600 transition-all duration-200">
              Contact
            </Link>
            <Link href="/contact" className="text-lg font-semibold text-white-800 hover:text-red-600 transition-all duration-200">
              Catalog
            </Link>
          </div>

          {/* Button Container with Icons */}
          <div className="flex space-x-4">
            <button className="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" strokeWidth="0" fill="currentColor" stroke="currentColor" className="icon">
                <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
              </svg>
            </button>
            <button className="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="icon">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinejoin="round" strokeLinecap="round"></path>
              </svg>
            </button>
            <button className="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="0" fill="currentColor" stroke="currentColor" className="icon">
                <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
              </svg>
            </button>
            <button className="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="icon">
                <circle r="1" cy="21" cx="9"></circle>
                <circle r="1" cy="21" cx="20"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>

          {/* Glittering Red Line - Now Under Navigation */}
          <div className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-gradient-to-r from-red-500 via-pink-500 to-red-500 animate-glow"></div>
        </nav>

        {/* Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-500 border-t">
          © {appName}. Be simple, Be free..
        </footer>
      </body>
    </html>
  );
}
