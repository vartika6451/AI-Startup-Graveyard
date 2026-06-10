"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Skull,
  Globe,
  DollarSign,
  Calendar,
  AlertTriangle,
  Lightbulb,
  X,
} from "lucide-react";

interface StartupItem {
  id: string;
  name: string;
  description: string;
  industry: string;
  businessModel: string;
  status: string;
  fundingRaised: number;
  foundedYear: number;
  closedYear: number | null;
  website: string | null;
  failureReasons: { id: string; category: string; description: string }[];
  lessonsLearned: { id: string; lesson: string }[];
}

interface DatabaseClientProps {
  initialStartups: StartupItem[];
}

export default function DatabaseClient({ initialStartups }: DatabaseClientProps) {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedStartup, setSelectedStartup] = useState<StartupItem | null>(null);

  // List of unique industries from data
  const industries = useMemo(() => {
    const list = new Set(initialStartups.map((s) => s.industry));
    return Array.from(list);
  }, [initialStartups]);

  // Filter logic
  const filteredStartups = useMemo(() => {
    return initialStartups.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchStatus = selectedStatus === "all" || s.status === selectedStatus;
      const matchIndustry = selectedIndustry === "all" || s.industry === selectedIndustry;

      return matchSearch && matchStatus && matchIndustry;
    });
  }, [initialStartups, search, selectedStatus, selectedIndustry]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Startup Database</h1>
          <p className="text-muted-foreground mt-1.5">
            Explore and study 10+ historic venture postmortems, funding histories, and primary failure reasons.
          </p>
        </div>
      </div>

      {/* Search and Filters panel */}
      <div className="p-4 rounded-xl border border-border bg-card shadow-xs flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search startups, keywords, descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="relative w-full md:w-48">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="Failed">Failed</option>
            <option value="Acquired">Acquired</option>
            <option value="Active">Active</option>
            <option value="Successful">Successful</option>
          </select>
        </div>

        {/* Industry Filter */}
        <div className="relative w-full md:w-56">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Startups Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.length > 0 ? (
          filteredStartups.map((startup) => {
            let statusColor = "bg-rose-500/10 text-rose-500 border-rose-500/20";
            if (startup.status === "Acquired") statusColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
            if (startup.status === "Active") statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            if (startup.status === "Successful") statusColor = "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";

            return (
              <div
                key={startup.id}
                onClick={() => setSelectedStartup(startup)}
                className="rounded-xl border border-border bg-card/60 p-6 shadow-sm hover:border-primary/50 hover:bg-card hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between h-[280px] transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-base group-hover:text-primary transition-colors">
                      {startup.name}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                      {startup.status}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                    {startup.industry} • {startup.businessModel}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                    {startup.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground mt-4">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Funding: <strong>${startup.fundingRaised}M</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Active: <strong>{startup.foundedYear} - {startup.closedYear || "Present"}</strong>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center border border-dashed border-border rounded-xl bg-card/10">
            <Skull className="h-12 w-12 text-muted-foreground/40 stroke-1 mx-auto mb-3" />
            <p className="text-sm font-semibold text-muted-foreground">No startups matched your filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedStatus("all");
                setSelectedIndustry("all");
              }}
              className="text-xs text-primary font-semibold hover:underline mt-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Details Side-Drawer/Modal Panel */}
      {selectedStartup && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedStartup(null)}
          />
          <div className="relative w-full max-w-2xl bg-card border-l border-border h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Header controls */}
            <div className="h-16 px-6 border-b border-border flex items-center justify-between bg-card">
              <span className="font-extrabold text-base tracking-wide uppercase">
                Startup Postmortem Log
              </span>
              <button
                onClick={() => setSelectedStartup(null)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              {/* Profile Card */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-extrabold">{selectedStartup.name}</h2>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      selectedStartup.status === "Failed"
                        ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    }`}
                  >
                    {selectedStartup.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-background/50 border border-border rounded-xl text-xs">
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Industry</span>
                    <strong className="text-foreground">{selectedStartup.industry}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Business Model</span>
                    <strong className="text-foreground">{selectedStartup.businessModel}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Funding Raised</span>
                    <strong className="text-foreground">${selectedStartup.fundingRaised}M USD</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Operational Span</span>
                    <strong className="text-foreground">
                      {selectedStartup.foundedYear} - {selectedStartup.closedYear || "Present"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2.5">
                <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Background</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedStartup.description}
                </p>
                {selectedStartup.website && (
                  <a
                    href={selectedStartup.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline pt-1"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Visit Website
                  </a>
                )}
              </div>

              {/* Failure Reasons */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-500" />
                  Primary Failure Reasons
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {selectedStartup.failureReasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-border bg-background/40 flex gap-3 items-start"
                    >
                      <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg shrink-0 mt-0.5">
                        <Skull className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded-full">
                          {reason.category}
                        </span>
                        <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lessons Learned */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-emerald-500" />
                  Key Lessons Learned
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {selectedStartup.lessonsLearned.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-border bg-background/40 flex gap-3 items-start"
                    >
                      <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0 mt-0.5">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {lesson.lesson}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
