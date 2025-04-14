import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Title } from "../_components/Title";
import DashboardPage from "./_components/DashboardPageContent";
import DashboardRecharts from "./_components/DashboardRecharts";
import { useUser } from "@clerk/nextjs";
import Congratulations from "./_components/Congratulations";

export const metadata: Metadata = {
  title: "Dashboard",
  keywords: ["saúde ocupacional", "gestão de saúde", "segurança no trabalho"],
  description: "O seu sistema de gestão da saúde ocupacional",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default async function Dashboard() {

  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">   
    <div className="min-h-screen  w-full flex bg-gray-50">
      {/* Conteúdo principal */}
      <main className="flex-1 py-4 px-4 md:px-8 text-gray-800">
        <div className="flex flex-col items-start md:flex-row justify-between mb-6">
          <Title>Dashboard</Title>
          <Congratulations />
        </div>
        <DashboardPage />
        <DashboardRecharts />
      </main>
    </div>
    </div>
  );
}
