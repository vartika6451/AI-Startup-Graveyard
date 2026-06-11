"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/lib/context/theme";
import { useAuth } from "@/lib/context/auth";
import {
  LayoutDashboard,
  Sparkles,
  Database,
  BarChart3,
  TrendingUp,
  History,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  Skull,
  RotateCcw,
  LogOut,
} from "lucide-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analyze Startup", href: "/dashboard/analyze", icon: Sparkles },
  { name: "Startup Database", href: "/dashboard/database", icon: Database },
  { name: "Failure Patterns", href: "/dashboard/patterns", icon: BarChart3 },
  { name: "Market Trends", href: "/dashboard/trends", icon: TrendingUp },
  { name: "Saved Reports", href: "/dashboard/saved", icon: History },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Protected Route Logic
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleResetDB = async () => {
    if (!confirm("Are you sure you want to reset and reseed the database? This deletes all current analysis history.")) {
      return;
    }
    setResetting(true);
    try {
      const res = await fetch("/api/db/reset", { method: "POST" });
      if (res.ok) {
        alert("Database successfully reset and re-seeded!");
        window.location.reload();
      } else {
        alert("Failed to reset database.");
      }
    } catch (err) {
      console.error(err);
      alert("Error resetting database.");
    } finally {
      setResetting(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#122336] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Skull className="h-10 w-10 text-primary animate-bounce" />
          <div className="h-1.5 w-24 bg-secondary rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-primary rounded-full animate-infinite-scroll shimmer-bg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col md:flex-row">
      {/* Mobile Navigation Bar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 bg-card border-b border-border shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Skull className="h-6 w-6 text-primary animate-pulse" />
          <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-primary to-[#ffb703] bg-clip-text text-transparent">
            STARTUP GRAVEYARD
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-muted-foreground hover:text-foreground focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col w-72 max-w-xs bg-card border-r border-border p-6 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between mb-8">
              <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <Skull className="h-6 w-6 text-primary" />
                <span className="font-bold text-base tracking-wider bg-gradient-to-r from-primary to-[#ffb703] bg-clip-text text-transparent">
                  SG INTELLIGENCE
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-border mt-auto space-y-3.5">
              {/* User Profile Info */}
              {user && (
                <div className="flex items-center gap-3 px-2 py-1">
                  <div className="h-9 w-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm uppercase tracking-wide border border-primary/20 shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-sm">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>Theme</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 transition-all font-bold"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>

              <button
                onClick={handleResetDB}
                disabled={resetting}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-border/80 bg-transparent text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                <RotateCcw className={`h-3.5 w-3.5 ${resetting ? "animate-spin" : ""}`} />
                {resetting ? "Resetting..." : "Reset Seed Data"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border shrink-0 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Skull className="h-6 w-6 text-primary" />
            <span className="font-bold text-base tracking-wider bg-gradient-to-r from-primary to-[#ffb703] bg-clip-text text-transparent">
              STARTUP GRAVEYARD
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border mt-auto space-y-3.5">
          {/* User Profile Info */}
          {user && (
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="h-9 w-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs uppercase tracking-wide border border-primary/20 shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user.role}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              <span>Theme</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 transition-all font-bold"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log out</span>
            </button>
          </div>

          <button
            onClick={handleResetDB}
            disabled={resetting}
            className="flex items-center justify-center gap-2 w-full py-1.5 rounded-md border border-border/60 bg-transparent text-[10px] text-muted-foreground/60 hover:text-foreground hover:bg-secondary transition-all"
          >
            <RotateCcw className={`h-3 w-3 ${resetting ? "animate-spin" : ""}`} />
            {resetting ? "Resetting..." : "Reset Seed Data"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 bg-card/60 backdrop-blur-md border-b border-border shadow-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
              System Active
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground">
              Intelligence Engine: <span className="font-semibold text-foreground">v1.0.0 (Mock AI)</span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
