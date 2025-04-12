"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Subtitle } from "../../_components/Subtitle";
import { generateEmployeeReport } from "@/lib/pdfGenerator";
import { EditEmployeeButton } from "./EditEmployeeButton";
import { GenerateReportModal, ReportFilters } from "./generateReportModal";
import { EditEmployeeModal } from "./editEmployeeModal";

interface Employee {
  id: number;
  name: string;
  phone: string;
  department: string;
  employer: string;
  status: string;
}

export default function EmployeesListTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showOnlyActive, setShowOnlyActive] = useState(true);

  function handleGenerateReport(filters: ReportFilters) {
    generateEmployeeReport(filters);
  }

  async function fetchEmployees() {
    setLoading(true);
    try {
      const res = await fetch("/api/funcionarios");

      if (!res.ok) {
        if (res.status === 401) {
          console.warn("Sessão expirada ou não autenticada.");
          return;
        }
        throw new Error("Erro ao buscar funcionários");
      }

      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  function handleOpenEditModal(employee: Employee) {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      (showOnlyActive ? emp.status === "Ativo" : true)
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <Subtitle>Funcionários</Subtitle>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Label htmlFor="status-switch">
            {showOnlyActive ? "Ativos" : "Todos"}
          </Label>
          <Switch
            id="status-switch"
            checked={showOnlyActive}
            onCheckedChange={(checked) => setShowOnlyActive(checked)}
          />
        </div>
        <div className="w-full md:w-auto">
          <Input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm"
          />
        </div>
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
                <th className="p-2 text-left border-b">Nome</th>
                <th className="p-2 text-left border-b">Telefone</th>
                <th className="p-2 text-left border-b">Setor</th>
                <th className="p-2 text-left border-b">Empregador</th>
                <th className="p-2 text-left border-b">Status</th>
                <th className="p-2 text-left border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{emp.name}</td>
                  <td className="p-2 border-b">{emp.phone}</td>
                  <td className="p-2 border-b">{emp.department}</td>
                  <td className="p-2 border-b">{emp.employer}</td>
                  <td className="p-2 border-b">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        emp.status === "Ativo"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-2 border-b">
                    {/* Botão de edição */}
                  <EditEmployeeButton onClick={() => handleOpenEditModal(emp)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Tabela responsiva para telas menores */}
          <div className="block md:hidden space-y-4 mt-4">
            {paginatedEmployees.map((emp) => (
              <div
                key={emp.id}
                className="border p-4 rounded-md shadow-sm bg-gray-50"
              >
                <div className="font-semibold text-lg">{emp.name}</div>
                <div className="text-sm text-gray-700">
                  Telefone: {emp.phone}
                </div>
                <div className="text-sm text-gray-700">
                  Setor: {emp.department}
                </div>
                <div className="text-sm text-gray-700">
                  Empregador: {emp.employer}
                </div>
                <div className="text-sm">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      emp.status === "Ativo"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenEditModal(emp)}
                  className="mt-2 text-[#78b49a] text-sm font-medium hover:underline"
                >
                  Editar
                </button>
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
              {!loading && employees.length === 0 && (
                <div>
                  <p  className="text-sm md:text-md text-gray-500">Nenhum funcionário encontrado</p>
                </div>
              )}
            </div>
          </div>
          {/* Modais */}
          <GenerateReportModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            onGenerate={handleGenerateReport}
          />
          <EditEmployeeModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            employee={selectedEmployee}
            onUpdate={fetchEmployees}
          />
        </>
      )}
    </div>
  );
}
