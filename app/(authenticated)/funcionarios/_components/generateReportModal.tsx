"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (filters: ReportFilters) => void;
}

export interface ReportFilters {
  employer?: string;
  department?: string;
  admission?: string;
}

export function GenerateReportModal({
  isOpen,
  onClose,
  onGenerate,
}: GenerateReportModalProps) {
  const [filters, setFilters] = useState<ReportFilters>({
    employer: "",
    department: "",
    admission: "",
  });

  function handleChange(name: string, value: string) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleGenerate() {
    onGenerate(filters);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerar Relatório de Funcionários</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Empregador</label>
            <Select onValueChange={(value) => handleChange("employer", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o empregador" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Glênio">Glênio</SelectItem>
                <SelectItem value="Guilhermo">Guilhermo</SelectItem>
                <SelectItem value="Vagner">Vagner</SelectItem>
                <SelectItem value="Valmor">Valmor</SelectItem>
                <SelectItem value="Werner">Werner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Setor</label>
            <Select
              onValueChange={(value) => handleChange("department", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pinheirinhos">Pinheirinhos</SelectItem>
                <SelectItem value="Unidade">Unidade</SelectItem>
                <SelectItem value="Guajuvira">Guajuvira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Admissão Após
            </label>
            <Input
              type="date"
              onChange={(e) => handleChange("admission", e.target.value)}
            />
          </div>

          <Button
            onClick={handleGenerate}
            className="mt-2 bg-[#78b49a] text-white hover:bg-[#78b49a]/80"
          >
            Gerar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
