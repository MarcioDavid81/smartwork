"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import InputMask from 'react-input-mask';

export default function EmployeeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [enums, setEnums] = useState({
    employer: [],
    department: [],
    function: [],
    status: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    adress: "",
    city: "",
    email: "",
    phone: "",
    birthDate: "",
    admission: "",
    cpf: "",
    rg: "",
    employer: "",
    department: "",
    function: "",
    status: "Ativo",
  });

  useEffect(() => {
    async function fetchEnums() {
      const res = await fetch("/api/enums");
      const data = await res.json();
      setEnums(data);
    }
    fetchEnums();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function cleanField(value: string) {
    return value.replace(/\D/g, "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    function ajustarFusoHorario(data: string) {
      return new Date(`${data}T12:00:00Z`).toISOString();
    }

    e.preventDefault();
    setIsSubmitting(true);
    function resetForm() {
      setFormData({
        name: "",
        adress: "",
        city: "",
        email: "",
        phone: "",
        birthDate: "",
        admission: "",
        cpf: "",
        rg: "",
        employer: "",
        department: "",
        function: "",
        status: "Ativo",
      });
    }

    const cleanedData = {
      ...formData,
      phone: cleanField(formData.phone),
      cpf: cleanField(formData.cpf),
      rg: cleanField(formData.rg),
      birthDate: ajustarFusoHorario(formData.birthDate),
      admission: ajustarFusoHorario(formData.admission),
    };

    try {
      const res = await fetch("/api/funcionarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast("Erro ao cadastrar funcionário", {
          style: {
            backgroundColor: "#f87171",
            color: "white",
          },
          icon: "❌",
        });
        return;
      }
      toast("Funcionário cadastrado com sucesso!", {
        style: {
          backgroundColor: "#78b49a",
          color: "white",
        },
        icon: "✅",
      });
      resetForm();
    } catch (err) {
      console.error("Erro no envio do formulário:", err);
      toast("Erro inesperado. Tente novamente.", {
        style: {
          backgroundColor: "#f87171",
          color: "white",
        },
        icon: "❌",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium mb-1 block">
          Nome
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
        />
      </div>
      <div>
        <label htmlFor="adress" className="text-sm font-medium mb-1 block">
          Endereço
        </label>
        <input
          type="text"
          name="adress"
          placeholder="Endereço"
          value={formData.adress}
          onChange={handleChange}
          required
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
        />
      </div>
      <div>
        <label htmlFor="city" className="text-sm font-medium mb-1 block">
          Cidade
        </label>
        <input
          type="text"
          name="city"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleChange}
          required
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium mb-1 block">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
        />
      </div>
      <InputMask
        mask="(99) 99999-9999"
        value={formData.phone}
        onChange={handleChange}
      >
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <div>
            <label htmlFor="phone" className="text-sm font-medium mb-1 block">
              {" "}
              Celular
            </label>
            <input
              {...inputProps}
              type="text"
              name="phone"
              placeholder="Celular"
              required
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
            />
          </div>
        )}
      </InputMask>

      <div>
        <label htmlFor="birthDate" className="text-sm font-medium mb-1 block">
          Data de Nascimento
        </label>
        <input
          type="date"
          name="birthDate"
          placeholder="Nascimento"
          value={formData.birthDate}
          onChange={handleChange}
          required
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
        />
      </div>
      <div>
        <label htmlFor="admission" className="text-sm font-medium mb-1 block">
          Admissão
        </label>
        <input
          type="date"
          name="admission"
          placeholder="Admissão"
          value={formData.admission}
          onChange={handleChange}
          required
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
        />
      </div>

      <InputMask
        mask="999.999.999-99"
        value={formData.cpf}
        onChange={handleChange}
      >
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <div>
            <label htmlFor="cpf" className="text-sm font-medium mb-1 block">
              CPF
            </label>
            <input
              {...inputProps}
              type="text"
              name="cpf"
              placeholder="CPF"
              required
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
            />
          </div>
        )}
      </InputMask>
      <InputMask
        mask="999.999.99-99"
        value={formData.rg}
        onChange={handleChange}
      >
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <div>
            <label htmlFor="rg" className="text-sm font-medium mb-1 block">
              RG
            </label>
            <input
              {...inputProps}
              type="text"
              name="rg"
              placeholder="RG"
              required
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
            />
          </div>
        )}
      </InputMask>

      <div>
        <label htmlFor="employer" className="text-sm font-medium mb-1 block">
          Empregador
        </label>
        <select
          name="employer"
          onChange={handleChange}
          value={formData.employer}
          required
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
        >
          <option value="">Selecione o empregador</option>
          {enums.employer.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="department" className="text-sm font-medium mb-1 block">
          Setor
        </label>
        <select
          name="department"
          onChange={handleChange}
          value={formData.department}
          required
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
        >
          <option value="">Selecione o setor</option>
          {enums.department.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="function" className="text-sm font-medium mb-1 block">
          Função
        </label>
        <select
          name="function"
          onChange={handleChange}
          value={formData.function}
          required
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#78b49a]"
        >
          <option value="">Selecione a função</option>
          {enums.function.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-start md:items-center gap-4 justify-between flex-col sm:flex-row md:col-span-2">
        <div>
          <label className="mr-4">Status:</label>
          {enums.status.map((item) => (
            <label key={item} className="mr-4">
              <input
                type="radio"
                name="status"
                value={item}
                checked={formData.status === item}
                onChange={handleChange}
                className="mr-2"
              />{" "}
              {item}
            </label>
          ))}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#78b49a] text-white px-4 py-2 rounded hover:bg-[#78b49a]/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 col-span-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            "Cadastrar"
          )}
        </button>
      </div>
    </motion.form>
  );
}
