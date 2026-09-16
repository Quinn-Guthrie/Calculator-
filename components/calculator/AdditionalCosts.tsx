"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdditionalCosts } from "@/lib/types";
import { Plus, FlaskConical, Droplet } from "lucide-react";

interface AdditionalCostsProps {
  data: AdditionalCosts;
  onChange: (data: AdditionalCosts) => void;
}

export function AdditionalCostsComponent({ data, onChange }: AdditionalCostsProps) {
  const hasAdditionalCosts = data.enzymeCost > 0 || data.sweetModulatorCost > 0;

  return (
    <Card className="transition-all duration-200 hover:shadow-md border-dashed">
      <Accordion type="single" collapsible>
        <AccordionItem value="additional" className="border-0">
          <AccordionTrigger className="px-6 hover:no-underline group">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                <Plus className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-slate-900 dark:text-white">
                  Additional Cost Components
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-normal">
                  {hasAdditionalCosts ? (
                    <span className="text-amber-600 dark:text-amber-400">
                      Active • Click to modify
                    </span>
                  ) : (
                    "Optional enzymes and modulators"
                  )}
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="space-y-6 pt-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-700">
                Add costs for enzyme treatments or sweet modulators if applicable to your recipe
              </p>

              <div className="space-y-2 group">
                <Label htmlFor="enzymeCost" className="flex items-center gap-2">
                  <FlaskConical className="w-3.5 h-3.5 text-slate-500" />
                  Enzyme Cost (€/100L)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                    €
                  </span>
                  <Input
                    id="enzymeCost"
                    type="number"
                    step="0.01"
                    value={data.enzymeCost}
                    onChange={(e) =>
                      onChange({ ...data, enzymeCost: parseFloat(e.target.value) || 0 })
                    }
                    className="text-right pl-8 transition-all duration-200 focus:scale-[1.01]"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="sweetModulatorCost" className="flex items-center gap-2">
                  <Droplet className="w-3.5 h-3.5 text-slate-500" />
                  Sweet Modulator Cost (€/100L)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                    €
                  </span>
                  <Input
                    id="sweetModulatorCost"
                    type="number"
                    step="0.01"
                    value={data.sweetModulatorCost}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        sweetModulatorCost: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="text-right pl-8 transition-all duration-200 focus:scale-[1.01]"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {hasAdditionalCosts && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="font-medium text-amber-900 dark:text-amber-200">
                      Additional costs active
                    </span>
                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    Total: €{(data.enzymeCost + data.sweetModulatorCost).toFixed(2)}/100L
                  </p>
                </div>
              )}
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
