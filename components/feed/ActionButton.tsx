import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ActionButton({ icon: Icon, count, color, active, onClick, href }: any) {
  const Component = href ? Link : 'button';
  return (
    <Component 
      href={href as string}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30 transition-colors group",
        active ? `text-${color}` : `hover:text-${color}`
      )}
    >
      <Icon className={cn("h-3.5 w-3.5", active && "fill-current")} />
      {count !== undefined && <span>{count}</span>}
    </Component>
  );
}
