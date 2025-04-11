// app/epis/novo/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EpiForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    certification: "",
    supplier: "",
    expiration: "",
    quantity: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("/api/epis", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        toast("EPI cadastrado com sucesso!", {
          style: {
            background: "#78b49a",
            color: "white",
          }, 
          icon: "✅",
        });
        setForm({
          name: "",
          description: "",
          certification: "",
          supplier: "",
          expiration: "",
          quantity: 0,
        });
      } else {
        toast("Erro ao cadastrar EPI. Tente novamente.", {
          style: {
              backgroundColor: "#f87171",
              color: "white",
            },
          icon: "❌",
      });
      }
    } catch (error) {
      toast("Erro inesperado. Tente novamente.", {
        style: {
            backgroundColor: "#f87171",
            color: "white",
          },
        icon: "❌",
    });
    } finally {
      setIsSubmitting(false);
    }
  }
  

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Nome</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Descrição</Label>
          <Input
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>CA</Label>
          <Input
            name="certification"
            value={form.certification}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Fornecedor</Label>
          <Input
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Validade</Label>
          <Input
            type="date"
            name="expiration"
            value={form.expiration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Quantidade em estoque</Label>
          <Input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            min={0}
          />
        </div>
        <Button
          disabled={isSubmitting}
          className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80 border-gray-300 shadow-sm rounded-lg px-4 py-2 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </div>
  );
}
