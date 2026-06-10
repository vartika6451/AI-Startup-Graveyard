"use client";

import React from "react";
import { TrendingUp, Sparkles, AlertTriangle, Layers, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TrendItem {
  id: string;
  industry: string;
  trend: string;
  growthRate: number;
}

interface TrendsClientProps {
  trends: TrendItem[];
}

const COLORS = ["#457b9d", "#a8dadc", "#ffb703", "#eae2d8", "#e63946", "#f4a261", "#5998be", "#d8cdbc"];

export default function TrendsClient({ trends }: TrendsClientProps) {
  // Sort trends by growth rate for display
  const sortedTrends = [...trends].sort((a, b) => b.growthRate - a.growthRate);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Market Trends</h1>
        <p className="text-muted-foreground mt-1.5">
          Review growth dynamics, technology shifts, and systemic risks across critical industry segments.
        </p>
      </div>

      {/* Grid: Chart & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart Card */}
        <div className="lg:col-span-2 rounded-xl bg-card border border-border p-6 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Annual Growth Rates by Sector (%)</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Comparison of current growth rates across major startup categories
            </p>
          </div>
          <div className="h-72 w-full">
            {sortedTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedTrends} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="industry" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "var(--radius)",
                      color: "var(--foreground)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="growthRate" radius={[4, 4, 0, 0]}>
                    {sortedTrends.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No trends data available.
              </div>
            )}
          </div>
        </div>

        {/* Diagnostic Insights Panel */}
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Viability Benchmarks</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Venture capital metrics indicate that sectors with growth rates above <strong className="text-emerald-500">&gt;15%</strong> represent high opportunity indices but carry proportional competition and speed-to-market risks.
            </p>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border">
              <Sparkles className="h-5 w-5 text-primary shrink-0" />
              <div>
                <span className="font-bold text-foreground block">AI Advantage Node</span>
                <span className="text-muted-foreground text-[10px]">Generative automation provides up to 40% margin improvements.</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <span className="font-bold text-foreground block">Capital Intensity Alert</span>
                <span className="text-muted-foreground text-[10px]">On-Demand services are stabilizing, focus strictly on positive margins.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Details Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Layers className="h-5 w-5 text-muted-foreground" />
          Industry Deep-dives & Signals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTrends.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-primary/40 transition-all flex flex-col justify-between h-[220px]"
            >
              <div className="space-y-3.5">
                <div className="flex justify-between items-start">
                  <span className="font-extrabold text-sm">{item.industry}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-md border border-emerald-500/20 flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />
                    +{item.growthRate}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                  {item.trend}
                </p>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground mt-4">
                <span>Signal Strength: <strong className="text-foreground">Strong</strong></span>
                <span>Audit Risk Level: <strong className="text-foreground">{item.growthRate > 15 ? "Medium" : "Low"}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
