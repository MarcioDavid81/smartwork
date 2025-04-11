"use client";

import { useEffect, useState } from "react";
import { Epi, Employee, EpiExit } from "../../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SearchCheck } from "lucide-react";

// Tipo com relacionamentos carregados
type EpiExitWithRelations = EpiExit & {
  employee: Employee;
  epi: Epi;
};

interface EpiExitHistoryProps {
  onDataChange: (data: EpiExitWithRelations[]) => void;
}

export default function EpiExitHistory({ onDataChange }: EpiExitHistoryProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [epis, setEpis] = useState<Epi[]>([]);
  const [employeeId, setEmployeeId] = useState("all");
  const [epiId, setEpiId] = useState("all");
  const [exits, setExits] = useState<EpiExitWithRelations[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [empRes, epiRes] = await Promise.all([
          fetch("/api/funcionarios"),
          fetch("/api/epis"),
        ]);

        const [employeesData, episData] = await Promise.all([
          empRes.json(),
          epiRes.json(),
        ]);

        setEmployees(employeesData);
        setEpis(episData);
      } catch (err) {
        console.error(err);
        toast("Erro ao carregar funcionários ou EPIs.", {
          style: {
              backgroundColor: "#f87171",
              color: "white",
            },
          icon: "❌",
      });
      }
    };

    loadData();
  }, []);

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (employeeId != "all") params.append("employeeId", employeeId);
      if (epiId != "all") params.append("epiId", epiId);

      const res = await fetch(`/api/epis/saida?${params.toString()}`);
      if (!res.ok) throw new Error("Erro ao buscar saídas.");

      const data: EpiExitWithRelations[] = await res.json();
      setExits(data);
      if (typeof onDataChange === "function") {
        onDataChange(data);
      } // <- envia os dados pro componente pai
    } catch (error) {
      console.error(error);
      toast("Falha ao buscar saídas.", {
        style: {
            backgroundColor: "#f87171",
            color: "white",
          },
        icon: "❌",
    });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 w-full flex-col md:flex-row justify-between md:justify-center items-start md:items-center mb-6">
        <div className="w-full ">
          <Label>Funcionário</Label>
          <Select value={employeeId} onValueChange={setEmployeeId}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os funcionários" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {employees.map((emp) => (
                <SelectItem key={emp.id} value={String(emp.id)}>
                  {emp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Label>EPI</Label>
          <Select value={epiId} onValueChange={setEpiId}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os EPIs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {epis.map((e) => (
                <SelectItem key={e.id} value={String(e.id)}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Label className="invisible md:visible text-white">-</Label>
          <Button
            onClick={handleSearch}
            className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80 border-gray-300 shadow-sm rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <SearchCheck className="w-4 h-4" />
            Buscar
          </Button>
        </div>
      </div>

      {/* Tabela de saídas */}
      <table className="w-full border border-gray-200 hidden md:table">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Funcionário</th>
            <th className="p-2 text-left">EPI</th>
            <th className="p-2 text-left">Quantidade</th>
            <th className="p-2 text-left">Data</th>
          </tr>
        </thead>
        <tbody>
          {exits.map((exit) => (
            <tr key={exit.id} className="border-t">
              <td className="p-2">{exit.employee?.name}</td>
              <td className="p-2">{exit.epi?.name}</td>
              <td className="p-2">{exit.quantity}</td>
              <td className="p-2">
                {new Date(exit.date).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Tabela responsiva para dispositivos móveis */}
      <div className="block md:hidden space-y-4 mt-4">
        {exits.map((exit) => (
          <div
            key={exit.id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2"
          >
            <div>
              <span className="font-bold">Funcionário:</span>{" "}
              {exit.employee?.name}
            </div>
            <div>
              <span className="font-bold">EPI:</span> {exit.epi?.name}
            </div>
            <div>
              <span className="font-bold">Quantidade:</span> {exit.quantity}
            </div>
            <div>
              <span className="font-bold">Data:</span>{" "}
              {new Date(exit.date).toLocaleDateString("pt-BR")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
