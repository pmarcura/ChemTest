/*
  # Criação da tabela de perfis

  1. Novas Tabelas
    - `profiles`
      - `id` (uuid, chave primária)
      - `email` (text, único)
      - `name` (text)
      - `bio` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
  2. Segurança
    - Habilitar RLS na tabela `profiles`
    - Adicionar política para usuários autenticados lerem seus próprios dados
    - Adicionar política para usuários autenticados atualizarem seus próprios dados
*/

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ler seus próprios perfis"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seus próprios perfis"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Perfis são visíveis publicamente"
  ON profiles
  FOR SELECT
  TO anon
  USING (true);
