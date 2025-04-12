"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import { Epi } from "@/app/types";

interface ActionsDropdownMenuProps {
  epi: Epi;
  onEdit: (epi: Epi) => void;
  onEntry: (epi: Epi) => void;
  onExit: (epi: Epi) => void;
}

export function ActionsDropdownMenu({
  epi,
  onEdit,
  onEntry,
  onExit,
}: ActionsDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações em {epi.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit(epi)}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEntry(epi)}>
          <ArrowDownCircle className="mr-2 h-4 w-4" />
          Entrada
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExit(epi)}>
          <ArrowUpCircle className="mr-2 h-4 w-4" />
          Saída
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
