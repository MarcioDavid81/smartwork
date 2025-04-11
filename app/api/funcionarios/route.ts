import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { Department, Employer } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const employer = searchParams.get("employer") as Employer | null;
    const department = searchParams.get("department") as Department | null;
    const admissionDate = searchParams.get("admissionDate");

    const colaboradores = await db.employee.findMany({
      where: {
        userId,
        ...(employer && { employer }),
        ...(department && { department }),
        ...(admissionDate && {
          admission: {
            gte: new Date(admissionDate),
          },
        }),
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(colaboradores);
  } catch (error) {
    console.error("Erro ao buscar colaboradores:", error);
    return NextResponse.json(
      { message: "Erro ao buscar colaboradores" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();

    const colaborador = await db.employee.create({
      data: {
        userId,
        name: body.name,
        adress: body.adress,
        city: body.city,
        email: body.email,
        phone: body.phone,
        birthDate: new Date(body.birthDate),
        admission: new Date(body.admission),
        cpf: body.cpf,
        rg: body.rg,
        employer: body.employer,
        department: body.department,
        function: body.function,
        status: body.status,
      },
    });

    return NextResponse.json(colaborador, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar colaborador:', error);
    return NextResponse.json({ message: 'Erro ao cadastrar' }, { status: 500 });
  }
}
