# SMARTYS CIU Calculator

A beautiful, real-time calculator for quantifying the economic benefit of SMARTYS cultures in fermented dairy applications.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-IFF%20Internal-red)

## ✨ Features

- 🎨 **Apple-inspired design** - Clean, beautiful interface
- ⚡ **Real-time calculations** - Instant feedback as you type
- 📱 **Fully responsive** - Works on mobile, tablet, and desktop
- 🌙 **Dark mode** - Automatic theme switching
- 🚀 **Zero dependencies** - No database, no login, no API calls
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🎯 **Quick presets** - Load example trial data instantly

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

## 📊 What It Calculates

### Two Value Propositions

1. **Sugar Reduction Benefit**
   - Savings from reduced sugar
   - Cost of replacement milk
   - Net recipe optimization benefit

2. **Solution Comparison**
   - SMARTYS culture cost vs. current
   - Optional enzyme/modulator costs
   - Total economic impact

### Primary KPI: Net Customer Benefit

**Formula:**
```
Net Benefit = (Sugar Savings - Added Milk Cost) - (SMARTYS Cost - Current Cost + Additional Costs)
```

**Example Trial:**
- Input: 7.7% → 5.7% sugar, €0.20/L milk, €0.60/kg sugar
- Output: **€0.40 per 100L**
- Annual: **€72,000** (18M L volume)

## 📖 Documentation

- **[User Guide](docs/USER_GUIDE.md)** - How to use the calculator
- **[Developer Guide](docs/DEVELOPER_GUIDE.md)** - Code structure and development
- **[Design System](docs/DESIGN_SYSTEM.md)** - Colors, typography, components
- **[CLAUDE.md](CLAUDE.md)** - AI assistant context and guidelines

## 🏗️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript 5** - Type-safe code
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Accessible component primitives
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
ciu-calculator/
├── app/                    # Next.js app directory
├── components/
│   ├── calculator/         # Calculator components
│   └── ui/                 # Base UI components
├── lib/                    # Business logic & types
├── docs/                   # Documentation
└── public/                 # Static assets
```

## 🎨 Design Highlights

- **Gradient backgrounds** with frosted glass effects
- **Animated KPI cards** with hover states
- **Smart validation** with inline feedback
- **Color-coded results** (green = savings, red = costs)
- **Quick actions** for presets and reset

## 🧪 Testing

### Manual Test
Load Example Trial preset and verify:
- Net Benefit: €0.40/100L ✓
- Per Batch: €40.00 ✓
- Annual: €72,000.00 ✓

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## 📝 License

© 2026 IFF. All rights reserved. Internal use only.

## 🤝 Support

Questions? Contact IFF Health & Biosciences team.

---

**Built with ❤️ by IFF Digital**
