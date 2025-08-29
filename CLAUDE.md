# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Korean language Next.js application called "스마트 보증진단" (Smart Guarantee Diagnosis) - an AI-powered credit guarantee approval prediction service for small businesses in Korea. The app provides a 7-step diagnostic process to predict credit guarantee approval probability and offers personalized improvement recommendations.

## Development Commands

```bash
# Development
npm run dev              # Start development server with hot reload
npm run dev:turbo        # Start development server with Turbopack (disabled due to runtime errors)

# Production
npm run build            # Build for production
npm start               # Start production server

# Code Quality  
npm run lint            # Run ESLint for code linting
```

## Architecture & Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript with strict configuration
- **UI Components**: Custom components built on Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom glass-effect styling
- **State Management**: React useState (no external state management)
- **Theme**: Dark mode by default using next-themes

## Key Application Flow

1. **Landing Page** (`app/page.tsx`): Korean homepage with hero section, features, and live statistics
2. **Diagnosis Process** (`app/diagnosis/page.tsx`): 7-step form collecting business information
3. **Results Page** (`app/result/page.tsx`): AI analysis results with approval probability and recommendations  
4. **Statistics Page** (`app/stats/page.tsx`): Industry-specific approval rate statistics

## Core Business Logic

Located in `lib/calculate.ts` - contains sophisticated algorithms for:
- **Approval Probability**: Weighted calculation using credit rating (30%), revenue (25%), business period (20%), existing debt (15%), collateral (10%)
- **Guarantee Limit**: Based on annual revenue with credit and probability multipliers
- **Fee Rate Calculation**: Industry risk-adjusted guarantee fees
- **Risk Level Classification**: A-E rating system

## Data Structure

- `data/industries.json`: 15 Korean business categories with average approval rates
- `data/recommendations.json`: Improvement recommendations by approval level
- `data/statistics.json`: Real-time statistics and industry performance data

## UI Component Architecture

- **Custom UI Components**: Located in `components/ui/` (button, card, input, select, slider, progress, badge)
- **Theme Components**: `theme-provider.tsx` and `theme-toggle.tsx` for dark/light mode
- **Design System**: Glass-morphism effects with gradient backgrounds and Korean-optimized typography using Geist fonts

## Important Implementation Notes

- All text content is in Korean language
- Currency formatted in Korean won (만원/억원 units)
- Uses Korean business categories and credit rating systems (1-10 scale)
- Responsive design optimized for mobile-first Korean users
- Glass-effect styling with gradient backgrounds for premium feel
- Form validation ensures all required fields completed before progression

## File Path Mapping

TypeScript configured with `@/*` paths mapping to project root for clean imports.