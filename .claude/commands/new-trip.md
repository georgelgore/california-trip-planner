# /new-trip — Add a trip itinerary

Use this command when the user wants to add a new trip to the repo. Follow these steps in order.

## Step 1 — Gather the itinerary content

The user will provide the trip content as **YAML** (preferred), raw HTML, or a written description. Accept any of these without asking them to reformat.

**If YAML:** parse it directly into `DAYS` and `QUICK_REF`. The expected shape mirrors the JS schema in `CLAUDE.md` — days with sections, sections with label/icon/content/address/notes. Map YAML keys to JS fields 1-to-1; infer any missing `icon` emojis from context.

**If HTML:** extract the structured content (venues, times, addresses, callout text). Do not copy HTML markup — only the content.

**If plain text:** infer structure from headings, times, and paragraph breaks.

If details are missing (exact dates, hotel address), ask once then proceed with what's available.

## Step 2 — Decide the themes

Identify the distinct neighborhoods or areas visited. Each gets its own theme name (lowercase, no spaces) and a header color. One theme per location cluster is enough — don't over-split.

Good color choices that are visually distinct and accessible on white text:
- Deep blue: `#1a6bac` · Forest green: `#4a7c59` · Teal: `#2a8080`
- Warm gold: `#b8890e` · Rust brown: `#7c5339` · Crimson: `#8b1a1a`
- Purple: `#6b3a8b` · Slate: `#3d5a6e` · Olive: `#5c6e2a`

If it's a single-city trip, one or two themes is fine.

## Step 3 — Decide the Quick Ref tabs

The Quick Ref sheet tabs are configurable per trip. Use whichever of these apply; drop ones that don't:

| Tab key | Use when |
|---------|----------|
| `cashOnly` | Any venue is cash-only |
| `hours` | Any venue has a quirky closing time or the user should arrive early |
| `reservations` | Any venue requires or strongly recommends booking ahead |
| `transit` | Any venue needs an Uber, specific directions, or non-obvious transport |
| `tips` | Short actionable tips that don't fit elsewhere (order X, sit in section Y) |

Update both the `QUICK_REF` object in `index.html` **and** the `<div class="sheet-tabs">` HTML block to match.

## Step 4 — Create the trip files

```bash
mkdir -p trips/DESTINATION-YEAR
cp _template/icon-192.svg trips/DESTINATION-YEAR/
```

Then create these three files (use the existing trips as a reference):

**`trips/DESTINATION-YEAR/manifest.json`** — update `name`, `short_name`, `description`.

**`trips/DESTINATION-YEAR/sw.js`** — set `CACHE` to `'destination-year-v1'` (unique per trip).

**`trips/DESTINATION-YEAR/index.html`** — full app. Key substitutions from `_template/index.html`:
1. `<title>` and `.app-title` → trip name with an appropriate emoji
2. `.app-dates` → dates and travelers
3. CSS theme classes → one rule per theme, e.g. `.strip .day-header { background: #b8890e; }`
4. Legend block in HTML body → one item per theme
5. Sheet tabs block → only the tabs you decided on in Step 3
6. `DAYS` array → structured day-by-day data (see CLAUDE.md for schema)
7. `QUICK_REF` object → only the keys matching the tabs above
8. `localStorage` key → change `ca-trip-v2` to `destination-yr` (short, unique)
9. `state.currentTab` → set to the first tab key

## Step 5 — Add the landing page card

In root `index.html`, add a card inside `<main>` before the "Add a trip" placeholder:

```html
<a class="trip-card" href="trips/DESTINATION-YEAR/">
  <div class="card-accent" style="background: linear-gradient(90deg, COLOR1 0%, COLOR2 100%)"></div>
  <div class="card-body">
    <div class="card-arrow">→</div>
    <div class="card-name">Destination Year</div>
    <div class="card-dates">Dates · Travelers</div>
    <div class="card-tags">
      <span class="tag"><span class="tag-dot" style="background:COLOR1"></span>Area 1</span>
      <span class="tag"><span class="tag-dot" style="background:COLOR2"></span>Area 2</span>
    </div>
  </div>
</a>
```

The gradient in `card-accent` should use the same colors as the day-header themes, in the order they appear through the trip.

## Step 6 — Commit and push

```bash
git add index.html trips/DESTINATION-YEAR/
git commit -m "Add DESTINATION YEAR itinerary"
git push origin main
```

## Notes

- Service workers need HTTP (not `file://`) to register. Test with `python3 -m http.server 8080` inside the trip folder.
- Bump the sw.js `CACHE` version (e.g. `v2`) any time you change files that should be re-cached.
- The `deepDive` field on a day is optional — only add it when there's enough logistical detail to warrant a separate sheet (e.g. a multi-day hike, a complex driving route).
