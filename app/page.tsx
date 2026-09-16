"use client";

import { useState } from "react";
import { Welcome } from "@/components/calculator/Welcome";
import { ProductSelection } from "@/components/calculator/ProductSelection";
import { ProductionProfile } from "@/components/calculator/ProductionProfile";
import { RecipeBuilder } from "@/components/calculator/RecipeBuilder";
import { CultureComparison } from "@/components/calculator/CultureComparison";
import { ResultsPage } from "@/components/calculator/ResultsPage";
import { DEFAULTS, DEFAULT_UI_STATE } from "@/lib/constants";
import { calculateResults } from "@/lib/calculations";
import { CalculatorState, WizardStep, SavedScenario, UIState } from "@/lib/types";
import { Calculator, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [state, setState] = useState<CalculatorState>(DEFAULTS);
  const [uiState, setUiState] = useState<UIState>(DEFAULT_UI_STATE);
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);

  const results = calculateResults(state);

  const stepTitles: Record<WizardStep, string> = {
    welcome: "Welcome",
    product: "Product Selection",
    production: "Production Profile",
    recipe: "Recipe Configuration",
    culture: "Culture Comparison",
    results: "Results",
  };

  const handleNext = () => {
    const steps: WizardStep[] = [
      "welcome",
      "product",
      "production",
      "recipe",
      "culture",
      "results",
    ];
    const currentIdx = steps.indexOf(uiState.currentStep);
    if (currentIdx < steps.length - 1) {
      setUiState({
        ...uiState,
        currentStep: steps[currentIdx + 1],
      });
    }
  };

  const handleBack = () => {
    const steps: WizardStep[] = [
      "welcome",
      "product",
      "production",
      "recipe",
      "culture",
      "results",
    ];
    const currentIdx = steps.indexOf(uiState.currentStep);
    if (currentIdx > 0) {
      setUiState({
        ...uiState,
        currentStep: steps[currentIdx - 1],
      });
    }
  };

  const handleSaveScenario = () => {
    const scenario: SavedScenario = {
      id: Date.now().toString(),
      name: state.scenario.name,
      productType: state.scenario.name,
      createdAt: Date.now(),
      state,
      results,
    };
    setSavedScenarios([...savedScenarios, scenario]);
  };

  const renderStep = () => {
    switch (uiState.currentStep) {
      case "welcome":
        return <Welcome onContinue={handleNext} />;

      case "product":
        return (
          <ProductSelection
            selected="stirredYogurt"
            onSelect={(type, name) => {
              setState({
                ...state,
                scenario: { ...state.scenario, name },
              });
              handleNext();
            }}
          />
        );

      case "production":
        return (
          <ProductionProfile
            batchVolume={state.scenario.batchVolume}
            annualVolume={state.scenario.annualVolume}
            onBatchVolumeChange={(val) =>
              setState({
                ...state,
                scenario: { ...state.scenario, batchVolume: val },
              })
            }
            onAnnualVolumeChange={(val) =>
              setState({
                ...state,
                scenario: { ...state.scenario, annualVolume: val },
              })
            }
          />
        );

      case "recipe":
        return (
          <RecipeBuilder
            currentSugar={state.recipe.currentSugar}
            newSugar={state.recipe.newSugar}
            milkReplacementFactor={state.recipe.milkReplacementFactor}
            onCurrentSugarChange={(val) =>
              setState({
                ...state,
                recipe: { ...state.recipe, currentSugar: val },
              })
            }
            onNewSugarChange={(val) =>
              setState({
                ...state,
                recipe: { ...state.recipe, newSugar: val },
              })
            }
            onMilkReplacementFactorChange={(val) =>
              setState({
                ...state,
                recipe: { ...state.recipe, milkReplacementFactor: val },
              })
            }
          />
        );

      case "culture":
        return (
          <CultureComparison
            currentCultureCost={state.cultures.currentCultureCost}
            smartysCultureCost={state.cultures.smartysCultureCost}
            cultureDose={state.cultures.cultureDose}
            enzymeCost={state.additional.enzymeCost}
            sweetModulatorCost={state.additional.sweetModulatorCost}
            onCurrentCultureCostChange={(val) =>
              setState({
                ...state,
                cultures: { ...state.cultures, currentCultureCost: val },
              })
            }
            onSmartyCultureCostChange={(val) =>
              setState({
                ...state,
                cultures: { ...state.cultures, smartysCultureCost: val },
              })
            }
            onCultureDoseChange={(val) =>
              setState({
                ...state,
                cultures: { ...state.cultures, cultureDose: val },
              })
            }
            onEnzymeCostChange={(val) =>
              setState({
                ...state,
                additional: { ...state.additional, enzymeCost: val },
              })
            }
            onSweetModulatorCostChange={(val) =>
              setState({
                ...state,
                additional: { ...state.additional, sweetModulatorCost: val },
              })
            }
          />
        );

      case "results":
        return (
          <ResultsPage
            state={state}
            results={results}
            onEdit={() => setUiState({ ...uiState, currentStep: "product" })}
            onSaveScenario={handleSaveScenario}
            isPresentationMode={uiState.isPresentationMode}
            onTogglePresentationMode={() =>
              setUiState({
                ...uiState,
                isPresentationMode: !uiState.isPresentationMode,
              })
            }
          />
        );

      default:
        return null;
    }
  };

  const isFirstStep = uiState.currentStep === "welcome";
  const isLastStep = uiState.currentStep === "results";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  SMARTYS CIU Explorer
                </h1>
              </div>
            </div>

            {!isFirstStep && (
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stepTitles[uiState.currentStep]}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto animate-fadeIn">
          {renderStep()}
        </div>
      </main>

      {/* Navigation */}
      {!isFirstStep && (
        <footer className="sticky bottom-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex gap-4 justify-between">
              <Button onClick={handleBack} variant="outline" size="lg">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {!isLastStep && (
                <Button onClick={handleNext} size="lg">
                  Next
                </Button>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
