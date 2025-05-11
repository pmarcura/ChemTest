# ChemBriefs - Blog Colaborativo de Química

## Sobre o Projeto

ChemBriefs é uma plataforma colaborativa para divulgação de conteúdos científicos na área de Química, escritos por alunos e pesquisadores. O objetivo é tornar o conhecimento científico mais acessível através de artigos bem escritos e revisados.

## Tecnologias Utilizadas

- **Frontend**: Next.js 13+ (App Router)
- **Estilização**: TailwindCSS
- **Backend/Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Conteúdo**: React Markdown para renderização de conteúdo científico

## Funcionalidades

- **Autenticação**: Registro e login de usuários
- **Criação de Artigos**: Editor com suporte a Markdown e preview em tempo real
- **Gerenciamento de Artigos**: Dashboard para autores gerenciarem seus artigos
- **Publicação**: Sistema de rascunho/publicação para controle de visibilidade
- **Tags**: Categorização de artigos por temas
- **Visualização Pública**: Leitura de artigos publicados sem necessidade de login

## Estrutura do Projeto

- `/app`: Rotas e páginas da aplicação (Next.js App Router)
- `/components`: Componentes reutilizáveis
- `/lib`: Utilitários, configurações e tipos
- `/hooks`: Hooks personalizados

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione as variáveis do Supabase:
     ```
     NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
     ```
4. Inicie o servidor de desenvolvimento: `npm run dev`

## Solução de Problemas

### Visualização do Código no Preview

Se você estiver enfrentando problemas para visualizar o código no preview:

1. **Verifique a conexão com o servidor de desenvolvimento**: Certifique-se de que o servidor está rodando corretamente com `npm run dev`
2. **Limpe o cache do navegador**: Às vezes, problemas de cache podem afetar a visualização
3. **Verifique erros no console**: Abra as ferramentas de desenvolvedor (F12) e verifique se há erros no console
4. **Reinicie o servidor**: Pare o servidor com Ctrl+C e inicie novamente com `npm run dev`
5. **Verifique as variáveis de ambiente**: Certifique-se de que as variáveis do Supabase estão configuradas corretamente

Se o problema persistir, tente acessar a aplicação em uma porta diferente:
```
npm run dev -- -p 3001
```

## Contribuição

Este projeto está em desenvolvimento ativo. Contribuições são bem-vindas!
