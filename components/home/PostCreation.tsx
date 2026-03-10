import React from "react";
import { Loader2, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PostCreationProps {
  user: any;
  content: string;
  setContent: (val: string) => void;
  banner: string;
  setBanner: (val: string) => void;
  isPosting: boolean;
  handleCreatePost: () => void;
}

export function PostCreation({
  user,
  content,
  setContent,
  banner,
  setBanner,
  isPosting,
  handleCreatePost,
}: PostCreationProps) {
  return (
    <div className="minimal-card p-8 md:p-10 border-primary/20 bg-secondary/30 mb-4 transition-all hover:bg-secondary/40">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 rounded-none bg-muted border border-border/40">
          <AvatarImage src={user?.avatar} className="object-cover" />
          <AvatarFallback className="bg-muted text-foreground font-bold text-[10px] uppercase">
            {user?.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <Textarea 
            placeholder="Declare your signal..." 
            className="border-none shadow-none focus-visible:ring-0 text-sm font-medium p-0 min-h-[80px] resize-none bg-transparent placeholder:text-muted-foreground/20 leading-relaxed italic"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {banner && (
            <div className="relative rounded-none overflow-hidden border border-primary/20 aspect-video max-h-48 group">
              <img src={banner} alt="preview" className="w-full h-full object-cover opacity-60" />
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-2 right-2 rounded-none h-6 w-6 bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setBanner("")}
              >
                <span className="text-[10px] font-bold">✕</span>
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center h-8 px-3 rounded-none bg-muted/20 border border-border/10">
                <input 
                  type="text"
                  placeholder="Link Archive..."
                  className="bg-transparent border-none text-[9px] font-bold uppercase tracking-widest text-foreground focus:outline-none placeholder:text-muted-foreground/10 w-32"
                  value={banner}
                  onChange={(e) => setBanner(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/20 hover:text-primary transition-colors">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={handleCreatePost}
              disabled={!content.trim() || isPosting}
              className="btn-primary h-9 px-8"
            >
              {isPosting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Broadcast"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
