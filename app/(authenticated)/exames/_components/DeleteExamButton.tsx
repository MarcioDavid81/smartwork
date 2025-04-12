"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface DeleteExamButtonProps {
  examId: number;
  onDeleteSuccess: () => void;
}

export function DeleteExamButton({ examId, onDeleteSuccess }: DeleteExamButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/exames/${examId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast("Erro ao deletar exame", {
          style: { backgroundColor: "#f87171", color: "white" },
          icon: "❌",
        });
        return;
      }

      toast("Exame deletado com sucesso", {
        style: { backgroundColor: "#78b49a", color: "white" },
        icon: "✅",
      });

      onDeleteSuccess();
      setIsOpen(false);
    } catch (error) {
      toast("Erro inesperado ao deletar", {
        style: { backgroundColor: "#f87171", color: "white" },
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsOpen(true)}
              className="hover:opacity-80 transition"
            >
              <Trash size={20} className="text-red-500" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível e excluirá o exame permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-gray-50 text-[#78b49a] hover:bg-gray-100 border border-[#78b49a]"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-[#78b49a] text-white hover:bg-[#78b49a]/80"
          >
            {loading ? "Excluindo..." : "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
