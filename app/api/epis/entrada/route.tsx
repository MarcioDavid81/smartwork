import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { epiId, quantity, note, supplier } = await req.json();

  if (!epiId || !quantity) {
    return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });
  }

  try {
    const epi = await db.epi.findFirst({
      where: {
        id: Number(epiId),
        userId,
      },
    });

    if (!epi) {
      return NextResponse.json({ message: "EPI não encontrado ou não pertence ao usuário" }, { status: 404 });
    }

    const updatedEpi = await db.epi.update({
      where: { id: Number(epiId) },
      data: {
        quantity: {
          increment: Number(quantity),
        },
      },
    });

    // Registra entrada (opcional, mas importante pra histórico)
    await db.epiEntry.create({
      data: {
        epiId: Number(epiId),
        quantity: Number(quantity),
        note,
        supplier,
        userId,
      },
    });

    return NextResponse.json(updatedEpi, { status: 200 });
  } catch (error) {
    console.error("Erro ao registrar entrada de EPI:", error);
    return NextResponse.json({ message: "Erro interno ao registrar entrada" }, { status: 500 });
  }
}
