import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase usando variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Criação do cliente Supabase para uso em toda a aplicação
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Definição dos tipos de dados usados na aplicação

/**
 * Tipo para o perfil de usuário
 */
export type Profile = {
  id: string;           // ID do usuário (UUID)
  email: string;        // Email do usuário
  name: string | null;  // Nome do usuário (opcional)
  bio: string | null;   // Biografia do usuário (opcional)
  avatar_url: string | null; // URL da imagem de perfil (opcional)
  created_at: string;   // Data de criação do perfil
};

/**
 * Tipo para artigos
 */
export type Article = {
  id: string;           // ID do artigo (UUID)
  title: string;        // Título do artigo
  content: string;      // Conteúdo do artigo em Markdown
  author_id: string;    // ID do autor (referência à tabela profiles)
  published: boolean;   // Status de publicação
  created_at: string;   // Data de criação
  updated_at: string;   // Data da última atualização
  author?: Profile;     // Dados do autor (opcional, para joins)
  tags?: Tag[];         // Tags associadas (opcional, para joins)
};

/**
 * Tipo para tags
 */
export type Tag = {
  id: string;           // ID da tag (UUID)
  name: string;         // Nome da tag
  created_at: string;   // Data de criação
};

/**
 * Tipo para artigo com dados do autor incluídos
 * Usado para exibição de artigos com informações do autor
 */
export type ArticleWithAuthor = Article & {
  author: Profile;      // Dados do autor (obrigatório neste tipo)
};
