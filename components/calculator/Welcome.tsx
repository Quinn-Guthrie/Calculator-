"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { DEFAULTS } from "@/lib/constants";
import { calculateResults } from "@/lib/calculations";

interface WelcomeProps {
  onContinue: () => void;
}

export function Welcome({ onContinue }: WelcomeProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const defaultResults = calculateResults(DEFAULTS);
  const targetValue = defaultResults.annualBenefit;

  useEffect(() => {
    if (displayValue >= targetValue) return;
    const timer = setTimeout(() => {
      setDisplayValue(Math.min(displayValue + targetValue / 50, targetValue));
    }, 30);
    return () => clearTimeout(timer);
  }, [displayValue, targetValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-blue-900" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-purple-900" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-green-900" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              SMARTYS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Cost Reduction Explorer
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              Discover how sugar reduction powered by SMARTYS cultures can create measurable business value while maintaining product quality.
            </p>
          </div>

          {/* Animated Value Counter */}
          <div className="pt-8 pb-12 space-y-4">
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              Potential Annual Savings (Default Scenario)
            </p>
            <div className="inline-block">
              <div className="text-6xl font-bold text-green-600 dark:text-green-400 tracking-tight">
                €{Math.round(displayValue).toLocaleString()}
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              with standard recipe optimization
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onContinue}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:scale-105 active:scale-95 text-lg"
          >
            Start Exploration
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm text-slate-500 dark:text-slate-400 pt-4">
            Get ready to build your business case
          </p>
        </div>
      </div>
    </div>
  );
}
