import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { ArticleWithAuthor } from '@/lib/supabase';
import { BeakerIcon } from 'lucide-react';
import Link from 'next/link';

// Define o tempo de revalidação da página para 60 segundos
export const revalidate = 60; // revalidar a cada 60 segundos

/**
 * Função assíncrona para buscar artigos publicados do Supabase
 * Retorna uma lista de artigos com informações do autor
 */
async function getPublishedArticles() {
  // Consulta ao Supabase para buscar artigos publicados
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      author:profiles(*)
    `)
    .eq('published', true) // Filtra apenas artigos publicados
    .order('created_at', { ascending: false }); // Ordena do mais recente para o mais antigo

  if (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }

  return data as ArticleWithAuthor[];
}

/**
 * Componente da página inicial
 * Exibe uma seção de boas-vindas e os artigos publicados mais recentes
 */
export default async function Home() {
  // Busca artigos publicados do banco de dados
  const articles = await getPublishedArticles();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Seção de cabeçalho/hero */}
      <section className="mb-16 text-center">
        <div className="flex justify-center mb-4">
          <BeakerIcon className="h-16 w-16 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">ChemBriefs</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Divulgando conteúdos científicos acessíveis na área de Química, 
          escritos por alunos e pesquisadores.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/login">Entrar</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/register">Registrar</Link>
          </Button>
        </div>
      </section>

      {/* Seção de artigos recentes */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Artigos Recentes</h2>
        {articles.length === 0 ? (
          // Exibe mensagem quando não há artigos
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum artigo publicado ainda.</p>
          </div>
        ) : (
          // Exibe grid de artigos quando há conteúdo
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
