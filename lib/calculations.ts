import { CalculatorState, CalculationResults } from "./types";

export interface AIInsight {
  title: string;
  description: string;
  icon: "check" | "trending" | "info" | "alert";
}

export function calculateResults(state: CalculatorState): CalculationResults {
  // Step 1: Sugar Removed (kg per 100L)
  const sugarRemoved = state.recipe.currentSugar - state.recipe.newSugar;

  // Step 2: Sugar Savings (€ per 100L)
  const sugarSavings = sugarRemoved * state.rawMaterials.sugarCost;

  // Step 3: Additional Milk (L per 100L)
  const additionalMilk = sugarRemoved * state.recipe.milkReplacementFactor;

  // Step 4: Added Milk Cost (€ per 100L)
  const addedMilkCost = additionalMilk * state.rawMaterials.milkCost;

  // Step 5: Recipe Net Saving (€ per 100L)
  const recipeNetSaving = sugarSavings - addedMilkCost;

  // Step 6: Current Culture Cost (€ per 100L)
  const currentCultureCost =
    (state.cultures.currentCultureCost / 500) * state.cultures.cultureDose;

  // Step 7: SMARTYS Culture Cost (€ per 100L)
  const smartysCultureCost =
    (state.cultures.smartysCultureCost / 500) * state.cultures.cultureDose;

  // Step 8: Incremental Culture Cost (€ per 100L)
  const incrementalCultureCost = smartysCultureCost - currentCultureCost;

  // Step 9: Additional Solution Cost (€ per 100L)
  const additionalSolutionCost =
    incrementalCultureCost +
    state.additional.enzymeCost +
    state.additional.sweetModulatorCost;

  // Step 10: Net Benefit (€ per 100L)
  const netBenefit = recipeNetSaving - additionalSolutionCost;

  // Scaled calculations
  const batchFactor = state.scenario.batchVolume / 100;
  const perBatchBenefit = netBenefit * batchFactor;

  const annualFactor = state.scenario.annualVolume / 100;
  const annualBenefit = netBenefit * annualFactor;

  return {
    sugarRemoved,
    sugarSavings,
    additionalMilk,
    addedMilkCost,
    recipeNetSaving,
    currentCultureCost,
    smartysCultureCost,
    incrementalCultureCost,
    additionalSolutionCost,
    netBenefit,
    perBatchBenefit,
    annualBenefit,
  };
}

export function generateAIInsights(
  state: CalculatorState,
  results: CalculationResults
): AIInsight[] {
  const insights: AIInsight[] = [];

  const cultureCostPercent =
    results.annualBenefit > 0
      ? (results.additionalSolutionCost * 100 * (state.scenario.annualVolume / 100)) /
        results.annualBenefit
      : 0;
  const savingsPercentage =
    results.sugarSavings * (state.scenario.annualVolume / 100);

  if (results.annualBenefit > 0) {
    insights.push({
      title: "Positive ROI Identified",
      description: `This scenario creates approximately €${Math.round(results.annualBenefit).toLocaleString()} in annual savings with a positive return on investment.`,
      icon: "check",
    });
  }

  if (cultureCostPercent < 40) {
    insights.push({
      title: "Efficient Solution Investment",
      description: `The additional culture investment represents only ${Math.round(cultureCostPercent)}% of the total annual value generated.`,
      icon: "trending",
    });
  }

  const sugarReductionImpact = (results.sugarRemoved * 0.5) / 100;
  if (sugarReductionImpact > 0) {
    insights.push({
      title: "Scaling Opportunity",
      description: `Each additional 0.5% sugar reduction could increase total annual value by approximately €${Math.round(savingsPercentage * sugarReductionImpact).toLocaleString()}.`,
      icon: "trending",
    });
  }

  if (results.annualBenefit <= 0) {
    insights.push({
      title: "Adjustment Recommended",
      description:
        "The current scenario shows limited value. Consider reducing culture costs or increasing sugar reduction targets.",
      icon: "alert",
    });
  } else if (results.annualBenefit < 20000) {
    insights.push({
      title: "High-Volume Opportunity",
      description:
        "This solution becomes highly attractive at higher production volumes. Consider evaluating larger batch scenarios.",
      icon: "info",
    });
  }

  return insights;
}
