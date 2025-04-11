// /app/api/epis/saida/route.ts
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { epiId, employeeId, quantity } = await req.json();

    if (!epiId || !employeeId || !quantity) {
      return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });
    }

    const epi = await db.epi.findFirst({
      where: {
        id: epiId,
        userId,
      },
    });

    if (!epi) {
      return NextResponse.json({ message: "EPI não encontrado ou não pertence a este usuário" }, { status: 404 });
    }

    if (epi.quantity < quantity) {
      return NextResponse.json({ message: "Quantidade insuficiente em estoque" }, { status: 400 });
    }

    // Atualiza o estoque
    await db.epi.update({
      where: { id: epiId },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    // Registra a saída no histórico
    await db.epiExit.create({
      data: {
        epiId,
        employeeId,
        quantity,
        userId,
      },
    });

    return NextResponse.json({ message: "Saída registrada com sucesso" }, { status: 200 });

  } catch (error) {
    console.error("Erro ao registrar saída:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("employeeId");
  const epiId = searchParams.get("epiId");

  try {
    const filters: any = {
      userId,
    };

    if (employeeId) filters.employeeId = Number(employeeId);
    if (epiId) filters.epiId = Number(epiId);

    const exits = await db.epiExit.findMany({
      where: filters,
      include: {
        epi: true,
        employee: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(exits);
  } catch (error) {
    console.error("Erro ao buscar saídas de EPIs:", error);
    return NextResponse.json({ message: "Erro ao buscar saídas de EPIs" }, { status: 500 });
  }
}
