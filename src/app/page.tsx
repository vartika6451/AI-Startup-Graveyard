"use client";

import React from "react";
import Link from "next/link";
import {
  Skull,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Lightbulb,
  CheckCircle,
  Database,
  Terminal,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#122336] text-[#f8fafc] font-sans selection:bg-primary selection:text-white">
      {/* Dynamic Glow Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#ffb703]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2">
          <Skull className="h-6 w-6 text-primary animate-pulse" />
          <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-primary to-[#ffb703] bg-clip-text text-transparent">
            STARTUP GRAVEYARD
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
          <a href="#preview" className="hover:text-foreground transition-colors">Example analysis</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 px-4.5 py-2 rounded-lg bg-card border border-border/80 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-secondary transition-all"
        >
          Console
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 pb-28 text-center z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-bold tracking-wide uppercase">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Startup Failure Intelligence
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Learn From Startup Failures Before Building Your Next Idea
        </h1>

        <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Analyze competitors, discover failure patterns, evaluate risks, and identify opportunities using AI-powered startup intelligence.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard/analyze"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm tracking-wide uppercase transition-all shadow-lg shadow-primary/25 w-full sm:w-auto justify-center"
          >
            Analyze My Startup Idea
            <ArrowRight className="h-4.5 w-4.5" />
          </Link>
          <a
            href="#preview"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border bg-card/40 hover:bg-secondary text-foreground font-bold text-sm tracking-wide uppercase transition-all w-full sm:w-auto justify-center"
          >
            View Example Case
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-border/40 space-y-16 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Structured Risk Audit Services</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Our platform evaluates concepts against historical failures to avoid expensive startup mistakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 space-y-4 hover:border-primary/35 transition-all">
            <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Venture Due Diligence</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Examine your concept against our structured database. We index business models, operational scales, and regulatory compliance paths.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 space-y-4 hover:border-primary/35 transition-all">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-xl w-fit">
              <Skull className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Failure Pattern Mappings</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Visualize risk points. We measure correlation against primary collapse channels like high Customer Acquisition Cost (CAC) and lack of PMF.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 space-y-4 hover:border-primary/35 transition-all">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Strategic Pivot Generator</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Receive 3-5 structured pivot alternatives tailored to B2B niches, API developer targets, and high-margin verticals.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24 border-t border-border/40 space-y-16 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">The Due Diligence Workflow</h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            From raw idea profile to structured strategic verdict in three phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-16 left-32 right-32 h-0.5 bg-gradient-to-r from-primary/30 to-[#ffb703]/10 z-0" />

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10">
            <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-base shadow-lg shadow-primary/20">
              1
            </div>
            <h3 className="font-bold text-base">Enter Startup Idea</h3>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Submit your startup name, description, target audience, and business model variables to the validation canvas.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10">
            <div className="h-12 w-12 rounded-full bg-[#131a2c] border border-border text-foreground flex items-center justify-center font-extrabold text-base">
              2
            </div>
            <h3 className="font-bold text-base">Correlate Failures</h3>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Our intelligence engine queries 10+ detailed failed startup analogues (Quibi, Fast, Juicero) and runs similarity matchings.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10">
            <div className="h-12 w-12 rounded-full bg-[#131a2c] border border-border text-foreground flex items-center justify-center font-extrabold text-base">
              3
            </div>
            <h3 className="font-bold text-base">Obtain Pivot Options</h3>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Dissect risk gauges, review postmortem lessons, and examine structured pivots with high opportunity scores.
            </p>
          </div>
        </div>
      </section>

      {/* Example Startup Analysis Preview */}
      <section id="preview" className="max-w-7xl mx-auto px-6 py-24 border-t border-border/40 space-y-12 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Structured Audit Preview</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Dissecting historical analogues to mitigate high-level product and capital risks.
          </p>
        </div>

        {/* Mock Report Card */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card/60 shadow-xl overflow-hidden">
          {/* Card Header Bar */}
          <div className="px-6 py-4 bg-background/50 border-b border-border flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>PREVIEW MODE // CASE STUDY: QUIBI</span>
            <span className="text-rose-500 font-bold uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded-full">
              Failed // Loss: $1.75B
            </span>
          </div>

          {/* Card Body */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">Quibi Short-Form Streaming</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                  A high-budget mobile streaming platform that failed due to rigid consumer constraints and launching mobile-only commute videos during COVID pandemic lockdowns.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20 shrink-0">
                <ShieldAlert className="h-4 w-4" />
                PMF Risk: 85%
              </div>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-background/40 border border-border space-y-2">
                <span className="font-bold text-rose-400 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <Skull className="h-3.5 w-3.5" />
                  Primary Failure Point
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Rigid mobile-only model blocking TV casting and screen sharing, creating severe friction against standard online user habits.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background/40 border border-border space-y-2">
                <span className="font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <Lightbulb className="h-3.5 w-3.5" />
                  Critical Postmortem Lesson
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Mobile content platforms must stay fluid and integrate with larger device ecosystems to capture shifting user locations.
                </p>
              </div>
            </div>

            {/* Pivot Suggested */}
            <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Recommended Pivot: Enterprise Compliance micro-LMS
                </span>
                <span className="text-[9px] uppercase tracking-wider text-primary">Opportunity Index: 78%</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Repurpose short-form streaming tech to sell micro-training modules directly to corporate human resources departments, locking in high-value annual contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 border-t border-border/40 space-y-16 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Simple Subscription Models</h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Choose a plan that fits your testing speed and volume requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan 1 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 flex flex-col justify-between h-[400px] hover:border-primary/30 transition-all">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Founder Sandbox
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-xs text-muted-foreground">/ forever</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Perfect for early-stage builders researching their first project. Includes unlimited evaluations using our mock analytics database.
              </p>
            </div>
            <ul className="text-xs space-y-2 text-muted-foreground pr-4">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                Access to 10+ Failed Startups Database
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                Interactive Validation Canvas
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                Simulated AI Pivot Suggestions
              </li>
            </ul>
            <Link
              href="/dashboard/analyze"
              className="w-full text-center py-3 rounded-lg border border-border bg-card hover:bg-secondary font-bold text-xs uppercase tracking-wider text-foreground transition-all"
            >
              Start Testing
            </Link>
          </div>

          {/* Plan 2 */}
          <div className="p-8 rounded-2xl border border-primary bg-primary/5 flex flex-col justify-between h-[400px] shadow-lg shadow-primary/5 hover:border-primary/80 transition-all relative">
            <div className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
              POPULAR
            </div>
            <div className="space-y-4">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Investment Associate
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$49</span>
                <span className="text-xs text-muted-foreground">/ monthly</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                For venture capital associates, startup accelerators, and active builders running multiple pipelines and requiring live LLM API integration.
              </p>
            </div>
            <ul className="text-xs space-y-2 text-muted-foreground pr-4">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                Live GPT-4 & Claude-3 API integrations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                Custom PDF export for investment committees
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                Priority pipeline latency & support
              </li>
            </ul>
            <Link
              href="/dashboard/analyze"
              className="w-full text-center py-3 rounded-lg bg-primary hover:bg-primary/90 font-bold text-xs uppercase tracking-wider text-primary-foreground transition-all"
            >
              Get Premium (Demo Console)
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative max-w-5xl mx-auto px-6 py-20 text-center z-10 space-y-8 border-t border-border/40">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Stop Guessing. Start Dissecting.</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
          Verify product market fit, evaluate distribution risks, and receive pivot guidance in seconds.
        </p>
        <Link
          href="/dashboard/analyze"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm tracking-wide uppercase transition-all shadow-lg shadow-primary/25"
        >
          Analyze My Startup Idea
          <ArrowRight className="h-4.5 w-4.5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative max-w-7xl mx-auto px-6 py-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground z-10 gap-4">
        <span>© 2026 Startup Graveyard. Built for venture intelligence validation.</span>
        <div className="flex gap-6">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
