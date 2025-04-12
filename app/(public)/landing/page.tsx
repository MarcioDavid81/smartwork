import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-green-100 to-green-300 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Gestão de Saúde Ocupacional de forma simples e eficiente
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
          Organize exames, EPIs e colaboradores com facilidade e segurança. Tudo em um só lugar.
        </p>
        <Button size="lg">Testar gratuitamente</Button>
      </section>

      {/* Demo Image */}
      <section className="py-16 px-6 w-full max-w-6xl">
        <Image
          src="https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dashboard"
          width={1200}
          height={600}
          className="rounded-xl shadow-xl border"
        />
      </section>

      {/* Benefícios */}
      <section className="py-20 px-6 w-full bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Principais Benefícios</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "Gestão completa de exames ocupacionais",
            "Controle total de EPIs e entregas",
            "Alertas de vencimento automatizados",
            "Relatórios em PDF em um clique",
            "Cadastro ágil de colaboradores",
            "Segurança com autenticação Clerk",
          ].map((benefit, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1" />
              <p className="text-gray-700 text-lg">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planos */}
      <section className="py-20 px-6 w-full bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Escolha o plano ideal</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Plano Free */}
          <Card className="border-green-500">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Free</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-4xl font-bold text-green-600">R$ 0</p>
              <ul className="space-y-2">
                <li>- Até 5 colaboradores</li>
                <li>- Cadastro e controle de exames</li>
                <li>- Controle básico de EPIs</li>
              </ul>
              <Button className="w-full">Começar grátis</Button>
            </CardContent>
          </Card>

          {/* Plano Pro */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Pro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-4xl font-bold text-gray-800">R$ 49/mês</p>
              <ul className="space-y-2">
                <li>- Colaboradores ilimitados</li>
                <li>- Relatórios em PDF</li>
                <li>- Alertas de vencimento</li>
              </ul>
              <Button className="w-full">Assinar Pro</Button>
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card className="border-yellow-500">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Premium</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-4xl font-bold text-yellow-600">R$ 89/mês</p>
              <ul className="space-y-2">
                <li>- Tudo do Pro</li>
                <li>- Suporte prioritário</li>
                <li>- Funcionalidades futuras exclusivas</li>
              </ul>
              <Button className="w-full">Assinar Premium</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Smart Work - Todos os direitos reservados
      </footer>
    </main>
  );
}