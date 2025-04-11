import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Funcionarios",
    keywords: ["saúde ocupacional", "gestão de saúde", "segurança no trabalho"],
    description: "O seu sistema de gestão da saúde ocupacional",
    authors: [
      { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
    ],
  };

export default function Funcionarios() {
  return (
    <div>Funcionarios</div>
  )
}
