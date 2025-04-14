import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";

export function generateEpiSheetPDF(data: any) {
  const doc = new jsPDF();

  const {
    employee: { name, id, admission, function: role, departament },
    epiExits,
  } = data;

  const admissionDate = dayjs(admission).format("DD/MM/YYYY");

  // Cabeçalho
  doc.setFontSize(12);
  doc.text("FICHA DE CONTROLE E ENTREGA DE EPI", 105, 15, { align: "center" });

  doc.setFontSize(10);
  doc.text(`NOME: ${name}`, 10, 30);
  doc.text(`Nº DE REGISTRO: ${id}`, 150, 30);

  doc.text(`FUNÇÃO: ${role}`, 10, 37);
  doc.text(`SEÇÃO: ${departament}`, 90, 37);

  doc.text(`DATA ADMISSÃO: ${admissionDate}`, 150, 37);

  // Declaração
  doc.setFontSize(9);
  doc.text("Confirmo que recebi os EPI’s (Equipamentos de proteção Individual) para meu uso obrigatório,", 10, 47);
  doc.text("observando as recomendações da NR 06.", 10, 52);
  doc.setFont("bold");
  doc.text("Declaro ciente que terei que devolvê-los caso ocorra meu desligamento da empresa.", 10, 57);
  doc.setFont("normal");
  doc.text("DATA: ________/________/________    ASSINATURA DO FUNCIONÁRIO _________________________________", 10, 65);

  // Tabela com EPIs entregues
  autoTable(doc, {
    head: [["DATA", "QUANT.", "UNID.", "DESCRIÇÃO DO EQUIPAMENTO", "N° DO C.A.", "ASSINATURA"]],
    body: epiExits.map((exit: any) => [
      dayjs(exit.date).format("DD/MM/YYYY"),
      exit.quantity,
      "UN", // Pode adaptar se tiver unidade no banco
      exit.epi.name,
      exit.epi.certification,
      "",
    ]),
    startY: 75,
    styles: {
      fontSize: 9,
    },
    theme: "grid",
  });

  doc.save(`Ficha de EPI ${name.replace(/\s/g, "_").toUpperCase()}.pdf`);
}
