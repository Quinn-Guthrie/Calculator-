# Documentation Index

Quick reference to all documentation in this project.

## 📖 For Users

### [USER_GUIDE.md](USER_GUIDE.md)
**Complete user manual** - How to use the calculator

**Contents:**
- Getting started
- Input sections explained
- Understanding results
- Quick actions (presets & reset)
- Tips & best practices
- Validation & accuracy
- Glossary of terms

**Read this if you want to:**
- Learn how to use the calculator
- Understand what each input means
- Interpret the results
- Get tips for accurate calculations

---

## 💻 For Developers

### [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
**Technical documentation** - How to develop & maintain

**Contents:**
- Project structure
- Technology stack
- Setup instructions
- Key concepts & patterns
- Adding new features
- Testing checklist
- Common issues

**Read this if you want to:**
- Set up development environment
- Understand the code structure
- Add new features
- Fix bugs
- Contribute to the project

---

## 🎨 For Designers

### [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
**Design tokens & patterns** - Visual style guide

**Contents:**
- Color palette (light & dark)
- Typography scale & weights
- Spacing system
- Component patterns
- Icon sizes & colors
- Animations & transitions
- Responsive breakpoints

**Read this if you want to:**
- Understand the visual design
- Maintain consistency
- Create new components
- Match the Apple-inspired style

---

## 🏗️ Project Overview

### [../README.md](../README.md)
**Quick start guide** - Project overview

**Contents:**
- Features overview
- Quick start commands
- What it calculates
- Tech stack
- Browser support
- License & contact

**Read this if you want to:**
- Get a quick overview
- Install & run the project
- See what it does
- Know what technologies are used

---

### [../STRUCTURE.md](../STRUCTURE.md)
**Project structure** - File & folder organization

**Contents:**
- Complete directory tree
- File explanations
- Component architecture
- Development workflow
- Build output

**Read this if you want to:**
- Navigate the codebase
- Understand file organization
- Know where to find things
- See how it all connects

---

### [../CLAUDE.md](../CLAUDE.md)
**AI development guidelines** - Context for AI assistants

**Contents:**
- Project type & stack
- Design philosophy
- Application structure
- Business logic details
- Component guidelines
- Code style

**Read this if you want to:**
- Use AI to help develop
- Understand project conventions
- See detailed specifications
- Get AI context

---

### [../ENHANCEMENTS.md](../ENHANCEMENTS.md)
**Apple-inspired improvements** - What makes it special

**Contents:**
- Visual enhancements
- UX improvements
- Color system
- Animation details
- Typography
- Icon strategy
- Performance optimizations
- Future ideas

**Read this if you want to:**
- See what's been improved
- Understand the Apple inspiration
- Learn about animations
- Get ideas for future features

---

## 📊 Calculation Reference

### Quick Formula Reference

```
1. Sugar Removed = Current Sugar % - New Sugar %
2. Sugar Savings = Sugar Removed × Sugar Cost
3. Additional Milk = Sugar Removed × Milk Replacement Factor
4. Added Milk Cost = Additional Milk × Milk Cost
5. Recipe Net Saving = Sugar Savings - Added Milk Cost
6. Current Culture Cost = (Current Culture Price / 500) × Culture Dose
7. SMARTYS Culture Cost = (SMARTYS Culture Price / 500) × Culture Dose
8. Incremental Culture Cost = SMARTYS Culture Cost - Current Culture Cost
9. Additional Solution Cost = Incremental Culture Cost + Enzyme + Sweet Modulator
10. Net Benefit = Recipe Net Saving - Additional Solution Cost
```

### Scaling Formulas

```
Per Batch = Net Benefit × (Batch Volume / 100)
Annual = Net Benefit × (Annual Volume / 100)
```

---

## 🧪 Test Data

### Example Trial (Validated)

**Inputs:**
```
Milk: €0.20/L
Sugar: €0.60/kg
Current Culture: €30/500 DCU
SMARTYS: €40/500 DCU
Culture Dose: 20 DCU/100L
Current Sugar: 7.7%
New Sugar: 5.7%
Milk Replacement: 1.0
Batch Volume: 10,000L
Annual Volume: 18,000,000L
```

**Expected Results:**
```
Sugar Removed: 2.0 kg/100L
Sugar Savings: €1.20/100L
Added Milk Cost: €0.40/100L
Recipe Net Saving: €0.80/100L
Incremental Culture Cost: €0.40/100L
Net Benefit: €0.40/100L
Per Batch: €40.00
Annual: €72,000.00
```

---

## 📱 Quick Links

### Files by Purpose

**Want to modify...**

**Input fields?**
→ `components/calculator/ScenarioInputs.tsx` (or relevant input component)

**Calculations?**
→ `lib/calculations.ts`

**Colors/styles?**
→ `app/globals.css` or component files

**Default values?**
→ `lib/constants.ts`

**Type definitions?**
→ `lib/types.ts`

**Result cards?**
→ `components/calculator/KPICards.tsx`

**Presets?**
→ `components/calculator/QuickActions.tsx`

**Documentation?**
→ `docs/` folder

---

## 🔍 Search Tips

### Find by Topic

**Business Logic**
- `lib/calculations.ts` - All formulas
- `lib/types.ts` - Data structures
- `lib/constants.ts` - Default values

**UI Components**
- `components/calculator/` - Feature components
- `components/ui/` - Base components
- `app/globals.css` - Styles & animations

**Documentation**
- `docs/USER_GUIDE.md` - Usage
- `docs/DEVELOPER_GUIDE.md` - Code
- `docs/DESIGN_SYSTEM.md` - Design

**Configuration**
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript
- `next.config.ts` - Next.js
- `postcss.config.mjs` - Tailwind

---

## 🚀 Common Tasks

### I want to...

**Run the app**
```bash
npm run dev
```

**Add a new input**
1. Read: DEVELOPER_GUIDE.md → "Adding New Features"
2. Edit: lib/types.ts, lib/constants.ts
3. Create/edit: components/calculator/[Component].tsx

**Change colors**
1. Read: DESIGN_SYSTEM.md → "Color Palette"
2. Edit: app/globals.css (CSS variables)
3. Or edit: component files (Tailwind classes)

**Modify calculations**
1. Read: USER_GUIDE.md → "Calculation Reference"
2. Edit: lib/calculations.ts
3. Test: Load example preset, verify results

**Update documentation**
1. Edit: docs/USER_GUIDE.md (for users)
2. Or: docs/DEVELOPER_GUIDE.md (for developers)
3. Or: docs/DESIGN_SYSTEM.md (for designers)

**Add animation**
1. Read: DESIGN_SYSTEM.md → "Animations"
2. Edit: app/globals.css (keyframes)
3. Apply: component files (Tailwind classes)

---

## 📞 Getting Help

**User Questions**
→ Read USER_GUIDE.md first
→ Contact IFF Health & Biosciences team

**Development Issues**
→ Read DEVELOPER_GUIDE.md first
→ Check common issues section
→ Contact development team

**Design Questions**
→ Read DESIGN_SYSTEM.md first
→ Check ENHANCEMENTS.md for context
→ Contact design team

---

**Last Updated**: 2026-08-10  
**Version**: 1.0.0  
**Maintained by**: IFF Health & Biosciences
