import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  keywords: ["saúde ocupacional", "gestão de saúde", "segurança no trabalho"],
  description: "O seu sistema de gestão da saúde ocupacional",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default function Login() {
  return (
    <div>Login</div>
  )
}
