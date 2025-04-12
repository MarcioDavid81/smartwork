import { CheckCircle } from "lucide-react"

const Beneficios = () => {
    return (
        <section className="py-20 px-6 w-full bg-gray-50 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Principais Benefícios</h2>
        <div className="grid md:grid-cols-3 gap-6 container mx-auto">
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
    )
}

export default Beneficios