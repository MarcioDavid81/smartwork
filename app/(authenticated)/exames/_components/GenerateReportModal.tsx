// components/GenerateExamReportModal.tsx
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateExamReport } from "@/lib/pdfExamGenerator";


interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface EmployeeOption {
  id: number;
  name: string;
}

export function GenerateExamReportModal({ isOpen, onClose }: Props) {
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [employeeId, setEmployeeId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchEmployees() {
      const res = await fetch("/api/funcionarios");
      const data = await res.json();
      setEmployees(data);
    }
    if (isOpen) fetchEmployees();
  }, [isOpen]);

  function handleGenerate() {
    setLoading(true);
    generateExamReport({ employeeId, startDate, endDate }).finally(() => {
      setLoading(false);
      onClose();
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerar Relatório de Exames</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Funcionário</Label>
            <Select onValueChange={(value) => setEmployeeId(value)} value={employeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Todos</SelectItem>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={String(emp.id)}>{emp.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label>Início</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="flex-1">
              <Label>Fim</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="mt-2 bg-[#78b49a] text-white hover:bg-[#78b49a]/80">
            {loading ? "Gerando..." : "Gerar PDF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
