"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CultureData } from "@/lib/types";
import { Microscope, Sparkles } from "lucide-react";

interface CultureInputsProps {
  data: CultureData;
  onChange: (data: CultureData) => void;
}

export function CultureInputs({ data, onChange }: CultureInputsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="transition-all duration-200 hover:shadow-md border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Microscope className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            Current Culture
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Your existing culture solution
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentCultureCost" className="text-sm font-medium">
              Culture Cost (€/500 DCU)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                €
              </span>
              <Input
                id="currentCultureCost"
                type="number"
                step="0.01"
                value={data.currentCultureCost}
                onChange={(e) =>
                  onChange({ ...data, currentCultureCost: parseFloat(e.target.value) || 0 })
                }
                className="text-right pl-8 transition-all duration-200 focus:scale-[1.01]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentCultureDose" className="text-sm font-medium">
              Culture Dose (DCU/100L)
            </Label>
            <Input
              id="currentCultureDose"
              type="number"
              step="1"
              value={data.cultureDose}
              onChange={(e) =>
                onChange({ ...data, cultureDose: parseFloat(e.target.value) || 0 })
              }
              className="text-right transition-all duration-200 focus:scale-[1.01]"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-200 hover:shadow-md border-blue-200 dark:border-blue-900 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-950/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            SMARTYS Culture
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Advanced IFF solution
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="smartysCultureCost" className="text-sm font-medium">
              Culture Cost (€/500 DCU)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                €
              </span>
              <Input
                id="smartysCultureCost"
                type="number"
                step="0.01"
                value={data.smartysCultureCost}
                onChange={(e) =>
                  onChange({ ...data, smartysCultureCost: parseFloat(e.target.value) || 0 })
                }
                className="text-right pl-8 transition-all duration-200 focus:scale-[1.01]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="smartysCultureDose" className="text-sm font-medium">
              Culture Dose (DCU/100L)
            </Label>
            <Input
              id="smartysCultureDose"
              type="number"
              step="1"
              value={data.cultureDose}
              onChange={(e) =>
                onChange({ ...data, cultureDose: parseFloat(e.target.value) || 0 })
              }
              className="text-right transition-all duration-200 focus:scale-[1.01]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
