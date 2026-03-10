"use client";

import React from "react";
import { MessageCircle, Heart, Bookmark, Share } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchApi } from "@/lib/api";
import { Post } from "./types";
import { ActionButton } from "./ActionButton";

export function PostCard({ post: initialPost }: { post: Post }) {
  const [post, setPost] = React.useState(initialPost);
  const [isLiking, setIsLiking] = React.useState(false);
  const [isBookmarking, setIsBookmarking] = React.useState(false);

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetchApi(`/api/posts/${post.id}/like`, { method: "POST" });
      if (res.ok) {
        setPost(prev => ({
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

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isBookmarking) return;
    setIsBookmarking(true);
    try {
      const res = await fetchApi(`/api/posts/${post.id}/bookmark`, { method: "POST" });
      if (res.ok) {
        setPost(prev => ({
          ...prev,
          bookmarked: !prev.bookmarked,
          _count: {
            ...prev._count,
            bookmarks: (prev._count?.bookmarks || 0) + (prev.bookmarked ? -1 : 1)
          }
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <div className="minimal-card p-8 md:p-10 border-primary/20 bg-secondary/30 hover:border-primary/40 group animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex gap-4">
        <Link href={`/profile?username=${post.author?.username}`}>
          <Avatar className="h-10 w-10 rounded-none bg-muted border border-border/40 group-hover:border-primary/40 transition-colors">
            <AvatarImage src={post.author?.avatar} className="object-cover" />
            <AvatarFallback className="font-bold text-xs uppercase">{post.author?.name?.[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Link href={`/profile?username=${post.author?.username}`} className="text-sm font-bold tracking-tight hover:text-primary transition-colors leading-none uppercase">
                {post.author?.name}
              </Link>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 mt-1">
                <span>@{post.author?.username}</span>
                <span className="opacity-40 italic">Signal Verified</span>
              </div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/20 italic">
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
            </span>
          </div>

          <Link href={`/posts/${post.id}`} className="block group/content">
            <p className="text-base sm:text-lg font-medium leading-loose italic text-foreground group-hover/content:text-primary transition-colors border-l-2 border-primary/20 pl-6 py-2">
              {post.content}
            </p>
          </Link>

          {(post.media || post.banner) && (
             <div className="aspect-video w-full overflow-hidden rounded-none border border-border/10 bg-muted/10 mt-4">
                <img src={post.media || post.banner} alt="post media" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
             </div>
          )}

          <div className="flex items-center gap-8 pt-2">
            <ActionButton 
                icon={MessageCircle} 
                count={post._count?.comments || 0} 
                color="primary" 
                href={`/posts/${post.id}`} 
            />
            <ActionButton 
                icon={Heart} 
                count={post._count?.likes || 0} 
                color="rose-500" 
                active={post.liked} 
                onClick={toggleLike}
            />
            <ActionButton 
                icon={Bookmark} 
                color="primary" 
                active={post.bookmarked}
                onClick={toggleBookmark}
            />
            <button className="text-muted-foreground/20 hover:text-primary transition-colors ml-auto">
                <Share className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
