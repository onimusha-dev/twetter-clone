import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard, ArticleCard, FeedItemType } from "@/components/FeedItem";

interface ProfileContentProps {
  items: FeedItemType[];
}

export function ProfileContent({ items }: ProfileContentProps) {
  const posts = items.filter(i => i.type === "post");
  const articles = items.filter(i => i.type === "article");

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full bg-transparent border-b border-border/10 h-10 p-0 gap-8 justify-start rounded-none">
        <TabsTrigger value="all" className="profile-tab-trigger italic">
            All Frequencies
        </TabsTrigger>
        <TabsTrigger value="posts" className="profile-tab-trigger">
            Short-Wave
        </TabsTrigger>
        <TabsTrigger value="articles" className="profile-tab-trigger">
            Editorial
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="pt-8 space-y-4">
        {items.length > 0 ? (
            items.map(item => (
                item.type === "post" ? <PostCard key={item.id} post={item as any} /> : <ArticleCard key={item.id} article={item as any} />
            ))
        ) : <EmptyStream />}
      </TabsContent>
      <TabsContent value="posts" className="pt-8 space-y-4">
        {posts.length > 0 ? (
            posts.map(post => <PostCard key={post.id} post={post as any} />)
        ) : <EmptyStream />}
      </TabsContent>
      <TabsContent value="articles" className="pt-8 space-y-4">
        {articles.length > 0 ? (
            articles.map(article => <ArticleCard key={article.id} article={article as any} />)
        ) : <EmptyStream />}
      </TabsContent>
    </Tabs>
  );
}

function EmptyStream() {
  return (
    <div className="p-24 text-center border border-dashed border-border/10 rounded-none bg-secondary/10">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] italic text-muted-foreground/20">Transmission Void Detected</p>
    </div>
  );
}
