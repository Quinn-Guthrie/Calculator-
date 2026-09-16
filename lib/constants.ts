import { CalculatorState, UIState } from "./types";

export const DEFAULTS: CalculatorState = {
  scenario: {
    name: "Sweet Stirred Yogurt",
    batchVolume: 10000,
    annualVolume: 18000000,
    productDensity: 1.0,
  },
  rawMaterials: {
    milkCost: 0.20,
    sugarCost: 0.60,
  },
  cultures: {
    currentCultureCost: 30,
    smartysCultureCost: 40,
    cultureDose: 20,
  },
  additional: {
    enzymeCost: 0,
    sweetModulatorCost: 0,
  },
  recipe: {
    currentSugar: 7.7,
    newSugar: 5.7,
    milkReplacementFactor: 1.0,
  },
};

export const DEFAULT_UI_STATE: UIState = {
  currentStep: "welcome",
  isPresentationMode: false,
  savedScenarios: [],
};

export const PRODUCT_TYPES = [
  { id: "stirredYogurt", name: "Stirred Yogurt", emoji: "🥛" },
  { id: "drinkingYogurt", name: "Drinking Yogurt", emoji: "🥤" },
  { id: "greekYogurt", name: "Greek Yogurt", emoji: "🍨" },
  { id: "freshCheese", name: "Fresh Cheese", emoji: "🧀" },
  { id: "kefir", name: "Kefir", emoji: "🥛" },
  { id: "custom", name: "Custom Product", emoji: "⚙️" },
] as const;

export const COLORS = {
  primary: "#0075CF",
  navy: "#0F172A",
  success: "#16A34A",
  warning: "#F97316",
  purple: "#8B5CF6",
  light: "#F8FAFC",
  white: "#FFFFFF",
  border: "#E2E8F0",
} as const;
