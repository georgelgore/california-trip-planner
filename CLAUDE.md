# Trip Itinerary — Claude Guide

## Repo structure

```
trip-itinerary/
├── index.html              ← landing page (list of trips)
├── shared/
│   ├── app.css             ← all shared CSS (layout, components, edit mode)
│   └── app.js              ← all shared JS (rendering, navigation, edit mode logic)
├── _template/              ← copy this to start a new trip
│   ├── index.html          ← thin app shell (~130 lines: head, body HTML, 2 script tags)
│   ├── data.js             ← placeholder TRIP_META, EDIT_CFG, DAYS, QUICK_REF
│   ├── manifest.json
│   ├── sw.js
│   └── icon-192.svg
└── trips/
    └── destination-year/   ← one folder per trip
        ├── index.html      ← thin app shell with trip-specific HTML + region CSS
        ├── data.js         ← TRIP_META, EDIT_CFG, DAYS, QUICK_REF for this trip
        ├── manifest.json
        ├── sw.js
        └── icon-192.svg
```

Per-trip `index.html` loads shared assets via `../../shared/app.css` and `../../shared/app.js`.
Trip-specific data lives in `data.js` (loaded first); `app.js` reads `TRIP_META`, `EDIT_CFG`,
`DAYS`, and `QUICK_REF` from the global scope set by `data.js`. Only region theme CSS rules stay
in each trip's `<style>` block.

## Edit mode (in-app trip editing)

Every trip page has an inline edit mode: tap the ✏️ button in the header while viewing a single day (`?day=N`) and the day's content becomes editable. Hitting **Done** saves the edits.

### How edits are persisted

Two layers, applied in this order at boot:

1. **`localStorage`** — instant, per-device. Key: `<tripId>:days`. Always populated by Save.
2. **`edits.json`** at the trip's folder — fetched async at boot, applied if newer than the cached copy. This is the cross-device source of truth.

The `let DAYS = [...]` in `data.js` is the **fallback** — used only if both layers above are absent. It never gets rewritten by the app.

### Publishing edits to GitHub

To make an edit reach other devices, the app commits `edits.json` to the repo via the GitHub REST API. This requires a **fine-grained Personal Access Token** with `Contents: Read & Write` on `georgelgore/trip-itinerary` only.

1. Open the trip in edit mode (✏️ → ⚙ in the brown edit header)
2. Paste the PAT into the Settings sheet
3. From now on, every Save publishes to GitHub + localStorage. Without a PAT, edits stay in this browser.

The token is stored in `localStorage['trip-gh-pat']` and is shared across all trips on this device.

### What's editable (today)

- Day header: date string, location, sublocation, hotel/stay
- Sections: icon, label, content (textarea), address
- Section notes: toggle info / warning / cash / reservation pills, edit text
- Reorder sections within a day (↑ / ↓ buttons)
- Add a new section / delete a section

### What's *not* editable yet

- Day theme/region (would change CSS class)
- Reordering days
- `deepDive` blocks (timeline, stops, logistics, checklists)
- `QUICK_REF` tabs

Those still require an editor + commit by hand.

### Edit-mode files

Edit-mode CSS, HTML, and JS all live in the shared files:

- **`shared/app.css`** — edit chrome styles, editable day card, section form, settings sheet, toast
- **`shared/app.js`** — `enterEditMode`, `exitEditMode`, `renderDayEdit`, `saveEdits`, `commitToGitHub`, `showToast`, etc.
- The edit header + settings sheet HTML is in each trip's `index.html` body (identical across trips)

To update edit-mode behavior for all trips at once, edit `shared/app.css` or `shared/app.js`.

## Adding a new trip

1. Copy `_template/` → `trips/destination-year/` (e.g. `trips/japan-2027/`)
2. In `trips/destination-year/manifest.json`: update `name`, `short_name`, `description`
3. In `trips/destination-year/sw.js`: rename `CACHE` (e.g. `'japan-2027-v1'`) — must be unique per trip
4. In `trips/destination-year/index.html`:
   - Replace `TRIP_NAME YYYY` in `<title>` and the header `app-title`
   - Replace `DATES · TRAVELERS` in `app-dates`
   - Replace the commented-out region CSS rules in `<style>` with actual rules for your trip's regions (`.region1 .day-header`, `.ov-card.region1`, `.editing-card.region1 .edit-day-header`)
   - Update the legend block with your actual regions + colors
   - Update the `sheet-tabs` HTML block to match the QUICK_REF keys you've chosen in `data.js`
5. In `trips/destination-year/data.js`:
   - Fill in `TRIP_META` (name, shortName, dates, travelers, startDate)
   - Fill in `EDIT_CFG`: set `tripId` (short unique id, e.g. `japan-27`), `editsPath`, `storageKey`, `initialTab`, and `catLabels` (must match your QUICK_REF keys and sheet-tabs)
   - Fill in `DAYS` and `QUICK_REF` (see schemas below)
5. Add a card for the new trip in the root `index.html`:

```html
<a class="trip-card" href="trips/destination-year/">
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

The gradient colors in `card-accent` should match the day-header theme colors, in the order they appear through the trip.

## TRIP_META schema

One `TRIP_META` constant per trip, declared near the top of the script. Drives the share button text
and provides a start date that the overview uses to infer per-day dates when `day.date` lacks a month
(e.g. Vegas's `"Monday — Big Day"`).

```js
const TRIP_META = {
  name: 'California Trip 2026',     // full title — used by navigator.share
  shortName: 'California 2026',     // short title — used in clipboard text & day-detail share
  dates: 'May 29 – June 7',         // pretty date range
  travelers: 'George & Doug',
  startDate: '2026-05-29',          // ISO date of Day 1 — used as the fallback date when a day's
                                    //   `date` string is non-parseable. Per-day dates derive as
                                    //   `startDate + (idx)`. Override per-day with `day.dateISO`.
};
```

## Overview / Day detail behaviour

The trip page has two views, switched by URL:

| URL                     | View          |
|-------------------------|---------------|
| `/trips/<id>/`          | Overview — condensed day cards (Variant D: accent stripe + chips) |
| `/trips/<id>/?day=N`    | Day detail — that one day expanded, with prev / next nav |

Navigation is `history.pushState`-based (no page reloads). Browser back works naturally.
A share button (`↗`) in the header copies the current URL to clipboard (or opens the native share
sheet on mobile via `navigator.share`).

### Overview chip auto-detection

Chips are derived from existing `DAYS` data. Order: flight → drive → new hotel → hike → deep dive →
distinctive sections. Up to 4 chips per card. Override entirely with `day.highlights`.

Driving day = a section labelled `Drive*` OR a `location` containing `→`. A bare `🚗` icon on an
evening section (e.g. "return transit") does NOT trigger a drive chip.

### Today highlight

The day matching today's date (via `dateISO` > parsed `date` > `startDate + idx`) gets a colored
ring + "TODAY" pill in the overview, and scrolls into view on load. In day detail, the prev/next
nav strip shows a red dot + "Today" label when the current day is today. Past days are dimmed.

## DAYS schema

Each element of the `DAYS` array is a day object:

```js
{
  id: 1,                          // sequential integer
  date: 'Friday, May 29',         // full display string
  dateISO: '2026-05-29',          // OPTIONAL — explicit ISO date. Use when `date` lacks a month
                                  //   (e.g. "Monday — Big Day"). Falls back to TRIP_META.startDate
                                  //   + (id-1) days if neither is parseable.
  location: 'City / Region',      // primary location label. If it contains "→" (e.g. "SF → Yosemite"),
                                  //   the overview auto-flags this as a driving day.
  sublocation: 'Neighborhood',    // optional — shown after a ·
  theme: 'sf',                    // matches a CSS class with a colored .day-header AND a .ov-card.<theme>
                                  //   overview accent rule.
  stay: 'Hotel Name · Address',   // shown under 🏨. When stay differs from the previous day, the overview
                                  //   auto-adds a "🏨 Hotel" chip.

  highlights: [],                 // OPTIONAL — explicit overview chips. Overrides auto-detection.
                                  //   Format: ['🍷 Wine tasting', { icon: '🍴', text: 'Zuni Café' }, …]
                                  //   Use this when auto-detection picks the wrong section to surface.

  sections: [                     // ordered list of activities for the day
    {
      label: 'Morning',           // section title
      icon: '☕',                  // emoji shown in the section header
      content: 'Narrative text.\nSupports newlines.',
      address: 'Venue, Address',  // optional — shown under 📍
      url: 'https://...',         // optional — shown under 🔗
      notes: [                    // optional badges + callout boxes
        { type: 'info',        text: 'General note' },
        { type: 'warning',     text: 'Time-sensitive / caution' },
        { type: 'cash',        text: 'Cash-only reminder' },
        { type: 'reservation', text: 'Booking reminder' }
      ]
    }
  ],

  deepDive: {                     // optional — only add for days with complex logistics
    title: 'Deep Dive Title',     //   (e.g. a multi-hike park, a driving route with many stops)
    subtitle: 'Subtitle line',
    timeline: [
      { time: '9:00 AM', activity: 'Activity name', note: 'optional note' }
    ],
    stops: [                      // detailed info cards — same shape used for logistics
      {
        icon: '🏛️',
        label: 'Stop Name',
        meta: 'optional meta (distance, hours, etc.)',
        address: 'optional — shown under 📍',
        content: 'Markdown-ish text.\nNewlines with \\n.',
        tips: ['Tip 1', 'Tip 2'],  // optional bullet list of tips
        notes: [                   // same note types as section.notes
          { type: 'warning', text: 'Caution text' }
        ]
      }
    ],
    logistics: [],                // same shape as stops — use for transport/entry/practical info
    checklists: [
      { id: 'pack', label: 'Packing List', items: ['Item 1', 'Item 2'] }
    ]
  }
}
```

## QUICK_REF schema

Tabs are configurable per trip — only include the keys that apply:

| Tab key | Include when |
|---------|-------------|
| `cashOnly` | Any venue is cash-only |
| `hours` | Any venue has a quirky closing time or needs early arrival |
| `reservations` | Any venue requires or strongly recommends booking ahead |
| `transit` | Any route needs an Uber, specific directions, or non-obvious transport |
| `tips` | Short actionable tips that don't fit elsewhere (order X, sit in section Y) |

```js
const QUICK_REF = {
  cashOnly:     [ { name: 'Venue', detail: 'Details' } ],
  hours:        [ { name: 'Venue', detail: 'Hours note' } ],
  reservations: [ { name: 'Venue', detail: 'Reservation note' } ],
  transit:      [ { name: 'Route', detail: 'Details' } ],
  tips:         [ { name: 'Tip', detail: 'One-liner' } ]
};
```

Three things must stay in sync when you add or remove tabs:
1. The `QUICK_REF` object keys in `data.js`
2. The `<div class="sheet-tabs">` HTML block in `index.html` (same keys, same order)
3. The `catLabels` map in `EDIT_CFG` in `data.js` — maps each key to its search result label (e.g. `cashOnly: 'Cash Only'`). Missing entries will silently omit those results from search.

## Ingesting itinerary content

Itineraries can be passed as **YAML** (preferred going forward), raw HTML, or plain text. YAML maps directly to the JS schema — parse it and write the `DAYS`/`QUICK_REF` data straight in. For HTML or plain text, extract content only (no markup) and infer structure from context.

Useful signals regardless of format:

- **Times** → `section.label` (or included in `content`)
- **Venue names** → `section.label` title portion
- **Addresses** → `section.address`
- **Italic tips / "Note:" callouts** → `notes` array with appropriate type (`info`, `warning`, `reservation`, `cash`)
- **"Book ahead" / "reservation required"** → `{ type: 'reservation', text: '...' }` note + entry in `QUICK_REF.reservations`
- **Closing times / "arrive early"** → `{ type: 'warning', text: '...' }` note + entry in `QUICK_REF.hours`

### YAML input shape

```yaml
trip:
  name: "Tokyo 2027"
  dates: "March 14–21"
  travelers: "George & Doug"
  hotel: "Trunk Hotel · Shibuya"

days:
  - id: 1
    date: "Saturday, March 14"
    location: "Shibuya"
    sublocation: "Arrival"
    theme: shibuya
    sections:
      - label: "Check-In"
        icon: "🏨"
        content: "Narrative text here."
        address: "Trunk Hotel · 5-31 Jingumae, Shibuya"
        notes:
          - type: info
            text: "Room may not be ready until 3pm."
          - type: reservation
            text: "Dinner at Narisawa — confirm reservation."

quick_ref:
  hours:
    - name: "Tsukiji Outer Market"
      detail: "Most stalls close by noon — arrive by 9am"
  reservations:
    - name: "Narisawa"
      detail: "Reservation required · confirm 48hrs ahead"
  transit:
    - name: "Shibuya → Tsukiji"
      detail: "Tokyo Metro Ginza Line · 20 min · ¥200"
```

Run `/project:new-trip` for the full step-by-step workflow.

## Region theme colors

Each trip's `index.html` has a `<style>` block with three rules per region — day header, overview
accent stripe, and edit-mode header. Add one set per theme value used in `day.theme` in `data.js`:

```css
.sf         .day-header { background: #1a6bac; }
.ov-card.sf             { --ov-accent-color: #1a6bac; }
.editing-card.sf        .edit-day-header { background: #1a6bac; }
```

These do **not** go in `shared/app.css` — they are trip-specific.

## Naming conventions

| Thing | Convention |
|-------|------------|
| Trip folder | `trips/destination-year/` — lowercase, hyphenated |
| SW cache name | `destination-year-v1` — bump the version number on any cache-affecting change |
| localStorage prefix | Short unique id, e.g. `japan-27:` |

## Service worker — cache strategy

From v2 onward the SW uses a split strategy:

- **HTML** (the trip's `index.html` / `/`) → **network-first**, falls back to cache when offline.
  Means content updates land without bumping the cache version, but the app still works offline.
- **Everything else** (manifest, icons, sw.js itself) → **cache-first**, falls back to network.
  These rarely change, and caching them aggressively makes the app feel native offline.

You still bump the `CACHE` version when you want to force a refresh of cached assets (e.g. you
changed the manifest or icon — anything cache-first). HTML-only content changes do NOT require
a bump.

## Local testing

Service workers require HTTP (not `file://`):

```bash
cd trips/destination-year
python3 -m http.server 8080
# open http://localhost:8080
```

## Deployment

Push to `main` — GitHub Actions deploys the entire repo root to GitHub Pages automatically.
- Landing page: `georgelgore.github.io/trip-itinerary/`
- Each trip: `georgelgore.github.io/trip-itinerary/trips/destination-year/`

Bump the `CACHE` version in `sw.js` (e.g. `v1` → `v2`) when you change a **cache-first** asset
(manifest, icon, sw.js itself). HTML content changes do NOT need a bump — the SW now fetches
HTML network-first.
