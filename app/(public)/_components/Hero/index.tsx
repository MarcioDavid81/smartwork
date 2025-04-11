import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

const Hero = () => {
    return (
        <>
          <div className="relative flex items-center  h-screen overflow-hidden z-10 bg-secondary hero">
            {/* Overlay de background */}
            <div className="absolute inset-0 bg-[#78b49a] opacity-50 z-20"></div>
            <div className="container flex flex-col items-start gap-4 z-30">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white">
                Smart Work <span className="block text-xl md:text-3xl lg:text-5xl">Sistema de Gestão da Saúde Ocupacional</span>
              </h1>
              <div className="mt-10">
                <Link href="https://www.wa.me/5555997116476" target="_blank">
                  <Button className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80 hover:text-white text-md lg:text-xl">
                    Solicite uma demonstração
                    <FaLongArrowAltRight />
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/bg-hero.jpg"
              alt="Smart Work"
              width={800}
              height={400}
              className="absolute top-0 object-cover z-0 w-full h-full"
            />
            {/* Ondulação decorativa na parte inferior */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-16 text-white fill-current"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,143.53,111.94,221.49,87.21Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </>
      );
    }

export default Hero;
