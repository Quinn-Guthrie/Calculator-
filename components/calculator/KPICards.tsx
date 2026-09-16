"use client";

import { Card } from "@/components/ui/card";
import { CalculationResults } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, Plus, Award } from "lucide-react";

interface KPICardsProps {
  results: CalculationResults;
}

export function KPICards({ results }: KPICardsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sugar Removed */}
        <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
            <Minus className="h-4 w-4" />
            Sugar Removed
          </div>
          <div className="text-4xl font-bold text-slate-900 dark:text-white">
            {results.sugarRemoved.toFixed(1)}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            kg per 100L batch
          </div>
        </Card>

        {/* Sugar Savings */}
        <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 mb-3 font-medium">
            <TrendingUp className="h-4 w-4" />
            Sugar Savings
          </div>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400">
            €{results.sugarSavings.toFixed(2)}
          </div>
          <div className="text-sm text-green-600 dark:text-green-400 mt-2">
            saved per 100L
          </div>
        </Card>

        {/* Added Milk Cost */}
        <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-400 mb-3 font-medium">
            <Plus className="h-4 w-4" />
            Added Milk Cost
          </div>
          <div className="text-4xl font-bold text-red-600 dark:text-red-400">
            €{results.addedMilkCost.toFixed(2)}
          </div>
          <div className="text-sm text-red-600 dark:text-red-400 mt-2">
            cost per 100L
          </div>
        </Card>

        {/* Recipe Net Saving */}
        <Card
          className={cn(
            "p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
            results.recipeNetSaving > 0
              ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800"
              : "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-200 dark:border-red-800"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 text-sm mb-3 font-medium",
              results.recipeNetSaving > 0
                ? "text-green-700 dark:text-green-400"
                : "text-red-700 dark:text-red-400"
            )}
          >
            {results.recipeNetSaving > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            Recipe Net Saving
          </div>
          <div
            className={cn(
              "text-4xl font-bold",
              results.recipeNetSaving > 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            €{results.recipeNetSaving.toFixed(2)}
          </div>
          <div
            className={cn(
              "text-sm mt-2",
              results.recipeNetSaving > 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            recipe optimization
          </div>
        </Card>

        {/* Incremental Solution Cost */}
        <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400 mb-3 font-medium">
            <Plus className="h-4 w-4" />
            Solution Cost
          </div>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
            €{results.additionalSolutionCost.toFixed(2)}
          </div>
          <div className="text-sm text-orange-600 dark:text-orange-400 mt-2">
            incremental cost
          </div>
        </Card>

        {/* Net Benefit - PRIMARY KPI */}
        <Card
          className={cn(
            "p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] sm:col-span-2 lg:col-span-1",
            results.netBenefit > 0
              ? "border-green-400 dark:border-green-600 bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 dark:from-green-950 dark:via-green-900/50 dark:to-green-950 shadow-green-200/50 dark:shadow-green-900/50"
              : "border-red-400 dark:border-red-600 bg-gradient-to-br from-red-100 via-rose-50 to-red-100 dark:from-red-950 dark:via-red-900/50 dark:to-red-950 shadow-red-200/50 dark:shadow-red-900/50"
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <Award
              className={cn(
                "w-6 h-6",
                results.netBenefit > 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              )}
            />
            <div className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Net Customer Benefit
            </div>
          </div>
          <div
            className={cn(
              "text-6xl font-black mb-2",
              results.netBenefit > 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            €{results.netBenefit.toFixed(2)}
          </div>
          <div
            className={cn(
              "text-base font-medium",
              results.netBenefit > 0
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
            )}
          >
            per 100L • {results.netBenefit > 0 ? "Positive ROI" : "Negative ROI"}
          </div>
        </Card>
      </div>
    </div>
  );
}
