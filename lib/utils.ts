import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for efficient class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata uma data ISO para exibição no formato brasileiro
 * @param dateString String de data no formato ISO
 * @returns Data formatada (ex: "12 de janeiro de 2023")
 */
export function formatDate(dateString: string) {
  if (!dateString) return '';
  
  const date = parseISO(dateString);
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}
