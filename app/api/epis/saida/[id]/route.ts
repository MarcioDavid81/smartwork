import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const employeeId = Number(params.id);
  if (isNaN(employeeId)) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  try {
    const exits = await db.epiExit.findMany({
      where: {
        userId,
        employeeId,
      },
      include: {
        epi: true,
        employee: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (exits.length === 0) {
      return NextResponse.json({ message: "Nenhuma saída encontrada" }, { status: 404 });
    }

    const { employee } = exits[0];

    const formatted = {
      employee: {
        name: employee.name,
        id: employee.id,
        admission: employee.admission,
        function: employee.function,
        departament: employee.department,
      },
      epiExits: exits.map((exit) => ({
        date: exit.date,
        quantity: exit.quantity,
        epi: {
          name: exit.epi.name,
          certificationNumber: exit.epi.certification,
        },
      })),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Erro ao buscar ficha de EPI:", error);
    return NextResponse.json({ message: "Erro ao buscar ficha de EPI" }, { status: 500 });
  }
}
