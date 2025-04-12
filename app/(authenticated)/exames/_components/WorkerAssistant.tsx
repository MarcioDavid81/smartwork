"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Bot, Send } from "lucide-react";

export function WorkerAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSend() {
    setLoading(true);
    setResponse("Worker está pensando...");

    // Aqui futuramente chamamos a API do Gemini
    setTimeout(() => {
      setResponse(
        "Você tem 3 exames vencendo em breve:\n\n- João Silva: Hemograma (vence em 22/04/2025)\n- Ana Paula: Audiometria (vence em 26/04/2025)\n- Carlos Mendes: Espirometria (vence em 29/04/2025)\n\nSugestão: Agendar exames nos próximos 10 dias."
      );
      setLoading(false);
    }, 3000);
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
