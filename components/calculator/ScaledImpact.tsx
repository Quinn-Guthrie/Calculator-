"use client";

import { Card } from "@/components/ui/card";
import { CalculationResults } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Package, Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface ScaledImpactProps {
  results: CalculationResults;
}

export function ScaledImpact({ results }: ScaledImpactProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Per Batch */}
        <Card
          className={cn(
            "p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative overflow-hidden",
            results.perBatchBenefit > 0
              ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-blue-950/30 border-blue-200 dark:border-blue-800"
              : "bg-gradient-to-br from-red-50 via-rose-50 to-red-100 dark:from-red-950/30 dark:via-rose-950/30 dark:to-red-950/30 border-red-200 dark:border-red-800"
          )}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  results.perBatchBenefit > 0
                    ? "bg-blue-100 dark:bg-blue-900/50"
                    : "bg-red-100 dark:bg-red-900/50"
                )}
              >
                <Package
                  className={cn(
                    "w-6 h-6",
                    results.perBatchBenefit > 0
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Per Batch Impact
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Single production run
                </div>
              </div>
              {results.perBatchBenefit > 0 ? (
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div
              className={cn(
                "text-5xl font-black mb-2",
                results.perBatchBenefit > 0
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-red-700 dark:text-red-300"
              )}
            >
              €{results.perBatchBenefit.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div
              className={cn(
                "text-sm font-medium",
                results.perBatchBenefit > 0
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-red-700 dark:text-red-300"
              )}
            >
              {results.perBatchBenefit > 0 ? "Savings" : "Additional Cost"} per batch
            </div>
          </div>
          <div
            className={cn(
              "absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10",
              results.perBatchBenefit > 0
                ? "bg-blue-500"
                : "bg-red-500"
            )}
          />
        </Card>

        {/* Annual */}
        <Card
          className={cn(
            "p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative overflow-hidden",
            results.annualBenefit > 0
              ? "bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-emerald-950/30 dark:via-green-950/30 dark:to-emerald-950/30 border-emerald-200 dark:border-emerald-800"
              : "bg-gradient-to-br from-red-50 via-rose-50 to-red-100 dark:from-red-950/30 dark:via-rose-950/30 dark:to-red-950/30 border-red-200 dark:border-red-800"
          )}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  results.annualBenefit > 0
                    ? "bg-emerald-100 dark:bg-emerald-900/50"
                    : "bg-red-100 dark:bg-red-900/50"
                )}
              >
                <Calendar
                  className={cn(
                    "w-6 h-6",
                    results.annualBenefit > 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Annual Impact
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Full year projection
                </div>
              </div>
              {results.annualBenefit > 0 ? (
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div
              className={cn(
                "text-5xl font-black mb-2",
                results.annualBenefit > 0
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-red-700 dark:text-red-300"
              )}
            >
              €{results.annualBenefit.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div
              className={cn(
                "text-sm font-medium",
                results.annualBenefit > 0
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-red-700 dark:text-red-300"
              )}
            >
              {results.annualBenefit > 0 ? "Total annual savings" : "Total annual cost"}
            </div>
          </div>
          <div
            className={cn(
              "absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10",
              results.annualBenefit > 0
                ? "bg-emerald-500"
                : "bg-red-500"
            )}
          />
        </Card>
      </div>
    </div>
  );
}
