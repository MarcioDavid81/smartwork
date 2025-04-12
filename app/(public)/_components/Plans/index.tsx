import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Planos = () => {
    return (
        <section className="py-20 w-full bg-white min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Escolha o plano ideal</h2>
        <div className="grid md:grid-cols-3 gap-6 container mx-auto">
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
    )
}

export default Planos