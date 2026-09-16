"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowDown } from "lucide-react";

interface RecipeBuilderProps {
  currentSugar: number;
  newSugar: number;
  milkReplacementFactor: number;
  onCurrentSugarChange: (value: number) => void;
  onNewSugarChange: (value: number) => void;
  onMilkReplacementFactorChange: (value: number) => void;
}

export function RecipeBuilder({
  currentSugar,
  newSugar,
  milkReplacementFactor,
  onCurrentSugarChange,
  onNewSugarChange,
  onMilkReplacementFactorChange,
}: RecipeBuilderProps) {
  const sugarReduction = currentSugar - newSugar;
  const reductionPercent = (sugarReduction / currentSugar) * 100;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Recipe Configuration
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Optimize your recipe through sugar reduction
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sugar Composition */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Sugar Composition
            </h3>

            {/* Current Sugar */}
            <div className="space-y-3 mb-8">
              <Label className="text-sm font-medium">Current Sugar %</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {currentSugar.toFixed(1)}%
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.1"
                    value={currentSugar}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      onCurrentSugarChange(val);
                      if (val <= newSugar) {
                        onNewSugarChange(Math.max(0, val - 1));
                      }
                    }}
                    className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500 ml-4"
                  />
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-500 h-4 rounded-full transition-all"
                    style={{ width: `${(currentSugar / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-4">
              <div className="text-slate-400 dark:text-slate-600">
                <ArrowDown className="w-6 h-6" />
              </div>
            </div>

            {/* New Sugar */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">New Sugar %</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {newSugar.toFixed(1)}%
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={currentSugar - 0.1}
                    step="0.1"
                    value={newSugar}
                    onChange={(e) =>
                      onNewSugarChange(parseFloat(e.target.value))
                    }
                    className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500 ml-4"
                  />
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full transition-all"
                    style={{ width: `${(newSugar / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reduction Impact */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Reduction Impact
          </h3>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Total Reduction
                </p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {sugarReduction.toFixed(1)}%
                </p>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                  style={{ width: `${reductionPercent}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {reductionPercent.toFixed(0)}% reduction from baseline
              </p>
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <Label className="text-sm font-medium">Milk Replacement Factor</Label>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                {milkReplacementFactor.toFixed(2)}x
              </span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={milkReplacementFactor}
                onChange={(e) =>
                  onMilkReplacementFactorChange(parseFloat(e.target.value))
                }
                className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600 ml-4"
              />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              How much milk replaces removed sugar
            </p>
          </Card>
        </div>
      </div>

      {sugarReduction < 0 ? (
        <Card className="p-4 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
          <p className="text-sm text-red-900 dark:text-red-100">
            ⚠️ New sugar must be lower than current sugar
          </p>
        </Card>
      ) : (
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <p className="text-sm text-green-900 dark:text-green-100">
            ✓ Recipe reduction validated
          </p>
        </Card>
      )}
    </div>
  );
}
