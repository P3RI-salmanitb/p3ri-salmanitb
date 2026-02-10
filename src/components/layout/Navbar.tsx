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
    { name: "Program", href: "/program", shortName: "Program" },
    { name: "Jadwal", href: "/timeline", shortName: "Jadwal" },
    { name: "Live Stream", href: "/live", shortName: "Live" },
    { name: "Infak", href: "/infak", shortName: "Infak" },
    { name: "Sponsor", href: "/sponsor", shortName: "Sponsor" },
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
        <div className="w-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 h-full gap-6 md:gap-[48px]">
          <Link href="/" className="h-full py-2 md:py-4 flex items-center">
            <Image 
              src="/images/logo-p3ri.png" 
              alt="Logo P3RI" 
              width={60} 
              height={60}
              className="h-full w-auto object-contain"
            />
          </Link>

          {/* Menambahkan p-1 agar background oren (#FFC80B) tidak menempel ke tepi container hijau tua (#353B00) */}
          <div className="hidden md:flex flex-1 p-1 bg-[#353B00] rounded-3xl justify-end items-center gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-3 rounded-3xl flex justify-start items-center gap-3 transition-colors ${
                  isActive(item.href)
                    ? "bg-[#FFC80B]"
                    : "hover:text-[#FFC80B]"
                }`}
              >
                <div className={`text-base font-semibold font-montserrat leading-6 transition-colors whitespace-nowrap ${
                  isActive(item.href)
                    ? "text-[#353B00]"
                    : "text-white hover:text-[#FFC80B]"
                }`}>
                  <span className="hidden lg:inline">{item.name}</span>
                  <span className="lg:hidden">{item.shortName}</span>
                </div>
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
                    ? "text-[#ADCD61]"
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

export default Navbar;