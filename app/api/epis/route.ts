import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const epis = await db.epi.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(epis);
  } catch (error) {
    console.error('Erro ao buscar EPIs:', error);
    return NextResponse.json({ error: 'Erro ao buscar EPIs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const {
      name,
      description,
      certification,
      supplier,
      expiration,
      quantity
    } = body;

    if (!name || !description || !certification || !supplier || !expiration || quantity === undefined) {
      return NextResponse.json({ error: "Dados obrigatórios faltando" }, { status: 400 });
    }

    const epi = await db.epi.create({
      data: {
        userId,
        name,
        description,
        certification,
        supplier,
        expiration: new Date(expiration),
        quantity: Number(quantity),
      },
    });

    return NextResponse.json(epi, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar EPI:", error);
    return NextResponse.json({ error: "Erro ao cadastrar EPI" }, { status: 500 });
  }
}
