"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface Employee {
  id: number
  name: string
}

export default function ExamForm() {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [formData, setFormData] = useState({
    type: "",
    result: "",
    date: "",
    expiration: "",
    employeeId: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchEmployees() {
      const res = await fetch("/api/funcionarios")
      const data = await res.json()
      setEmployees(data)
    }
    fetchEmployees()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const response = await fetch("/api/exames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        date: new Date(formData.date),
        expiration: new Date(formData.expiration),
        employeeId: Number(formData.employeeId),
      }),
    })

    if (response.ok) {
        toast("Exame cadastrado com sucesso!", {
            style: {
                backgroundColor: "#78b49a",
                color: "white",
            },
            icon: "✅",
        })
      setFormData({
        type: "",
        result: "",
        date: "",
        expiration: "",
        employeeId: "",
      })
      router.push("/exames")
    } else {
      console.error("Erro ao cadastrar exame")
        toast("Erro ao cadastrar exame. Tente novamente.", {
            style: {
                backgroundColor: "#f87171",
                color: "white",
              },
            icon: "❌",
        })
    } 

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="type">Tipo do Exame</Label>
        <Input id="type" name="type" value={formData.type} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="result">Resultado</Label>
        <Input id="result" name="result" value={formData.result} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="date">Data do Exame</Label>
        <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="expiration">Data de Vencimento</Label>
        <Input id="expiration" name="expiration" type="date" value={formData.expiration} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="employeeId">Funcionário</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, employeeId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um funcionário" />
          </SelectTrigger>
          <SelectContent>
            {employees.map((emp) => (
              <SelectItem key={emp.id} value={String(emp.id)}>
                {emp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button disabled={isSubmitting} type="submit" className="w-full bg-[#78b49a] text-white hover:bg-[#78b49a]/80 border-gray-300 shadow-sm rounded-lg px-4 py-2 flex items-center gap-2">
      {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            "Cadastrar"
          )}
      </Button>
    </form>
  )
}
