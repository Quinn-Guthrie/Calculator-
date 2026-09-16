import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CalculatorState, CalculationResults } from "./types";

export async function exportResultsAsPDF(
  state: CalculatorState
): Promise<void> {
  try {
    const resultElement = document.getElementById("pdf-export-content");
    if (!resultElement) {
      console.error("PDF export content element not found");
      return;
    }

    // Create canvas from DOM
    const canvas = await html2canvas(resultElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= 297; // A4 height

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }

    // Save PDF
    pdf.save(
      `SMARTYS-CIU-${state.scenario.name.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`
    );
  } catch (error) {
    console.error("Failed to export PDF:", error);
  }
}

export function generatePDFContent(
  state: CalculatorState,
  results: CalculationResults
): string {
  const sugarReduction = state.recipe.currentSugar - state.recipe.newSugar;
  const roiPositive = results.annualBenefit > 0;

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1f2937;">
      <!-- Header -->
      <div style="margin-bottom: 40px; border-bottom: 3px solid #0075CF; padding-bottom: 20px;">
        <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #0F172A;">
          SMARTYS CIU Analysis Report
        </h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #64748b;">
          Generated on ${new Date().toLocaleDateString()} • ${state.scenario.name}
        </p>
      </div>

      <!-- Key Metrics -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #0F172A;">Key Metrics</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 2px solid #16A34A;">
            <p style="margin: 0; font-size: 12px; color: #166534; font-weight: 600;">Annual Benefit</p>
            <p style="margin: 8px 0 0 0; font-size: 28px; font-weight: 700; color: #16A34A;">
              €${Math.round(results.annualBenefit).toLocaleString()}
            </p>
          </div>
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border: 2px solid #F97316;">
            <p style="margin: 0; font-size: 12px; color: #b45309; font-weight: 600;">Solution Cost</p>
            <p style="margin: 8px 0 0 0; font-size: 28px; font-weight: 700; color: #F97316;">
              €${results.additionalSolutionCost.toFixed(2)}/100L
            </p>
          </div>
        </div>
      </div>

      <!-- Scenario Configuration -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #0F172A;">Scenario Configuration</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Product</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${state.scenario.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Batch Volume</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${(state.scenario.batchVolume / 1000).toFixed(1)}K liters</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Annual Volume</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${(state.scenario.annualVolume / 1000000).toFixed(1)}M liters</td>
          </tr>
        </table>
      </div>

      <!-- Recipe Details -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #0F172A;">Recipe Optimization</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Current Sugar %</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${state.recipe.currentSugar.toFixed(1)}%</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">New Sugar %</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${state.recipe.newSugar.toFixed(1)}%</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #16A34A;">Total Reduction</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #16A34A;">${sugarReduction.toFixed(1)}%</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Sugar Savings</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #16A34A; font-weight: 600;">€${results.sugarSavings.toFixed(2)}/100L</td>
          </tr>
        </table>
      </div>

      <!-- Cost Analysis -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #0F172A;">Cost Analysis (per 100L)</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Sugar Savings</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; color: #16A34A; font-weight: 600;">+€${results.sugarSavings.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Milk Cost</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; color: #dc2626; font-weight: 600;">-€${results.addedMilkCost.toFixed(2)}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Recipe Net</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; font-weight: 600; color: ${results.recipeNetSaving > 0 ? "#16A34A" : "#dc2626"};">€${results.recipeNetSaving.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Solution Cost</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; color: #F97316; font-weight: 600;">-€${results.additionalSolutionCost.toFixed(2)}</td>
          </tr>
          <tr style="background: #0075CF; color: white;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Net Benefit</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700; font-size: 16px;">€${results.netBenefit.toFixed(2)}</td>
          </tr>
        </table>
      </div>

      <!-- Scaled Impact -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #0F172A;">Scaled Impact</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border: 2px solid #0075CF;">
            <p style="margin: 0; font-size: 12px; color: #0369a1; font-weight: 600;">Per Batch (${(state.scenario.batchVolume / 1000).toFixed(1)}K L)</p>
            <p style="margin: 8px 0 0 0; font-size: 28px; font-weight: 700; color: #0075CF;">
              €${Math.round(results.perBatchBenefit).toLocaleString()}
            </p>
          </div>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 2px solid #16A34A;">
            <p style="margin: 0; font-size: 12px; color: #166534; font-weight: 600;">Annual (${(state.scenario.annualVolume / 1000000).toFixed(1)}M L)</p>
            <p style="margin: 8px 0 0 0; font-size: 28px; font-weight: 700; color: #16A34A;">
              €${Math.round(results.annualBenefit).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <!-- Conclusion -->
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #0075CF;">
        <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #0F172A;">Analysis Summary</h3>
        <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">
          This scenario shows a ${roiPositive ? "positive" : "negative"} return on investment with an annual customer benefit of
          €${Math.round(results.annualBenefit).toLocaleString()}. The SMARTYS solution delivers value through sugar reduction
          optimization, with a total cost per 100L of €${results.additionalSolutionCost.toFixed(2)} offset by €${results.sugarSavings.toFixed(2)}
          in sugar savings.
        </p>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #9ca3af; text-align: center;">
        <p style="margin: 0;">SMARTYS CIU Calculator • IFF Health & Biosciences</p>
      </div>
    </div>
  `;
}
