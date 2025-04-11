import Link from "next/link";

export const Footer = () => (
    <footer className="mt-20 bg-[#78b49a] text-white py-4">
      <div className="container flex flex-col md:flex-row justify-between text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Smart Work. Todos os direitos reservados.</p>
        <p className="text-sm">Made with by | <Link href="https://md-webdeveloper.vercel.app/" target="_blank" className="text-white hover:text-[#FBBB2F] transition duration-300">Md Web Developer</Link></p>
      </div>
    </footer>
  );