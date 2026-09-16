"use client";

import { CalculationResults } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroKPIProps {
  results: CalculationResults;
}

export function HeroKPI({ results }: HeroKPIProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const isPositive = results.annualBenefit >= 0;

  useEffect(() => {
    if (displayValue >= Math.abs(results.annualBenefit)) return;
    const timer = setTimeout(() => {
      setDisplayValue((prev) =>
        Math.min(
          prev + Math.abs(results.annualBenefit) / 30,
          Math.abs(results.annualBenefit)
        )
      );
    }, 30);
    return () => clearTimeout(timer);
  }, [displayValue, results.annualBenefit]);

  return (
    <Card
      className={`p-8 md:p-12 border-4 ${
        isPositive
          ? "border-green-500 dark:border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950"
          : "border-red-500 dark:border-red-400 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950"
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
            Annual Customer Benefit
          </h2>
          {isPositive ? (
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" />
          ) : (
            <TrendingDown className="w-6 h-6 md:w-8 md:h-8 text-red-600 dark:text-red-400" />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-5xl md:text-7xl font-black tracking-tight ${
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPositive ? "+" : "-"}€
              {Math.round(displayValue).toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })}
            </span>
            <span className="text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-400">
              / year
            </span>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-slate-600 dark:text-slate-400">Per Batch</p>
              <p
                className={`text-xl font-bold ${
                  results.perBatchBenefit > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                €{Math.round(results.perBatchBenefit).toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-slate-600 dark:text-slate-400">Per 100L</p>
              <p
                className={`text-xl font-bold ${
                  results.netBenefit > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                €{results.netBenefit.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
