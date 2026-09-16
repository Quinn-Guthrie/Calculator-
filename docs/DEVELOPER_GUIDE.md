# Developer Guide

## Project Structure

```
ciu-calculator/
├── app/
│   ├── globals.css          # Global styles, CSS variables, animations
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main calculator page
├── components/
│   ├── calculator/
│   │   ├── ScenarioInputs.tsx
│   │   ├── RawMaterialCosts.tsx
│   │   ├── CultureInputs.tsx
│   │   ├── AdditionalCosts.tsx
│   │   ├── RecipeInputs.tsx
│   │   ├── KPICards.tsx
│   │   ├── ScaledImpact.tsx
│   │   └── QuickActions.tsx
│   └── ui/                  # shadcn base components
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── accordion.tsx
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── constants.ts         # Default values
│   ├── calculations.ts      # Business logic
│   └── utils.ts             # Utility functions
└── docs/                    # Documentation
```

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **State**: React useState (client-side only)

## Setup

```bash
npm install
npm run dev
```

## Key Concepts

### State Management
Single state object in `page.tsx`:
```typescript
const [state, setState] = useState<CalculatorState>(DEFAULTS);
```

### Real-Time Calculations
```typescript
const results = calculateResults(state);
```
Runs on every render. Pure function, no side effects.

### Component Pattern
```typescript
interface ComponentProps {
  data: DataType;
  onChange: (data: DataType) => void;
}
```

## Adding New Features

### New Input Field
1. Update `lib/types.ts`
2. Add to `lib/constants.ts`
3. Update component
4. Modify `lib/calculations.ts` if needed

### New KPI Card
Add to `KPICards.tsx` following existing pattern with icon, color, and animation.

## Calculations Reference

All formulas in `lib/calculations.ts`:
```typescript
sugarRemoved = currentSugar - newSugar
sugarSavings = sugarRemoved × sugarCost
additionalMilk = sugarRemoved × milkReplacementFactor
addedMilkCost = additionalMilk × milkCost
recipeNetSaving = sugarSavings - addedMilkCost
currentCultureCost = (currentCulturePrice / 500) × cultureDose
smartysCultureCost = (smartysCulturePrice / 500) × cultureDose
incrementalCultureCost = smartysCultureCost - currentCultureCost
additionalSolutionCost = incrementalCultureCost + enzymeCost + sweetModulatorCost
netBenefit = recipeNetSaving - additionalSolutionCost
```

## Styling Guidelines

### Colors
- Green: Savings, positive values
- Red: Costs, negative values
- Blue: SMARTYS branding
- Slate: Neutral, structure

### Spacing
Use Tailwind spacing scale: 4, 6, 8, 12, 16, 24

### Animations
```typescript
transition-all duration-200  // Fast interactions
hover:scale-[1.02]          // Subtle card lift
focus:scale-[1.01]          // Input focus
```

## Testing

### Manual Test Checklist
- [ ] Default values load correctly
- [ ] All inputs accept numbers
- [ ] Calculations update in real-time
- [ ] Reset button works
- [ ] example preset loads correctly
- [ ] Mobile responsive
- [ ] Dark mode works

### Expected Results (Example Trial)
- Sugar Removed: 2.0 kg/100L
- Sugar Savings: €1.20/100L
- Added Milk Cost: €0.40/100L
- Recipe Net Saving: €0.80/100L
- Incremental Culture Cost: €0.40/100L
- Net Benefit: €0.40/100L
- Per Batch: €40.00
- Annual: €72,000.00

## Build & Deploy

```bash
npm run build    # Production build
npm run start    # Production server
```

Static export not supported (uses App Router features).

## Common Issues

### Tailwind Classes Not Working
- Check `globals.css` for CSS variable definitions
- Verify class names match Tailwind v4 syntax

### Icons Not Showing
- Ensure lucide-react is installed
- Use correct icon names (check lucide.dev)

### Calculations Wrong
- Verify formulas in `lib/calculations.ts`
- Check input parsing (parseFloat)
- Test with known values

## Performance

- No external API calls
- Pure function calculations
- Client-side only
- First load: <2s on 3G
- Subsequent renders: <50ms
