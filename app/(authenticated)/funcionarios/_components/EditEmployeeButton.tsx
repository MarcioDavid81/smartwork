"use client";

import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface EditEmployeeButtonProps {
  onClick: () => void;
}

export function EditEmployeeButton({ onClick }: EditEmployeeButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className="hover:opacity-80 transition"
          >
            <Pencil size={20} className="text-[#78b49a]" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Editar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
