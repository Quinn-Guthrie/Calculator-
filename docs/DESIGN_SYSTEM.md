# Design System

## Color Palette

### Primary Colors
```
Blue:     #2563eb (600) / #3b82f6 (500)
Green:    #16a34a (600) / #22c55e (500)
Red:      #dc2626 (600) / #ef4444 (500)
Orange:   #ea580c (600) / #f97316 (500)
```

### Neutral Colors
```
Slate 50:  #f8fafc  (lightest background)
Slate 100: #f1f5f9
Slate 200: #e2e8f0  (borders light)
Slate 600: #475569  (text secondary)
Slate 900: #0f172a  (text primary)
```

### Dark Mode
```
Slate 800: #1e293b  (card background)
Slate 900: #0f172a  (page background)
Slate 950: #020617  (darkest)
```

## Typography

### Font Stack
System fonts for performance:
```css
font-family: system-ui, -apple-system, sans-serif;
```

### Scale
```
xs:   0.75rem (12px)
sm:   0.875rem (14px)
base: 1rem (16px)
lg:   1.125rem (18px)
xl:   1.25rem (20px)
2xl:  1.5rem (24px)
3xl:  1.875rem (30px)
4xl:  2.25rem (36px)
5xl:  3rem (48px)
6xl:  3.75rem (60px)
```

### Weights
```
Regular:  400
Medium:   500
Semibold: 600
Bold:     700
Black:    900
```

## Spacing

### Scale (px)
```
1: 4px
2: 8px
3: 12px
4: 16px
6: 24px
8: 32px
12: 48px
16: 64px
24: 96px
```

## Components

### Card
```tsx
<Card className="p-6 transition-all duration-200 hover:shadow-md">
```

### Input
```tsx
<Input className="text-right transition-all duration-200 focus:scale-[1.01]" />
```

### Button
```tsx
<button className="px-4 py-2 rounded-lg bg-blue-100 hover:scale-105 active:scale-95">
```

## Icons

### Size Guide
```
Small:  w-3.5 h-3.5 (14px) - inline labels
Medium: w-4 h-4 (16px) - standard
Large:  w-5 h-5 (20px) - headers
XL:     w-6 h-6 (24px) - emphasis
```

### Color Usage
```
text-slate-500     # Neutral icons
text-blue-600      # Primary actions
text-green-600     # Success/positive
text-red-600       # Error/negative
```

## Animations

### Hover Effects
```css
hover:shadow-lg
hover:scale-[1.02]
transition-all duration-300
```

### Focus Effects
```css
focus:scale-[1.01]
focus-visible:ring-2
focus-visible:ring-blue-500
```

### Entrance
```css
animate-in fade-in slide-in-from-top-2 duration-300
```

## Responsive Breakpoints

```
sm:  640px   (tablet portrait)
md:  768px   (tablet landscape)
lg:  1024px  (desktop)
xl:  1280px  (large desktop)
```

## Gradients

### Backgrounds
```css
bg-gradient-to-br from-slate-50 to-slate-100
bg-gradient-to-br from-green-50 to-emerald-50
```

### Borders
```css
border-2 border-green-500
bg-gradient-to-r from-transparent via-slate-300 to-transparent
```
