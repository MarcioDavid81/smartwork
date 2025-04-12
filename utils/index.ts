
import { differenceInCalendarDays, differenceInDays, isBefore, isPast, isToday, parseISO } from "date-fns";


export function formatedDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}

export function formatDateToInput(date: Date | string) {
  return new Date(date).toISOString().split("T")[0];
}

export const toastStyles = {
  success: "bg-[#78b49a] text-white border border-white",
  error: "bg-red-100 text-red-800 border border-red-300",
};


export function getExamStatus(expiration: string) {
  const today = new Date();
  const expDate = new Date(expiration);

  if (isPast(expDate) && !isToday(expDate)) {
    return {
      label: "Vencido",
      bg: "bg-red-200",
      text: "text-red-800",
    };
  }

  const days = differenceInCalendarDays(expDate, today);

  if (days <= 7) {
    return {
      label: `Vence em ${days} dia${days !== 1 ? "s" : ""}`,
      bg: "bg-yellow-200",
      text: "text-yellow-800",
    };
  }

  return {
    label: `Válido (${days} dias)`,
    bg: "bg-green-200",
    text: "text-green-800",
  };
}

