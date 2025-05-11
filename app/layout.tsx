import './globals.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';

// Configuração da fonte Lexend do Google Fonts
const lexend = Lexend({ subsets: ['latin'] });

// Metadados da aplicação para SEO
export const metadata: Metadata = {
  title: 'ChemBriefs - Blog Colaborativo de Química',
  description: 'Divulgando conteúdos científicos acessíveis na área de Química, escritos por alunos e pesquisadores.',
};

/**
 * Componente de layout raiz da aplicação
 * Define a estrutura básica de todas as páginas
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={lexend.className}>
        {/* Provider para o tema claro/escuro */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            {/* Barra de navegação global */}
            <Navbar />
            {/* Conteúdo principal da página */}
            <main className="flex-1">{children}</main>
            {/* Rodapé global */}
            <footer className="py-6 border-t">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} ChemBriefs - Todos os direitos reservados
              </div>
            </footer>
          </div>
          {/* Componente para exibir notificações toast */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
