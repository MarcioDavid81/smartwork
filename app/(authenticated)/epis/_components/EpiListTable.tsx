"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaSpinner } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  ArrowDownCircle,
  ArrowUpCircle,
  MoreHorizontal,
} from "lucide-react";
import { EditEpiModal } from "./EditEpiModal";
import { EntryEpiModal } from "./EntryEpiModal";
import { ExitEpiModal } from "./ExitEpiModal";
import { Epi } from "../../../types";

import { Subtitle } from "../../_components/Subtitle";
import { Employee } from "@prisma/client";

export default function EpisListTable() {
  const [epis, setEpis] = useState<Epi[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [employeesList, setEmployeesList] = useState<Employee[]>([]);
  const [selectedEpi, setSelectedEpi] = useState<Epi | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEntryModal, setOpenEntryModal] = useState(false);
  const [openExitModal, setOpenExitModal] = useState(false);

  function handleEdit(epi: Epi) {
    setSelectedEpi(epi);
    setOpenEditModal(true);
  }

  function handleEntry(epi: Epi) {
    setSelectedEpi(epi);
    setOpenEntryModal(true);
  }

  function handleExit(epi: Epi) {
    setSelectedEpi(epi);
    setOpenExitModal(true);
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("/api/funcionarios");
      const data = await res.json();
      setEmployeesList(data);
    };

    fetchEmployees();
  }, []);

  async function fetchEpis() {
    try {
      const res = await fetch("/api/epis");
      const data = await res.json();
      setEpis(data);
    } catch (error) {
      console.error("Erro ao buscar Epi's:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEpis();
  }, []);

  const filteredEpis = epis.filter(
    (epi) =>
      epi.name.toLowerCase().includes(search.toLowerCase()) &&
      (showOnlyActive ? epi.expiration === "Ativo" : true)
  );

  const totalPages = Math.ceil(filteredEpis.length / itemsPerPage);
  const paginatedEpis = filteredEpis.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <Subtitle>Lista de EPI's</Subtitle>
        <Input
          type="text"
          placeholder="Buscar por nome..."
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
                <th className="p-2 text-left border-b">Nome</th>
                <th className="p-2 text-left border-b">CA</th>
                <th className="p-2 text-left border-b">Fornecedor</th>
                <th className="p-2 text-left border-b">Validade</th>
                <th className="p-2 text-left border-b">Estoque</th>
                <th className="p-2 text-left border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEpis.map((epi) => (
                <tr key={epi.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{epi.name}</td>
                  <td className="p-2 border-b">{epi.certification}</td>
                  <td className="p-2 border-b">{epi.supplier}</td>
                  <td className="p-2 border-b">
                    {new Date(epi.expiration).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="p-2 border-b">{epi.quantity}</td>
                  <td className="p-2 border-b">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          Ações em {epi.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(epi)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEntry(epi)}>
                          <ArrowDownCircle className="mr-2 h-4 w-4" />
                          Entrada
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExit(epi)}>
                          <ArrowUpCircle className="mr-2 h-4 w-4" />
                          Saída
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Tabela responsiva para dispositivos móveis */}
          <div className="block md:hidden space-y-4 mt-4">
            {paginatedEpis.map((epi) => (
              <div
                key={epi.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col"
              >
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  Nome: {epi.name}
                </div>
                <div className="text-sm text-gray-700">
                  CA: {epi.certification}
                </div>
                <div className="text-sm text-gray-700">
                  Fornecedor: {epi.supplier}
                </div>
                <div className="text-sm text-gray-700">
                  Validade:
                  {new Date(epi.expiration).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
                <div className="text-sm text-gray-700">
                  Estoque: {epi.quantity}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Ações:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações em {epi.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(epi)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEntry(epi)}>
                        <ArrowDownCircle className="mr-2 h-4 w-4" />
                        Entrada
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExit(epi)}>
                        <ArrowUpCircle className="mr-2 h-4 w-4" />
                        Saída
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
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
              {!loading && epis.length === 0 && (
                <div>
                  <p className="text-sm md:text-md text-gray-500">
                    Nenhum epi encontrado
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Modais */}
          {openEditModal && selectedEpi && (
            <EditEpiModal
              isOpen={openEditModal}
              epi={selectedEpi}
              onClose={() => setOpenEditModal(false)}
              onUpdated={fetchEpis}
            />
          )}

          {openEntryModal && selectedEpi && (
            <EntryEpiModal
              isOpen={openEntryModal}
              epi={selectedEpi}
              onEntryAdded={fetchEpis}
              onClose={() => setOpenEntryModal(false)}
            />
          )}

          {openExitModal && selectedEpi && (
            <ExitEpiModal
              isOpen={openExitModal}
              onSaved={fetchEpis}
              employees={employeesList}
              epi={selectedEpi}
              onClose={() => setOpenExitModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
