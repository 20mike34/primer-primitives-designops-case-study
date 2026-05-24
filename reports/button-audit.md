# Compliance Audit Report: button

**Generated:** 2026-05-24T12:34:00.329Z  
**Compliance Score:** 10/100

## Summary

| Severity | Count |
|----------|-------|
| 🚨 Critical | 4 |
| ⚠️ High | 11 |
| ⚡ Medium | 3 |
| 💡 Low | 0 |
| **Total** | **18** |

## Violations

### 1. 🚨 RAW VALUES

**Line:** 8  
**Severity:** critical  
**Description:** Using raw CSS values (rounded-md, text-sm, gap-2) instead of Primer design tokens. This violates the core rule: 'Never use raw values (hex, px, etc.). Only use semantic tokens.'

**Code:**
```tsx
rounded-md text-sm font-medium transition-colors ... gap-2
```

**Suggested Fix:**
Replace with: border-radius: var(--borderRadius-medium); font: var(--text-body-shorthand-medium); gap: var(--control-medium-gap);

---

### 2. 🚨 MISSING STATES

**Line:** 8  
**Severity:** critical  
**Description:** Missing :active state for all button variants. The Golden Example requires all 5 interactive states: rest, hover, focus-visible, active, disabled.

**Code:**
```tsx
focus-visible:outline-none focus-visible:ring-1 ... disabled:opacity-50
```

**Suggested Fix:**
Add active state: .button:active { background-color: var(--control-bgColor-active); transform: scale(0.98); }

---

### 3. 🚨 WRONG PAIRINGS

**Line:** 8  
**Severity:** critical  
**Description:** Disabled state uses 'opacity-50' which violates Primer rules. The Golden Example states: 'NEVER use opacity for disabled'. Must use semantic tokens instead.

**Code:**
```tsx
disabled:pointer-events-none disabled:opacity-50
```

**Suggested Fix:**
Replace 'disabled:opacity-50' with: disabled:bg-[var(--bgColor-disabled)] disabled:text-[var(--fgColor-disabled)] disabled:cursor-not-allowed

---

### 4. 🚨 MOTION VIOLATIONS

**Line:** 8  
**Severity:** critical  
**Description:** Missing @media (prefers-reduced-motion: reduce) query. The Motion ruleset requires: 'MUST respect prefers-reduced-motion media query' and 'MUST provide instant alternatives when motion is reduced'.

**Code:**
```tsx
transition-colors
```

**Suggested Fix:**
Add: @media (prefers-reduced-motion: reduce) { .button { transition: none; } }

---

### 5. ⚠️ MOTION VIOLATIONS

**Line:** 8  
**Severity:** high  
**Description:** Using generic 'transition-colors' instead of Primer motion tokens. Should use --motion-transition-hover for state changes.

**Code:**
```tsx
transition-colors
```

**Suggested Fix:**
Replace 'transition-colors' with: transition: background-color var(--motion-transition-hover), box-shadow var(--motion-transition-hover), transform var(--motion-transition-hover);

---

### 6. ⚠️ UNKNOWN TOKENS

**Line:** 8  
**Severity:** high  
**Description:** Using 'focus-visible:ring-ring' token which doesn't exist in Primer DESIGN_TOKENS_SPEC.md. Focus outline must use --focus-outline or --focus-outline-color.

**Code:**
```tsx
focus-visible:ring-1 focus-visible:ring-ring
```

**Suggested Fix:**
Replace with: focus-visible:outline-[var(--focus-outline)] focus-visible:outline-offset-[var(--outline-focus-offset)]

---

### 7. ⚠️ UNKNOWN TOKENS

**Line:** 13  
**Severity:** high  
**Description:** Using non-Primer tokens: 'bg-primary', 'text-primary-foreground', 'shadow'. These don't exist in DESIGN_TOKENS_SPEC.md.

**Code:**
```tsx
bg-primary text-primary-foreground shadow hover:bg-primary/90
```

**Suggested Fix:**
Replace with Primer tokens: background-color: var(--control-bgColor-rest); color: var(--fgColor-default); box-shadow: var(--shadow-resting-small);

---

### 8. ⚠️ WRONG PAIRINGS

**Line:** 13  
**Severity:** high  
**Description:** Using opacity modifier '/90' for hover state violates semantic token rules. Should use --control-bgColor-hover instead.

**Code:**
```tsx
hover:bg-primary/90
```

**Suggested Fix:**
Replace 'hover:bg-primary/90' with: hover:bg-[var(--control-bgColor-hover)]

---

### 9. ⚠️ UNKNOWN TOKENS

**Line:** 15  
**Severity:** high  
**Description:** Using 'bg-destructive', 'text-destructive-foreground' which don't exist. Should use --bgColor-danger-emphasis with --fgColor-onEmphasis pairing.

**Code:**
```tsx
bg-destructive text-destructive-foreground shadow-sm
```

**Suggested Fix:**
Replace with: background-color: var(--control-danger-bgColor-rest); color: var(--fgColor-onEmphasis); box-shadow: var(--shadow-resting-small);

---

### 10. ⚠️ UNKNOWN TOKENS

**Line:** 17  
**Severity:** high  
**Description:** Using 'border-input', 'bg-background', 'bg-accent', 'text-accent-foreground' which don't exist in Primer spec.

**Code:**
```tsx
border border-input bg-background shadow-sm hover:bg-accent
```

**Suggested Fix:**
Replace with: border: var(--border-default); background-color: var(--control-bgColor-rest); hover:background-color: var(--control-bgColor-hover);

---

### 11. ⚠️ UNKNOWN TOKENS

**Line:** 19  
**Severity:** high  
**Description:** Using 'bg-secondary', 'text-secondary-foreground' which don't exist. Should use --control-transparent tokens or --bgColor-neutral-muted.

**Code:**
```tsx
bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80
```

**Suggested Fix:**
Replace with: background-color: var(--control-transparent-bgColor-rest); color: var(--fgColor-default); hover:background-color: var(--control-transparent-bgColor-hover);

---

### 12. ⚡ WRONG PAIRINGS

**Line:** 21  
**Severity:** medium  
**Description:** Ghost variant missing explicit rest state background. Should be --control-transparent-bgColor-rest for clarity.

**Code:**
```tsx
ghost: "hover:bg-accent hover:text-accent-foreground"
```

**Suggested Fix:**
Add: background-color: var(--control-transparent-bgColor-rest); hover:background-color: var(--control-transparent-bgColor-hover);

---

### 13. ⚡ UNKNOWN TOKENS

**Line:** 22  
**Severity:** medium  
**Description:** Link variant uses 'text-primary' which doesn't exist. Should use --fgColor-link for hyperlinks.

**Code:**
```tsx
text-primary underline-offset-4 hover:underline
```

**Suggested Fix:**
Replace with: color: var(--fgColor-link); text-decoration-thickness: 1px; hover:text-decoration: underline;

---

### 14. ⚠️ RAW VALUES

**Line:** 25  
**Severity:** high  
**Description:** Using raw size values (h-9, px-4, py-2, h-8, h-10) instead of Primer control tokens. Pattern Compression defines --control-[size]-[property] tokens.

**Code:**
```tsx
default: "h-9 px-4 py-2"
```

**Suggested Fix:**
Replace 'default' size with: height: var(--control-medium-size); padding-inline: var(--control-medium-paddingInline-normal); padding-block: var(--control-medium-paddingBlock);

---

### 15. ⚠️ RAW VALUES

**Line:** 26  
**Severity:** high  
**Description:** Small size uses raw values and inconsistent border-radius. Should use --control-small tokens and consistent --borderRadius-medium.

**Code:**
```tsx
sm: "h-8 rounded-md px-3 text-xs"
```

**Suggested Fix:**
Replace with: height: var(--control-small-size); padding-inline: var(--control-small-paddingInline-normal); border-radius: var(--borderRadius-medium); font: var(--text-body-shorthand-small);

---

### 16. ⚠️ RAW VALUES

**Line:** 27  
**Severity:** high  
**Description:** Large size uses raw values. Should use --control-large tokens.

**Code:**
```tsx
lg: "h-10 rounded-md px-8"
```

**Suggested Fix:**
Replace with: height: var(--control-large-size); padding-inline: var(--control-large-paddingInline-normal); border-radius: var(--borderRadius-medium);

---

### 17. ⚠️ RAW VALUES

**Line:** 28  
**Severity:** high  
**Description:** Icon size uses raw values. Should use control tokens for consistent sizing.

**Code:**
```tsx
icon: "h-9 w-9"
```

**Suggested Fix:**
Replace with: height: var(--control-medium-size); width: var(--control-medium-size); padding: 0;

---

### 18. ⚡ MISSING STATES

**Line:** 8  
**Severity:** medium  
**Description:** SVG sizing uses raw value '[&_svg]:size-4' instead of semantic tokens. Icon sizes should use token references.

**Code:**
```tsx
[&_svg]:size-4
```

**Suggested Fix:**
Define icon size using: --control-medium-gap or explicit 16px equivalent token if available

---

## Recommendations

1. CRITICAL: Replace all raw CSS values (px, rem, opacity) with Primer semantic tokens. Start with control size tokens (--control-medium-size, --control-medium-paddingInline-normal, etc.) and motion tokens (--motion-transition-hover). This is a core design system rule violation affecting maintainability and theme consistency.
2. CRITICAL: Fix disabled state implementation. Remove 'disabled:opacity-50' and replace with semantic tokens: background-color: var(--bgColor-disabled); color: var(--fgColor-disabled); cursor: not-allowed; opacity: 1. Current implementation fails accessibility contrast requirements per the Golden Example.
3. HIGH: Implement complete interactive state coverage. Add :active state with transform: scale(0.98) and --control-bgColor-active. Add @media (prefers-reduced-motion: reduce) { transition: none; } to respect user motion preferences. Replace all custom color tokens (bg-primary, text-destructive-foreground, etc.) with actual Primer tokens from DESIGN_TOKENS_SPEC.md (--control-bgColor-rest, --fgColor-onEmphasis, --control-danger-bgColor-rest, etc.).

---

*Audited against Primer Design Tokens Guide (RFC 2119 rules) and Design Tokens Spec.*
