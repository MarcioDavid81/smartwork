"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Bot, Send } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export function WorkerAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!question.trim()) return;

    setLoading(true);
    setResponse("Worker está analisando os dados...");

    try {
      // 1. Busca exames da API
      const resExams = await fetch("/api/exames");
      const exams = await resExams.json();

      if (!resExams.ok) {
        throw new Error("Erro ao buscar exames.");
      }

      // 2. Monta um contexto com os exames
      const context = exams
        .map(
          (exam: any) =>
            `Funcionário: ${exam.employee?.name}, Exame: ${exam.type}, Vencimento: ${format(
              new Date(exam.expiration),
              "dd/MM/yyyy"
            )}`
        )
        .join("\n");

      // 3. Envia para a rota interna /api/worker
      const res = await fetch("/api/worker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          context
        })
      });

      const data = await res.json();
      setResponse(data.text || "Worker não conseguiu uma resposta.");
    } catch (err) {
      console.error("Erro:", err);
      toast.error("Erro ao se comunicar com o Worker.");
      setResponse("Ocorreu um erro ao tentar consultar o Worker.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#78b49a] text-white hover:bg-[#78b49a]/80"
      >
        <Bot className="w-5 h-5" /> Pergunte ao Worker
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-[#78b49a]" /> Assistente Worker
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Ex: Quem tem exames vencendo esse mês?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={loading || !question.trim()}
                className="mt-2 w-full bg-[#78b49a] text-white hover:bg-[#78b49a]/80"
              >
                <Send className="w-4 h-4 mr-2" /> Perguntar
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Resposta do Worker:
              </label>
              <Textarea
                value={response}
                readOnly
                className="h-40 resize-none text-sm"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
