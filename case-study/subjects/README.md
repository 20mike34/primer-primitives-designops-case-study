# Audit Subjects

Components selected as test corpus for Primer Compliance Auditor MVP.

## Selection criteria
- High philosophical contrast: shadcn uses Tailwind + generic CSS variables 
  (`--background`, `--primary`) vs Primer's strict semantic tokens with 
  RFC 2119 enforcement rules
- Popular, recognizable codebase (instant context for portfolio readers)
- Self-contained component (minimal dependencies)

## Current corpus
- **shadcn/ui Button** (`button.tsx`)
  - Covers all 5 interactive states (rest, hover, focus, active, disabled)
  - Uses Tailwind classes + CSS variables
  - Expected violations: raw values in Tailwind config, missing semantic 
    naming, potential accessibility gaps

## Out of scope for MVP (next iterations)
- Additional shadcn components (Input, Card, Dialog)
- Mantine components (cross-library comparison)
- Legacy CSS examples