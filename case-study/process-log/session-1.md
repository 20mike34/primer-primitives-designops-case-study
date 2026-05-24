# Session 1 — Discovery & Pivot
**Data:** 23.05.2026  
**Czas trwania:** ~2,5h  
**Cel sesji:** Od zera do zdefiniowanego MVP case study DesignOps

---

## Faza 1: Wybór ścieżki i odrzucenie pierwotnego pomysłu (15 min)

### Punkt startowy
Otrzymałem sugestię zbudowania case study na bazie pobranego z Figma 
Community pliku Ant Design + Claude Code + Storybook + GitHub Actions. 
Pomysł zakładał stworzenie syntetycznego setupu od zera, w którym 
wszystko działa idealnie.

### Krytyczna analiza pierwotnego pomysłu
Zidentyfikowałem 3 słabości:
1. **To byłby tutorial, nie case study** — brak realnego konfliktu, 
   decyzji architektonicznych, trade-offów. Idealne demo = sygnał 
   reżyserii dla doświadczonego rekrutera.
2. **"Pobierz Ant Design z Community" niszczy narrację** — pokazuje 
   integratora tutoriali, nie DesignOps Engineer'a. Senior wchodzi 
   w istniejący system i go ulepsza.
3. **Brak metryk** — bez liczb "przed/po" to blog post, nie case study.

### Decyzja kierunkowa
Wybrałem ścieżkę: **fork publicznego, dojrzałego design systemu + 
realny audyt + zoptymalizowanie pętli przez AI**. Czas: weekend (MVP).

---

## Faza 2: Wybór "ofiary" — design systemu do forka (10 min)

### Rozważane opcje
- **Carbon Design System (IBM)** — odrzucony: zbyt duży (monorepo ~200MB), 
  przytłaczający na weekend
- **Spectrum (Adobe)** — odrzucony: tokeny nie są publikowane czysto
- **Primer (GitHub)** ✅ — wybrany

### Uzasadnienie wyboru Primera
1. `primer/primitives` jest osobnym, czystym repo tokenów (mały scope)
2. Publiczna Figma dostępna w Figma Community
3. Używa Style Dictionary = realny benchmark "jak robią to profesjonaliści"
4. Bonusowa narracja: "forkowałem design system GitHuba" = instant 
   recognition w portfolio

### Pierwotna hipoteza (do zweryfikowania)
> "W typowym DS, nawet tak dojrzałym jak Primer, brakuje automatycznej 
> weryfikacji spójności między source-of-truth w Figmie a tokenami 
> w kodzie. Zbuduję AI-driven drift detector."

---

## Faza 3: Audyt Figmy (40 min)

### Wykonane kroki
1. Otwarcie pliku Primer DS z Figma Community
2. Inwentaryzacja panelu Variables: 4 kolekcje (Primitives, Functional, 
   Display, Size), ~300 tokenów łącznie
3. Identyfikacja architektury: dwupoziomowa (primitive → semantic) 
   z aliasami
4. Wykrycie 4 mode'ów (Light, Light HC, Dark, Dark HC) → mnożnik 4x 
   na powierzchnię potencjalnego driftu
5. Test propagacji: zmiana `fgColor.accent` z `#0969DA` na `#8250DF`
6. Eksport tokenów z Figmy do JSON
7. Wykonanie 4 screenów: variables overview, before/after, show usages

### Deliverable z fazy 3
- `audit-notes.md` z sekcjami 1-8 (inwentaryzacja, smelle, hipotezy, 
  teza case study, materiały, next steps, ograniczenia MVP)
- 4 screeny PNG
- 1 plik JSON z eksportem tokenów

### Wstępne metryki bazowe (z audytu Figmy)
- ~300 tokenów do utrzymania w sync
- 4 mode'y × każdy semantyczny token = duża powierzchnia driftu
- Hipotetyczny ROI automatyzacji: 15h/miesiąc czasu inżynierskiego 
  przy 5 zmianach/miesiąc i 3h handoff/zmianę

---

## Faza 4: Setup techniczny — fork + klon (20 min)

### Wykonane kroki
1. Fork `primer/primitives` na GitHub jako 
   `primer-primitives-designops-case-study` (nazwa opisowa zamiast 
   domyślnej — lepsza dla portfolio)
2. Zachowanie pełnej historii commitów Primera (świadoma decyzja — 
   anti-fake protection)
3. Klon lokalny przez `git clone` (pobrane: 28k obiektów, 543 MiB, 
   12k plików)
4. Setup struktury folderu `case-study/` w forku:
   - `case-study/audit/` — notatki i screeny
   - `case-study/audit/screenshots/` — pliki PNG
   - `case-study/figma-export/` — wyeksportowane tokeny z Figmy
5. Przemianowanie pliku z eksportu (usunięcie spacji w nazwie)

### Problemy techniczne i ich rozwiązanie
- Pierwszy `git clone` nie działał (zła nazwa repo + brakujące słowo 
  `clone`) — naprawione w drugiej próbie
- Identyfikacja własnego username GitHuba: `20mike34`

### Deliverable z fazy 4
- Publiczny fork na GitHubie z opisową nazwą
- Lokalna kopia działająca w VS Code
- Struktura folderów gotowa pod dalsze prace

---

## Faza 5: Analiza kodu repo — odkrycia (30 min)

### Wykonane kroki
1. `cat AGENTS.md` — przeczytanie instrukcji dla agentów AI
2. `cat DESIGN_TOKENS_GUIDE.md` — przeczytanie 200+ linii reguł 
   semantycznych w formacie RFC 2119
3. `cat package.json` — analiza stacku, scripts, zależności
4. `ls src/` — mapowanie struktury źródeł
5. `ls src/schemas/` — analiza systemu walidacji Zod
6. `cat scripts/buildLlm.ts` — odkrycie generatora dla LLM-ów
7. `ls contributor-docs/agents/` — odkrycie dedykowanych guide'ów 
   dla agentów AI

### KLUCZOWE ODKRYCIA
1. **Primer ma `npm run build:figma`** — pełna pętla generowania 
   artefaktów Figma z source tokenów
2. **Primer ma `npm run build:llm`** — dedykowany build generujący 
   `DESIGN_TOKENS_SPEC.md` jako "biblię tokenów" dla AI
3. **`llmExtension.ts` Zod schema** — każdy token MOŻE mieć metadane 
   `$extensions.com.primer.llm` z opisem dla LLM-a
4. **Folder `contributor-docs/agents/`** — osobna dokumentacja **dla 
   agentów AI**, równolegle do dokumentacji dla ludzi
5. **`DESIGN_TOKENS_GUIDE.md` jest pisany dla LLM-ów** — pierwsze 
   zdanie: "You are a CSS expert. Never use raw values." + 
   "Hallucination Guard" + format RFC 2119

### Wniosek krytyczny
**Pierwotna hipoteza (drift detector) została unieważniona.** Primer 
jest dalej w przyszłości niż 95% design systemów na rynku — mają już 
to, co chciałem zbudować, i nawet więcej.

---

## Faza 6: PIVOT — zmiana kierunku case study (20 min)

### Analiza "co jest, czego brakuje"
Zmapowałem 8 funkcjonalności DesignOps. 7/8 Primer ma. 1 brakuje:

| Funkcjonalność | Primer ma? |
|---|---|
| Source of truth tokens (JSON5 + Zod) | ✅ |
| Build pipeline (CSS/JSON/TS) | ✅ |
| Figma export | ✅ |
| LLM-ready spec | ✅ |
| Walidacja deprecated tokenów | ✅ |
| Walidacja kontrastu WCAG | ✅ |
| Walidacja struktury tokenów | ✅ |
| **Enforcement reguł w kodzie konsumenta DS** | ❌ |

### Nowa hipoteza
> "Primer wyprodukował idealny 'AI manual' do swojego DS. Brakuje 
> 'AI mechanika', który ten manual czyta i naprawia kod konsumenta."

### Trade-offs które rozważyłem
Dostałem 3 warianty MVP do wyboru:
- **A: Compliance Auditor** — agent audytuje cudzy kod pod `GUIDE.md`
- **B: Token Suggestion Engine** — agent sugeruje tokeny zamiast raw values
- **C: Extension Generator** — agent generuje `$extensions.llm` dla 
  tokenów Primera (z opcją PR upstream)

### Decyzje finalne
1. **Wariant A** — Compliance Auditor (najmocniejsze demo, najczystsze 
   positioning, skaluje narrację)
2. **Subject of audit: shadcn/ui** — maksymalny kontrast filozofii 
   (Tailwind + generic CSS vars vs Primer semantic tokens), najpopularniejsza 
   biblioteka 2026
3. **NIE robimy PR do upstream Primera** — skupiamy się na czystym MVP 
   w mojej zatoce
4. **Test corpus:** button (z opcją rozszerzenia na input/card/dialog 
   w następnych iteracjach)

---

## Lessons learned z sesji 1 (do portfolio)

### 1. Research > Building (przynajmniej na początku)
30 minut czytania `AGENTS.md` + `DESIGN_TOKENS_GUIDE.md` + `package.json` 
zaoszczędziło mi weekendu na rozwiązywaniu nieistniejącego problemu. 
Bez tej fazy zbudowałbym drift detector dla problemu, którego Primer 
nie ma.

### 2. Pivot to nie porażka, to dojrzałość
Zmiana hipotezy w trakcie projektu na bazie evidence > upieranie się 
przy pierwotnym planie. Wszystkie 4 commity są publiczne — pokazują 
proces decyzyjny, nie tylko wynik.

### 3. Konkretne metryki > ogólne stwierdzenia
"~300 tokenów × 4 mode'y = duża powierzchnia driftu" > "system jest 
złożony". Audyt musi produkować liczby od pierwszego dnia.

### 4. Świadome scope-cutting > heroiczny burnout
1 komponent zamiast 50. Brak auto-fix. Brak CI. To są **decyzje**, 
nie zaniedbania. Sekcja "Next Steps" w portfolio pokazuje, że widzę 
dalej niż MVP.

### 5. AGENTS.md istnieje — read it
Projekty 2026 mają osobną dokumentację dla AI. Czytanie jej **przed** 
wysłaniem prompta = sygnał profesjonalizmu. Ignorowanie = sygnał 
amatorszczyzny.

---

## Status na koniec sesji 1
**READY TO BUILD.** MVP zdefiniowane, scope ścięty, decyzje udokumentowane.
