"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function EditExamModal({ isOpen, onClose, exam, onUpdate }: any) {

  const [formData, setFormData] = useState(exam || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(exam);
  }, [exam]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/exames/${exam.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

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
          <Input name="name" value={formData?.name || ""} onChange={handleChange} placeholder="Nome" />
          <Input name="phone" value={formData?.phone || ""} onChange={handleChange} placeholder="Telefone" />
          <Input name="department" value={formData?.department || ""} onChange={handleChange} placeholder="Setor" />
          <Input name="employer" value={formData?.employer || ""} onChange={handleChange} placeholder="Empregador" />
          <select name="status" value={formData?.status || "Ativo"} onChange={handleChange} className="border rounded px-3 py-2">
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>

          <Button className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80" type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
