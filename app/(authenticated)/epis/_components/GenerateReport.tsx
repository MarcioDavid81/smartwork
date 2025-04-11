import { EpiExit } from "@/app/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import { toast } from "sonner";

export const GenerateReport = async () => {
    const [localExits, setLocalExits] = useState<EpiExit[]>([]);

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
  
      // Carregar logo
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
        doc.addImage(logoBase64, "PNG", 14, 10, 50, 20); // logo no topo esquerdo
      } catch (err) {
        console.warn("Erro ao carregar o logo:", err);
      }
  
      // Título
      doc.setFontSize(16);
      doc.setTextColor(100);
      doc.text("Relatório de Saídas de EPIs", 105, 20, { align: "center" });
  
      // Filtros aplicados (se houver)
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      let startY = 32;
  
      // Tabela
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
  
      // Rodapé
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
  
      const fileNumber = new Date().getTime(); // Número do arquivo baseado no timestamp
      const fileName = `Relatório de Saídas de EPIs - ${fileNumber}.pdf`;
      doc.save(fileName);
}
