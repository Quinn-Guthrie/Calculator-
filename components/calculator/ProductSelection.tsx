"use client";

import { PRODUCT_TYPES } from "@/lib/constants";
import { ProductType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface ProductSelectionProps {
  onSelect: (type: ProductType, name: string) => void;
  selected?: ProductType;
}

export function ProductSelection({ onSelect, selected }: ProductSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Select Your Product
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Choose the dairy product you want to optimize
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCT_TYPES.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelect(product.id as ProductType, product.name)}
            className="group"
          >
            <Card
              className={`p-6 cursor-pointer transition-all duration-200 h-full ${
                selected === product.id
                  ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700"
                  : "hover:shadow-md hover:scale-105 border-slate-200 dark:border-slate-700"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="text-4xl">{product.emoji}</div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </h3>
                </div>
                {selected === product.id && (
                  <div className="mt-2">
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
