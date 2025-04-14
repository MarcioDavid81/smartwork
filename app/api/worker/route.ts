import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question, context } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `
Você é o Worker, um assistente especializado em saúde ocupacional.
Baseado no seguinte contexto de dados: ${context}

Responda claramente à pergunta: "${question}"
  `;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não entendi sua pergunta.";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Erro no Gemini:", err);
    return NextResponse.json({ error: "Erro ao processar a pergunta" }, { status: 500 });
  }
}
