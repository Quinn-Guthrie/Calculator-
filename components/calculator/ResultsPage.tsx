"use client";

import { CalculatorState, CalculationResults } from "@/lib/types";
import { HeroKPI } from "./HeroKPI";
import { SavingsWaterfall } from "./SavingsWaterfall";
import { AIInsightsPanel } from "./AIInsightsPanel";
import { KPICards } from "./KPICards";
import { ScaledImpact } from "./ScaledImpact";
import { generateAIInsights } from "@/lib/calculations";
import { exportResultsAsPDF } from "@/lib/pdf-export";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Edit2, FileText } from "lucide-react";
import { useState } from "react";

interface ResultsPageProps {
  state: CalculatorState;
  results: CalculationResults;
  onEdit: () => void;
  onSaveScenario: () => void;
  isPresentationMode: boolean;
  onTogglePresentationMode: () => void;
}

export function ResultsPage({
  state,
  results,
  onEdit,
  onSaveScenario,
  isPresentationMode,
  onTogglePresentationMode,
}: ResultsPageProps) {
  const [isExporting, setIsExporting] = useState(false);
  const insights = generateAIInsights(state, results);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportResultsAsPDF(state);
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  if (isPresentationMode) {
    return (
      <div className="space-y-8">
        <HeroKPI results={results} />
        <SavingsWaterfall results={results} />
        <KPICards results={results} />
      </div>
    );
  }

  return (
    <>
      {/* Hidden PDF Export Container */}
      <div id="pdf-export-content" style={{ display: "none" }}>
        <div style={{ padding: "40px", fontFamily: "system-ui, sans-serif" }}>
          {/* Header */}
          <div style={{ marginBottom: "40px", borderBottom: "3px solid #0075CF", paddingBottom: "20px" }}>
            <h1 style={{ margin: 0, fontSize: "32px", fontWeight: 700, color: "#0F172A" }}>
              SMARTYS CIU Analysis Report
            </h1>
            <p style={{ margin: "10px 0 0 0", fontSize: "14px", color: "#64748b" }}>
              Generated on {new Date().toLocaleDateString()} • {state.scenario.name}
            </p>
          </div>

          {/* Hero Metrics */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px", color: "#0F172A" }}>Key Metrics</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ background: "#f0fdf4", padding: "20px", borderRadius: "8px", border: "2px solid #16A34A" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#166534", fontWeight: 600 }}>Annual Benefit</p>
                <p style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: 700, color: "#16A34A" }}>
                  €{Math.round(results.annualBenefit).toLocaleString()}
                </p>
              </div>
              <div style={{ background: "#fef3c7", padding: "20px", borderRadius: "8px", border: "2px solid #F97316" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#b45309", fontWeight: 600 }}>Solution Cost</p>
                <p style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: 700, color: "#F97316" }}>
                  €{results.additionalSolutionCost.toFixed(2)}/100L
                </p>
              </div>
            </div>
          </div>

          {/* Cost Analysis Table */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px", color: "#0F172A" }}>Cost Analysis (per 100L)</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <tbody>
                <tr style={{ background: "#f8fafc" }}>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", fontWeight: 600 }}>Sugar Savings</td>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", textAlign: "right", color: "#16A34A", fontWeight: 600 }}>
                    +€{results.sugarSavings.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", fontWeight: 600 }}>Milk Cost</td>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", textAlign: "right", color: "#dc2626", fontWeight: 600 }}>
                    -€{results.addedMilkCost.toFixed(2)}
                  </td>
                </tr>
                <tr style={{ background: "#f8fafc" }}>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", fontWeight: 600 }}>Recipe Net</td>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", textAlign: "right", fontWeight: 600, color: results.recipeNetSaving > 0 ? "#16A34A" : "#dc2626" }}>
                    €{results.recipeNetSaving.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", fontWeight: 600 }}>Solution Cost</td>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", textAlign: "right", color: "#F97316", fontWeight: 600 }}>
                    -€{results.additionalSolutionCost.toFixed(2)}
                  </td>
                </tr>
                <tr style={{ background: "#0075CF", color: "white" }}>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", fontWeight: 600 }}>Net Benefit</td>
                  <td style={{ padding: "12px", border: "1px solid #e2e8f0", textAlign: "right", fontWeight: 700, fontSize: "16px" }}>
                    €{results.netBenefit.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Scaled Impact */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px", color: "#0F172A" }}>Scaled Impact</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ background: "#eff6ff", padding: "20px", borderRadius: "8px", border: "2px solid #0075CF" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#0369a1", fontWeight: 600 }}>Per Batch</p>
                <p style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: 700, color: "#0075CF" }}>
                  €{Math.round(results.perBatchBenefit).toLocaleString()}
                </p>
              </div>
              <div style={{ background: "#f0fdf4", padding: "20px", borderRadius: "8px", border: "2px solid #16A34A" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#166534", fontWeight: 600 }}>Annual</p>
                <p style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: 700, color: "#16A34A" }}>
                  €{Math.round(results.annualBenefit).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Hero */}
        <section className="space-y-4">
          <HeroKPI results={results} />
        </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Visualizations */}
        <div className="lg:col-span-2 space-y-8">
          <SavingsWaterfall results={results} />
          <KPICards results={results} />
          <ScaledImpact results={results} />
        </div>

        {/* Right Column - Insights & Actions */}
        <div className="space-y-6">
          <AIInsightsPanel insights={insights} />

          {/* Action Buttons */}
          <Card className="p-4 space-y-3">
            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              {isExporting ? "Exporting..." : "Export as PDF"}
            </Button>

            <Button
              onClick={onTogglePresentationMode}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Presentation Mode
            </Button>

            <Button
              onClick={onSaveScenario}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Save Scenario
            </Button>

            <Button
              onClick={onEdit}
              variant="outline"
              className="w-full"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Parameters
            </Button>
          </Card>

          {/* Scenario Info */}
          <Card className="p-4 bg-slate-50 dark:bg-slate-800 space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              Scenario Details
            </h4>
            <div className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <p>
                <span className="font-medium">Product:</span> {state.scenario.name}
              </p>
              <p>
                <span className="font-medium">Batch:</span>{" "}
                {(state.scenario.batchVolume / 1000).toFixed(1)}K L
              </p>
              <p>
                <span className="font-medium">Annual:</span>{" "}
                {(state.scenario.annualVolume / 1000000).toFixed(1)}M L
              </p>
              <p>
                <span className="font-medium">Sugar Reduction:</span>{" "}
                {(state.recipe.currentSugar - state.recipe.newSugar).toFixed(1)}%
              </p>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}
