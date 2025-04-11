import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import { toZonedTime, format, formatInTimeZone } from "date-fns-tz";

interface Employee {
  name: string;
  phone: string;
  department: string;
  employer: string;
  admission: string;
  status: string;
}

interface ReportFilters {
  employer?: string;
  department?: string;
  admission?: string;
}

export async function generateEmployeeReport(filters: ReportFilters) {
  const timeZone = "America/Sao_Paulo"; // Fuso horário do Brasil

  try {
    // 1. Buscar os dados com filtros
    const query = new URLSearchParams(filters as any).toString();
    const res = await fetch(`/api/funcionarios?${query}`);

    if (!res.ok) throw new Error("Erro ao buscar funcionários");
    const employees: Employee[] = await res.json();

    // 2. Criar documento
    const doc = new jsPDF();

    // 3. Carregar logotipo (base64)
    const logo = await fetch("/logo.png").then(res => res.blob());
    const reader = new FileReader();

    reader.onloadend = () => {
      const logoBase64 = reader.result as string;

      // 4. Adicionar logotipo
      doc.addImage(logoBase64, "PNG", 14, 10, 50, 20); // x, y, largura, altura

      // 5. Título
      doc.setFontSize(16);
      doc.setTextColor(100);
      doc.text("Relatório de Funcionários", 105, 20, { align: "center" });

      // 6. Filtros aplicados
      let y = 32;
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Filtrado por:", 14, y);
      y += 6;

      if (filters.employer) {
        doc.text(`• Empregador: ${filters.employer}`, 14, y);
        y += 6;
      }
      if (filters.department) {
        doc.text(`• Setor: ${filters.department}`, 14, y);
        y += 6;
      }
      if (filters.admission) {
        const formattedFilterDate = formatInTimeZone(
          filters.admission,
          timeZone,
          "dd/MM/yyyy"
        );
        doc.text(`• Admissão após: ${formattedFilterDate}`, 14, y);
        y += 6;
      }

      // 7. Tabela
      autoTable(doc, {
        startY: y + 4,
        head: [["Nome", "Telefone", "Setor", "Empregador", "Admissão", "Status"]],
        body: employees.map((emp) => {
          const zoned = toZonedTime(emp.admission, timeZone);
          const formattedDate = format(zoned, "dd/MM/yyyy", { timeZone });

          return [
            emp.name,
            emp.phone,
            emp.department,
            emp.employer,
            formattedDate,
            emp.status,
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
        }
        
      });

      // 8. Salvar
      const fileNumber = new Date().getTime(); // Número do arquivo baseado no timestamp
      const fileName = `Relatorio de Funcionarios - ${fileNumber}.pdf`;
      doc.save(fileName);
    };

    reader.readAsDataURL(logo);
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    alert("Erro ao gerar o relatório.");
  }
}
