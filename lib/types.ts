export interface ScenarioData {
  name: string;
  batchVolume: number;
  annualVolume: number;
  productDensity: number;
}

export interface RawMaterialCosts {
  milkCost: number;
  sugarCost: number;
}

export interface CultureData {
  currentCultureCost: number;
  smartysCultureCost: number;
  cultureDose: number;
}

export interface AdditionalCosts {
  enzymeCost: number;
  sweetModulatorCost: number;
}

export interface RecipeData {
  currentSugar: number;
  newSugar: number;
  milkReplacementFactor: number;
}

export interface CalculatorState {
  scenario: ScenarioData;
  rawMaterials: RawMaterialCosts;
  cultures: CultureData;
  additional: AdditionalCosts;
  recipe: RecipeData;
}

export interface CalculationResults {
  sugarRemoved: number;
  sugarSavings: number;
  additionalMilk: number;
  addedMilkCost: number;
  recipeNetSaving: number;
  currentCultureCost: number;
  smartysCultureCost: number;
  incrementalCultureCost: number;
  additionalSolutionCost: number;
  netBenefit: number;
  perBatchBenefit: number;
  annualBenefit: number;
}

export interface SavedScenario {
  id: string;
  name: string;
  productType: string;
  createdAt: number;
  state: CalculatorState;
  results: CalculationResults;
}

export type ProductType = "stirredYogurt" | "drinkingYogurt" | "greekYogurt" | "freshCheese" | "kefir" | "custom";

export type WizardStep = "welcome" | "product" | "production" | "recipe" | "culture" | "results";

export interface UIState {
  currentStep: WizardStep;
  isPresentationMode: boolean;
  savedScenarios: SavedScenario[];
  currentScenarioId?: string;
}
