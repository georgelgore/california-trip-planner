# Trip Itinerary — Claude Guide

## Repo structure

```
trip-itinerary/
├── index.html              ← landing page (list of trips)
├── _template/              ← copy this to start a new trip
│   ├── index.html          ← app shell with placeholder DAYS + QUICK_REF
│   ├── manifest.json
│   ├── sw.js
│   └── icon-192.svg
└── trips/
    └── destination-year/   ← one folder per trip
        ├── index.html
        ├── manifest.json
        ├── sw.js
        └── icon-192.svg
```

## Adding a new trip

1. Copy `_template/` → `trips/destination-year/` (e.g. `trips/japan-2027/`)
2. In `trips/destination-year/manifest.json`: update `name`, `short_name`, `description`
3. In `trips/destination-year/sw.js`: rename `CACHE` (e.g. `'japan-2027-v1'`) — must be unique per trip
4. In `trips/destination-year/index.html`:
   - Replace `TRIP_NAME YYYY` in `<title>` and the header `app-title`
   - Replace `DATES · TRAVELERS` in `app-dates`
   - Replace `TRIP_ID` in the two localStorage key strings with a short unique id (e.g. `japan-27`)
   - Update the `<style>` region color variables (`.sf`, `.yosemite`, etc.) to match new regions
   - Update the legend block in the HTML body
   - Fill in `DAYS` and `QUICK_REF` (see schemas below)
5. Add a card for the new trip in the root `index.html`

## DAYS schema

Each element of the `DAYS` array is a day object:

```js
{
  id: 1,                          // sequential integer
  date: 'Friday, May 29',         // full display string
  location: 'City / Region',      // primary location label
  sublocation: 'Neighborhood',    // optional — shown after a ·
  theme: 'sf',                    // matches a CSS class with a colored .day-header
  stay: 'Hotel Name · Address',   // shown under 🏨

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

  deepDive: {                     // optional — adds a "Deep Dive →" button on the day card
    title: 'Deep Dive Title',
    subtitle: 'Subtitle line',
    timeline: [
      { time: '9:00 AM', activity: 'Activity name', note: 'optional note' }
    ],
    stops: [                      // array of dd-section objects (see below)
      { icon: '🏛️', label: 'Stop Name', meta: 'optional meta', address: 'optional',
        content: 'Details', tips: ['Tip 1', 'Tip 2'], notes: [] }
    ],
    logistics: [],                // same shape as stops
    checklists: [
      { id: 'pack', label: 'Packing List', items: ['Item 1', 'Item 2'] }
    ]
  }
}
```

## QUICK_REF schema

Tabs are configurable per trip — only include the keys that apply. The sheet-tabs HTML block in `index.html` must match exactly (same keys, same order). Common options:

```js
const QUICK_REF = {
  cashOnly:     [ { name: 'Venue', detail: 'Details' } ],   // drop if none
  hours:        [ { name: 'Venue', detail: 'Hours note' } ],
  reservations: [ { name: 'Venue', detail: 'Reservation note' } ],
  transit:      [ { name: 'Route', detail: 'Details' } ],
  tips:         [ { name: 'Tip', detail: 'One-liner' } ]    // add if useful
};
```

Also update `state.currentTab` to match the first tab key, and the `catLabels` map inside `doSearch()`.

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

Add a CSS rule in `<style>` for each region used in `day.theme`:

```css
.sf         .day-header { background: #1a6bac; }
.yosemite   .day-header { background: #4a7c59; }
.marin      .day-header { background: #2a8080; }
.healdsburg .day-header { background: #7c5339; }
/* Add new regions here */
```

## Naming conventions

| Thing | Convention |
|-------|------------|
| Trip folder | `trips/destination-year/` — lowercase, hyphenated |
| SW cache name | `destination-year-v1` — bump the version number on any cache-affecting change |
| localStorage prefix | Short unique id, e.g. `japan-27:` |

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
