"use client";

import { AIInsight } from "@/lib/calculations";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  TrendingUp,
  Info,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface AIInsightsPanelProps {
  insights: AIInsight[];
}

export function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  const iconMap = {
    check: CheckCircle,
    trending: TrendingUp,
    info: Info,
    alert: AlertCircle,
  };

  const colorMap = {
    check: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    trending: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    info: "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800",
    alert:
      "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
  };

  const textColorMap = {
    check: "text-green-700 dark:text-green-300",
    trending: "text-blue-700 dark:text-blue-300",
    info: "text-indigo-700 dark:text-indigo-300",
    alert: "text-orange-700 dark:text-orange-300",
  };

  return (
    <Card className="p-6 border-2 border-purple-300 dark:border-purple-700 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          AI Insights
        </h3>
      </div>

      <div className="space-y-4">
        {insights.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center py-8">
            Configure your parameters to see personalized insights
          </p>
        ) : (
          insights.map((insight, idx) => {
            const Icon = iconMap[insight.icon];
            const bgColor = colorMap[insight.icon];
            const textColor = textColorMap[insight.icon];

            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${bgColor} transition-all hover:scale-105`}
              >
                <div className="flex gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${textColor}`} />
                  <div className="space-y-1">
                    <h4 className={`font-semibold text-sm ${textColor}`}>
                      {insight.title}
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
