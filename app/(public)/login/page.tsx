import { Metadata } from "next";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
  keywords: ["saúde ocupacional", "gestão de saúde", "segurança no trabalho"],
  description: "O seu sistema de gestão da saúde ocupacional",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default async function LoginPage() {

  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div
      className="min-h-screen bg-[url(/bg-login.jpg)] bg-fixed bg-cover bg-center flex items-center justify-center text-white px-6"
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-xl max-w-md text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Smart Work</h1>
        <p className="mb-6 text-sm">
          Acompanhe os exames ocupacionais, controle a retirada de EPIs e promova saúde no ambiente de trabalho com tecnologia e segurança.
        </p>
        <SignInButton mode="modal">
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-200 transition">
            Faça login com
            <Image src="/G.png" alt="Google Logo" width={20} height={20} className="inline-block ml-2" />
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
