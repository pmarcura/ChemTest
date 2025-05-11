import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Função utilitária para combinar classes CSS com Tailwind
 * Usa clsx e tailwind-merge para resolver conflitos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Função para formatar datas em formato legível em português
 * @param dateString String de data ISO
 * @returns Data formatada (ex: "12 de janeiro de 2023")
 */
export function formatDate(dateString: string) {
  if (!dateString) return "";
  
  const date = parseISO(dateString);
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}
