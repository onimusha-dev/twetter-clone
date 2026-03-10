"use client";

import React from "react";
import { Heart, Newspaper } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Article } from "./types";

export function ArticleCard({ article: initialArticle }: { article: Article }) {
  const author = initialArticle.author || initialArticle.user;
  const [article, setArticle] = React.useState(initialArticle);
  const [isLiking, setIsLiking] = React.useState(false);

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetchApi(`/api/articles/${article.id}/like`, { method: "POST" });
      if (res.ok) {
        setArticle(prev => ({
          ...prev,
          liked: !prev.liked,
          _count: {
            ...prev._count,
            likes: (prev._count?.likes || 0) + (prev.liked ? -1 : 1)
          }
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="minimal-card p-8 md:p-12 border-border/20 hover:border-primary/30 group relative overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <Newspaper className="h-12 w-12 text-primary rotate-12" />
      </div>
      
      <div className="space-y-6 relative z-10">
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="badge-warm px-2 py-0.5">Archival Transmission</div>
                <div className="h-px flex-1 bg-border/10" />
            </div>
            <Link href={`/articles/${article.id}`} className="block">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tighter leading-tight uppercase italic hover:text-primary transition-colors">
                    {article.title}
                </h3>
            </Link>
        </div>

        <Link href={`/articles/${article.id}`} className="block">
            <p className="text-base font-medium leading-loose italic text-foreground/70 line-clamp-3 max-w-2xl border-l-2 border-primary/20 pl-6 py-2 hover:text-foreground transition-colors">
            {article.body}
            </p>
        </Link>

        {article.banner && (
            <div className="aspect-video sm:aspect-21/9 w-full overflow-hidden border border-border/10 bg-muted/10 grayscale hover:grayscale-0 transition-all duration-500">
                <img src={article.banner} alt="banner" className="w-full h-full object-cover" />
            </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/10">
            <div className="flex items-center gap-4">
                <Avatar className="h-6 w-6 rounded-none bg-muted border border-border/40">
                    <AvatarImage src={author?.avatar} className="object-cover" />
                    <AvatarFallback className="text-[8px] font-bold">{author?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-none">{author?.name}</span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 mt-1 italic">Editorial Persona</span>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/20 italic">
                    {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : ""}
                </span>
                <div className="flex items-center gap-3">
                    <button onClick={toggleLike} className={cn("text-muted-foreground/40 hover:text-primary transition-colors", article.liked && "text-primary")}>
                        <Heart className={cn("h-4 w-4", article.liked && "fill-current")} />
                    </button>
                    <Link href={`/articles/${article.id}`}>
                        <Button variant="outline" size="sm" className="h-7 rounded-none border-primary/20 text-[8px] font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">
                            Retrieve Archive
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
