"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { LogIn, UserIcon } from "lucide-react";
import { FaCommentAlt, FaHome, FaHouseUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePriceChange } from "react-icons/md";
import { useAuth } from "@clerk/nextjs";

const pages = [
  {
    name: "Home",
    url: "/",
    icon: <FaHome size={20} />,
  },
  {
    name: "Sobre",
    url: "#sobre",
    icon: <FaHouseUser size={20} />,
  },
  {
    name: "Depoimentos",
    url: "#depoimentos",
    icon: <FaCommentAlt size={20} />,
  },
  {
    name: "Planos",
    url: "#planos",
    icon: <MdOutlinePriceChange size={20} />,
  },
  {
    name: "Contato",
    url: "#contato",
    icon: <MdOutlineEmail size={20} />,
  },
];

export default function Navbar() {
  // USESTATE E USEEFFCT PARA CAPTURAR O SCROLL DA PÁGINA E ADICIONAR UMA CLASSE NO HEADER
  const [scrolled, setScrolled] = useState(false);

  const { userId } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //CONSTANTE PARA PEGAR O PATHNAME DA PÁGINA
  const path = usePathname();

  // USESTATE PARA CONTROLAR O ESTADO DO MENU MOBILE
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);

  useEffect(() => {
    setIsMenuMobileOpen(false);
  }, [path]);

  // IMPEDE O SCROOL DA PÁGINA QUANDO O MENU MOBILE ESTIVER ABERTO
  useEffect(() => {
    document.body.style.overflow = isMenuMobileOpen ? "hidden" : "auto";
  }, [isMenuMobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-4 bg-gray-50 md:bg-transparent transition-all duration-300
        ${scrolled ? "md:bg-gray-50  md:shadow-md" : ""}`}
    >
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo2.png"
            className="z-30"
            priority={true}
            alt="Logo"
            width={200}
            height={340}
          />
        </Link>
        {/* ALTERA O ÍCONE DO MENU DE ACORDO COM O ESTADO */}
        {isMenuMobileOpen ? (
          <IoClose
            onClick={() => setIsMenuMobileOpen(false)}
            size={40}
            className="text-[#78b49a] cursor-pointer hidden max-md:block z-30"
          />
        ) : (
          <IoMenu
            size={40}
            className="text-[#78b49a] cursor-pointer hidden max-md:block z-10"
            onClick={() => setIsMenuMobileOpen(true)}
          />
        )}
        {/* DIV CEGA PARA CRIAR O EFEITO DE OPACIDADE DO BODY */}
        {isMenuMobileOpen && (
          <div
            className="fixed inset-0 bg-[#78b49a] bg-opacity-75 top-0 z-[9]"
            data-open={isMenuMobileOpen}
            onClick={() => setIsMenuMobileOpen(false)}
          />
        )}
        {/* MENU DESKTOP */}
        <nav className="hidden md:flex md:justify-center md:items-center gap-4">
          <ul className="flex gap-4 text-md lg:text-xl ">
            {pages.map((page) => (
              <li
                key={page.url}
                className="hover:scale-105 transition-all duration-300"
              >
                <a
                  href={page.url}
                  className={`${path === page.url ? "text-black" : ""} ${
                    scrolled ? "text-black hover:text-gray-500" : ""
                  }`}
                >
                  {page.name}
                </a>
              </li>
            ))}
          </ul>
          <Link href="/login">
            <Button className="bg-[#78b49a] text-white text-md lg:text-xl hover:bg-[#78b49a]/80 hover:text-white/80">
              {userId ? (
                <div className="flex items-center">
                  <UserIcon className="mr-2" />
                  Dashboard
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="mr-2" />
                  Login
                </div>
              )}
            </Button>
          </Link>
        </nav>
        {/* MENU MOBILE */}
        <nav
          className={`fixed right-0 bg-gray-50 top-0 w-[70%] flex flex-col min-h-screen z-20 transform transition-transform duration-300 ${
            isMenuMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={() => setIsMenuMobileOpen(false)}
        >
          <ul className="flex flex-col items-start justify-start h-full gap-6 pl-4 pt-20 text-xl text-white">
            {pages.map((page) => (
              <li key={page.url}>
                <Link
                  href={page.url}
                  className="text-[#78b49a] flex items-center gap-2"
                >
                  {page.icon}
                  {page.name}
                </Link>
              </li>
            ))}
            <Link href="/login" className="mt-10">
              <Button className="bg-[#78b49a] text-white text-md lg:text-xl hover:bg-[#78b49a]/80 hover:text-white/80">
                {userId ? (
                  <div className="flex items-center">
                    <UserIcon className="mr-2" />
                    Dashboard
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="mr-2" />
                    Login
                  </div>
                )}
              </Button>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
