"use client";

import React, { useMemo } from "react";
import {
  Skull,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  Briefcase,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface FailureReasonInfo {
  category: string;
  startup: {
    name: string;
    fundingRaised: number;
  };
}

interface PatternsClientProps {
  failureReasons: FailureReasonInfo[];
}

const COLORS = [
  "#457b9d", // Brand Steel Blue
  "#a8dadc", // Brand Powder Teal
  "#ffb703", // Brand Golden Sand
  "#eae2d8", // Brand Chalk White
  "#e63946", // Brand Poppy Red
  "#f4a261", // Brand Sandy Orange
  "#5998be",
  "#d8cdbc",
];

export default function PatternsClient({ failureReasons }: PatternsClientProps) {
  // Aggregate data by category
  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    const funding: Record<string, number> = {};
    const startupsList: Record<string, string[]> = {};

    failureReasons.forEach((r) => {
      const cat = r.category;
      counts[cat] = (counts[cat] || 0) + 1;
      funding[cat] = (funding[cat] || 0) + r.startup.fundingRaised;
      
      if (!startupsList[cat]) startupsList[cat] = [];
      if (!startupsList[cat].includes(r.startup.name)) {
        startupsList[cat].push(r.startup.name);
      }
    });

    return Object.keys(counts).map((cat) => ({
      category: cat,
      count: counts[cat],
      totalFundingLost: Math.round(funding[cat] * 10) / 10,
      startups: startupsList[cat],
    })).sort((a, b) => b.totalFundingLost - a.totalFundingLost);
  }, [failureReasons]);

  // Compute total funding lost across all seeded records
  const totalFundingLostAll = useMemo(() => {
    const uniqueStartups = new Map<string, number>();
    failureReasons.forEach((r) => {
      uniqueStartups.set(r.startup.name, r.startup.fundingRaised);
    });
    return Array.from(uniqueStartups.values()).reduce((sum, f) => sum + f, 0);
  }, [failureReasons]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Failure Patterns</h1>
        <p className="text-muted-foreground mt-1.5">
          Deep-dive analysis of failure modes across our database, measuring occurrences and capital losses.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Capital Studied
            </p>
            <h3 className="text-3xl font-bold">${totalFundingLostAll.toFixed(1)}M</h3>
            <p className="text-xs text-muted-foreground mt-1">VC funds tracked inside graveyard</p>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-lg">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        <div className="rounded-xl bg-card border border-border p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Primary Killer Mode
            </p>
            <h3 className="text-3xl font-bold text-rose-500">Product Market Fit</h3>
            <p className="text-xs text-muted-foreground mt-1">Found in 7 out of 10 collapses</p>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-500 rounded-lg">
            <Skull className="h-6 w-6" />
          </div>
        </div>

        <div className="rounded-xl bg-card border border-border p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Second Major Vector
            </p>
            <h3 className="text-3xl font-bold text-amber-500">CAC Escalation</h3>
            <p className="text-xs text-muted-foreground mt-1">Inefficient marketing spend ratios</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Charts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Funding Lost by Category */}
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Capital Loss by Failure Mode ($M)</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sum of funding lost by startups experiencing each failure type
            </p>
          </div>
          <div className="h-80 w-full">
            {stats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
                  <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "var(--radius)",
                      color: "var(--foreground)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="totalFundingLost" radius={[0, 4, 4, 0]}>
                    {stats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No statistics loaded.
              </div>
            )}
          </div>
        </div>

        {/* Chart 2: Frequency Distribution */}
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Occurrence Frequency</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Number of startups in database affected by each failure category
            </p>
          </div>
          <div className="h-80 w-full flex items-center justify-center">
            {stats.length > 0 ? (
              <div className="h-full w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="h-64 w-64 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={2}
                        dataKey="count"
                        nameKey="category"
                      >
                        {stats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          borderColor: "var(--border)",
                          borderRadius: "var(--radius)",
                          color: "var(--foreground)",
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 w-full space-y-1.5 max-h-64 overflow-y-auto pr-2">
                  {stats.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-xs p-1.5 rounded-md hover:bg-secondary/40">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="font-semibold">{entry.category}</span>
                      </div>
                      <span className="text-muted-foreground font-bold">{entry.count} cases</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No statistics loaded.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Case Studies Group By Failure Reason */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-muted-foreground" />
          Failure Pattern Diagnostic Cards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-border bg-card shadow-xs space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="font-extrabold text-sm flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  {item.category}
                </span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase">
                  ${item.totalFundingLost}M Total Lost
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Startups affected:{" "}
                {item.startups.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-block px-2 py-0.5 rounded-md bg-secondary text-foreground font-semibold text-[10px] mr-1.5"
                  >
                    {s}
                  </span>
                ))}
              </p>
              <div className="flex gap-2.5 items-start p-3 bg-background/50 rounded-lg border border-border/80">
                <Lightbulb className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <strong>Risk Mitigation:</strong>{" "}
                  {item.category === "Product Market Fit" && "Conduct deep Customer Discovery interviews, run low-cost smoke tests, and pre-sell before building core technologies."}
                  {item.category === "Customer Acquisition Cost" && "Build organic discovery loops (viral content, utility tools, word-of-mouth hooks) to keep LTV/CAC ratio above 3.0."}
                  {item.category === "Monetization" && "Ensure margins cover variable costs immediately; implement dynamic or seat-based B2B contracts instead of subsidizing user activities."}
                  {item.category === "Competition" && "Maintain distinct positioning or vertical focus; compete on proprietary integrations rather than copying core features."}
                  {item.category === "Market Timing" && "Monitor platform shifts (iOS updates, regulations, AI advancements) and launch quickly to validate habits."}
                  {item.category === "Operations" && "Scale personnel in response to actual recurring revenues. Automate workflows instead of hiring heavy support staffs."}
                  {item.category === "Technology" && "Avoid speculative R&D pipelines. Validate science thoroughly or rely on proven standard open-source API infrastructures."}
                  {item.category === "Team Issues" && "Align compensation with milestone delivery. Ensure founders share product philosophies and maintain clear governance structures."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
