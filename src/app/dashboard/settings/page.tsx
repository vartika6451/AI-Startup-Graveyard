"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/lib/context/theme";
import {
  Sun,
  Moon,
  RotateCcw,
  Sliders,
  Database,
  Info,
} from "lucide-react";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [delay, setDelay] = useState(2000);
  const [resetting, setResetting] = useState(false);

  // Sync delay setting with localStorage
  useEffect(() => {
    const savedDelay = localStorage.getItem("mockDelay");
    if (savedDelay) {
      setDelay(parseInt(savedDelay));
    }
  }, []);

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setDelay(val);
    localStorage.setItem("mockDelay", val.toString());
  };

  const handleResetDB = async () => {
    if (!confirm("Are you sure you want to reset the database? All custom validation runs will be deleted, and the 10 failed startup examples will be re-seeded.")) {
      return;
    }

    setResetting(true);
    try {
      const res = await fetch("/api/db/reset", {
        method: "POST",
      });

      if (res.ok) {
        alert("Database successfully reset and re-seeded!");
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
    <div className="max-w-3xl space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1.5">
          Configure interface appearance, simulated intelligence delays, and reset database structures.
        </p>
      </div>

      <div className="space-y-6">
        {/* Card 1: Theme Settings */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Sun className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Interface Theme</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Customize the look and feel of your Startup Graveyard dashboard. Dark mode is optimized for high-contrast data visualization.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => { if (theme !== "light") toggleTheme(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-lg text-sm font-semibold transition-all ${
                theme === "light"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Sun className="h-4 w-4" />
              Light Mode
            </button>
            <button
              onClick={() => { if (theme !== "dark") toggleTheme(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-lg text-sm font-semibold transition-all ${
                theme === "dark"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Moon className="h-4 w-4" />
              Dark Mode
            </button>
          </div>
        </div>

        {/* Card 2: AI Loading Latency */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Sliders className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-sm uppercase tracking-wider">AI Simulation Delay</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Configure the simulated delay when generating due diligence reports. This mimics real-time AI processing speeds and allows verifying system loading animations.
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-muted-foreground">Response Delay</span>
              <span className="text-primary font-mono">{(delay / 1000).toFixed(1)} seconds</span>
            </div>
            <input
              type="range"
              min="500"
              max="6000"
              step="500"
              value={delay}
              onChange={handleDelayChange}
              className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
              <span>0.5s (Fast)</span>
              <span>3.0s (Recommended)</span>
              <span>6.0s (Heavy Analysis)</span>
            </div>
          </div>
        </div>

        {/* Card 3: Database Reset */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Database className="h-5 w-5 text-rose-500" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-rose-500">Danger Zone</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Performing a database reset will erase all custom analysis records, clear validation logs, and restore the default 10 seeded failed startups (Quibi, Juicero, etc.) back to their original states.
          </p>
          <button
            onClick={handleResetDB}
            disabled={resetting}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm transition-all shadow-md shadow-rose-500/10 disabled:opacity-50"
          >
            <RotateCcw className={`h-4 w-4 ${resetting ? "animate-spin" : ""}`} />
            {resetting ? "Resetting Database..." : "Reset and Reseed Database"}
          </button>
        </div>

        {/* Card 4: Architecture Info */}
        <div className="rounded-xl bg-primary/5 border border-primary/10 p-5 shadow-sm flex gap-3.5 items-start">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-foreground">MVP Architecture Specs</h4>
            <p className="text-muted-foreground leading-relaxed">
              This system is built using Next.js 15 App Router, TypeScript, Tailwind CSS v4, and Prisma ORM connected to a local PostgreSQL instance. No external API keys are required for this sandbox release.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
