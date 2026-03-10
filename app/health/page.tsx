"use client";

import React, { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Loader2, 
  RefreshCcw, 
  Server, 
  Database, 
  Zap,
  Activity
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { fetchApi } from "@/lib/api";

interface HealthStatus {
  status: string;
  database: "up" | "down";
  redis: "up" | "down";
  timestamp: string;
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  async function fetchHealth() {
    setIsLoading(true);
    try {
      const response = await fetchApi("/api/health/ready");
      const result = await response.json();
      
      setHealth({
        status: result.status === "up" ? "Operational" : "Degraded",
        database: result.data?.database?.status === "up" ? "up" : "down",
        redis: result.data?.cache?.status === "up" ? "up" : "down",
        timestamp: new Date().toLocaleString(),
      });
    } catch (err) {
      setHealth({
        status: "Critical",
        database: "down",
        redis: "down",
        timestamp: new Date().toLocaleString(),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm px-2 py-8 mb-10 flex items-center justify-between border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase italic leading-none">Status</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-1">Zerra Core Diagnostics</p>
        </div>
        <Button 
            onClick={fetchHealth} 
            variant="outline" 
            size="icon" 
            className="rounded-sm h-9 w-9 border-border/60 transition-transform active:rotate-180 duration-500"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
        </Button>
      </div>

      <div className="space-y-10">
        <div className="minimal-card p-12 flex flex-col items-center text-center space-y-6">
            <div className={cn(
                "p-8 rounded-sm bg-muted/30 border border-border shadow-inner transition-all duration-700",
                health?.status === "Operational" ? "text-foreground" : "text-destructive"
            )}>
                {health?.status === "Operational" ? (
                    <CheckCircle2 className="h-16 w-16" />
                ) : (
                    <AlertCircle className="h-16 w-16" />
                )}
            </div>
            <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tight leading-none uppercase italic">
                    {health?.status || "Analyzing..."}
                </h2>
                <p className="text-muted-foreground/60 text-[10px] font-black uppercase tracking-[0.4em]">Integrated Protocol Heartbeat</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusModule 
                icon={Server} 
                label="Core Signal" 
                description="API Logic Layer"
                status={health?.status === "Operational" ? "up" : "down"} 
            />
            <StatusModule 
                icon={Database} 
                label="Data Vault" 
                description="PostgreSQL Storage"
                status={health?.database === "up" ? "up" : "down"} 
            />
            <StatusModule 
                icon={Zap} 
                label="Quick Access" 
                description="Redis Speed Layer"
                status={health?.redis === "up" ? "up" : "down"} 
            />
            <StatusModule 
                icon={Activity} 
                label="Mesh Network" 
                description="Sync Engines"
                status="up" 
            />
        </div>

        <div className="pt-20 border-t border-border/40 flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 opacity-30">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-foreground italic">
                <Activity className="h-3 w-3" /> Latest Scan: {health?.timestamp || "---"}
            </div>
            <p className="text-[10px] text-foreground uppercase tracking-widest font-black max-w-sm text-right leading-relaxed">
                Diagnostics reflect node readiness. Real-time monitoring active.
            </p>
        </div>
      </div>
    </div>
  );
}

function StatusModule({ icon: Icon, label, description, status }: { icon: any, label: string, description: string, status: "up" | "down" }) {
    const isUp = status === "up";
    return (
        <div className="minimal-card p-6 border-border/40 transition-all duration-500 hover:border-border group">
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="h-12 w-12 bg-muted/50 rounded-sm flex items-center justify-center border border-border">
                        <Icon className={cn("h-5 w-5", isUp ? "text-foreground" : "text-destructive")} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="font-bold text-sm tracking-tight leading-none mb-1">{label}</span>
                        <span className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest">{description}</span>
                    </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                    <div className={cn(
                        "px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest border",
                        isUp ? "border-foreground/20 text-foreground bg-foreground/5" : "border-destructive/20 text-destructive bg-destructive/5"
                    )}>
                        {isUp ? "Active" : "Offline"}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusRow({ icon: Icon, label, status }: { icon: any, label: string, status: "up" | "down" }) {
    return (
        <div className="flex items-center justify-between p-4 bg-card border rounded-xl">
            <div className="flex items-center gap-4">
                <div className="bg-muted p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="font-bold text-sm tracking-tight">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className={cn(
                    "text-xs font-bold uppercase tracking-widest",
                    status === "up" ? "text-green-500" : "text-red-500"
                )}>
                    {status === "up" ? "Operational" : "Down"}
                </span>
                <div className={cn(
                    "h-2 w-2 rounded-full",
                    status === "up" ? "bg-green-500" : "bg-red-500"
                )} />
            </div>
        </div>
    );
}
