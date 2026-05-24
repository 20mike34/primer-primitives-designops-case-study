# Primer Compliance Auditor

> AI-powered semantic rule enforcement for design system tokens

**Case Study:** DesignOps automation using LLM reasoning to audit component code against [GitHub Primer Design System](https://primer.style/) semantic token rules.

---

## What This Is

An auditor that analyzes React/CSS components and detects violations of design system token usage rules — not just syntax errors, but **semantic violations** that traditional linters can't catch.

**Example violations detected:**
- Using `disabled:opacity-50` when the style guide explicitly states *"NEVER use opacity for disabled"*
- Missing `@media (prefers-reduced-motion)` accessibility queries
- Hardcoded values (`h-9`, `px-4`) instead of semantic tokens (`--control-medium-size`)
- Wrong token pairings (`bg-emphasis` without `fg-onEmphasis`)

**How it works:** The auditor loads Primer's `DESIGN_TOKENS_GUIDE.md` (RFC 2119 rules) and `DESIGN_TOKENS_SPEC.md` (token dictionary) as context for Claude API, which performs deep semantic analysis beyond regex pattern matching.

---

## Demo: shadcn/ui Button Audit

**Input:** [shadcn/ui button.tsx](case-study/subjects/shadcn/button.tsx) (Tailwind + generic CSS variables)  
**Output:** [Compliance Report](reports/button-audit.md) — 18 violations detected

| Metric | Value |
|--------|-------|
| **Compliance Score** | 10/100 |
| **🚨 Critical** | 4 (accessibility blockers, core violations) |
| **⚠️ High** | 11 (semantic token misuse) |
| **⚡ Medium** | 3 (missing state coverage) |

**Why low score?** This is expected — shadcn uses Tailwind utilities + generic tokens (`--primary`, `--destructive`), while Primer enforces strict semantic naming (`--control-danger-bgColor-rest`, `--fgColor-onEmphasis`). The contrast demonstrates the auditor's sensitivity.

---

## Key Features

### 1. **Semantic Understanding**
Detects violations like *"missing `:active` state"* or *"wrong background/foreground pairing"* — contextual rules that ESLint/Stylelint can't enforce.

### 2. **Rule Citation**
Auditor quotes design system documentation verbatim:
> *"NEVER use opacity for disabled"* (from DESIGN_TOKENS_GUIDE.md)

### 3. **Cross-DS Translation**
Maps unknown tokens to Primer equivalents: