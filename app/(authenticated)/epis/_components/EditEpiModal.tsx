'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Epi } from "../../../types";
import { formatDateToInput } from "@/utils";

interface EditEpiModalProps {
  epi: Epi;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export function EditEpiModal({ isOpen, onClose, epi, onUpdated }: EditEpiModalProps) {
  const [form, setForm] = useState<Epi | null>(null);

  useEffect(() => {
    if (epi) {
      setForm({
        ...epi,
        expiration: formatDateToInput(epi.expiration),
      });
    }
  }, [epi]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!form) return;

    const response = await fetch(`/api/epis/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      toast("EPI atualizado com sucesso!", {
        style: {
          backgroundColor: "#78b49a",
          color: "white",
        },
        icon: "✅",
      });
      onUpdated();
      onClose();
    } else {
      toast("Erro ao atualizar o EPI.", {
        style: {
          backgroundColor: "#f87171",
          color: "white",
        },
        icon: "❌",
      });
    }
  };

  if (!form) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar EPI</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Nome" />
          <Input name="description" value={form.description} onChange={handleChange} placeholder="Descrição" />
          <Input name="certification" value={form.certification} onChange={handleChange} placeholder="CA" />
          <Input name="supplier" value={form.supplier} onChange={handleChange} placeholder="Fornecedor" />
          <Input name="expiration" type="date" value={form.expiration} onChange={handleChange} />
          <Input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Estoque" />
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleUpdate} className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80">Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
