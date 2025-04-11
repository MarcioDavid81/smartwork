import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const exames = await db.medicalExam.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        employee: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(exames);
  } catch (error) {
    console.error("Erro ao buscar exames:", error);
    return NextResponse.json({ error: "Erro ao buscar exames" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { date, type, result, expiration, employeeId } = await req.json();

    const exame = await db.medicalExam.create({
      data: {
        date: new Date(date),
        type,
        result,
        expiration: new Date(expiration),
        employeeId,
        userId,
      },
    });

    return NextResponse.json(exame, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar exame:", error);
    return NextResponse.json({ error: "Erro ao criar exame" }, { status: 500 });
  }
}
