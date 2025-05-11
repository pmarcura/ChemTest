// Este arquivo é um re-export do hook useToast da biblioteca shadcn/ui
// Permite usar o sistema de toast em componentes client-side

import { useToast as useToastOriginal } from "@/components/ui/use-toast";

/**
 * Hook para exibir notificações toast na interface
 * Reexporta o hook da biblioteca de componentes
 */
export const useToast = useToastOriginal;
