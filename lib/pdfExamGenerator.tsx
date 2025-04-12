import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toZonedTime, format, formatInTimeZone } from "date-fns-tz";

interface Exam {
  employee: {
    name: string;
  };
  type: string;
  date: string;
  expiration: string;
  result?: string;
}

interface ExamReportFilters {
  employeeId?: string;
  startDate?: string;
  endDate?: string;
}

export async function generateExamReport(filters: ExamReportFilters) {
  const timeZone = "America/Sao_Paulo";

  try {
    const query = new URLSearchParams(filters as any).toString();
    const res = await fetch(`/api/exames?${query}`);

    if (!res.ok) throw new Error("Erro ao buscar exames");
    const exams: Exam[] = await res.json();

    const doc = new jsPDF();

    // Logo
    const logo = await fetch("/logo.png").then(res => res.blob());
    const reader = new FileReader();

    reader.onloadend = () => {
      const logoBase64 = reader.result as string;
      doc.addImage(logoBase64, "PNG", 14, 10, 50, 20);

      // Título
      doc.setFontSize(16);
      doc.setTextColor(100);
      doc.text("Relatório de Exames", 105, 20, { align: "center" });

      // Filtros aplicados
      let y = 32;
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Filtrado por:", 14, y);
      y += 6;

      if (filters.employeeId) {
        const selected = exams[0]?.employee.name ?? "(Funcionário)";
        doc.text(`• Funcionário: ${selected}`, 14, y);
        y += 6;
      }

      if (filters.startDate) {
        const formatted = formatInTimeZone(filters.startDate, timeZone, "dd/MM/yyyy");
        doc.text(`• Início: ${formatted}`, 14, y);
        y += 6;
      }

      if (filters.endDate) {
        const formatted = formatInTimeZone(filters.endDate, timeZone, "dd/MM/yyyy");
        doc.text(`• Fim: ${formatted}`, 14, y);
        y += 6;
      }

      // Tabela
      autoTable(doc, {
        startY: y + 4,
        head: [["Funcionário", "Tipo", "Data", "Validade", "Resultado"]],
        body: exams.map((exam) => {
          const date = format(toZonedTime(exam.date, timeZone), "dd/MM/yyyy", { timeZone });
          const expiration = format(toZonedTime(exam.expiration, timeZone), "dd/MM/yyyy", { timeZone });

          return [
            exam.employee.name,
            exam.type,
            date,
            expiration,
            exam.result || "N/A"
          ];
        }),
        styles: {
          fontSize: 10,
        },
        headStyles: {
          fillColor: [120, 180, 154],
        },
        didDrawPage: (data) => {
          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height || pageSize.getHeight();
          const pageWidth = pageSize.width || pageSize.getWidth();
          const pageNumber = doc.getCurrentPageInfo();

          doc.setFontSize(10);
          doc.setTextColor(150);

          doc.text(
            `Página ${pageNumber.pageNumber}`,
            data.settings.margin.left,
            pageHeight - 10
          );

          const date = format(new Date(), "dd/MM/yyyy", { timeZone });
          doc.text(
            `Gerado em: ${date} - Sistema Smart Work`,
            pageWidth / 2,
            pageHeight - 10,
            { align: "center" }
          );
        },
      });

      // Nome do arquivo
      const fileNumber = new Date().getTime();
      const fileName = `Relatorio de Exames - ${fileNumber}.pdf`;
      doc.save(fileName);
    };

    reader.readAsDataURL(logo);
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    alert("Erro ao gerar o relatório.");
  }
}
