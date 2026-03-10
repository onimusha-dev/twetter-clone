import React from "react";

export function HomeHeader() {
  return (
    <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-12 md:px-12 mb-8 border-b border-border/10 flex items-center justify-between">
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic leading-none text-foreground">Transmission Hub</h1>
        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-primary mt-2">Accessing Encrypted Nodes</p>
      </div>
      <div className="flex items-center gap-6">
           <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/40" />
           <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 leading-none">Sync Status: Active</span>
      </div>
    </div>
  );
}
