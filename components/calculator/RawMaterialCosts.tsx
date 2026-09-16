"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RawMaterialCosts } from "@/lib/types";
import { Milk, Candy } from "lucide-react";

interface RawMaterialCostsProps {
  data: RawMaterialCosts;
  onChange: (data: RawMaterialCosts) => void;
}

export function RawMaterialCostsComponent({ data, onChange }: RawMaterialCostsProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="w-5 h-5 text-amber-600 dark:text-amber-400">€</div>
          Raw Material Costs
        </CardTitle>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Set current market prices for milk and sugar
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 group">
            <Label htmlFor="milkCost" className="flex items-center gap-2">
              <Milk className="w-3.5 h-3.5 text-slate-500" />
              Milk Cost (€/L)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                €
              </span>
              <Input
                id="milkCost"
                type="number"
                step="0.01"
                value={data.milkCost}
                onChange={(e) =>
                  onChange({ ...data, milkCost: parseFloat(e.target.value) || 0 })
                }
                className="text-right pl-8 transition-all duration-200 focus:scale-[1.01]"
              />
            </div>
          </div>
          <div className="space-y-2 group">
            <Label htmlFor="sugarCost" className="flex items-center gap-2">
              <Candy className="w-3.5 h-3.5 text-slate-500" />
              Sugar Cost (€/kg)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                €
              </span>
              <Input
                id="sugarCost"
                type="number"
                step="0.01"
                value={data.sugarCost}
                onChange={(e) =>
                  onChange({ ...data, sugarCost: parseFloat(e.target.value) || 0 })
                }
                className="text-right pl-8 transition-all duration-200 focus:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
