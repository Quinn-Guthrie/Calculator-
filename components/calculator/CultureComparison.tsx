"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BarChart3 } from "lucide-react";

interface CultureComparisonProps {
  currentCultureCost: number;
  smartysCultureCost: number;
  cultureDose: number;
  enzymeCost: number;
  sweetModulatorCost: number;
  onCurrentCultureCostChange: (value: number) => void;
  onSmartyCultureCostChange: (value: number) => void;
  onCultureDoseChange: (value: number) => void;
  onEnzymeCostChange: (value: number) => void;
  onSweetModulatorCostChange: (value: number) => void;
}

export function CultureComparison({
  currentCultureCost,
  smartysCultureCost,
  cultureDose,
  enzymeCost,
  sweetModulatorCost,
  onCurrentCultureCostChange,
  onSmartyCultureCostChange,
  onCultureDoseChange,
  onEnzymeCostChange,
  onSweetModulatorCostChange,
}: CultureComparisonProps) {
  const currentPer100L = (currentCultureCost / 500) * cultureDose;
  const smartysPer100L = (smartysCultureCost / 500) * cultureDose;
  const incrementalCost = smartysPer100L - currentPer100L;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Culture Comparison Studio
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Configure and compare culture costs
        </p>
      </div>

      {/* Main Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Culture */}
        <Card className="p-6 border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Current Culture
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentCost" className="text-sm font-medium">
                Cost per 500 DCU (€)
              </Label>
              <Input
                id="currentCost"
                type="number"
                step="0.1"
                value={currentCultureCost}
                onChange={(e) =>
                  onCurrentCultureCostChange(parseFloat(e.target.value))
                }
                className="text-right"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Cost per 100L
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                €{currentPer100L.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        {/* SMARTYS Culture */}
        <Card className="p-6 border-2 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-6">
            ⭐ SMARTYS Culture
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smartysCost" className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Cost per 500 DCU (€)
              </Label>
              <Input
                id="smartysCost"
                type="number"
                step="0.1"
                value={smartysCultureCost}
                onChange={(e) =>
                  onSmartyCultureCostChange(parseFloat(e.target.value))
                }
                className="text-right"
              />
            </div>

            <div className="pt-4 border-t border-blue-200 dark:border-blue-700">
              <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                Cost per 100L
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                €{smartysPer100L.toFixed(2)}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-sm">
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                Incremental:
              </span>
              <span className={`font-bold ${incrementalCost > 0 ? "text-orange-600 dark:text-orange-400" : "text-green-600 dark:text-green-400"}`}>
                €{incrementalCost.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Shared Parameters */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          Shared Parameters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="cultureDose" className="text-sm font-medium">
              Culture Dose (DCU/100L)
            </Label>
            <Input
              id="cultureDose"
              type="number"
              step="0.1"
              value={cultureDose}
              onChange={(e) => onCultureDoseChange(parseFloat(e.target.value))}
              className="text-right"
            />
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Typical range: 10-30
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enzymeCost" className="text-sm font-medium">
              Enzyme Cost (€/100L)
            </Label>
            <Input
              id="enzymeCost"
              type="number"
              step="0.01"
              value={enzymeCost}
              onChange={(e) => onEnzymeCostChange(parseFloat(e.target.value))}
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sweetModulator" className="text-sm font-medium">
              Sweet Modulator (€/100L)
            </Label>
            <Input
              id="sweetModulator"
              type="number"
              step="0.01"
              value={sweetModulatorCost}
              onChange={(e) =>
                onSweetModulatorCostChange(parseFloat(e.target.value))
              }
              className="text-right"
            />
          </div>
        </div>
      </Card>

      {/* Cost Comparison Chart */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Cost Comparison per 100L
          </h3>
        </div>

        <div className="space-y-4">
          {/* Current */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Current
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                €{currentPer100L.toFixed(2)}
              </span>
            </div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-500"
                style={{
                  width: `${Math.min((currentPer100L / (smartysPer100L * 1.5)) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* SMARTYS */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                SMARTYS
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                €{smartysPer100L.toFixed(2)}
              </span>
            </div>
            <div className="h-3 bg-blue-100 dark:bg-blue-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                style={{
                  width: `${Math.min((smartysPer100L / (smartysPer100L * 1.5)) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
