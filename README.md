# 🧠 Smart Work - Sistema de Controle de Saúde Ocupacional

**Smart Work** é um sistema completo de controle de saúde ocupacional, desenvolvido com foco em empresas que desejam organizar e acompanhar de forma eficiente os dados de seus colaboradores, exames ocupacionais e entregas de EPIs. O sistema é moderno, rápido e seguro, utilizando tecnologias como **Next.js**, **Prisma ORM**, **NeonDB** e **PostgreSQL**.

## 🚀 Tecnologias Utilizadas

- **Next.js 14.2.1** – Framework React com suporte à renderização híbrida.
- **Prisma ORM** – Mapeamento objeto-relacional para o banco de dados PostgreSQL.
- **NeonDB** – Banco de dados PostgreSQL em nuvem com alta performance.
- **Tailwind CSS** – Utilizado na estilização dos componentes.
- **Clerk Auth** – Autenticação e controle de sessão.
- **jsPDF + jsPDF-Autotable** – Geração de relatórios em PDF.

## 🧩 Estrutura dos Módulos

O sistema é dividido em 3 módulos principais:

### 1️⃣ Funcionários
- Cadastro completo de colaboradores.
- Relacionamento com os módulos de Exames e EPIs.
- Filtros e busca inteligente.
- Exportação de relatórios personalizados.

### 2️⃣ Exames Ocupacionais
- Registro de exames como audiometria, espirometria, exame de sangue, entre outros.
- Validade dos exames e alertas.
- Relatórios por colaborador, por tipo de exame ou por período.

### 3️⃣ EPIs
- Cadastro de EPIs com controle de estoque.
- Histórico de entrega de EPIs por funcionário.
- Geração de termos de entrega em PDF.
- Relatórios de uso e controle por período.

## 🔗 Relacionamentos entre Tabelas

- Um **funcionário** pode ter múltiplos **exames** e múltiplas **entregas de EPIs**.
- Cada **entrega de EPI** está vinculada ao funcionário e ao item entregue.
- Os relacionamentos entre as tabelas permitem filtros cruzados e relatórios complexos.

## 📄 Funcionalidades Gerais

- 🧑‍💼 Autenticação por usuário (cada usuário visualiza apenas seus próprios dados).
- ⚙️ CRUD completo em todos os módulos.
- 📊 Relatórios dinâmicos e personalizáveis.
- 📎 Uploads e downloads de relatórios em PDF.
- 🧩 Interface moderna, responsiva e intuitiva.

## 🛠️ Como Rodar o Projeto Localmente

```bash
# Clone o repositório
git clone https://github.com/MarcioDavid81/smartwork.git

# Acesse a pasta
cd smartwork

# Instale as dependências
npm install

# Crie um arquivo .env e configure suas variáveis
.env

# Rode as migrations
npx prisma migrate dev

# Inicie o projeto
npm run dev
```

🧪 Scripts Úteis
```bash
# Gerar e visualizar o Prisma Studio
npx prisma studio

# Aplicar mudanças no schema
npx prisma generate
```

📦 Variáveis de Ambiente
```bash
Configure seu arquivo .env.local com:
DATABASE_URL="sua-url-do-neon-db"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."
```


📧 Contato
Para mais informações, entre em contato:

Email: marciodavid81@gmail.com

LinkedIn: https://bit.ly/4iSg1EB

Portfólio: https://bit.ly/3G4w1EE



📈 Futuras Melhorias

Notificações automáticas para exames vencidos.
Integração com API do Gemini para obtenção de informações.
Integração com e-mail para envio de relatórios.
Exportação em Excel (XLSX).



🧑‍💻 Autor

Desenvolvido por Marcio David, como parte do projeto de extensão acadêmica do terceiro semestre do cusro de Análise e Desenvolvimento de Sistemas da Universidade Cruzeiro do Sul
