"use client";

import { Button } from "@/components/ui/button";
import { FaFilePdf } from "react-icons/fa";
import { toast } from "sonner";
import { useState } from "react";
import { generateEpiSheetPDF } from "../../epis/_components/GenerateEpiRecord";

interface GenerateEpiSheetButtonProps {
  employeeId: number;
}

export function GenerateEpiSheetButton({
  employeeId,
}: GenerateEpiSheetButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleGenerateFicha() {
    setLoading(true);
    toast("Gerando ficha...", {
      style: {
        backgroundColor: "#78b49a",
        color: "white",
      },
      icon: "📄",
    });

    try {
      const res = await fetch(`/api/epis/saida/${employeeId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Erro ao buscar saídas");
      }

      generateEpiSheetPDF(data);
      toast("Ficha gerada com sucesso!", {
        style: {
          backgroundColor: "#78b49a",
          color: "white",
        },
        icon: "✅",
      });
    } catch (err) {
      console.error(err);
      toast("Este funcionário ainda não possui registro de retirada de EPIs", {
        style: {
          backgroundColor: "#f87171",
          color: "white",
        },
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80 border-gray-300 shadow-sm rounded-lg px-4 py-2 flex items-center gap-2"
      onClick={handleGenerateFicha}
      disabled={loading}
    >
      <FaFilePdf className="w-4 h-4" />
      {loading ? "Gerando..." : "Ficha de EPI"}
    </Button>
  );
}
