"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Navbar({ appName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuButton = document.getElementById("menu-button");
      const mobileMenu = document.getElementById("mobile-menu");
      if (
        isMenuOpen &&
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        menuButton &&
        !menuButton.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a] z-50 shadow-md py-3 px-4 md:py-4 md:px-6">
      <div className="flex justify-between items-center">
        {/* Left Section - App Name */}
        {/* <div className="text-xl md:text-2xl font-bold text-[#ededed]">
          {appName}
        </div> */}

      <Link href="/" className="text-xl md:text-2xl font-bold text-[#ededed] hover:text-[#f54990] transition-all duration-200">
        {appName}
      </Link>


        {/* Center Section - Search Bar (hidden on mobile) */}
        <div className="hidden md:flex flex-grow justify-center mx-4">
          <SearchBar />
        </div>

        {/* Right Section - Navigation Buttons (hidden on mobile) */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/contact"
            className="text-lg font-semibold text-[#f54990] hover:text-[#ff7aa8] transition-all duration-200"
          >
            Contact
          </Link>
          <Link
            href="/shop/1"
            className="text-lg font-semibold text-[#f54990] hover:text-[#ff7aa8] transition-all duration-200"
          >
            Catalog
          </Link>
          <Link
            href="/"
            className="text-lg font-semibold text-[#f54990] hover:text-[#ff7aa8] transition-all duration-200"
          >
            Home
          </Link>
        </div>

        <WhatsAppButton />

        {/* Mobile menu button */}
        <button
          id="menu-button"
          className="md:hidden text-[#f54990] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile search bar */}
      <div className="mt-3 md:hidden">
        <SearchBar />
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#1a1a1a] mt-3 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex flex-col">
            <Link
              href="/"
              className="px-4 py-3 text-[#f54990] hover:bg-[#222] hover:text-[#ff7aa8]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop/1"
              className="px-4 py-3 text-[#f54990] hover:bg-[#222] hover:text-[#ff7aa8]"
              onClick={() => setIsMenuOpen(false)}
            >
              Catalog
            </Link>
            <Link
              href="/contact"
              className="px-4 py-3 text-[#f54990] hover:bg-[#222] hover:text-[#ff7aa8]"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="px-4 py-3">
              <WhatsAppButton />
            </div>
          </div>
        </div>
      )}

      {/* Glittering Red Line */}
      <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-pink-500 to-red-500 animate-glow"></div>
    </nav>
  );
}