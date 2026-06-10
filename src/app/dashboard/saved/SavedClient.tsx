"use client";

import React, { useState } from "react";
import Link from "next/link";
import { History, ArrowRight, Trash2, Calendar, Skull, AlertTriangle, CheckCircle } from "lucide-react";
import { StartupAnalysisResult } from "@/lib/services/analytics";

interface SavedAnalysis {
  id: string;
  startupIdea: string;
  analysisResult: StartupAnalysisResult;
  createdAt: string;
}

interface SavedClientProps {
  initialReports: SavedAnalysis[];
}

export default function SavedClient({ initialReports }: SavedClientProps) {
  const [reports, setReports] = useState<SavedAnalysis[]>(initialReports);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the saved report for "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/analyses/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setReports((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("Failed to delete report.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting report.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Saved Reports</h1>
        <p className="text-muted-foreground mt-1.5">
          Review historical startup evaluations, risk ratings, and strategic verdicts.
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-4">
        {reports.length > 0 ? (
          reports.map((report) => {
            const result = report.analysisResult;
            const nameParts = report.startupIdea.split(":");
            const name = nameParts[0] || "Unnamed Startup";
            const description = nameParts.slice(1).join(":")?.trim() || report.startupIdea;

            let badgeColor = "bg-rose-500/10 text-rose-500 border-rose-500/20";
            if (result.verdict?.overallRecommendation === "Proceed") {
              badgeColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            } else if (result.verdict?.overallRecommendation === "Pivot Recommended") {
              badgeColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
            }

            return (
              <div
                key={report.id}
                className="p-6 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-primary/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-2.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-extrabold text-lg truncate">{name}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                      {result.verdict?.overallRecommendation || "Evaluated"}
                    </span>
                    <span className="text-xs text-muted-foreground font-bold bg-secondary px-2 py-0.5 rounded-md">
                      Risk: {result.risks?.overallRiskScore}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {description}
                  </p>
                  <div className="flex items-center gap-3.5 text-[10px] text-muted-foreground pt-1.5">
                    <span className="flex items-center gap-1 font-semibold">
                      <Calendar className="h-3 w-3" />
                      {new Date(report.createdAt).toLocaleDateString()} at{" "}
                      {new Date(report.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="font-medium text-foreground">{result.breakdown?.industry}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
                  <button
                    onClick={() => handleDelete(report.id, name)}
                    disabled={deletingId === report.id}
                    className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all disabled:opacity-50"
                    title="Delete Report"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/dashboard/analyze?load=${report.id}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs transition-all shadow-sm shadow-primary/10"
                  >
                    Load Report
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center border border-dashed border-border rounded-xl bg-card/10 flex flex-col items-center justify-center">
            <History className="h-12 w-12 text-muted-foreground/40 stroke-1 mb-3 animate-pulse" />
            <h3 className="text-sm font-semibold text-muted-foreground">No saved reports found.</h3>
            <p className="text-xs text-muted-foreground max-w-xs mt-1 leading-normal">
              Validate your startup ideas inside the validator panel and they will be archived here for review.
            </p>
            <Link
              href="/dashboard/analyze"
              className="mt-6 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/95 transition-all shadow-md shadow-primary/15"
            >
              Go to Validator
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
