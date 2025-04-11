import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GrReturn } from "react-icons/gr";
import ExamForm from "../_components/ExamForm";
import { Title } from "../../_components/Title";

export default function NewEpiPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
    <div className="min-h-screen flex bg-gray-50">
      {/* Conteúdo principal */}
      <main className="flex-1 py-4 px-8 text-gray-800">
        <div className="flex justify-between items-center mb-6">
          <Title>Novo Exame</Title>
          {/* Botão para retornar para a lista de exames */}
          <Link href="/exames">
            <Button
              variant="default"
              className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80 border-gray-300 shadow-sm rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <GrReturn className="h-4 w-4" aria-hidden="true" />
              Voltar
            </Button>
          </Link>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p>Preencha o formulário para cadastrar um novo exame.</p>
          <ExamForm />
        </div>
      </main>
    </div>
    </div>
  );
}
