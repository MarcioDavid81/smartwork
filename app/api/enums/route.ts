import { NextResponse } from "next/server";
import { Employer, Department, Function as JobFunction, Status } from "@prisma/client";

export async function GET() {
  return NextResponse.json({
    employer: Object.values(Employer),
    department: Object.values(Department),
    function: Object.values(JobFunction),
    status: Object.values(Status),
  });
}