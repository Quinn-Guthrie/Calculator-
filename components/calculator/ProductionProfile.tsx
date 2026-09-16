"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";

interface ProductionProfileProps {
  batchVolume: number;
  annualVolume: number;
  onBatchVolumeChange: (value: number) => void;
  onAnnualVolumeChange: (value: number) => void;
}

export function ProductionProfile({
  batchVolume,
  annualVolume,
  onBatchVolumeChange,
  onAnnualVolumeChange,
}: ProductionProfileProps) {
  const scaleBatch = (sliderValue: number) => {
    if (sliderValue <= 50) return 100 + (sliderValue / 50) * 900;
    if (sliderValue <= 80) return 1000 + ((sliderValue - 50) / 30) * 9000;
    return 10000 + ((sliderValue - 80) / 20) * 90000;
  };

  const scaleAnnual = (sliderValue: number) => {
    if (sliderValue <= 50) return 100000 + (sliderValue / 50) * 900000;
    if (sliderValue <= 80) return 1000000 + ((sliderValue - 50) / 30) * 9000000;
    return 10000000 + ((sliderValue - 80) / 20) * 90000000;
  };

  const getBatchSliderValue = (val: number) => {
    if (val <= 1000) return (val - 100) / 9;
    if (val <= 10000) return 50 + ((val - 1000) / 9000) * 30;
    return 80 + ((val - 10000) / 90000) * 20;
  };

  const getAnnualSliderValue = (val: number) => {
    if (val <= 1000000) return (val - 100000) / 9000;
    if (val <= 10000000) return 50 + ((val - 1000000) / 9000000) * 30;
    return 80 + ((val - 10000000) / 90000000) * 20;
  };

  const handleBatchSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderVal = parseFloat(e.target.value);
    onBatchVolumeChange(scaleBatch(sliderVal));
  };

  const handleAnnualSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderVal = parseFloat(e.target.value);
    onAnnualVolumeChange(scaleAnnual(sliderVal));
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Production Profile
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Define your batch and annual production volumes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Batch Volume */}
        <Card className="p-6 space-y-6">
          <div>
            <Label className="text-base font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Batch Volume
            </Label>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Per production run
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={getBatchSliderValue(batchVolume)}
                onChange={handleBatchSlider}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">
                {(batchVolume / 1000).toFixed(1)}K
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Liters
              </span>
            </div>

            <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-500">
              <span>Small: 1K L</span>
              <div className="flex-1" />
              <span>Industrial: 100K L</span>
            </div>
          </div>
        </Card>

        {/* Annual Volume */}
        <Card className="p-6 space-y-6">
          <div>
            <Label className="text-base font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Annual Volume
            </Label>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Total yearly production
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={getAnnualSliderValue(annualVolume)}
                onChange={handleAnnualSlider}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">
                {(annualVolume / 1000000).toFixed(1)}M
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Liters
              </span>
            </div>

            <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-500">
              <span>1M L</span>
              <div className="flex-1" />
              <span>600M L</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 Tip: Larger volumes maximize the impact of SMARTYS culture benefits
        </p>
      </Card>
    </div>
  );
}
