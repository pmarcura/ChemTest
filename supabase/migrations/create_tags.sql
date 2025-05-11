/*
  # Criação da tabela de tags e relação com artigos

  1. Novas Tabelas
    - `tags`
      - `id` (uuid, chave primária)
      - `name` (text, único, não nulo)
      - `created_at` (timestamp)
    
    - `article_tags`
      - `article_id` (uuid, referência a articles.id)
      - `tag_id` (uuid, referência a tags.id)
      - Chave primária composta (article_id, tag_id)
  
  2. Segurança
    - Habilitar RLS nas tabelas `tags` e `article_tags`
    - Adicionar políticas para leitura pública
    - Adicionar políticas para autores gerenciarem tags em seus artigos
*/

CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags são visíveis publicamente"
  ON tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem criar tags"
  ON tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Relações article_tags são visíveis publicamente"
  ON article_tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Autores podem gerenciar tags em seus artigos"
  ON article_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM articles 
      WHERE articles.id = article_id 
      AND articles.author_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM articles 
      WHERE articles.id = article_id 
      AND articles.author_id = auth.uid()
    )
  );
