"use client";

import React, { useEffect, useState } from "react";
import { 
  ArrowLeft,
  Check,
  Globe,
  Loader2, 
  LogOut, 
  Mail, 
  Settings, 
  Shield, 
  Trash2, 
  User 
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  link?: string;
  avatar?: string;
  timezone?: string;
  twoFactorEnabled?: boolean;
}

import { fetchApi } from "@/lib/api";

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetchApi("/api/users/me");
      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
      } else {
        if (response.status === 401) router.push("/auth/login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const payload: any = {};
    const fields = ["name", "username", "bio", "link", "avatar", "timezone"];
    fields.forEach(field => {
      const val = formData.get(field) as string;
      if (val && val.trim() !== "") {
        payload[field] = val;
      }
    });

    try {
      const response = await fetchApi("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
        setSuccess("Identity updated.");
      } else {
        setError(result.message || "Archive failure.");
      }
    } catch (err) {
      setError("Synchronization error.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4 opacity-30">
      <Loader2 className="h-8 w-8 animate-spin text-foreground" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Accessing Identity</span>
    </div>
  );

  if (!profile) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm px-2 py-8 mb-10 flex items-center justify-between border-b border-border/40">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-sm h-9 w-9 border-border/60" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase italic leading-none">Identity</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-1">Persona Configuration</p>
          </div>
        </div>
        <Button 
            form="profile-form"
            type="submit"
            disabled={isSaving}
            className="rounded-sm font-black text-[10px] uppercase tracking-widest px-8 h-10 bg-foreground text-background"
        >
            {isSaving ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Check className="h-3 w-3 mr-2" />}
            Commit
        </Button>
      </div>

      <div className="max-w-4xl mx-auto w-full pb-32 px-2">
         <form id="profile-form" onSubmit={updateProfile} className="space-y-12">
            <div className="minimal-card p-10 border-border/60">
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-border/40 pb-6">
                        <div>
                            <h3 className="text-xl font-bold tracking-tight uppercase italic leading-none">Persona Parameters</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Adjust your digital representation.</p>
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive" className="rounded-sm border-destructive/20 bg-destructive/5">
                            <AlertDescription className="text-[10px] font-black uppercase tracking-widest">{error}</AlertDescription>
                        </Alert>
                    )}
                    {success && (
                        <Alert className="rounded-sm border-foreground/20 bg-muted/20 text-foreground">
                            <Check className="h-4 w-4 mr-3" />
                            <AlertDescription className="text-[10px] font-black uppercase tracking-widest">{success}</AlertDescription>
                        </Alert>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Cleartext Name</Label>
                            <Input id="name" name="name" defaultValue={profile.name} required className="h-12 rounded-sm bg-muted/30 border-border/40 px-4 font-bold tracking-tight focus-visible:ring-0" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Network Handle</Label>
                            <Input id="username" name="username" defaultValue={profile.username} required className="h-12 rounded-sm bg-muted/30 border-border/40 px-4 font-bold tracking-tight focus-visible:ring-0" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Transmission Vector (Bio)</Label>
                        <Textarea 
                            id="bio" 
                            name="bio" 
                            defaultValue={profile.bio}
                            className="min-h-[150px] rounded-sm bg-muted/30 border-border/40 p-6 text-base font-medium focus-visible:ring-0 resize-none leading-relaxed italic"
                            placeholder="Identify your essence..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label htmlFor="link" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">External Data Node</Label>
                            <Input id="link" name="link" defaultValue={profile.link} placeholder="https://..." className="h-12 rounded-sm bg-muted/30 border-border/40 px-4 font-bold tracking-tight focus-visible:ring-0" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="avatar" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Visual ID (URL)</Label>
                            <Input id="avatar" name="avatar" defaultValue={profile.avatar} placeholder="https://..." className="h-12 rounded-sm bg-muted/30 border-border/40 px-4 font-bold tracking-tight focus-visible:ring-0" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Temporal Node Alignment</Label>
                        <select 
                            id="timezone" 
                            name="timezone" 
                            defaultValue={profile.timezone || "UTC"}
                            className="flex h-12 w-full rounded-sm bg-muted/30 border border-border/40 px-4 py-1 text-sm shadow-none focus:ring-0 focus-visible:outline-none font-bold italic"
                        >
                            <option value="UTC">UTC (CORE)</option>
                            <option value="America/New_York">NEW YORK (NE)</option>
                            <option value="Europe/London">LONDON (EU)</option>
                            <option value="Asia/Tokyo">TOKYO (AS)</option>
                        </select>
                    </div>
                </div>
            </div>
         </form>

         <div className="mt-16 space-y-8">
            <h2 className="text-xl font-bold tracking-tighter uppercase italic leading-none px-1">Security Protocols</h2>
            
            <div className="minimal-card p-10 border-border/60">
                <div className="space-y-8">
                    <div className="flex items-center justify-between p-6 border border-border/40 rounded-sm">
                        <div className="flex items-center gap-6">
                            <div className="h-10 w-10 bg-muted/50 rounded-sm border border-border flex items-center justify-center">
                                <Shield className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold tracking-tight leading-none italic uppercase">Dual-Layer Sync</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Two-Factor Authentication</p>
                            </div>
                        </div>
                        <Switch checked={profile.twoFactorEnabled} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button 
                            variant="outline" 
                            className="h-16 rounded-sm border-border/40 hover:bg-muted/30 flex items-center justify-between px-6 group"
                            onClick={() => router.push('/settings')}
                        >
                            <div className="flex flex-col items-start gap-1">
                                <span className="font-bold text-[10px] uppercase tracking-widest italic">Secret Rotation</span>
                                <span className="text-[8px] text-muted-foreground/40 font-black uppercase tracking-[0.2em]">Change Password</span>
                            </div>
                            <ArrowLeft className="h-3 w-3 rotate-180 opacity-40 group-hover:opacity-100 transition-all" />
                        </Button>

                        <Button 
                            variant="outline" 
                            className="h-16 rounded-sm border-destructive/20 hover:bg-destructive/5 flex items-center justify-between px-6 group"
                            onClick={() => router.push('/settings')}
                        >
                            <div className="flex flex-col items-start gap-1">
                                <span className="font-bold text-[10px] uppercase tracking-widest italic text-destructive">Deconstruct Node</span>
                                <span className="text-[8px] text-destructive/40 font-black uppercase tracking-[0.2em]">Delete Identity</span>
                            </div>
                            <Trash2 className="h-3 w-3 text-destructive opacity-40 group-hover:opacity-100 transition-all" />
                        </Button>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
