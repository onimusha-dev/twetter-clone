"use client";

import React, { useEffect, useState } from "react";
import { 
  ArrowLeft, 
  Loader2, 
  MessageCircle, 
  Heart, 
  Share, 
  MoreHorizontal,
  Repeat2,
  Bookmark
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  content: string;
  media?: string;
  banner?: string;
  createdAt: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
}

import { CommentList } from "@/components/Comments";

export default function PostViewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  async function fetchPost() {
    try {
      const res = await fetchApi(`/api/posts/${id}`);
      if (!res.ok) throw new Error("Transmission not found.");
      const result = await res.json();
      if (result.success) {
        setPost(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-foreground opacity-20" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">Syncing Transmission</span>
    </div>
  );

  if (error || !post) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-10 text-center">
       <h2 className="text-2xl font-black tracking-tighter text-rose-500 mb-2 uppercase italic">{error || "Intel Missing"}</h2>
       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-8">Signal lost in the Zerra void.</p>
       <Button 
            variant="outline" 
            onClick={() => router.push("/")}
            className="rounded-sm font-black text-[10px] uppercase tracking-widest px-10 h-10"
       >
            Back to Feed
       </Button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-12 md:px-12 mb-8 border-b border-border/20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.back()} 
            className="rounded-none h-11 w-11 border-border/20 hover:border-primary transition-all bg-card/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic leading-none text-foreground">Transmission</h1>
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-primary mt-2">Single Feed View</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-none h-9 w-9 border-border/20 hover:border-primary/40 transition-colors">
                <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-none h-9 w-9 border-border/20 hover:border-primary/40 transition-colors">
                <Share className="h-4 w-4" />
            </Button>
        </div>
      </div>

      <div className="px-4 max-w-4xl mx-auto w-full mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-12">
            <div className="flex items-center gap-5 mb-8 pb-8 border-b border-border/10">
                <Link href={`/profile?username=${post.author?.username}`}>
                    <Avatar className="h-14 w-14 rounded-none bg-muted/20 border border-border/40 group">
                        <AvatarImage src={post.author?.avatar} className="rounded-none object-cover" />
                        <AvatarFallback className="bg-muted text-foreground font-bold text-xl uppercase">
                            {post.author?.name?.[0] || "U"}
                        </AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex flex-col flex-1">
                    <Link href={`/profile?username=${post.author?.username}`} className="font-bold text-xl tracking-tighter hover:text-primary transition-colors uppercase italic leading-none">
                        {post.author?.name}
                    </Link>
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 mt-2">
                        <span>@{post.author?.username}</span>
                        <span className="opacity-20">/</span>
                        <span className="badge-warm px-2 py-0.5">Verified Signal</span>
                    </div>
                </div>
                <Button className="btn-primary h-9 px-8">
                    Follow
                </Button>
            </div>

            <div className="space-y-12 mb-16">
                <p className="text-2xl sm:text-4xl font-medium tracking-tight leading-loose text-foreground whitespace-pre-wrap italic border-l-4 border-primary/20 pl-8 py-4">
                    {post.content}
                </p>
                
                {(post.media || post.banner) && (
                <div className="rounded-none overflow-hidden border border-border bg-muted/10">
                    <img src={post.media || post.banner} alt="content" className="w-full h-auto object-cover max-h-[800px]" />
                </div>
                )}
                
                <div className="flex items-center gap-4 text-muted-foreground/40 font-bold uppercase tracking-[0.2em] text-[8px] italic">
                    <span>{new Date(post.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="opacity-40">/</span>
                    <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="opacity-40">/</span>
                    <span className="text-foreground/40 uppercase">Zerra Frequency</span>
                </div>
            </div>

            <div className="flex items-center justify-around py-8 border-y border-border/10 mb-12">
                <StatButton icon={Heart} count={128} color="rose-500" />
                <StatButton icon={MessageCircle} count={24} color="primary" />
                <StatButton icon={Repeat2} count={12} color="primary" />
                <StatButton icon={Bookmark} color="primary" />
            </div>

            <div className="space-y-8">
                <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40 italic">Signal Echoes</h3>
                    <div className="flex-1 h-px bg-border/20" />
                </div>
                <CommentList postId={id} />
            </div>
        </div>
      </div>
    </div>
  );
}

function StatButton({ icon: Icon, count, color }: { icon: any, count?: number, color: string }) {
    return (
        <button className={cn(
            "flex flex-col items-center gap-2 group/btn transition-colors",
            color === "rose-500" ? "hover:text-rose-500" : "hover:text-primary"
        )}>
            <div className={cn(
                "minimal-card p-4 interactive-hover border-border/10",
                color === "rose-500" ? "group-hover/btn:border-rose-500/20" : "group-hover/btn:border-primary/20"
            )}>
                <Icon className="h-6 w-6" />
            </div>
            {count !== undefined && (
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-20 group-hover/btn:opacity-100 transition-opacity">{count}</span>
            )}
        </button>
    );
}
