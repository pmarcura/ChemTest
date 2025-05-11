import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ArticleWithAuthor, Tag } from "@/lib/supabase";

interface ArticleCardProps {
  article: ArticleWithAuthor;
  tags: Tag[];
}

/**
 * Componente de card para exibir um artigo na lista
 * Exibe título, resumo do conteúdo, tags e informações do autor
 */
export function ArticleCard({ article, tags }: ArticleCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link href={`/articles/${article.id}`} className="hover:text-indigo-600 transition-colors">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Exibe um resumo do conteúdo (primeiros 150 caracteres) */}
        <div className="line-clamp-3 text-muted-foreground mb-4">
          {article.content.substring(0, 150).replace(/[#*`]/g, '')}...
        </div>
        {/* Exibe as tags do artigo */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        {/* Exibe o nome do autor e a data de criação */}
        <div>Por {article.author?.name || article.author?.email}</div>
        <div>{formatDate(article.created_at)}</div>
      </CardFooter>
    </Card>
  );
}
