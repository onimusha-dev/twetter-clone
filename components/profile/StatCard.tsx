import React from "react";

export function StatCard({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="minimal-card p-6 border-border/10 hover:border-primary/20 group transition-all">
      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/20 group-hover:text-primary/40 transition-colors mb-2 block">{label}</span>
      <span className="text-2xl font-bold tracking-tighter italic text-foreground/80 group-hover:text-primary transition-colors">{value}</span>
    </div>
  );
}
