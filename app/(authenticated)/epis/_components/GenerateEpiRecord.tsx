import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";

// Converte imagem em base64
async function getBase64ImageFromUrl(imageUrl: string): Promise<string> {
  const res = await fetch(imageUrl);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateEpiSheetPDF(data: any) {
  const doc = new jsPDF({ orientation: "landscape" });

  const {
    employee: { name, id, admission, function: role, departament },
    epiExits,
  } = data;

  const admissionDate = dayjs(admission).format("DD/MM/YYYY");
  const currentDate = dayjs().format("DD/MM/YYYY HH:mm");
  const primaryColor = "#78b49a";

  // 🖼️ Logo da pasta public
  const logoBase64 = await getBase64ImageFromUrl("/logo.png");
  doc.addImage(logoBase64, "PNG", 14, 10, 50, 20);

  // Cabeçalho
  doc.setFontSize(16);
  doc.setTextColor(100);
  doc.text("FICHA DE CONTROLE E ENTREGA DE EPI", 150, 20, { align: "center" });

  // Dados do funcionário
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(`NOME: ${name}`, 10, 40);
  doc.text(`Nº DE REGISTRO: ${id}`, 200, 40);
  doc.text(`FUNÇÃO: ${role}`, 10, 47);
  doc.text(`SEÇÃO: ${departament}`, 100, 47);
  doc.text(`DATA ADMISSÃO: ${admissionDate}`, 200, 47);

  // Declaração
  doc.setFontSize(10);
  doc.text("Confirmo que recebi os EPI’s (Equipamentos de proteção Individual) para meu uso obrigatório, observando as recomendações da NR 06.", 10, 60);
  doc.setFont("helvetica", "bold");
  doc.text("Declaro estar ciente de que terei que devolvê-los caso ocorra meu desligamento da empresa.", 10, 70);
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold");
  doc.text("DATA: ________/________/________    ASSINATURA DO FUNCIONÁRIO _________________________________", 10, 78);

  // Tabela
  autoTable(doc, {
    startY: 90,
    head: [["DATA", "QUANT.", "UNID.", "DESCRIÇÃO DO EQUIPAMENTO", "N° DO C.A.", "ASSINATURA"]],
    body: epiExits.map((exit: any) => [
      dayjs(exit.date).format("DD/MM/YYYY"),
      exit.quantity,
      "UN",
      exit.epi.name,
      exit.epi.certification,
      "",
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [120, 180, 154],
    },
    theme: "grid",
    margin: { left: 10, right: 10 },
    didDrawPage: () => {
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Gerado em ${currentDate} - Sistema Smart Work`,
        10,
        pageHeight - 10
      );
      const pageNumber = doc.getCurrentPageInfo();
      doc.text(
        `Página ${pageNumber.pageNumber}`,
        280,
        pageHeight - 10,
        { align: "right" }
      );
    },
  });

  doc.save(`Ficha de EPI ${name.replace(/\s/g, " ").toUpperCase()}.pdf`);
}
