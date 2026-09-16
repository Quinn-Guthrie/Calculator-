"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RecipeData } from "@/lib/types";
import { AlertCircle, ChefHat, ArrowRight } from "lucide-react";

interface RecipeInputsProps {
  data: RecipeData;
  onChange: (data: RecipeData) => void;
}

export function RecipeInputs({ data, onChange }: RecipeInputsProps) {
  const showWarning = data.newSugar >= data.currentSugar;
  const sugarReduction = data.currentSugar - data.newSugar;

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ChefHat className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Recipe Configuration
        </CardTitle>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Define sugar reduction targets and milk replacement
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currentSugar" className="text-sm font-medium">
                Current Sugar (%)
              </Label>
              <Input
                id="currentSugar"
                type="number"
                step="0.1"
                value={data.currentSugar}
                onChange={(e) =>
                  onChange({ ...data, currentSugar: parseFloat(e.target.value) || 0 })
                }
                className="text-right transition-all duration-200 focus:scale-[1.01]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newSugar" className="text-sm font-medium">
                New Sugar (%)
              </Label>
              <Input
                id="newSugar"
                type="number"
                step="0.1"
                value={data.newSugar}
                onChange={(e) =>
                  onChange({ ...data, newSugar: parseFloat(e.target.value) || 0 })
                }
                className="text-right transition-all duration-200 focus:scale-[1.01]"
              />
            </div>
          </div>

          {!showWarning && sugarReduction > 0 && (
            <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
                <span className="text-lg">{data.currentSugar}%</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-lg">{data.newSugar}%</span>
              </div>
              <div className="h-8 w-px bg-green-300 dark:bg-green-700" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                {sugarReduction.toFixed(1)}% reduction
              </span>
            </div>
          )}

          {showWarning && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                  Invalid sugar reduction
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  New sugar level should be lower than current sugar level to calculate benefits.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Label htmlFor="milkReplacementFactor" className="text-sm font-medium">
              Milk Replacement Factor
            </Label>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              For every 1 kg of sugar removed, replace with this many liters of milk
            </p>
            <Input
              id="milkReplacementFactor"
              type="number"
              step="0.1"
              value={data.milkReplacementFactor}
              onChange={(e) =>
                onChange({
                  ...data,
                  milkReplacementFactor: parseFloat(e.target.value) || 0,
                })
              }
              className="text-right transition-all duration-200 focus:scale-[1.01]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
