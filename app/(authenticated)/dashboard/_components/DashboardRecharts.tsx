"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Subtitle } from "@/app/(authenticated)/_components/Subtitle";
import { FaSpinner } from "react-icons/fa";

export default function DashboardRecharts() {
  const [epiData, setEpiData] = useState([]);
  const [examAlerts, setExamAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [epiRes, examRes] = await Promise.all([
          fetch("/api/epis"),
          fetch("/api/exames"),
        ]);

        const epiJson = await epiRes.json();
        const examJson = await examRes.json();

        setEpiData(epiJson);

        const today = new Date();
        const thirtyDays = new Date();
        thirtyDays.setDate(today.getDate() + 30);

        const upcomingExpirations = examJson.filter((exam: any) => {
          const exp = new Date(exam.expiration);
          return exp >= today && exp <= thirtyDays;
        });

        setExamAlerts(upcomingExpirations);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-500">
        <FaSpinner className="animate-spin mr-2" />
        Carregando dashboard...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Gráfico de EPIs */}
      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <Subtitle>Estoque de EPIs</Subtitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={epiData}>
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="quantity" fill="#78b49a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Exames vencendo */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <Subtitle>Exames a vencer</Subtitle>
          {examAlerts.length > 0 ? (
            examAlerts.map((exam: any) => (
              <div
                key={exam.id}
                className="text-sm flex flex-col border-b pb-2 last:border-b-0"
              >
                <span className="font-medium">{exam.employee.name}</span>
                <span className="text-muted-foreground text-xs">
                  {exam.type} - vence em{" "}
                  <span className="font-medium text-red-600">
                    {format(new Date(exam.expiration), "dd/MM/yyyy")}
                  </span>
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Nenhum exame a vencer nos próximos 30 dias</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
