import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    <div>
      <h1>Dashboard</h1>
      <UserButton showName={true} />
      <Link href="/">Home</Link>
    </div>
  )
}
