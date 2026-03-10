"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  History, 
  Home, 
  LogIn, 
  Menu, 
  Newspaper,
  Settings, 
  User, 
  UserPlus, 
  X,
  Zap,
  Activity
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    { name: "Home", path: "/", icon: Home },
    { name: "Feed", path: "/posts", icon: Zap },
    { name: "Articles", path: "/articles", icon: Newspaper },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Status", path: "/health", icon: Activity },
  ];

  const authRoutes = [
    { name: "Login", path: "/auth/login", icon: LogIn },
    { name: "Join", path: "/auth/register", icon: UserPlus },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md py-2 border-border shadow-sm" 
          : "bg-transparent py-4 border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
             <Zap className="h-5 w-5 text-primary-foreground fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Zerra
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {routes.map((route) => (
              <li key={route.path}>
                <Link 
                  href={route.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                    pathname === route.path 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-3">
             {authRoutes.map((route) => (
                <Button 
                  key={route.path}
                  variant={route.path === "/auth/register" ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link href={route.path}>
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.name}
                  </Link>
                </Button>
             ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-xl p-4 animate-in slide-in-from-top-4">
          <ul className="space-y-4">
            {[...routes, ...authRoutes].map((route) => (
               <li key={route.path}>
                 <Link 
                    href={route.path}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === route.path 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted"
                    )}
                    onClick={() => setIsOpen(false)}
                 >
                    <route.icon className="h-5 w-5" />
                    {route.name}
                 </Link>
               </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
