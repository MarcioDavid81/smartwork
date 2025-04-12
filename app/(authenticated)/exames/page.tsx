import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Title } from "../_components/Title";
import CreateExamButton from "./_components/CreateExamButton";
import ExamListTable from "./_components/ExamListTable";

export const metadata: Metadata = {
  title: "Exames",
  keywords: ["saúde ocupacional", "gestão de saúde", "segurança no trabalho"],
  description: "O seu sistema de gestão da saúde ocupacional",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default async function Exames() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <div className="min-h-screen flex bg-gray-50">
        <main className="flex-1 py-4 px-4 md:px-8 text-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <Title>Exames</Title>
            {/* Botão para criar exame */}
            <CreateExamButton />
          </div>
          {/* Tabela de exames */}
          <ExamListTable />
        </main>
      </div>
    </div>
  );
}
