"use client";

import { Card } from "@/components/ui/card";
import { CalculatorState } from "@/lib/types";
import { RotateCcw, Zap, Lightbulb } from "lucide-react";

interface QuickActionsProps {
  onReset: () => void;
  onLoadPreset: (preset: CalculatorState) => void;
}

export function QuickActions({ onReset, onLoadPreset }: QuickActionsProps) {
  const examplePreset: CalculatorState = {
    scenario: {
      name: "Example Trial",
      batchVolume: 10000,
      annualVolume: 18000000,
      productDensity: 1.0,
    },
    rawMaterials: {
      milkCost: 0.20,
      sugarCost: 0.60,
    },
    cultures: {
      currentCultureCost: 30,
      smartysCultureCost: 40,
      cultureDose: 20,
    },
    additional: {
      enzymeCost: 0,
      sweetModulatorCost: 0,
    },
    recipe: {
      currentSugar: 7.7,
      newSugar: 5.7,
      milkReplacementFactor: 1.0,
    },
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border-slate-200 dark:border-slate-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Quick Actions
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Load presets or reset to defaults
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onLoadPreset(examplePreset)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 text-sm font-medium flex-1 sm:flex-none hover:scale-105 active:scale-95"
          >
            <Zap className="w-4 h-4" />
            Example Trial
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 text-sm font-medium flex-1 sm:flex-none hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </Card>
  );
}
