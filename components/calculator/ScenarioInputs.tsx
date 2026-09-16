"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScenarioData } from "@/lib/types";
import { FileText, Beaker, Calendar, Package } from "lucide-react";

interface ScenarioInputsProps {
  data: ScenarioData;
  onChange: (data: ScenarioData) => void;
}

export function ScenarioInputs({ data, onChange }: ScenarioInputsProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Scenario Information
        </CardTitle>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Define your production scenario and batch details
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 group">
            <Label htmlFor="scenarioName" className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Scenario Name
            </Label>
            <Input
              id="scenarioName"
              type="text"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              placeholder="e.g., Sweet Stirred Yogurt"
              className="transition-all duration-200 focus:scale-[1.01]"
            />
          </div>
          <div className="space-y-2 group">
            <Label htmlFor="batchVolume" className="flex items-center gap-2">
              <Beaker className="w-3.5 h-3.5 text-slate-500" />
              Batch Volume (L)
            </Label>
            <Input
              id="batchVolume"
              type="number"
              step="1000"
              value={data.batchVolume}
              onChange={(e) =>
                onChange({ ...data, batchVolume: parseFloat(e.target.value) || 0 })
              }
              className="text-right transition-all duration-200 focus:scale-[1.01]"
            />
          </div>
          <div className="space-y-2 group">
            <Label htmlFor="annualVolume" className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Annual Volume (L)
            </Label>
            <Input
              id="annualVolume"
              type="number"
              step="100000"
              value={data.annualVolume}
              onChange={(e) =>
                onChange({ ...data, annualVolume: parseFloat(e.target.value) || 0 })
              }
              className="text-right transition-all duration-200 focus:scale-[1.01]"
            />
          </div>
          <div className="space-y-2 group">
            <Label htmlFor="productDensity" className="flex items-center gap-2">
              <Package className="w-3.5 h-3.5 text-slate-500" />
              Product Density (kg/L)
            </Label>
            <Input
              id="productDensity"
              type="number"
              step="0.1"
              value={data.productDensity}
              onChange={(e) =>
                onChange({ ...data, productDensity: parseFloat(e.target.value) || 0 })
              }
              className="text-right transition-all duration-200 focus:scale-[1.01]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
