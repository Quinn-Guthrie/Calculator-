"use client";

import { CalculationResults } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { TrendingDown, Minus } from "lucide-react";

interface SavingsWaterfallProps {
  results: CalculationResults;
}

export function SavingsWaterfall({ results }: SavingsWaterfallProps) {
  const steps = [
    {
      label: "Sugar Savings",
      value: results.sugarSavings,
      icon: TrendingDown,
      color: "green",
    },
    {
      label: "Milk Adjustment",
      value: -results.addedMilkCost,
      icon: Minus,
      color: results.addedMilkCost > 0 ? "red" : "green",
    },
    {
      label: "Culture Investment",
      value: -results.additionalSolutionCost,
      icon: Minus,
      color: results.additionalSolutionCost > 0 ? "red" : "green",
    },
  ];

  const maxValue = Math.max(
    results.sugarSavings,
    results.sugarSavings - results.addedMilkCost
  );

  const colorMap = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <TrendingDown className="w-5 h-5 text-green-600" />
        Savings Waterfall (€ per 100L)
      </h3>

      <div className="space-y-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isPositive = step.value >= 0;
          const barWidth = Math.abs(step.value) / maxValue * 100;

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 text-${step.color}-600`} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {step.label}
                  </span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}€{Math.abs(step.value).toFixed(2)}
                </span>
              </div>
              <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex items-center">
                <div
                  className={`h-full ${colorMap[step.color as keyof typeof colorMap]} transition-all opacity-70`}
                  style={{ width: `${Math.max(barWidth, 5)}%` }}
                />
              </div>
            </div>
          );
        })}

        {/* Total Line */}
        <div className="pt-4 border-t-2 border-slate-300 dark:border-slate-600">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-600" />
              Net Benefit
            </span>
            <span
              className={`text-lg font-bold ${
                results.netBenefit > 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              €{results.netBenefit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
