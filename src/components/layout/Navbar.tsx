"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Program", href: "/program" },
    { name: "Jadwal", href: "/timeline" },
    { name: "Live Stream", href: "/live" },
    { name: "Infak", href: "/infak" },
    { name: "Sponsor", href: "/sponsor" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
  <div className="sticky top-0 z-50">
    <nav className="bg-[#4F5900] w-full h-16 md:h-20 flex items-center shadow-md">
      <div className="w-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 h-full">
        <Link href="/" className="h-full py-2 md:py-4 flex items-center">
          <Image 
            src="/images/logo-p3ri.png" 
            alt="Logo P3RI" 
            width={60} 
            height={60}
            className="h-full w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-2 lg:px-3 py-3 text-sm lg:text-base font-semibold font-montserrat transition-colors ${
                isActive(item.href)
                  ? "text-[#ADCD61] underline underline-offset-6 decoration-2"
                  : "text-white hover:text-[#ADCD61]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 hover:bg-[#3A4200] rounded transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </nav>

    {isOpen && (
      <div className="md:hidden fixed inset-0 bg-[#4F5900] z-40">
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#3A4200]">
          <Link href="/" onClick={closeMenu}>
            <Image 
              src="/images/logo-p3ri.png" 
              alt="Logo P3RI" 
              width={48} 
              height={48}
              className="object-contain"
            />
          </Link>
          
          <button
            onClick={closeMenu}
            className="text-white p-2 hover:bg-[#3A4200] rounded transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col px-6 pt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className={`py-4 text-base font-semibold font-montserrat border-b border-[#3A4200] ${
                isActive(item.href)
                  ? "text-[#ADCD61] underline underline-offset-6 decoration-2"
                  : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
);
};

export default Navbar 