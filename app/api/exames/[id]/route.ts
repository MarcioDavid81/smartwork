import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  const { id } = params;

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const exame = await db.medicalExam.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!exame) {
      return NextResponse.json({ message: "Exame não encontrado" }, { status: 404 });
    }

    return NextResponse.json(exame);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar exame" }, { status: 500 });
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
    // Confirma se o exame é do usuário antes de atualizar
    const existingExam = await db.medicalExam.findFirst({
      where: { id: Number(id), userId },
    });

    if (!existingExam) {
      return NextResponse.json({ message: "Exame não encontrado" }, { status: 404 });
    }

    const updated = await db.medicalExam.update({
      where: { id: Number(id) },
      data: {
        ...body,
        expiration: new Date(body.expiration),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao atualizar exame" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  const { id } = params;

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const exame = await db.medicalExam.findFirst({
      where: { id: Number(id), userId },
    });

    if (!exame) {
      return NextResponse.json({ message: "Exame não encontrado" }, { status: 404 });
    }

    await db.medicalExam.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Exame deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao deletar exame" }, { status: 500 });
  }
}
