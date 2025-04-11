import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = params;

    const employee = await db.employee.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!employee) {
      return NextResponse.json({ message: "Funcionário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Erro ao buscar funcionário:", error);
    return NextResponse.json({ message: "Erro ao buscar funcionário" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();

    // Verifica se o funcionário pertence ao usuário
    const existing = await db.employee.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!existing) {
      return NextResponse.json({ message: "Funcionário não encontrado" }, { status: 404 });
    }

    const updated = await db.employee.update({
      where: { id: Number(id) },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar funcionário:", error);
    return NextResponse.json({ message: "Erro ao atualizar funcionário" }, { status: 500 });
  }
}
