"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function NavBar({ appName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a] z-50 shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-[#ededed]">{appName}</div>

      <button className="md:hidden text-[#f54990]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className="hidden md:flex space-x-6">
        <Link href="/contact" className="text-lg text-[#f54990] hover:text-[#ff7aa8]">
          Contact
        </Link>
        <Link href="/shop/1" className="text-lg text-[#f54990] hover:text-[#ff7aa8]">
          Catalog
        </Link>
        <Link href="/" className="text-lg text-[#f54990] hover:text-[#ff7aa8]">
          Home
        </Link>
        <WhatsAppButton />
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0a0a0a] flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link href="/contact" className="text-lg text-[#f54990]" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link href="/shop/1" className="text-lg text-[#f54990]" onClick={() => setIsMenuOpen(false)}>Catalog</Link>
          <Link href="/" className="text-lg text-[#f54990]" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <WhatsAppButton />
        </div>
      )}
    </nav>
  );
}
