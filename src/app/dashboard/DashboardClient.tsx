"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Skull,
  FileSpreadsheet,
  AlertTriangle,
  ArrowRight,
  Flame,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DashboardClientProps {
  startupsCount: number;
  analysesCount: number;
  failureCategoryCounts: { category: string; count: number }[];
  recentAnalyses: { id: string; startupIdea: string; createdAt: Date }[];
  marketTrends: { id: string; industry: string; trend: string; growthRate: number }[];
}

const COLORS = ["#457b9d", "#a8dadc", "#ffb703", "#eae2d8", "#e63946", "#f4a261", "#5998be", "#d8cdbc"];

export default function DashboardClient({
  startupsCount,
  analysesCount,
  failureCategoryCounts,
  recentAnalyses,
  marketTrends,
}: DashboardClientProps) {
  // Format data for chart
  const chartData = failureCategoryCounts.map((c) => ({
    name: c.category,
    count: c.count,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Intelligence Dashboard</h1>
        <p className="text-muted-foreground mt-1.5">
          Overview of global startup failure statistics and custom idea validations.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Failed Startups Studied
            </p>
            <h3 className="text-3xl font-bold">{startupsCount}</h3>
            <p className="text-xs text-muted-foreground mt-1">Pre-populated VC-grade logs</p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-500 rounded-lg">
            <Skull className="h-6 w-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Ideas Validated
            </p>
            <h3 className="text-3xl font-bold">{analysesCount}</h3>
            <p className="text-xs text-muted-foreground mt-1">Saved intelligence reports</p>
          </div>
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Average Market Risk
            </p>
            <h3 className="text-3xl font-bold text-amber-500">68%</h3>
            <p className="text-xs text-muted-foreground mt-1">High capital intensity risk</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Top Failure Category
            </p>
            <h3 className="text-2xl font-bold text-emerald-500 truncate max-w-[170px]">
              No Market Fit
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Found in 40% of cases</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg">
            <Flame className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Charts & Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Charts & Visuals */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Card */}
          <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold">Failure Reasons Distribution</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Primary causes of failure computed from historical records
                </p>
              </div>
            </div>
            <div className="h-80 w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "currentColor", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "currentColor", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "var(--radius)",
                        color: "var(--foreground)",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  No chart data available. Database may be empty.
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Promo */}
          <div className="rounded-xl bg-gradient-to-r from-primary/15 to-indigo-500/5 border border-primary/20 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold tracking-tight">Evaluate Your Own Startup Idea</h3>
              <p className="text-muted-foreground text-sm max-w-lg">
                Run our AI validation engine to dissect market sizing, execution risk, similar postmortems, and generate structured pivot recommendations.
              </p>
            </div>
            <Link
              href="/dashboard/analyze"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-md shadow-primary/20 transition-all shrink-0"
            >
              Analyze Idea
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Lists & Details */}
        <div className="space-y-8">
          {/* Recent Runs */}
          <div className="rounded-xl bg-card border border-border p-6 shadow-sm flex flex-col h-[350px]">
            <h3 className="text-lg font-bold mb-4">Recent Valuations</h3>
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {recentAnalyses.length > 0 ? (
                recentAnalyses.map((run) => {
                  const nameParts = run.startupIdea.split(":");
                  const name = nameParts[0] || "Unnamed Idea";
                  const desc = nameParts.slice(1).join(":") || run.startupIdea;
                  return (
                    <Link
                      key={run.id}
                      href={`/dashboard/analyze?load=${run.id}`}
                      className="block p-3 rounded-lg border border-border hover:border-primary bg-background/50 hover:bg-secondary/40 transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-sm group-hover:text-primary transition-colors truncate max-w-[150px]">
                          {name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(run.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {desc.trim()}
                      </p>
                    </Link>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-4">
                  <FileSpreadsheet className="h-10 w-10 stroke-1 mb-2 opacity-50" />
                  <p className="text-xs">No ideas validated yet.</p>
                  <Link
                    href="/dashboard/analyze"
                    className="text-xs text-primary font-semibold hover:underline mt-2 flex items-center gap-1"
                  >
                    Analyze your first idea
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
            {recentAnalyses.length > 0 && (
              <Link
                href="/dashboard/saved"
                className="text-xs text-primary font-semibold hover:underline mt-4 text-center block"
              >
                View all saved reports
              </Link>
            )}
          </div>

          {/* Market Trend Leaders */}
          <div className="rounded-xl bg-card border border-border p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold mb-4">Market Trend Leaders</h3>
            <div className="space-y-4">
              {marketTrends.slice(0, 3).map((trend) => (
                <div key={trend.id} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-background/40">
                  <div className="space-y-0.5 max-w-[70%]">
                    <span className="font-semibold text-xs text-foreground block">{trend.industry}</span>
                    <p className="text-[10px] text-muted-foreground line-clamp-2 leading-normal">
                      {trend.trend}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md shrink-0">
                    <TrendingUp className="h-3 w-3" />
                    +{trend.growthRate}%
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/trends"
              className="text-xs text-primary font-semibold hover:underline mt-4 text-center block"
            >
              View all industry metrics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
