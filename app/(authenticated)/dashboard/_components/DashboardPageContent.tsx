"use client";

import { useEffect, useState } from "react";
import { Users, AlertCircle, PackageCheck } from "lucide-react";
import { Subtitle } from "../../_components/Subtitle";
import { DashboardCard } from "./DashboardCard";



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
            variant={`${expiredExams > 0 ? "danger" : "default"}`}
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
