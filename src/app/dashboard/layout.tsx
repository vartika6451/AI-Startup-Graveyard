"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/context/theme";
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
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

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
            <div className="pt-4 border-t border-border mt-auto space-y-3">
              <button
                onClick={handleResetDB}
                disabled={resetting}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary text-sm transition-all"
              >
                <RotateCcw className={`h-4 w-4 ${resetting ? "animate-spin" : ""}`} />
                {resetting ? "Resetting..." : "Reset Database"}
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary text-sm transition-all"
              >
                <span>Theme Mode</span>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
        <div className="p-4 border-t border-border mt-auto space-y-2.5">
          <button
            onClick={handleResetDB}
            disabled={resetting}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${resetting ? "animate-spin" : ""}`} />
            {resetting ? "Resetting..." : "Reset Seed Data"}
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
