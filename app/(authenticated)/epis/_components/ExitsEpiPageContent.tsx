"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GrReturn } from "react-icons/gr";
import EpiExitHistory from "../_components/EpiExitHistory";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { EpiExit } from "@/app/types";
import { toast } from "sonner";
import { FileText } from "lucide-react";
import { Title } from "../../_components/Title";

export default function ExitsEpiPageContent() {
  const [localExits, setLocalExits] = useState<EpiExit[]>([]);

  useEffect(() => {
    async function fetchExits() {
      const res = await fetch("/api/epis/saidas");
      const data = await res.json();
      setLocalExits(data);
    }

    fetchExits();
  }, []);

  const generatePDFReport = async () => {
    if (!localExits || localExits.length === 0) {
      toast("Nenhum dado para gerar o relatório.", {
        style: {
          backgroundColor: "#b5b800",
          color: "black",
        },
        icon: "⚠️",
      });
      return;
    }

    const doc = new jsPDF();

    const getImageBase64 = async (url: string) => {
      const res = await fetch(url);
      const blob = await res.blob();
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    };

    try {
      const logoBase64 = await getImageBase64("/logo.png");
      doc.addImage(logoBase64, "PNG", 14, 10, 50, 20);
    } catch (err) {
      console.warn("Erro ao carregar o logo:", err);
    }

    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text("Relatório de Saídas de EPIs", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    let startY = 32;

    autoTable(doc, {
      startY: startY + 4,
      head: [["Funcionário", "EPI", "Quantidade", "Data"]],
      body: localExits.map((exit) => [
        exit.employee.name,
        exit.epi.name,
        String(exit.quantity),
        new Date(exit.date).toLocaleDateString("pt-BR"),
      ]),
      headStyles: {
        fillColor: [120, 180, 154],
        textColor: 255,
        halign: "left",
        fontStyle: "bold",
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      bodyStyles: {
        halign: "left",
      },
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Página ${i} de ${pageCount}`, 10, 290);
      doc.text(
        `Gerado em: ${new Date().toLocaleDateString(
          "pt-BR"
        )} - Sistema Smart Work`,
        150,
        290,
        { align: "center" }
      );
    }

    const fileName = `Relatório de Saídas de EPIs - ${Date.now()}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <div className="min-h-screen flex bg-gray-50">
        <main className="flex-1 py-4 px-8 text-gray-800">
          <div className="flex justify-between items-center mb-6">
            <Title>Saídas de EPIs</Title>
            <div className="flex gap-4">
              <Button
                onClick={generatePDFReport}
                className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80 border-gray-300 shadow-sm rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Gerar PDF
              </Button>
              <Link href="/epis">
                <Button className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80 border-gray-300 shadow-sm rounded-lg px-4 py-2 flex items-center gap-2">
                  <GrReturn className="h-4 w-4" />
                  Voltar
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="mb-4">Selecione para visualizar as saídas</p>
            <EpiExitHistory onDataChange={setLocalExits} />
          </div>
        </main>
      </div>
    </div>
  );
}
