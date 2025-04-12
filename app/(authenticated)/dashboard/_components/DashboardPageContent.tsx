"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, AlertCircle, PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Subtitle } from "../../_components/Subtitle";

function DashboardCard({ title, value, icon, variant }: {
  title: string;
  value: string | number;
  icon: JSX.Element;
  variant?: "default" | "danger";
}) {
  return (
    <Card className={cn(
      "flex items-center gap-4 p-4 shadow-sm border-l-4",
      variant === "danger" ? "border-red-500 bg-red-50" : "border-[#78b49a]"
    )}>
      <div className="p-2 rounded-full bg-[#78b49a]/10 text-[#78b49a]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [expiredExams, setExpiredExams] = useState(0);
  const [totalEpis, setTotalEpis] = useState(0);


  async function fetchDashboardData() {
    try {
      const [employeesRes, examsRes, episRes] = await Promise.all([
        fetch("/api/funcionarios"),
        fetch("/api/exames"),
        fetch("/api/epis"),
      ]);

      const employees = await employeesRes.json();
      const exams = await examsRes.json();
      const epis = await episRes.json();

      setEmployeesCount(employees.length);
      setExpiredExams(
        exams.filter((ex: any) => new Date(ex.expiration) < new Date()).length
      );
      setTotalEpis(epis.reduce((sum: number, epi: any) => sum + epi.quantity, 0));
    } catch (err) {
      console.error("Erro ao buscar dados do dashboard:", err);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <Subtitle>Resumo</Subtitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <DashboardCard
            title="Funcionários Cadastrados"
            value={employeesCount}
            icon={<Users size={24} />}
          />
          <DashboardCard
            title="Exames Vencidos"
            value={expiredExams}
            icon={<AlertCircle size={24} />}
            variant="danger"
          />
          <DashboardCard
            title="EPIs em Estoque"
            value={totalEpis}
            icon={<PackageCheck size={24} />}
          />
        </div>
    </div>
  );
}
