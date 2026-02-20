// components/article/ArticleCard.tsx

import Link from "next/link";
import { ArticleResponse } from "@/types/article.types";

interface Props {
  article: ArticleResponse;
  onDelete?: (id: number) => void; // affiché uniquement si fourni (dashboard)
}

export default function ArticleCard({ article, onDelete }: Props) {
  return (
    <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white flex justify-between items-start gap-4">
      
      <div className="flex-1">
        {/* Lien vers la page détail */}
        <Link href={`/articles/${article.id}`}>
          <h2 className="text-xl font-bold hover:underline text-blue-700 cursor-pointer">
            {article.title}
          </h2>
        </Link>

        <p className="text-sm text-gray-400 mt-1">
          Par{" "}
          <span className="font-medium text-gray-600">
            {article.authorName}
          </span>{" "}
          · {new Date(article.createdAt).toLocaleDateString("fr-FR")}
        </p>

        {/* Aperçu tronqué à 3 lignes */}
        <p className="mt-3 text-gray-700 line-clamp-3">{article.content}</p>
      </div>

      {/* Bouton suppression — visible uniquement dans le dashboard */}
      {onDelete && (
        <button
          onClick={() => onDelete(article.id)}
          className="text-sm text-red-500 hover:text-red-700 border border-red-300 rounded-lg px-3 py-1 transition shrink-0"
        >
          Supprimer
        </button>
      )}
    </div>
  );
}