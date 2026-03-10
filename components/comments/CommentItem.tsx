import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Comment } from "./types";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="minimal-card p-5 border-border/10 hover:border-primary/20 group transition-all">
       <div className="flex gap-4">
          <Link href={`/profile?username=${comment.author?.username}`}>
              <Avatar className="h-9 w-9 rounded-none bg-muted border border-border/40 group-hover:border-primary/40 transition-colors">
                  <AvatarImage src={comment.author?.avatar} className="object-cover" />
                  <AvatarFallback className="text-[10px] font-bold uppercase">{comment.author?.name?.[0]}</AvatarFallback>
              </Avatar>
          </Link>
          <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                      <Link href={`/profile?username=${comment.author?.username}`} className="text-sm font-bold tracking-tight hover:text-primary transition-colors leading-none uppercase">
                          {comment.author?.name}
                      </Link>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 mt-1">@{comment.author?.username}</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/20 italic">
                      {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-foreground/80 italic border-l-2 border-primary/10 pl-4 py-1">
                  {comment.content}
              </p>
              <div className="flex items-center gap-6 pt-1">
                  <button className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30 hover:text-primary transition-colors">
                      <Heart className={cn("h-3 w-3", comment.liked && "fill-primary text-primary")} />
                      <span>{comment._count?.likes || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30 hover:text-primary transition-colors">
                      <MessageCircle className="h-3 w-3" />
                      <span>{comment._count?.replies || 0}</span>
                  </button>
              </div>
          </div>
       </div>
    </div>
  );
}
