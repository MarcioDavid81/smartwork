"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { generateEmployeeReport } from "@/lib/pdfGenerator";
import { ReportFilters } from "../../funcionarios/_components/generateReportModal";
import { EditExamModal } from "./EditExamModal";
import { MedicalExam } from "@/app/types";
import { format } from "date-fns";
import { Subtitle } from "../../_components/Subtitle";
import { getExamStatus } from "@/utils";
import { GenerateExamReportModal } from "./GenerateReportModal";

export default function ExamListTable() {
  const [exams, setExams] = useState<MedicalExam[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<MedicalExam | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showOnlyActive, setShowOnlyActive] = useState(true);

  function handleGenerateReport(filters: ReportFilters) {
    generateEmployeeReport(filters);
  }

  async function fetchExams() {
    try {
      const res = await fetch("/api/exames");
      const data = await res.json();
      setExams(data);
    } catch (error) {
      console.error("Erro ao buscar exames:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  function handleOpenEditModal(employee: MedicalExam) {
    setSelectedExam(employee);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedExam(null);
  }

  const filteredExams = exams.filter((exm) =>
    exm.type.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
  const paginatedExams = filteredExams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <Subtitle> Últimos Exames</Subtitle>
        <Input
          type="text"
          placeholder="Buscar por exame..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <FaSpinner className="animate-spin mx-auto mb-2" size={24} />
          <p className="text-lg">Carregando...</p>
        </div>
      ) : (
        <>
          <table className="w-full border border-gray-200 hidden md:table">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left border-b">Tipo</th>
                <th className="p-2 text-left border-b">Funcionário</th>
                <th className="p-2 text-left border-b">Resultado</th>
                <th className="p-2 text-left border-b">Data</th>
                <th className="p-2 text-left border-b">Vencimento</th>
                <th className="p-2 text-left border-b">Status</th>
                <th className="p-2 text-left border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExams.map((exm) => (
                <tr key={exm.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{exm.type}</td>
                  <td className="p-2 border-b">{exm.employee?.name}</td>
                  <td className="p-2 border-b">{exm.result}</td>
                  <td className="p-2 border-b">
                    {format(new Date(exm.date), "dd/MM/yyyy")}
                  </td>
                  <td className="p-2 border-b">
                    {format(new Date(exm.expiration), "dd/MM/yyyy")}
                  </td>
                  <td className="p-2 border-b">
                    {(() => {
                      const status = getExamStatus(exm.expiration);
                      return (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${status.bg} ${status.text}`}
                        >
                          {status.label}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="p-2 border-b">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleOpenEditModal(exm)}
                            className="hover:opacity-80 transition"
                          >
                            <Pencil size={20} className="text-[#78b49a]" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Tabela responsiva para dispositivos móveis */}
          <div className="block md:hidden space-y-4 mt-4">
            {paginatedExams.map((exm) => (
              <div
                key={exm.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  Tipo: {exm.type}
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  Funcionário: {exm.employee?.name}
                </div>
                <div className="text-sm text-gray-700">
                  Resultado: {exm.result}
                </div>
                <div className="text-sm text-gray-700">
                  Data: {format(new Date(exm.date), "dd/MM/yyyy")}
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  Vencimento: {format(new Date(exm.expiration), "dd/MM/yyyy")}
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(exm)}
                    className="mt-2 text-[#78b49a] text-sm font-medium hover:underline"
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <Button
                className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80"
                onClick={() => setIsReportModalOpen(true)}
              >
                Gerar Relatório
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      currentPage === page
                        ? "bg-[#78b49a] text-white hover:bg-[#78b49a]/80"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              {!loading && exams.length === 0 && (
                <div>
                  <p className="text-sm md:text-md text-gray-500">
                    Nenhum exame encontrado
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Modais */}
          <EditExamModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            exam={selectedExam}
            onUpdate={fetchExams}
          />
          <GenerateExamReportModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
          />
        </>
      )}
    </div>
  );
}
