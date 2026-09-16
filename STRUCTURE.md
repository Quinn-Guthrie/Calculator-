# Project Structure

```
ciu-calculator/
│
├── 📄 README.md                    # Project overview & quick start
├── 📄 CLAUDE.md                    # AI development guidelines
├── 📄 ENHANCEMENTS.md              # Apple-inspired improvements list
├── 📄 STRUCTURE.md                 # This file
│
├── 📁 app/                         # Next.js App Router
│   ├── globals.css                 # Global styles, animations, CSS variables
│   ├── layout.tsx                  # Root layout with fonts & metadata
│   ├── page.tsx                    # Main calculator page (client component)
│   └── favicon.ico                 # App icon
│
├── 📁 components/
│   │
│   ├── 📁 calculator/              # Calculator-specific components
│   │   ├── ScenarioInputs.tsx      # Section A: Scenario info
│   │   ├── RawMaterialCosts.tsx    # Section B: Milk & sugar costs
│   │   ├── CultureInputs.tsx       # Sections C & D: Current & SMARTYS cultures
│   │   ├── AdditionalCosts.tsx     # Section E: Enzyme & modulator (accordion)
│   │   ├── RecipeInputs.tsx        # Section F: Sugar reduction config
│   │   ├── KPICards.tsx            # 6 result cards (primary KPI)
│   │   ├── ScaledImpact.tsx        # Per batch & annual impact
│   │   └── QuickActions.tsx        # Reset & preset buttons
│   │
│   └── 📁 ui/                      # shadcn/ui base components
│       ├── card.tsx                # Card container component
│       ├── input.tsx               # Input field component
│       ├── label.tsx               # Label component
│       └── accordion.tsx           # Accordion component
│
├── 📁 lib/                         # Business logic & utilities
│   ├── types.ts                    # TypeScript interfaces
│   ├── constants.ts                # Default values (DEFAULTS object)
│   ├── calculations.ts             # Pure calculation functions
│   └── utils.ts                    # Utility functions (cn helper)
│
├── 📁 docs/                        # Documentation
│   ├── USER_GUIDE.md               # Complete user manual
│   ├── DEVELOPER_GUIDE.md          # Technical development guide
│   └── DESIGN_SYSTEM.md            # Design tokens & patterns
│
├── 📁 public/                      # Static assets
│   └── (empty - ready for images/icons)
│
└── 📁 node_modules/                # Dependencies (not in git)

```

## Key Files Explained

### Root Configuration
- `package.json` - Dependencies & scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS v4 config (via PostCSS)
- `postcss.config.mjs` - PostCSS with Tailwind plugin
- `eslint.config.mjs` - ESLint rules
- `components.json` - shadcn/ui configuration

### App Directory (`app/`)
All Next.js routes and layouts live here. Using App Router (not Pages Router).

**globals.css** - Contains:
- CSS custom properties (colors, spacing)
- Dark mode variables
- Animation keyframes
- Global styles (font smoothing, scroll behavior)

**layout.tsx** - Wraps entire app:
- Sets HTML lang and fonts
- Provides metadata
- Renders children

**page.tsx** - Main calculator:
- Client component (`"use client"`)
- Manages state with useState
- Composes all calculator components
- Handles real-time calculations

### Components (`components/`)

#### Calculator Components
Each component follows this pattern:
```typescript
interface ComponentProps {
  data: DataType;
  onChange: (data: DataType) => void;
}
```

**ScenarioInputs** - 4 inputs (name, batch volume, annual volume, density)

**RawMaterialCosts** - 2 inputs (milk cost, sugar cost)

**CultureInputs** - 2 cards side-by-side (current & SMARTYS)

**AdditionalCosts** - Accordion with 2 optional inputs

**RecipeInputs** - Sugar reduction config with validation

**KPICards** - 6 result cards:
1. Sugar Removed (neutral)
2. Sugar Savings (green)
3. Added Milk Cost (red)
4. Recipe Net Saving (conditional)
5. Incremental Solution Cost (orange)
6. Net Customer Benefit (PRIMARY - large, bold)

**ScaledImpact** - 2 large cards (per batch & annual)

**QuickActions** - Preset & reset buttons

#### UI Components (shadcn/ui)
Reusable base components from shadcn/ui library.

### Lib (`lib/`)

**types.ts** - All TypeScript interfaces:
- CalculatorState (complete state shape)
- ScenarioData
- RawMaterialCosts
- CultureData
- AdditionalCosts
- RecipeData
- CalculationResults

**constants.ts** - Default values:
- DEFAULTS object with example trial data

**calculations.ts** - Pure functions:
- `calculateResults(state)` - Main calculation function
- Returns CalculationResults object
- No side effects, easily testable

**utils.ts** - Utility functions:
- `cn()` - className merging with Tailwind

### Docs (`docs/`)

**USER_GUIDE.md** (10k words)
- How to use the calculator
- Input explanations
- Result interpretations
- Tips & best practices
- Glossary

**DEVELOPER_GUIDE.md** (4k words)
- Code structure
- Development setup
- Adding features
- Testing
- Common issues

**DESIGN_SYSTEM.md** (2k words)
- Color palette
- Typography scale
- Spacing system
- Component patterns
- Animation guidelines

## File Count Summary

```
Total files: ~30
- TypeScript/TSX: 20
- Markdown docs: 7
- Config files: 8
- CSS: 1
```

## Size Breakdown

```
node_modules/: ~400MB (dependencies)
.next/: ~50MB (build output)
app/: ~10KB
components/: ~40KB
lib/: ~8KB
docs/: ~20KB
```

## Development Workflow

1. Edit component in `components/calculator/`
2. Update types in `lib/types.ts` if needed
3. Modify calculations in `lib/calculations.ts` if needed
4. Test in browser (hot reload automatic)
5. Update docs if user-facing changes

## Adding New Features

### New Input Field
1. Add to interface in `lib/types.ts`
2. Add default in `lib/constants.ts`
3. Create/update component in `components/calculator/`
4. Wire up in `app/page.tsx`
5. Update calculation if needed

### New KPI Card
1. Add calculation in `lib/calculations.ts`
2. Add to CalculationResults interface
3. Add card in `components/calculator/KPICards.tsx`

### New Preset
Add to `components/calculator/QuickActions.tsx`

## Build Output

```
npm run build
```

Creates:
- `.next/` - Optimized production build
- Static HTML/CSS/JS
- Image optimization
- Route pre-rendering

## Environment

No environment variables needed for V1.
All calculations client-side, no API calls.
