// ─── TRIP META ────────────────────────────────────────────────────────────────
const TRIP_META = {
  name: 'TRIP_NAME YYYY',        // full title — used by navigator.share
  shortName: 'TRIP_NAME',        // short title — used in clipboard text & day-detail share
  dates: 'DATES',                // pretty date range, e.g. 'May 29 – June 7'
  travelers: 'TRAVELERS',        // e.g. 'George & Doug'
  startDate: 'YYYY-MM-DD',       // ISO date of Day 1 — used to infer per-day dates
};

// ─── EDIT CONFIG ──────────────────────────────────────────────────────────────
const EDIT_CFG = {
  tripId:       'TRIP_ID',                          // short unique id, e.g. 'japan-27'
  githubOwner:  'georgelgore',
  githubRepo:   'trip-itinerary',
  githubBranch: 'main',
  editsPath:    'trips/TRIP_FOLDER/edits.json',     // path within repo
  storageKey:   'TRIP_ID:days',                     // localStorage key for cached days
  initialTab:   'cashOnly',                         // first Quick Ref tab shown
  catLabels: {                                      // must match QUICK_REF keys + sheet-tabs
    cashOnly:     'Cash Only',
    hours:        'Hours',
    reservations: 'Reservations',
    transit:      'Transit',
    tips:         'Tips',
  },
};

// ─── DAYS ─────────────────────────────────────────────────────────────────────
let DAYS = [
  {
    id: 1,
    date: 'Day of Week, Month DD',   // e.g. 'Friday, May 29'
    location: 'City / Region',
    sublocation: 'Neighborhood',     // optional
    theme: 'region1',                // CSS class — add a matching rule in index.html <style>
    stay: 'Hotel Name · Address',
    sections: [
      {
        label: 'Morning',
        icon: '☕',
        content: 'Description of the activity.',
        address: 'Venue Name, Address',   // optional
        notes: [
          // { type: 'info',        text: 'Informational note' }
          // { type: 'warning',     text: 'Time-sensitive or caution note' }
          // { type: 'cash',        text: 'Cash-only note' }
          // { type: 'reservation', text: 'Reservation reminder' }
        ]
      }
    ]
    // deepDive: {                   // optional — triggers "Deep Dive" button on the card
    //   title: 'Deep Dive Title',
    //   subtitle: 'Subtitle',
    //   timeline: [ { time: '9:00 AM', activity: 'Activity', note: 'optional note' } ],
    //   stops: [],
    //   logistics: [],
    //   checklists: []
    // }
  }
];

// ─── QUICK REF ────────────────────────────────────────────────────────────────
// Remove keys you don't need; update sheet-tabs in index.html and catLabels above to match.
const QUICK_REF = {
  cashOnly:     [ /* { name: 'Venue', detail: 'Details' } */ ],
  hours:        [ /* { name: 'Venue', detail: 'Hours note' } */ ],
  reservations: [ /* { name: 'Venue', detail: 'Reservation note' } */ ],
  transit:      [ /* { name: 'Route', detail: 'Details' } */ ],
  tips:         [ /* { name: 'Tip',   detail: 'One-liner' } */ ],
};
