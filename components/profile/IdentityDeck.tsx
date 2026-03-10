import React from "react";
import { Calendar, Link as LinkIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/hooks/useProfile";
import { StatCard } from "./StatCard";

interface IdentityDeckProps {
  profile: UserProfile;
  transmissionCount: number;
}

export function IdentityDeck({ profile, transmissionCount }: IdentityDeckProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-8 mb-12">
          <Avatar className="h-24 w-24 rounded-none border border-border/40 bg-muted/20">
              <AvatarImage src={profile.avatar} className="object-cover" />
              <AvatarFallback className="text-3xl font-bold uppercase">{profile.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
              <div className="space-y-1">
                  <h2 className="text-4xl font-bold tracking-tighter uppercase italic">{profile.name}</h2>
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">@{profile.username}</span>
                      <span className="badge-warm px-2 py-0.5">Verified Identity</span>
                  </div>
              </div>
              
              <p className="text-sm font-medium leading-relaxed italic text-foreground/70 max-w-xl border-l-2 border-primary/10 pl-4 py-1">
                  {profile.bio || "No transmission bio available for this entity node."}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-6 pt-2">
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30 italic">
                      <Calendar className="h-3 w-3" />
                      <span>Established: {new Date(profile.createdAt || "").toLocaleDateString()}</span>
                  </div>
                  {profile.link && (
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors">
                      <LinkIcon className="h-3 w-3" />
                      <a href={profile.link.startsWith('http') ? profile.link : `https://${profile.link}`} target="_blank" rel="noopener noreferrer">
                          {profile.link.replace(/^https?:\/\//, '')}
                      </a>
                  </div>
                  )}
              </div>
          </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Followers" value="1.2k" />
          <StatCard label="Following" value="842" />
          <StatCard label="Transmissions" value={transmissionCount} />
          <StatCard label="Signal Integrity" value="98%" />
      </div>
    </div>
  );
}
