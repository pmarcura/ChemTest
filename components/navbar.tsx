"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BeakerIcon, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/lib/supabase";

/**
 * Componente de barra de navegação
 * Responsivo e com estado de autenticação
 */
export function Navbar() {
  const pathname = usePathname(); // Hook para obter o caminho atual
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controle do menu mobile
  const [user, setUser] = useState<Profile | null>(null); // Estado para armazenar dados do usuário
  const [isLoading, setIsLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    // Função para verificar a sessão do usuário e buscar seus dados
    async function getUser() {
      // Verifica se existe uma sessão ativa
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Se existir sessão, busca os dados do perfil do usuário
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUser(data);
      }
      
      setIsLoading(false);
    }

    getUser();

    // Configura listener para mudanças no estado de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Quando o usuário faz login, busca os dados do perfil
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setUser(data);
        } else if (event === 'SIGNED_OUT') {
          // Quando o usuário faz logout, limpa os dados
          setUser(null);
        }
      }
    );

    // Cleanup da inscrição ao desmontar o componente
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Função para alternar o estado do menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para fechar o menu mobile
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Função para realizar o logout
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    closeMenu();
  };

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e nome do site */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BeakerIcon className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl">ChemBriefs</span>
            </Link>
          </div>

          {/* Navegação para desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Início
            </Link>
            {!isLoading && user ? (
              // Links para usuários autenticados
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Meus Artigos
                </Link>
                <Link
                  href="/articles/new"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === "/articles/new" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Novo Artigo
                </Link>
                <Button variant="ghost" onClick={handleSignOut}>
                  Sair
                </Button>
              </>
            ) : (
              // Links para usuários não autenticados
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Registrar</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Botão do menu mobile */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile (visível apenas quando isMenuOpen é true) */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-sm font-medium"
              onClick={closeMenu}
            >
              Início
            </Link>
            {!isLoading && user ? (
              // Links para usuários autenticados (mobile)
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 text-sm font-medium"
                  onClick={closeMenu}
                >
                  Meus Artigos
                </Link>
                <Link
                  href="/articles/new"
                  className="block py-2 text-sm font-medium"
                  onClick={closeMenu}
                >
                  Novo Artigo
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-2"
                  onClick={handleSignOut}
                >
                  Sair
                </Button>
              </>
            ) : (
              // Links para usuários não autenticados (mobile)
              <div className="space-y-2">
                <Link href="/auth/login" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Entrar
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={closeMenu}>
                  <Button className="w-full">Registrar</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
