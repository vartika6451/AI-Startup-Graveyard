"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Skull,
  Play,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  MapPin,
  TrendingDown,
  HelpCircle,
  Cpu,
  UserCheck,
  Building,
  Target,
  DollarSign,
  Layers,
  ArrowUpRight,
  ShieldCheck,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { StartupAnalysisResult } from "@/lib/services/analytics";

const EXAMPLES = [
  {
    name: "GradPrep AI",
    desc: "AI-powered interview preparation platform for college students",
  },
  {
    name: "InstaClean",
    desc: "Uber for premium residential home cleaning services",
  },
  {
    name: "CryptoVest",
    desc: "Micro-investing app that rounds up daily purchases and invests the change into fractional cryptocurrency assets.",
  },
  {
    name: "GeneHealth",
    desc: "Direct-to-consumer home blood analysis kit using custom micro-needles to screen for early vitamin deficiencies.",
  },
];

const CHART_COLORS = ["#457b9d", "#a8dadc", "#ffb703", "#eae2d8", "#e63946", "#f4a261", "#5998be", "#d8cdbc"];

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const loadId = searchParams.get("load");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StartupAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "risks" | "pivots">("summary");

  const loadingLogs = [
    "Initializing research validation channels...",
    "Scanning databases for similar startup postmortems...",
    "Evaluating competitive saturation levels...",
    "Correlating failure risk patterns (PMF, CAC, Burn)...",
    "Running financial viability simulations...",
    "Generating market readiness scores...",
    "Compiling strategic pivot recommendations...",
    "Finalizing VC due diligence verdict...",
  ];

  // Load saved report if requested
  useEffect(() => {
    if (loadId) {
      const fetchSavedReport = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/analyses");
          if (res.ok) {
            const list = await res.json();
            const match = list.find((item: any) => item.id === loadId);
            if (match) {
              setResult(match.analysisResult);
              // Extract name and desc from saved idea text
              const parts = match.startupIdea.split(":");
              setName(parts[0] || "");
              setDescription(parts.slice(1).join(":")?.trim() || "");
            } else {
              setError("Saved report not found.");
            }
          } else {
            setError("Failed to fetch reports.");
          }
        } catch (err) {
          setError("Error loading report.");
        } finally {
          setLoading(false);
        }
      };
      fetchSavedReport();
    }
  }, [loadId]);

  // Handle loading animations step-by-step
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      const delaySetting = localStorage.getItem("mockDelay") || "2000";
      const totalSteps = loadingLogs.length;
      const stepDuration = parseInt(delaySetting) / totalSteps;

      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < totalSteps - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, stepDuration);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const delaySetting = localStorage.getItem("mockDelay") || "2000";
    const startTime = Date.now();

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      // Enforce the mock delay from settings
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, parseInt(delaySetting) - elapsed);

      setTimeout(() => {
        setResult(data);
        setLoading(false);
        // Clean URL parameter if analyzing new idea
        if (loadId) {
          router.replace("/dashboard/analyze");
        }
      }, remaining);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  const loadExample = (ex: { name: string; desc: string }) => {
    setName(ex.name);
    setDescription(ex.desc);
  };

  // Helper component for Risk Meter Gauge
  const renderRiskGauge = (score: number) => {
    const radius = 50;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let color = "text-emerald-500";
    if (score > 45 && score < 70) color = "text-amber-500";
    if (score >= 70) color = "text-rose-500";

    return (
      <div className="relative flex items-center justify-center h-32 w-32 shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-muted"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            className={`${color} transition-all duration-500`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-extrabold">{score}%</span>
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Risk Score</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">AI Startup Validator</h1>
        <p className="text-muted-foreground mt-1.5">
          Submit your startup idea to dissect competitor failures, score execution risks, and map out strategic pivots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel: Form Input */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl bg-card border border-border p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-lg">Idea Profile</h3>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Startup Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. GradPrep AI"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Concept Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe target market, monetization, and technology..."
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold py-3 px-4 rounded-lg shadow-md shadow-primary/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Analyze Startup Idea"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Quick Fill Examples */}
            <div className="space-y-3 pt-4 border-t border-border">
              <span className="text-xs font-semibold text-muted-foreground block">
                Quick-fill Sandbox Examples:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.name}
                    type="button"
                    onClick={() => loadExample(ex)}
                    className="text-left text-xs p-2.5 rounded-lg border border-border/60 bg-background/50 hover:bg-secondary/40 hover:border-primary/50 transition-all truncate"
                  >
                    <span className="font-semibold text-foreground block mb-0.5">{ex.name}</span>
                    <span className="text-[10px] text-muted-foreground">{ex.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Analysis Results */}
        <div className="lg:col-span-8">
          {/* Awaiting Input / Empty State */}
          {!loading && !result && !error && (
            <div className="rounded-xl border border-dashed border-border p-12 text-center flex flex-col items-center justify-center h-[580px] bg-card/20 backdrop-blur-xs">
              <div className="p-4 rounded-full bg-secondary/50 border border-border/80 mb-4 animate-pulse">
                <Sparkles className="h-10 w-10 stroke-1 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">Awaiting Validation Profile</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2 leading-relaxed">
                Provide a startup name and description on the left. The validation engine will run structural competitor mappings, failure metrics, risk scoring, and pivots.
              </p>
            </div>
          )}

          {/* Loading State with Log Progress */}
          {loading && (
            <div className="rounded-xl border border-border bg-card p-12 text-center flex flex-col items-center justify-center h-[580px] shadow-sm">
              <div className="relative flex items-center justify-center h-20 w-20 mb-6">
                <div className="absolute animate-ping h-12 w-12 rounded-full bg-primary/20" />
                <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
              <h4 className="text-lg font-bold text-foreground">Due Diligence Pipeline Active</h4>
              <p className="text-xs text-primary font-mono mt-2 tracking-wide uppercase">
                {loadingLogs[loadingStep]}
              </p>

              {/* Progress Bar Indicator */}
              <div className="w-64 bg-secondary h-1.5 rounded-full mt-6 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${((loadingStep + 1) / loadingLogs.length) * 100}%` }}
                />
              </div>

              {/* Loading steps logs panel */}
              <div className="mt-8 text-left max-w-sm w-full font-mono text-[10px] bg-background border border-border p-4 rounded-lg text-muted-foreground space-y-1 h-32 overflow-y-auto">
                {loadingLogs.slice(0, loadingStep + 1).map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-emerald-500">✔</span>
                    <span className="text-[10px] leading-relaxed">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center flex flex-col items-center justify-center h-[580px]">
              <div className="p-3 rounded-full bg-destructive/10 text-destructive mb-4">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-destructive">Engine Process Interrupted</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2 leading-relaxed">
                {error}
              </p>
              <button
                onClick={() => setError(null)}
                className="mt-6 px-4 py-2 border border-border rounded-lg text-xs bg-card hover:bg-secondary transition-all"
              >
                Reset Canvas
              </button>
            </div>
          )}

          {/* Results Display */}
          {!loading && result && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Tabs selectors */}
              <div className="flex gap-2 border-b border-border pb-3">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === "summary"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  Overview & Similar
                </button>
                <button
                  onClick={() => setActiveTab("risks")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === "risks"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  Risks & Failures
                </button>
                <button
                  onClick={() => setActiveTab("pivots")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === "pivots"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  Pivots & Verdict
                </button>
              </div>

              {/* Tab 1: Summary & Idea Breakdown */}
              {activeTab === "summary" && (
                <div className="space-y-8 animate-in fade-in-50 duration-200">
                  {/* SECTION A: IDEA BREAKDOWN */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Section A: Idea Breakdown
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* Card 1 */}
                      <div className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Building className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Industry</span>
                        </div>
                        <p className="text-sm font-bold text-foreground truncate">{result.breakdown.industry}</p>
                      </div>

                      {/* Card 2 */}
                      <div className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Target className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Target Audience</span>
                        </div>
                        <p className="text-sm font-bold text-foreground truncate">{result.breakdown.targetAudience}</p>
                      </div>

                      {/* Card 3 */}
                      <div className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Layers className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Business Model</span>
                        </div>
                        <p className="text-sm font-bold text-foreground truncate">{result.breakdown.businessModel}</p>
                      </div>

                      {/* Card 4 */}
                      <div className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Revenue Model</span>
                        </div>
                        <p className="text-sm font-bold text-foreground truncate">{result.breakdown.revenueModel}</p>
                      </div>

                      {/* Card 5 */}
                      <div className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Complexity Level</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{result.breakdown.complexityLevel}</p>
                      </div>

                      {/* Card 6 */}
                      <div className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Cpu className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">Tech Category</span>
                        </div>
                        <p className="text-sm font-bold text-foreground truncate">{result.breakdown.technologyCategory}</p>
                      </div>
                    </div>
                  </div>

                  {/* SECTION B: SIMILAR STARTUPS */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Skull className="h-4 w-4 text-red-500" />
                      Section B: Historical Analogues & Competitors
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {result.similarStartups.map((startup, idx) => {
                        let statusColor = "bg-rose-500/10 text-rose-500 border-rose-500/20";
                        if (startup.status === "Acquired") statusColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
                        if (startup.status === "Active") statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                        if (startup.status === "Successful") statusColor = "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";

                        return (
                          <div
                            key={idx}
                            className="p-5 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-primary/40 transition-all flex flex-col justify-between"
                          >
                            <div className="space-y-2.5">
                              <div className="flex justify-between items-center">
                                <span className="font-extrabold text-sm">{startup.name}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                                  {startup.status}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                                {startup.description}
                              </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
                              <span>Funded: <strong className="text-foreground">${startup.fundingRaised}M</strong></span>
                              <span>Span: <strong className="text-foreground">{startup.foundedYear} - {startup.closedYear || "Present"}</strong></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Risks & Failure Patterns */}
              {activeTab === "risks" && (
                <div className="space-y-8 animate-in fade-in-50 duration-200">
                  {/* SECTION D: RISK ANALYSIS & GAUGES */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Section D: Systemic Risk Profile
                    </h3>
                    <div className="p-6 rounded-xl border border-border bg-card flex flex-col md:flex-row items-center gap-8">
                      {renderRiskGauge(result.risks.overallRiskScore)}
                      <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Product-Market Fit Risk</span>
                            <span className="font-bold">{result.risks.productMarketFitRisk}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full transition-all"
                              style={{ width: `${result.risks.productMarketFitRisk}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Competition Risk</span>
                            <span className="font-bold">{result.risks.competitionRisk}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-400 h-full transition-all"
                              style={{ width: `${result.risks.competitionRisk}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Execution Difficulty</span>
                            <span className="font-bold">{result.risks.executionDifficulty}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="bg-amber-500 h-full transition-all"
                              style={{ width: `${result.risks.executionDifficulty}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Funding Difficulty</span>
                            <span className="font-bold">{result.risks.fundingDifficulty}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="bg-rose-500 h-full transition-all"
                              style={{ width: `${result.risks.fundingDifficulty}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Technical Complexity</span>
                            <span className="font-bold">{result.risks.technicalComplexity}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="bg-sky-500 h-full transition-all"
                              style={{ width: `${result.risks.technicalComplexity}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Market Timing Risk</span>
                            <span className="font-bold">{result.risks.marketTimingRisk}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="bg-teal-500 h-full transition-all"
                              style={{ width: `${result.risks.marketTimingRisk}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION C: FAILURE PATTERNS */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Skull className="h-4 w-4 text-muted-foreground" />
                      Section C: Correlation with Failure Patterns
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl border border-border bg-card h-80">
                        <span className="text-xs font-semibold text-muted-foreground mb-4 block">
                          Radar Risk Intersect Chart
                        </span>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={result.failurePatterns}>
                              <PolarGrid stroke="var(--border)" />
                              <PolarAngleAxis dataKey="category" tick={{ fill: "currentColor", fontSize: 9 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                              <Radar
                                name="Risk Ratio"
                                dataKey="score"
                                stroke="#457b9d"
                                fill="#457b9d"
                                fillOpacity={0.3}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl border border-border bg-card h-80 overflow-y-auto space-y-3">
                        <span className="text-xs font-semibold text-muted-foreground block">
                          Failure Mode Breakdowns
                        </span>
                        {result.failurePatterns.map((item, idx) => (
                          <div key={idx} className="text-xs flex flex-col p-2.5 rounded-lg bg-background/50 border border-border">
                            <div className="flex justify-between font-bold mb-1">
                              <span>{item.category}</span>
                              <span className={item.score > 70 ? "text-rose-500" : "text-amber-500"}>
                                {item.score}% Risk Correlation
                              </span>
                            </div>
                            <p className="text-muted-foreground text-[11px] leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION E: LESSONS LEARNED */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-emerald-500" />
                      Section E: Postmortem Lessons Applied
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.lessons.length > 0 ? (
                        result.lessons.map((lesson, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-border bg-card flex gap-3 items-start"
                          >
                            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0 mt-0.5">
                              <Lightbulb className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] uppercase font-bold text-emerald-500 tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                Derived from {lesson.category}
                              </span>
                              <p className="text-xs text-foreground leading-relaxed pt-1">
                                {lesson.lesson}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 p-6 rounded-xl border border-dashed border-border text-center text-muted-foreground text-xs">
                          No direct postmortems correlations. Review general SaaS guidelines.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Pivots & Verdict */}
              {activeTab === "pivots" && (
                <div className="space-y-8 animate-in fade-in-50 duration-200">
                  {/* SECTION F: MARKET OPPORTUNITY */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-indigo-400" />
                      Section F: Market Viability & Readiness
                    </h3>
                    <div className="p-6 rounded-xl border border-border bg-card grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6">
                        <span className="text-5xl font-extrabold text-primary">
                          {result.opportunity.overallOpportunityScore}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
                          Opportunity Index
                        </span>
                      </div>
                      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-background/50 border border-border">
                          <span className="text-muted-foreground">Market Readiness</span>
                          <span className="font-bold text-foreground">{result.opportunity.marketReadiness}%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-background/50 border border-border">
                          <span className="text-muted-foreground">Industry Growth</span>
                          <span className="font-bold text-emerald-500">+{result.opportunity.industryGrowth}% YoY</span>
                        </div>
                        <div className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-background/50 border border-border">
                          <span className="text-muted-foreground">Competitor Saturation</span>
                          <span className="font-bold text-amber-500">{result.opportunity.competitionSaturation}%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-background/50 border border-border">
                          <span className="text-muted-foreground">AI Advantage</span>
                          <span className="font-bold text-indigo-400">{result.opportunity.aiAdvantage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION G: PIVOT SUGGESTIONS */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      Section G: Strategic Pivot Options
                    </h3>
                    <div className="space-y-4">
                      {result.pivots.map((pivot, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-primary/30 transition-all space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-extrabold text-sm text-foreground flex items-center gap-2">
                              <span className="text-xs text-primary bg-primary/10 h-5 w-5 rounded-full flex items-center justify-center font-bold">
                                {idx + 1}
                              </span>
                              {pivot.title}
                            </span>
                            <span className="text-[9px] uppercase font-bold text-primary tracking-wider">
                              Viable Pivot
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-muted-foreground">Description</span>
                              <p className="text-muted-foreground leading-relaxed">{pivot.description}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-muted-foreground">Pivot Rationale</span>
                              <p className="text-emerald-500/90 leading-relaxed font-medium">{pivot.reasoning}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION H: FINAL VERDICT */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Section H: Investment Committee Verdict
                    </h3>
                    <div className="p-6 rounded-xl border border-border bg-card space-y-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-border">
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Executive Recommendation
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                            {result.verdict.verdictSummary}
                          </p>
                        </div>
                        {/* Recommendation badge */}
                        <div className="shrink-0">
                          {result.verdict.overallRecommendation === "Proceed" && (
                            <span className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-sm font-extrabold flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              PROCEED WITH CAUTION
                            </span>
                          )}
                          {result.verdict.overallRecommendation === "Pivot Recommended" && (
                            <span className="px-4 py-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 text-sm font-extrabold flex items-center gap-2">
                              <RotateCcw className="h-4 w-4" />
                              PIVOT RECOMMENDED
                            </span>
                          )}
                          {result.verdict.overallRecommendation === "High Risk - Avoid" && (
                            <span className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 text-sm font-extrabold flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              HIGH RISK - SHIFT APPROACH
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Strengths & Weaknesses Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                        {/* Strengths */}
                        <div className="space-y-3">
                          <span className="font-bold text-emerald-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Defensive Strengths
                          </span>
                          <ul className="space-y-2 text-muted-foreground list-disc pl-4 leading-relaxed">
                            {result.verdict.strengths.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Weaknesses */}
                        <div className="space-y-3">
                          <span className="font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            Structural Weaknesses
                          </span>
                          <ul className="space-y-2 text-muted-foreground list-disc pl-4 leading-relaxed">
                            {result.verdict.weaknesses.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Risks / Next steps */}
                        <div className="space-y-3">
                          <span className="font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                            <Sparkles className="h-3.5 w-3.5" />
                            Next Validations
                          </span>
                          <ul className="space-y-2 text-muted-foreground list-disc pl-4 leading-relaxed">
                            {result.verdict.recommendedNextSteps.map((item, idx) => (
                              <li key={idx} className="text-foreground font-medium">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={
      <div className="h-64 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    }>
      <AnalyzeContent />
    </Suspense>
  );
}
