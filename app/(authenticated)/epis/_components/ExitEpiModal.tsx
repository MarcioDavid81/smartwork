'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { type Employee as EmployeeFull, Epi } from "../../../types";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Employee = Pick<EmployeeFull, "id" | "name">;

interface EpiExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  epi: Epi;
  employees: Employee[];
  onSaved: () => void;
}

export function ExitEpiModal({ isOpen, onClose, epi, employees, onSaved }: EpiExitModalProps) {
  const [employeeId, setEmployeeId] = useState("");
  const [exitQuantity, setExitQuantity] = useState(1);

  useEffect(() => {
    if (epi) {
      setEmployeeId("");
      setExitQuantity(1);
    }
  }, [epi]);

  const handleSave = async () => {
    if (!employeeId) {
      toast("Selecione um funcionário.", {
        style: {
            backgroundColor: "#f87171",
            color: "white",
          },
        icon: "❌",
    });
      return;
    }
    if (!exitQuantity || isNaN(Number(exitQuantity))) {
      toast("Informe uma quantidade válida.", {
        style: {
            backgroundColor: "#f87171",
            color: "white",
          },
        icon: "❌",
    });
      return;
    }

    const response = await fetch("/api/epis/saida", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        epiId: epi.id,
        quantity: Number(exitQuantity),
        employeeId: Number(employeeId),
      }),
      });
      if (response.ok) {
        toast("Parabéns! Saída registrada com sucesso.", {
          style: {
              backgroundColor: "#78b49a",
              color: "white",
          },
          icon: "✅",
      });
        onSaved();
        onClose();
        setExitQuantity(0);
      } else {
        const data = await response.json();
        toast(data.message || "Erro ao registrar saída de EPI.", {
          style: {
              backgroundColor: "#f87171",
              color: "white",
            },
          icon: "❌",
      });
      }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Registrar saída de ${epi.name}`}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Funcionário</Label>
            <Select value={employeeId} onValueChange={(value) => setEmployeeId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o funcionário" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={String(emp.id)}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Quantidade</Label>
            <Input
              type="number"
              min={1}
              max={epi.quantity}
              value={exitQuantity}
              onChange={(e) => setExitQuantity(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleSave} className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80">
            Registrar saída
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
