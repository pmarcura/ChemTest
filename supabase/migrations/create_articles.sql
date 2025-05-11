/*
  # Criação da tabela de artigos

  1. Novas Tabelas
    - `articles`
      - `id` (uuid, chave primária)
      - `title` (text, não nulo)
      - `content` (text, não nulo)
      - `author_id` (uuid, referência a profiles.id)
      - `published` (boolean, padrão false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Segurança
    - Habilitar RLS na tabela `articles`
    - Adicionar política para leitura pública de artigos publicados
    - Adicionar política para autores lerem seus próprios artigos
    - Adicionar política para autores atualizarem seus próprios artigos
    - Adicionar política para autores excluírem seus próprios artigos
*/

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artigos publicados são visíveis publicamente"
  ON articles
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Autores podem ler seus próprios artigos"
  ON articles
  FOR SELECT
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Autores podem criar artigos"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Autores podem atualizar seus próprios artigos"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Autores podem excluir seus próprios artigos"
  ON articles
  FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());
