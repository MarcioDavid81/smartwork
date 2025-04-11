
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
