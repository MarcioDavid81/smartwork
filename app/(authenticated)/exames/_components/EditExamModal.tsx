"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MedicalExam } from "@/app/types";
import { format } from "date-fns";

interface EditExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: MedicalExam | null;
  onUpdate: () => void;
}

export function EditExamModal({ isOpen, onClose, exam, onUpdate }: EditExamModalProps) {

  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (exam) {
      setFormData({
        ...exam,
        expiration: format(new Date(exam.expiration), "yyyy-MM-dd"),
      });
    }
  }, [exam]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/exames/${exam?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formData.type,
          result: formData.result,
          expiration: formData.expiration,
        })
      });

      if (!res.ok) {
        toast("Erro ao atualizar exame", {
            style: {
                backgroundColor: "#f87171",
                color: "white",
              },
            icon: "❌",
        });
        return;
      }

      toast("Exame atualizado com sucesso!", {
        style: {
            backgroundColor: "#78b49a",
            color: "white",
        },
        icon: "✅",
    });
      onUpdate(); // Atualiza a lista
      onClose();  // Fecha modal
    } catch (err) {
      toast("Erro inesperado ao atualizar exame", {
            style: {
                backgroundColor: "#f87171",
                color: "white",
              },
            icon: "❌",
        });
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Exame</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
          <Input name="type" value={formData?.type || ""} onChange={handleChange} placeholder="Tipo" />
          <Input name="result" value={formData?.result || ""} onChange={handleChange} placeholder="Resultado" />
          <Input type="date" name="expiration" value={formData?.expiration || ""} onChange={handleChange} placeholder="Vencimento" />
          <Button className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80" type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
