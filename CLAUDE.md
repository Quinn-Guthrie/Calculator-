# CIU Calculator Project

Cost-In-Use calculator for SMARTYS cultures. Demonstrates economic benefits of sugar reduction and solution comparison for fermented dairy products.

## Project Type

Next.js web application with TypeScript, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI)
- **Charts**: Recharts (for future use)
- **State**: React useState (client-side only, no backend)

## Design Philosophy

Follow Apple's Human Interface Guidelines for web:

### Visual Design
- **Clean, spacious layouts** with generous whitespace
- **Clear hierarchy** through typography scale and weight
- **Subtle shadows** (use Tailwind's shadow-sm, shadow-md sparingly)
- **Minimal borders** - prefer subtle backgrounds to separate sections
- **Smooth animations** - use Tailwind transitions (duration-200, ease-in-out)
- **System fonts** - use default sans-serif stack for clarity

### Color Principles
- **Light mode primary** with dark mode support
- **Neutrals dominate** - grays for structure, color for meaning
- **Green for positive** values (net benefits, savings)
- **Red for negative** values (costs, deficits)
- **Blue for interactive** elements
- **Avoid pure black** - use slate-900 or gray-900

### Component Style
- **Rounded corners** - rounded-lg (8px) for cards, rounded-md (6px) for inputs
- **Hover states** - subtle scale or opacity changes
- **Focus states** - clear ring indicators for accessibility
- **Cards** - use subtle background (bg-white dark:bg-slate-800) with shadow-sm
- **Buttons** - clear primary/secondary distinction
- **Inputs** - clean borders, clear labels, inline validation

### Layout
- **Single column on mobile** (<640px)
- **Two column on tablet** (640px-1024px)
- **Multi-column on desktop** (>1024px)
- **Max width containers** - max-w-7xl for main content
- **Consistent spacing** - use Tailwind spacing scale (4, 6, 8, 12, 16)
- **Grid for KPI cards** - responsive grid with even gaps

## Application Structure

```
/app
  /page.tsx              # Main calculator page
  /layout.tsx            # Root layout with IFF branding
  /globals.css           # Global styles and CSS variables
/components
  /calculator
    /ScenarioInputs.tsx  # Section A
    /RawMaterialCosts.tsx # Section B
    /CultureInputs.tsx   # Sections C & D
    /AdditionalCosts.tsx # Section E (accordion)
    /RecipeInputs.tsx    # Section F
    /KPICards.tsx        # Output cards grid
    /ScaledImpact.tsx    # Batch & annual totals
  /ui                    # shadcn components
/lib
  /calculations.ts       # All formula logic
  /types.ts             # TypeScript interfaces
  /constants.ts         # Default values
  /utils.ts             # Utility functions (cn helper)
```

## Business Logic

### Core Calculations (Step-by-Step)

All calculations are implemented in `lib/calculations.ts`:

1. **Sugar Removed** = Current Sugar % - New Sugar %
2. **Sugar Savings** = Sugar Removed × Sugar Cost
3. **Additional Milk** = Sugar Removed × Milk Replacement Factor
4. **Added Milk Cost** = Additional Milk × Milk Cost
5. **Recipe Net Saving** = Sugar Savings - Added Milk Cost
6. **Current Culture Cost** = (Current Culture Price / 500) × Culture Dose
7. **SMARTYS Culture Cost** = (SMARTYS Culture Price / 500) × Culture Dose
8. **Incremental Culture Cost** = SMARTYS Culture Cost - Current Culture Cost
9. **Additional Solution Cost** = Incremental Culture Cost + Enzyme Cost + Sweet Modulator Cost
10. **Net Benefit** = Recipe Net Saving - Additional Solution Cost

### Scaling Calculations

- **Per Batch** = Net Benefit × (Batch Volume / 100)
- **Annual** = Net Benefit × (Annual Volume / 100)

## Default Values

Defined in `lib/constants.ts`:

```typescript
const DEFAULTS = {
  scenario: {
    name: "Sweet Stirred Yogurt",
    batchVolume: 10000,      // L
    annualVolume: 18000000,  // L
    productDensity: 1.0,     // kg/L
  },
  rawMaterials: {
    milkCost: 0.20,          // €/L
    sugarCost: 0.60,         // €/kg
  },
  cultures: {
    currentCultureCost: 30,  // € per 500 DCU
    smartysCultureCost: 40,  // € per 500 DCU
    cultureDose: 20,         // DCU/100L
  },
  additional: {
    enzymeCost: 0,           // €/100L
    sweetModulatorCost: 0,   // €/100L
  },
  recipe: {
    currentSugar: 7.7,       // %
    newSugar: 5.7,           // %
    milkReplacementFactor: 1.0,
  },
};
```

## Component Guidelines

### Number Formatting
- Currency: `€${value.toFixed(2)}`
- Large currency: `€${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
- Percentages: `${value.toFixed(1)}%`
- Volume: `${value.toLocaleString()} L`
- Masses: `${value.toFixed(1)} kg`

### Validation Rules

- All numeric inputs must be > 0
- New Sugar % should be < Current Sugar % (show warning if not)
- Culture Dose should be reasonable (1-100 DCU/100L)
- No calculation should produce NaN or Infinity

### Real-Time Updates

All calculations trigger on input change. State management uses React `useState` with immediate recalculation via the `calculateResults` function.

## Accessibility

- All inputs have associated labels
- KPI cards have semantic structure
- Color is not the only indicator (icons: ↑↓ for positive/negative)
- Keyboard navigation works throughout
- Focus indicators are clear and visible
- ARIA labels where needed
- Dark mode respects system preferences

## Responsive Breakpoints

```
sm: 640px   # Tablet portrait
md: 768px   # Tablet landscape
lg: 1024px  # Desktop
xl: 1280px  # Large desktop
```

## Code Style

- TypeScript strict mode enabled
- Functional components with hooks
- Extract calculations to pure functions
- One component per file
- Named exports for components
- Use `const` for all declarations
- Destructure props in function signature
- Use optional chaining `?.` for safety
- Client components marked with `"use client"`

## Testing Scenarios

### Example Trial
**Inputs:**
- Milk: €0.20/L
- Sugar: €0.60/kg
- Current Culture: €30/500 DCU
- SMARTYS: €40/500 DCU
- Culture Dose: 20 DCU/100L
- Sugar: 7.7% → 5.7%

**Expected Outputs:**
- Sugar Removed: 2.0 kg/100L
- Sugar Savings: €1.20/100L
- Added Milk Cost: €0.40/100L
- Recipe Net Saving: €0.80/100L
- Incremental Culture Cost: €0.40/100L
- **Net Benefit: €0.40/100L**
- Per Batch (10,000L): €400
- Annual (18M L): €72,000

### Edge Cases to Test
- Zero sugar reduction (should show warning)
- Very high enzyme costs (net benefit goes negative)
- Large volumes (check formatting, no overflow)
- Extremely small values (decimals handled correctly)

## Key Messages

The calculator must clearly communicate:

1. **Sugar reduction creates value** through recipe optimization
2. **Net benefit** = Recipe savings - Solution costs
3. **SMARTYS is not just culture cost** - it's total economic impact
4. **ROI is immediate** and scales with volume

## Success Criteria

Sales representatives should be able to:
- Enter customer costs in < 2 minutes
- See net benefit immediately as they type
- Understand which factors drive value
- Compare multiple solution configurations
- View batch and annual scaled impact
- Present results confidently in customer discussions

## Development Notes

- No authentication required for V1
- No backend or database in V1
- All calculations performed client-side
- Mobile-first responsive design
- Fast load times (<2s on 3G)
- Works offline after initial load
- State persists during session (no URL persistence in V1)

## Future Enhancements (Phase 2)

- JSON scenario export
- PDF report generation
- URL state persistence with query params
- Multi-scenario comparison table
- Historical scenario library with localStorage
- Advanced charting with Recharts
- Custom IFF branding configuration

## Commands

```bash
# Development
npm run dev          # Start dev server (with Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Component development
# Edit files in components/calculator/ for UI changes
# Edit lib/calculations.ts for business logic changes
```

## Common Tasks

### Adding a New Input Field
1. Update interface in `lib/types.ts`
2. Add default value in `lib/constants.ts`
3. Create/update component in `components/calculator/`
4. Update state handler in `app/page.tsx`
5. Update calculation logic if needed in `lib/calculations.ts`

### Changing Calculation Logic
1. Edit `lib/calculations.ts`
2. Test with example trial values
3. Verify KPI cards update correctly
4. Check scaled impact calculations

### Styling Changes
1. Global styles: Edit `app/globals.css`
2. Component styles: Edit inline Tailwind classes
3. Color theme: Update CSS variables in `globals.css`
4. Dark mode: Add `dark:` variants to Tailwind classes

## Troubleshooting

### Calculator not updating
- Check browser console for errors
- Verify state is updating in React DevTools
- Check that onChange handlers are properly connected

### Styling issues
- Verify Tailwind classes are correct
- Check dark mode variants are included
- Ensure `cn()` utility is used for conditional classes

### Build errors
- Run `npm run lint` to check for TypeScript errors
- Verify all imports are correct
- Check that all components are properly exported
