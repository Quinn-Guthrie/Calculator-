"use client";

import { SavedScenario } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Copy } from "lucide-react";

interface ScenarioManagerProps {
  scenarios: SavedScenario[];
  onLoad: (scenario: SavedScenario) => void;
  onDuplicate: (scenario: SavedScenario) => void;
  onDelete: (id: string) => void;
}

export function ScenarioManager({
  scenarios,
  onLoad,
  onDuplicate,
  onDelete,
}: ScenarioManagerProps) {
  if (scenarios.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          No scenarios saved yet
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500">
          Save your first scenario to compare multiple configurations
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {scenarios.map((scenario) => (
        <Card
          key={scenario.id}
          className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onLoad(scenario)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                {scenario.name}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {scenario.productType} • Saved{" "}
                {new Date(scenario.createdAt).toLocaleDateString()}
              </p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  scenario.results.annualBenefit > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                €{Math.round(scenario.results.annualBenefit).toLocaleString()} /
                year
              </p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(scenario);
                }}
                size="sm"
                variant="outline"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(scenario.id);
                }}
                size="sm"
                variant="outline"
                className="hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
