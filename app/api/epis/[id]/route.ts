import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  const { id } = params;

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const epi = await db.epi.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!epi) {
      return NextResponse.json({ message: "EPI não encontrado ou não pertence ao usuário" }, { status: 404 });
    }

    return NextResponse.json(epi);
  } catch (error) {
    console.error("Erro ao buscar EPI:", error);
    return NextResponse.json({ message: "Erro ao buscar EPI" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  const { id } = params;

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();

  try {
    // Verifica se o EPI pertence ao usuário
    const existingEpi = await db.epi.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!existingEpi) {
      return NextResponse.json({ message: "EPI não encontrado ou não pertence ao usuário" }, { status: 404 });
    }

    const updated = await db.epi.update({
      where: { id: Number(id) },
      data: {
        ...body,
        expiration: new Date(body.expiration),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar EPI:", error);
    return NextResponse.json({ message: "Erro ao atualizar EPI" }, { status: 500 });
  }
}
