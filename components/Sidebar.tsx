"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  Newspaper,
  User,
  Terminal,
  LogOut,
  Zap,
  MoreHorizontal,
  Settings
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";

export function Sidebar() {
  const pathname = usePathname();
  const { user, isLoading: loading } = useUser();

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Journal", path: "/articles", icon: Newspaper },
    { name: "Identity", path: "/profile", icon: User },
    { name: "Status", path: "/health", icon: Terminal },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="hidden md:flex flex-col h-full px-8 py-12 justify-between border-r border-border/40 bg-background">
      <div className="space-y-12">
        <Link href="/" className="px-1 flex items-center gap-3">
          <Zap className="h-6 w-6 text-primary fill-current" />
          <span className="font-bold text-2xl tracking-tighter uppercase italic leading-none text-foreground">Zerra</span>
        </Link>

        <nav className="space-y-8 pt-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-5 py-2 transition-all group",
                  isActive
                    ? "text-primary translate-x-1"
                    : "text-primary/20 hover:text-primary hover:translate-x-1"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "stroke-[2.5px]")} />
                <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", isActive && "italic")}>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-8">
        {user && (
            <Button 
                className="btn-primary w-full h-10"
                onClick={() => window.dispatchEvent(new CustomEvent('open-new-post'))}
            >
                Transmit Signal
            </Button>
        )}
        
        <div className="pt-8 border-t border-border/10">
            {loading ? (
            <div className="h-8 w-full animate-pulse bg-muted rounded-none" />
            ) : user ? (
            <Link href={`/profile?username=${user.username}`} className="flex items-center gap-4 overflow-hidden group">
                <Avatar className="h-9 w-9 rounded-none bg-muted border border-border/40 group-hover:border-primary/40 transition-colors">
                    <AvatarImage src={user.avatar} className="object-cover" />
                    <AvatarFallback className="bg-muted text-foreground font-bold text-[10px] uppercase">{(user.name || "U")[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                    <span className="font-bold text-sm truncate tracking-tight group-hover:text-primary transition-colors leading-none uppercase">{user.name}</span>
                    <span className="text-muted-foreground/60 text-[9px] font-bold truncate uppercase tracking-widest mt-1">@{user.username}</span>
                </div>
            </Link>
            ) : (
            <Link href="/auth/login" className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/60 hover:text-primary transition-colors italic">Log Into Core</Link>
            )}
        </div>
      </div>
    </div>
  );
}
