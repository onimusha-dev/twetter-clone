import React from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentInputProps {
  newComment: string;
  setNewComment: (val: string) => void;
  isPosting: boolean;
  handlePostComment: () => void;
}

export function CommentInput({
  newComment,
  setNewComment,
  isPosting,
  handlePostComment,
}: CommentInputProps) {
  return (
    <div className="minimal-card p-6 border-primary/10 bg-secondary/30">
      <div className="flex gap-4">
        <div className="flex-1 space-y-4">
          <Textarea 
            placeholder="Inject your feedback signal into the archival node..." 
            className="border-none shadow-none focus-visible:ring-0 text-sm font-medium p-0 min-h-[60px] resize-none bg-transparent placeholder:text-muted-foreground/20 leading-relaxed italic"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-between items-center pt-4 border-t border-border/10">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/40 italic">Signal Transmission Ready</span>
            <Button 
              onClick={handlePostComment}
              disabled={!newComment.trim() || isPosting}
              className="btn-primary"
            >
              {isPosting ? <Loader2 className="h-3 w-3 animate-spin" /> : <><Send className="h-3 w-3 mr-2" /> Broadcast</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
