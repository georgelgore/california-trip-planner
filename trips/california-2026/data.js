// ─── TRIP META ────────────────────────────────────────────────────────────────
const TRIP_META = {
  name: 'California Trip 2026',
  shortName: 'California 2026',
  dates: 'May 29 – June 7',
  travelers: 'George & Doug',
  startDate: '2026-05-29',
};

// ─── EDIT CONFIG ─────────────────────────────────────────────────────────────
const EDIT_CFG = {
  tripId: 'ca-trip-v2',
  githubOwner: 'georgelgore',
  githubRepo: 'trip-itinerary',
  githubBranch: 'main',
  editsPath: 'trips/california-2026/edits.json',
  storageKey: 'ca-trip-v2:days',
  patKey: 'trip-gh-pat',
  initialTab: 'cashOnly',
  catLabels: {
    cashOnly: 'Cash Only',
    hours: 'Hours',
    reservations: 'Reservations',
    transit: 'Transit'
  }
};

// ─── DATA ────────────────────────────────────────────────────────────────────

let DAYS = [
  {
    id: 1,
    date: 'Friday, May 29',
    location: 'San Francisco',
    sublocation: 'Downtown SOMA',
    theme: 'sf',
    stay: 'Intercontinental SF · 888 Howard St',
    sections: [
      {
        label: 'Arrival',
        icon: '✈️',
        content: 'UA 1960 · EWR → SFO\nDeparts 7:00 AM · Arrives 9:59 AM\nBoeing 777-300ER · Seat 31C\n\nDrive to Intercontinental, check in, get settled.',
        address: 'SFO · San Francisco International Airport',
        notes: [
          { type: 'info', text: '~30 min drive from SFO to Intercontinental SF' }
        ]
      },
      {
        label: 'Lunch',
        icon: '🍴',
        content: 'Ferry Building Marketplace — artisan food vendors, local produce, great for grazing. Walkable from hotel across the Embarcadero.',
        address: '1 Ferry Building, San Francisco',
        notes: [
          { type: 'info', text: '~15 min walk from Intercontinental via Embarcadero' }
        ]
      },
      {
        label: 'Afternoon',
        icon: '🏛️',
        content: 'SOMA exploration: SFMOMA, nearby galleries, neighborhood walk.',
        address: 'SFMOMA · 151 3rd St, San Francisco',
        notes: [
          { type: 'info', text: 'SFMOMA hours: 10am–5pm daily (Thu until 9pm)' }
        ]
      },
      {
        label: 'Dinner',
        icon: '🍽️',
        content: 'Anchovy Bar — seafood-focused, wine-driven spot in the Mission District.',
        address: '579 Valencia St, San Francisco',
        notes: []
      },
      {
        label: 'Evening',
        icon: '🌙',
        content: 'Return to Intercontinental. Rest up — early Yosemite departure tomorrow.',
        notes: []
      }
    ]
  },
  {
    id: 2,
    date: 'Saturday, May 30',
    location: 'SF → Yosemite',
    sublocation: 'Curry Village',
    theme: 'yosemite',
    stay: 'Curry Village, Yosemite Valley',
    sections: [
      {
        label: 'Morning',
        icon: '☕',
        content: 'Meet friends in SF, final coffee, depart for Yosemite via Hwy 120 through Groveland.',
        notes: [
          { type: 'info', text: 'Hwy 120 entrance via Groveland · ~4–5 hrs from SF' },
          { type: 'warning', text: 'Digital entrance pass required — have confirmation from recreation.gov' }
        ]
      },
      {
        label: 'Lunch',
        icon: '🍴',
        content: 'Iron Door Saloon — historic gold-rush era bar and grill in Groveland. Good stopping point midway to Yosemite.',
        address: '18761 Main St, Groveland, CA',
        notes: [
          { type: 'info', text: 'Roughly halfway to Yosemite — good timing stop' }
        ]
      },
      {
        label: 'Afternoon',
        icon: '🌲',
        content: 'Arrive Curry Village. Check in, get oriented. Valley Floor Loop — easy stroll with views of Half Dome and El Capitan.',
        address: 'Curry Village (Half Dome Village), Yosemite Valley',
        notes: [
          { type: 'info', text: 'Valley Floor Loop: ~13 mi full loop; any section makes for a great stroll' }
        ]
      },
      {
        label: 'Dinner',
        icon: '🍽️',
        content: 'Curry Village Pizza Deck or Bar 1899 — casual options right at base camp.',
        address: 'Curry Village, Yosemite Valley',
        notes: [
          { type: 'info', text: 'Pizza Deck is outdoor seating · Bar 1899 has a full bar — both at Curry Village' }
        ]
      },
      {
        label: 'Evening',
        icon: '🌙',
        content: 'Settle in, early rest — big hike day tomorrow.',
        notes: []
      }
    ],
    deepDive: {
      title: 'Yosemite Hiking Guide',
      subtitle: 'Days 2–5 · All hikes, entry, logistics & packing list',
      timeline: [
        { time: 'Day 2 · Arrival',    activity: 'Valley Floor Loop or Vernal Fall Footbridge', note: 'Easy — 1–2 hrs after the drive' },
        { time: 'Day 3 · Full day',   activity: 'Mist Trail: Vernal + Nevada Falls',           note: '6.4 mi · 2,000 ft · start by 7:30am' },
        { time: 'Day 4 · Half/full',  activity: 'Glacier Point + Sentinel Dome, or Clouds Rest', note: 'Drive required' },
        { time: 'Day 5 · Morning',    activity: 'Lower Yosemite Falls + checkout',             note: '45–60 min · on road by 11am' },
      ],
      stops: [
        {
          icon: '🎫',
          label: 'Entry Notes — Read First',
          meta: 'No timed-entry required for 2026',
          address: 'Yosemite National Park · Hwy 120 via Groveland',
          content: 'No timed-entry reservations required for 2026 — NPS eliminated the system.\n\nEntrance queues: Expect 60–90 min waits between 8am–5pm in peak season. Avoid by:\n• Buying a digital day pass at recreation.gov (use the pre-paid lane)\n• Arriving before 8am or after 5pm\n\nGlacier Point Road: Open for the 2026 season.\n\nMist Trail note: The JMT "Ice Cut" between Clark Point and Panorama Trail Junction is closed through late June for repairs. The Mist Trail to Nevada Fall remains fully open — this only affects the JMT-Panorama loop variant, not your route.',
          tips: [
            'Digital pass at recreation.gov → skip the toll booth queue entirely',
            'America the Beautiful pass covers entry if you have one',
            'Tioga Road (for Clouds Rest): confirm open before planning — typically opens mid-May',
          ],
          notes: [
            { type: 'reservation', text: 'Buy digital entrance pass at recreation.gov to skip entry queues' },
          ],
        },
        {
          icon: '🚌',
          label: 'Valley Shuttle — Park Your Car',
          meta: 'Free · covers all Valley trailheads',
          content: 'Staying at Curry Village means your car is largely irrelevant for Valley hikes. The free Valley Shuttle covers everything:\n\n• Stop #16 — Happy Isles (Mist Trail trailhead)\n• Stop #6 — Lower Yosemite Falls trailhead\n• Stop #17 — Mirror Lake / Valley east\n• Stop #5 — Yosemite Village / Visitor Center\n\nDrive only for Glacier Point Road and Clouds Rest (Tioga Road).',
          tips: [
            'Shuttle runs frequently — expanded summer hours',
            'Curry Village to Happy Isles (Mist Trail): ~5 min ride',
            'Valley parking fills completely by 9am — let the shuttle handle it',
          ],
          notes: [],
        },
        {
          icon: '🥾',
          label: 'Mist Trail — Vernal & Nevada Falls',
          meta: 'Day 3 · Strenuous · 6.4 mi · 2,000 ft · 5–6 hrs',
          address: 'Happy Isles Trailhead · Shuttle stop #16',
          content: 'The single best day hike in Yosemite Valley. Ascend via the Mist Trail (steep granite staircase through Vernal Fall spray), reach Nevada Fall, descend via JMT switchbacks. Late May/early June is prime: falls at full force, wildflowers, manageable temperatures.\n\nRoute options:\n• A: Vernal Fall Footbridge only — 1.6 mi RT, 1–1.5 hrs (arrival day or rest day)\n• B: Top of Vernal Fall — 2.4 mi RT, ~3 hrs, strenuous\n• C (recommended): Full loop Mist Trail up, JMT down — 6.4 mi, 5–6 hrs\n\nFar fewer people past Vernal Fall. Nevada Fall viewpoint is spectacular and much less crowded.',
          tips: [
            'Start by 7:30am — lower trail crowds by 9am, thins significantly above Vernal Fall',
            'Expect to get soaked on the staircase — wear rain jacket, pack phone in ziplock bag',
            'Wet granite steps are genuinely slippery — use handrails, take your time',
            'Carry 2L+ water; refill at Emerald Pool or Nevada Fall area (filter required)',
            'Nevada Fall top: stay behind railings — drop is unguarded in places',
          ],
          notes: [
            { type: 'warning', text: 'JMT "Ice Cut" closure does NOT affect the standard Mist Trail loop — your route is fully open' },
          ],
        },
        {
          icon: '⛰️',
          label: 'Glacier Point',
          meta: 'Day 4 option · Easy · 0.6 mi viewpoint · 1 hr drive each way',
          address: 'Glacier Point Road (16 mi from Hwy 41 junction)',
          content: '3,200-foot sheer drop to Yosemite Valley with Half Dome directly across. Not a hike — one of the world\'s great viewpoints. Best 3–5pm for warm afternoon light on Half Dome.\n\nAdd-ons from Glacier Point Road:\n• Sentinel Dome (2 mi before GP): 2.2 mi RT, 400 ft, 1.5–2 hrs — 360° summit view, arguably better than Glacier Point\n• Taft Point (same trailhead): 2.2 mi RT, dramatic overhanging ledge, vertiginous\n\nBest combo: Hike Sentinel Dome → drive to Glacier Point viewpoint for sunset.',
          tips: [
            'Depart Curry Village by 2pm for golden afternoon light',
            'Parking fills mid-morning on weekends — arrive before 9am or go in the afternoon',
          ],
          notes: [],
        },
        {
          icon: '🏔️',
          label: 'Clouds Rest',
          meta: 'Day 4 alternative · Strenuous · 12.5 mi · 2,300 ft · 6–8 hrs',
          address: 'Sunrise Lakes Trailhead · Tioga Road (Hwy 120) · ~1 hr drive',
          content: 'Granite spine 1,000 ft above Half Dome — no permit lottery, no cables, no crowds. Panoramic views from 9,926 ft. The ambitious alternative to Glacier Point.\n\nFinal 0.5 miles: narrow exposed ridge with steep drop-offs on both sides. Not technical but confidence-inducing. Views from just before the ridge are still excellent if it feels too exposed.',
          tips: [
            'Start by 7am — thunderstorm risk builds in the afternoon on this exposed summit',
            'Aim to summit by 11am–noon; descend immediately if clouds build',
            'Carry 2.5–3L water from trailhead — no water at summit',
            'Microspikes may help if snow remains in late May on north-facing sections',
            'High elevation (~10,000 ft) — pace slower than valley elevation',
            'Confirm Tioga Road open: nps.gov/yose/planyourvisit/conditions.htm',
          ],
          notes: [
            { type: 'warning', text: 'Start by 7am. Descend immediately if clouds build — exposed summit in thunderstorms' },
            { type: 'warning', text: 'Confirm Tioga Road is open before planning this hike' },
          ],
        },
        {
          icon: '💧',
          label: 'Lower Yosemite Falls',
          meta: 'Day 5 morning · Easy · 1.2 mi · 45–60 min',
          address: 'Lower Yosemite Fall Trailhead · Shuttle stop #6',
          content: 'Easy flat loop to the base of the tallest waterfall in North America. Perfect for Day 5 before checkout. Late May–early June is the best time — falls at maximum flow from snowmelt.\n\nTake the Valley Shuttle from Curry Village to stop #6. Back at Curry Village by 9am easily.',
          tips: [
            'Start 7–8am on departure day — peaceful and uncrowded early',
            'Photo: bridge at base of Lower Falls framing the full drop, and looking up the full 2,425 ft',
          ],
          notes: [],
        },
        {
          icon: '🌿',
          label: 'Valley Floor Loop',
          meta: 'Day 2 arrival · Easy · 2–5 hrs · flat',
          content: 'Flat network of paths through meadows, river crossings, and iconic viewpoints. Many of Yosemite\'s best photo angles are along the valley floor at dawn and dusk.\n\nHighlights:\n• Sentinel Meadow — El Capitan and Cathedral Rocks\n• Valley View / El Capitan Meadow — the classic Yosemite photograph\n• Cook\'s Meadow — Half Dome and Yosemite Falls in one frame\n• Mirror Lake (shuttle #17) — Half Dome reflection on calm mornings',
          tips: [
            'Use the shuttle to position yourself at different points and walk sections',
            'Dawn and dusk: best light and most wildlife (deer, black bears active)',
          ],
          notes: [],
        },
      ],
      logistics: [
        {
          icon: '🌤️',
          label: 'Weather (Late May / Early June)',
          content: 'Valley daytime: 65–80°F. Mornings: 45–55°F — layers needed. Afternoons: thunderstorms can build at higher elevations (especially Clouds Rest — start early).\n\nWaterfalls at peak flow from snowmelt — Mist Trail at its most spectacular and most soaking.\n\nSnow possible above 8,000 ft on Tioga Road routes in late May.',
        },
        {
          icon: '🐻',
          label: 'Bear Safety',
          content: 'Black bears active in late spring:\n• Store ALL food in bear boxes at Curry Village (provided at tent cabins)\n• No food, trash, or scented items in your car — ever, even day bags\n• On trail: bear canister for long stops\n\nDeer common in meadows at dawn/dusk — keep distance.',
        },
        {
          icon: '💧',
          label: 'Water on Trail',
          content: 'Multiple sources on all Valley trails — always filter or treat (Giardia is present).\n\nStarting load: 2L per person minimum. 2.5–3L for Clouds Rest (no water at summit).\n\nRefill points: Merced River at Happy Isles, Emerald Pool (above Vernal Fall), Nevada Fall area.',
        },
        {
          icon: '👥',
          label: 'Crowd Strategy',
          content: 'Mist Trail lower section is the most crowded trail in the park. Start before 8am — crowds thin significantly above Vernal Fall at ~mile 1.5.\n\nYour window (Fri May 30 – Mon June 2) is mixed: weekend days are busier. Early starts solve most of it.',
        },
      ],
      checklists: [
        {
          id: 'yosemite-pack',
          label: '🎒 Packing List',
          items: [
            'Lightweight packable rain jacket — essential for Mist Trail',
            'Moisture-wicking base layer (not cotton)',
            'Light fleece or mid-layer for mornings and high elevation',
            'Hiking shoes with grip (wet granite on Mist Trail is slippery)',
            'Trekking poles — helpful on Mist Trail descent',
            'Sun hat and sunglasses',
            'Daypack (20–30L)',
            'Water filter or purification tablets',
            '2–3L water capacity (bottles or reservoir)',
            'Downloaded offline Yosemite map (AllTrails or Gaia GPS)',
            'Microspikes — if attempting Clouds Rest in late May',
            'Headlamp — for pre-dawn starts',
            'Sunscreen SPF 50+',
            'Bug repellent (late May meadows)',
            'Blister kit, ibuprofen, bandages',
            'Snacks and trail lunch (no food services on trail)',
            'Ziplock bag for phone — Mist Trail spray',
            'Digital entrance pass (recreation.gov)',
            'Bear box usage at Curry Village — mandatory',
            'NPS Yosemite app downloaded offline',
          ],
        },
      ],
    },
  },
  {
    id: 3,
    date: 'Sunday, May 31',
    location: 'Yosemite',
    sublocation: 'Mist Trail Day',
    theme: 'yosemite',
    stay: 'Curry Village, Yosemite Valley',
    sections: [
      {
        label: 'Breakfast',
        icon: '☕',
        content: 'Curry Village Market — grab supplies and pack a trail lunch for the hike.',
        address: 'Curry Village Market, Yosemite Valley',
        notes: [
          { type: 'info', text: 'Pack lunch, snacks, and plenty of water — long hike day ahead' }
        ]
      },
      {
        label: 'Morning',
        icon: '🥾',
        content: 'Mist Trail — Vernal Fall + Nevada Fall extension. One of Yosemite\'s iconic hikes. Expect to get soaked near the falls — bring a rain jacket or poncho.',
        address: 'Happy Isles Trailhead, Yosemite Valley',
        notes: [
          { type: 'warning', text: '6–9 miles total, moderate-to-strenuous. Bring rain jacket/poncho for the mist.' },
          { type: 'info', text: 'Vernal Fall: ~3 mi RT · Nevada Fall extension: ~7 mi RT' },
          { type: 'info', text: 'Start early to beat crowds and afternoon heat' }
        ]
      },
      {
        label: 'Lunch',
        icon: '🎒',
        content: 'Trail lunch at Nevada Fall viewpoint or Vernal Fall footbridge.',
        notes: []
      },
      {
        label: 'Afternoon',
        icon: '🌿',
        content: 'Return from hike, rest at Curry Village. Optional gentle Valley exploration.',
        notes: []
      },
      {
        label: 'Dinner',
        icon: '🍽️',
        content: 'Curry Village Pizza Deck or Bar 1899.',
        address: 'Curry Village, Yosemite Valley',
        notes: []
      },
      {
        label: 'Evening',
        icon: '🌙',
        content: 'Night walk in the Valley or rest. Watch for deer.',
        notes: []
      }
    ],
    deepDive: {
      title: 'Mist Trail Deep Dive',
      subtitle: 'Vernal & Nevada Falls Loop · 6.4 mi · 2,000 ft · 5–6 hrs',
      timeline: [
        { time: '7:30am',    activity: 'Depart Curry Village on shuttle',      note: 'Stop #16 · Happy Isles' },
        { time: '7:45am',    activity: 'Start hiking from Happy Isles',        note: 'Beat the 9am crowd surge' },
        { time: '~9:00am',   activity: 'Top of Vernal Fall',                   note: '~1.5 mi · 1,000 ft gain' },
        { time: '~11:00am',  activity: 'Nevada Fall summit',                   note: '~3.2 mi · 2,000 ft total' },
        { time: '~11:30am',  activity: 'Lunch at Nevada Fall viewpoint',       note: 'Trail lunch with a view' },
        { time: '~1:30pm',   activity: 'Back at Happy Isles via JMT',          note: 'Gradual switchback descent' },
        { time: '~2:00pm',   activity: 'Shuttle back to Curry Village',        note: 'Rest of day free' },
      ],
      stops: [
        {
          icon: '🚌',
          label: 'Getting There',
          meta: 'Take the shuttle — do not drive',
          content: 'Valley parking fills completely by 9am. Take the free Valley Shuttle from Curry Village to Stop #16 (Happy Isles trailhead).\n\n~5 min ride. The shuttle drops you right at the start of the trail.',
          tips: [],
          notes: [],
        },
        {
          icon: '🌊',
          label: 'The Mist Trail Staircase',
          meta: 'Mile 0 to ~1.5 · 1,000 ft gain · where you get soaked',
          content: 'The famous granite staircase climbs directly through Vernal Fall mist. In late May, this is heavy spray — not drizzle. You will get soaked from the knees up.\n\nThe steps are wet, polished granite. They are genuinely slippery — use the handrails and take your time. Slipping accidents on this section happen every season.\n\nAbove the staircase: Emerald Pool — beautiful calm water above the fall. Excellent rest stop and refill point.',
          tips: [
            'Put rain jacket on before the staircase starts — faster than stopping mid-climb',
            'Pack phone in a ziplock bag before you leave Curry Village',
            'Trekking poles useful here for extra stability on descent and wet steps',
            'Crowds thin significantly past the top of Vernal Fall (~mile 1.5) — push through',
          ],
          notes: [
            { type: 'warning', text: 'Wet granite steps — use handrails, no rushing, watch footing' },
          ],
        },
        {
          icon: '🏔️',
          label: 'Nevada Fall',
          meta: 'Mile 3.2 · 2,000 ft total gain · the payoff',
          content: 'Nevada Fall viewpoint is one of the finest views in the park — Half Dome directly across, the Valley spread far below. This is where the crowds disappear entirely.\n\nTake your time here. Eat lunch. This is the point.',
          tips: [
            'Stay behind railings at the overlook — drop is unguarded in places',
            'Photo: Half Dome framed directly behind Nevada Fall from the overlook',
            'Photo: Liberty Cap and Nevada Fall together on the JMT descent',
          ],
          notes: [
            { type: 'warning', text: 'Nevada Fall top: stay behind railings — drop is unguarded in places' },
          ],
        },
        {
          icon: '🔽',
          label: 'JMT Descent',
          meta: 'Nevada Fall → Happy Isles · easier on knees than out-and-back',
          content: 'Descend via the John Muir Trail switchbacks — more gradual than the Mist Trail, much kinder on your knees. This is why the loop is better than out-and-back.\n\nThe JMT passes Clark Point, another excellent viewpoint en route down.\n\nNOTE: The JMT "Ice Cut" closure (Clark Point to Panorama Junction) does NOT affect this descent — your route to Happy Isles is fully open.',
          tips: [
            'Trekking poles help significantly on the descent if knees are feeling the climb',
            'Keep a steady pace — it\'s easy to go too fast on switchbacks and blow out your knees',
          ],
          notes: [],
        },
      ],
      logistics: [
        {
          icon: '🎒',
          label: 'What to Pack Today',
          content: '• Rain jacket — on before the Mist Trail staircase\n• Ziplock bag for phone\n• 2L+ water per person; refill at Emerald Pool or Nevada Fall (filter required)\n• Trail lunch\n• Trekking poles — optional but useful on the staircase and descent\n• Hiking shoes with grip — wet granite does not forgive trail runners',
        },
        {
          icon: '📸',
          label: 'Photo Spots',
          content: '1. Vernal Fall footbridge — classic framed view of the fall\n2. Top of Mist Trail staircase — looking back down the valley\n3. Emerald Pool above Vernal Fall — turquoise water, dramatic walls\n4. Nevada Fall overlook — Half Dome centered in background\n5. JMT descent — Liberty Cap and Nevada Fall together',
        },
        {
          icon: '💧',
          label: 'Water Sources',
          content: '• Merced River at Happy Isles trailhead\n• Vernal Fall footbridge area\n• Emerald Pool (above Vernal Fall) — filter required\n• Nevada Fall area — filter required\n\nCarry at least 2L from the start. Refill and filter at Emerald Pool if running low before Nevada Fall.',
        },
      ],
      checklists: [],
    },
  },
  {
    id: 4,
    date: 'Monday, June 1',
    location: 'Yosemite',
    sublocation: 'Glacier Point or Clouds Rest',
    theme: 'yosemite',
    stay: 'Curry Village, Yosemite Valley',
    sections: [
      {
        label: 'Breakfast',
        icon: '☕',
        content: 'Curry Village Meadow Grill — outdoor grill, good for a hearty morning meal.',
        address: 'Curry Village, Yosemite Valley',
        notes: []
      },
      {
        label: 'Morning',
        icon: '⛰️',
        content: 'Option A — Glacier Point overlook: drive up (~1 hr), stunning 360° views of Half Dome, the Valley, and the High Sierra. Easy walk at the top.\n\nOption B — Clouds Rest hike: strenuous ridge hike above Half Dome elevation with incredible panoramic views.',
        notes: [
          { type: 'info', text: 'Glacier Point: ~1 hr drive from Curry Village · Overlook at 7,214 ft' },
          { type: 'warning', text: 'Clouds Rest: ~14 mi RT, strenuous — best if legs recovered from Mist Trail' }
        ]
      },
      {
        label: 'Lunch',
        icon: '🍴',
        content: 'Degnan\'s Kitchen — deli-style sandwiches and quick bites in Yosemite Village.',
        address: 'Yosemite Village (near Visitor Center), Yosemite Valley',
        notes: []
      },
      {
        label: 'Afternoon',
        icon: '🌿',
        content: 'Explore the Valley at leisure — Yosemite Village, Mirror Lake trail, or rest.',
        notes: []
      },
      {
        label: 'Dinner',
        icon: '🍽️',
        content: 'Curry Village Pizza Deck or Bar 1899.',
        address: 'Curry Village, Yosemite Valley',
        notes: []
      },
      {
        label: 'Evening',
        icon: '🥂',
        content: 'Ahwahnee Bar — sundowners at the historic Ahwahnee Hotel. Open to the public; no hotel stay required. Worth dressing up slightly.',
        address: 'The Ahwahnee Hotel, Yosemite Valley',
        notes: [
          { type: 'cash', text: 'Ahwahnee Bar — verify cash-only before going' },
          { type: 'info', text: 'Open to public — no hotel stay required' }
        ]
      }
    ],
    deepDive: {
      title: 'Glacier Point & Clouds Rest',
      subtitle: 'Choose your Day 4 adventure',
      timeline: [
        { time: 'Option A',  activity: 'Glacier Point drive (depart 2pm)',         note: 'Half day · easy · stunning sunset views' },
        { time: 'Option A+', activity: 'Glacier Point + Sentinel Dome',            note: 'Full afternoon · moderate · better 360° views' },
        { time: 'Option B',  activity: 'Clouds Rest full day (depart 7am)',        note: 'Strenuous · 12.5 mi · above Half Dome' },
      ],
      stops: [
        {
          icon: '🌅',
          label: 'Glacier Point',
          meta: 'Easy · 0.6 mi viewpoint · depart by 2pm for sunset light',
          address: 'End of Glacier Point Road · ~1 hr drive from Curry Village',
          content: '3,200-foot sheer drop to Yosemite Valley with Half Dome directly across. Not a hike — one of the world\'s great viewpoints. Open for the 2026 season.\n\nBest visited 3–5pm for warm afternoon light on Half Dome. Sunset here is exceptional — plan to linger.',
          tips: [
            'Depart Curry Village by 2pm to catch golden afternoon light on Half Dome',
            'Parking fills by mid-morning on weekends — arriving in the afternoon is actually ideal',
            'Faces west into the Valley — sunset colors are extraordinary',
          ],
          notes: [],
        },
        {
          icon: '🗻',
          label: 'Sentinel Dome (add-on)',
          meta: 'Moderate · 2.2 mi RT · 400 ft · 1.5–2 hrs',
          address: 'Sentinel Dome Trailhead — 2 miles before Glacier Point on the road',
          content: '360-degree panoramic summit — El Capitan, Half Dome, the entire high Sierra. Arguably a better view than Glacier Point itself, with far fewer people.\n\nEasy to combine: hike Sentinel Dome first, then drive the remaining 2 miles to Glacier Point viewpoint. Best Day 4 pairing.',
          tips: [
            'Stop at the Sentinel Dome trailhead before reaching Glacier Point parking',
            'Taft Point shares this same trailhead: dramatic overhanging ledge, vertiginous — not for heights-averse',
            'Doing both Sentinel Dome + Taft Point is a solid 3–4 hr outing before the Glacier Point drive',
          ],
          notes: [],
        },
        {
          icon: '⛰️',
          label: 'Clouds Rest',
          meta: 'Strenuous · 12.5 mi · 2,300 ft · 6–8 hrs · depart 7am',
          address: 'Sunrise Lakes Trailhead · Tioga Road (Hwy 120) · ~1 hr drive',
          content: 'Granite spine 1,000 ft above Half Dome — no permit lottery, no cables, no crowds. Panoramic views from 9,926 ft. The most ambitious option — commit to a full day.\n\nFirst challenge: steep switchbacks ~1.5 miles in, gaining ~1,000 ft. Sustained but not technical.\n\nFinal 0.5 miles: narrow exposed granite ridge, steep drop-offs on both sides. Not technical — but bold. Views from just before the ridge are still excellent if it feels too exposed.\n\nHigh elevation (~10,000 ft) means thinner air — budget extra time.',
          tips: [
            'Start by 7am — thunderstorms build fast on this exposed summit in the afternoon',
            'Aim to be at summit by 11am–noon; descend immediately if clouds build',
            'Carry 2.5–3L water from trailhead — no water sources at summit',
            'Microspikes may help on north-facing snow patches in late May',
            '~1 hr drive from Curry Village via Big Oak Flat Road → Tioga Road',
            'Confirm Tioga Road is open: nps.gov/yose/planyourvisit/conditions.htm',
          ],
          notes: [
            { type: 'warning', text: 'Start by 7am. Descend immediately if clouds build — no shelter on the exposed summit ridge' },
            { type: 'warning', text: 'Confirm Tioga Road is open before planning this hike' },
          ],
        },
      ],
      logistics: [
        {
          icon: '🤔',
          label: 'Glacier Point vs. Clouds Rest',
          content: 'Glacier Point: 30 min from the car, iconic Half Dome view in comfort. Perfect if yesterday\'s Mist Trail left you tired or if you want a relaxed afternoon.\n\nClouds Rest: 6–8 hour full-day commitment, physically higher than Half Dome, more dramatic and earned. Best if you recovered well and want one more big day in the mountains.\n\nBoth are worth doing — on different days if schedule allows.',
        },
        {
          icon: '🚗',
          label: 'Getting There',
          content: 'Glacier Point: Drive from Curry Village — Hwy 41 south, then Glacier Point Road (16 miles). ~1 hr. No shuttle service to Glacier Point.\n\nClouds Rest: Drive from Curry Village — Big Oak Flat Road north, then Tioga Road (Hwy 120) east to Sunrise Lakes Trailhead. ~1 hr. Confirm Tioga Road open before going.',
        },
      ],
      checklists: [],
    },
  },
  {
    id: 5,
    date: 'Tuesday, June 2',
    location: 'Yosemite → Mill Valley',
    sublocation: 'Transit Day',
    theme: 'marin',
    stay: "Friends' place, Mill Valley",
    sections: [
      {
        label: 'Breakfast',
        icon: '☕',
        content: 'Curry Village Market — last Yosemite morning.',
        address: 'Curry Village Market, Yosemite Valley',
        notes: []
      },
      {
        label: 'Morning',
        icon: '🥾',
        content: 'Lower Yosemite Falls — short, easy hike (1 mi loop). Great farewell to the Valley.',
        address: 'Lower Yosemite Fall Trailhead, Yosemite Valley',
        notes: [
          { type: 'info', text: '~1 mile loop, easy — perfect relaxed morning before the drive' },
          { type: 'info', text: 'Best water flow late May/early June (peak snowmelt)' }
        ]
      },
      {
        label: 'Lunch',
        icon: '🍴',
        content: 'Curry Village Meadow Grill — final Yosemite meal before departure.',
        address: 'Curry Village, Yosemite Valley',
        notes: []
      },
      {
        label: 'Drive',
        icon: '🚗',
        content: 'Depart Yosemite for Mill Valley — ~3.5–4 hrs via Hwy 120 west to the Bay Area.',
        notes: [
          { type: 'info', text: '~3.5–4 hrs · Exit via Hwy 120 west (Groveland) · Golden Gate Bridge or Richmond Bridge into Marin' }
        ]
      },
      {
        label: 'Dinner',
        icon: '🍽️',
        content: 'Dinner with friends in Mill Valley.',
        notes: []
      },
      {
        label: 'Evening',
        icon: '🌙',
        content: "Settle in at friends' place in Mill Valley.",
        notes: []
      }
    ]
  },
  {
    id: 6,
    date: 'Wednesday, June 3',
    location: 'San Francisco',
    sublocation: 'Mission → Chinatown → North Beach',
    theme: 'sf',
    stay: "Friends' place, Mill Valley",
    sections: [
      {
        label: 'Breakfast',
        icon: '☕',
        content: 'Tartine Manufactory — legendary SF bakery. Exceptional coffee and pastries. Arrive early to beat the line.',
        address: '649 Guerrero St, San Francisco (Mission/SOMA border)',
        notes: [
          { type: 'warning', text: 'Arrive by 8:15am to beat the line' }
        ]
      },
      {
        label: 'Morning',
        icon: '🛍️',
        content: 'Valencia Street — wander north from ~16th St:\n\n• Paletería Nora (16th & Valencia) — Mexican paletas\n• Bi-Rite Market (18th & Valencia) — beloved neighborhood grocery & deli\n• Noun Vintage (20th & Valencia) — curated vintage clothing\n• Costume & Cake (22nd & Valencia) — specialty shop',
        address: 'Valencia St from 16th to 22nd St, San Francisco',
        notes: [
          { type: 'info', text: '~1.5 hrs, roughly 0.5 mi stroll · Most shops open by 11am' }
        ]
      },
      {
        label: 'Lunch',
        icon: '🥟',
        content: 'Good Mong Kok Bakery — classic Chinatown dim sum takeout. Order at the counter.',
        address: '1039 Stockton St, Chinatown, San Francisco',
        notes: [
          { type: 'cash', text: 'Cash preferred — bring bills' },
          { type: 'warning', text: 'Very busy 11:30am–1:30pm — arrive before noon if possible' },
          { type: 'info', text: '18 stools, mostly takeout · Order at counter' }
        ]
      },
      {
        label: 'Afternoon',
        icon: '🍵',
        content: 'Red Blossom Tea Company — exceptional tea shop on Grant Ave. Browse and buy; in-store tastings are no longer offered.',
        address: '735 Grant Ave, Chinatown, San Francisco',
        notes: [
          { type: 'warning', text: 'In-store tastings discontinued — browse and buy only' },
          { type: 'info', text: '~1.25 hrs to browse their full selection' }
        ]
      },
      {
        label: 'Late Afternoon',
        icon: '📚',
        content: 'City Lights Bookstore — iconic Beat Generation bookshop in North Beach. Excellent poetry and literature. Washington Square Park is 2 blocks away.\n\nA few blocks south in Jackson Square:\n• Tailors\' Keep (618 Washington St) — sharp men\'s tailoring and ready-to-wear\n• Quince (470 Pacific Ave) — Michelin-starred Californian fine dining; worth booking if you want to stay in the city for dinner tonight',
        address: 'City Lights: 261 Columbus Ave · Tailors\' Keep: 618 Washington St · Quince: 470 Pacific Ave',
        notes: [
          { type: 'info', text: '~1.5 hrs · Walking total today: ~2 miles (Valencia + Chinatown + North Beach)' },
          { type: 'reservation', text: 'Quince: reservation required if staying in SF for dinner' }
        ]
      },
      {
        label: 'Evening',
        icon: '🚗',
        content: 'Return to Mill Valley for dinner with friends.\n\nTransit options:\n• BART from Civic Center (~15 min walk) or Powell St\n• Rideshare from North Beach: ~30–40 min, ~$40–60',
        notes: [
          { type: 'info', text: 'BART: Civic Center or Powell St stations · Transfer at Embarcadero for ferry to Marin' }
        ]
      }
    ],
    deepDive: {
      title: 'SF Tea, Art & Neighborhood Deep Dive',
      subtitle: 'Valencia Street + Chinatown Tea Route',
      timeline: [
        { time: '8:00–9:00am',    activity: 'Tartine Manufactory',         note: 'Breakfast · SOMA' },
        { time: '9:30–11:00am',   activity: 'Valencia Street explore',      note: '~1.5 mi wander north' },
        { time: '11:00am–12:30pm',activity: 'Walk to Chinatown',            note: 'Via Mission or Market St' },
        { time: '12:30–1:15pm',   activity: 'Good Mong Kok Bakery',         note: 'Dim sum lunch' },
        { time: '1:15–2:30pm',    activity: 'Red Blossom Tea Company',      note: 'Browse & buy · Grant Ave' },
        { time: '2:30–4:00pm',    activity: 'City Lights + North Beach',    note: 'Books & stroll' },
        { time: '4:00–5:30pm',    activity: 'Transit to Mill Valley',       note: 'BART or rideshare' },
        { time: '6:00pm+',        activity: 'Dinner with friends',          note: 'Mill Valley' },
      ],
      stops: [
        {
          icon: '☕',
          label: 'Tartine Manufactory',
          meta: 'Breakfast · 8:00–9:00am',
          address: '649 Guerrero St, San Francisco',
          content: 'Iconic pastry destination. Sourdough croissants, excellent coffee. Worth the early wake.',
          tips: [
            'Arrive by 8:15am to beat the line',
            'Grab a sourdough croissant and a pastry to share',
            'Coffee is solid; tea not a priority here',
            '~20 min to eat, then walk or transit to Valencia',
          ],
          notes: [],
        },
        {
          icon: '🛍️',
          label: 'Valencia Street Wander',
          meta: 'Morning · 9:30–11:00am',
          address: 'Valencia St from 16th to 22nd St',
          content: 'Walk north from ~16th St. No fixed route — wander, dip into shops that appeal. Budget ~1.5hrs; you\'ll cover maybe 10–12 blocks.',
          tips: [
            'Paletería Nora (16th & Valencia) — colorful Mexican paletas',
            'Bi-Rite Market (18th & Valencia) — high-end grocer, beautiful design',
            'Noun Vintage (20th & Valencia) — curated vintage clothes',
            'Costume & Cake (22nd & Valencia) — quirky bookstore/café',
            'Dandelion Chocolate (18th & Guerrero, just west) — if craving chocolate',
            'Stop at intersections for murals and photos',
          ],
          notes: [],
        },
        {
          icon: '🚶',
          label: 'Walk to Chinatown',
          meta: 'Transit · 11:00am–12:30pm',
          address: 'Valencia → Chinatown Gate (Stockton & Bush)',
          content: 'Two route options depending on energy and time.',
          tips: [
            'Option A (scenic): Valencia → Mission Dolores Park → Grant Ave → Chinatown — ~2 mi, ~45–50 min walking',
            'Option B (faster): Valencia → Market St east → Stockton St north — ~1.5 mi, ~30–35 min walking',
            'Take Option A if energy is high; Option B if you want more time in Chinatown',
          ],
          notes: [],
        },
        {
          icon: '🥟',
          label: 'Good Mong Kok Bakery',
          meta: 'Lunch · 12:30–1:15pm',
          address: '1039 Stockton St, Chinatown',
          content: 'Legendary dim sum bakery. Point at what you want at the counter. Budget $8–15 per person for 3–4 items.',
          tips: [
            'Signature items: BBQ pork bun, egg tart, shrimp dumpling',
            'Cash preferred — ATM on Stockton nearby',
            'Lines move fast despite the crowds',
            'Take to go; eat at nearby benches if available',
          ],
          notes: [
            { type: 'cash', text: 'Cash preferred' },
            { type: 'warning', text: 'Peak hours 11:30am–1:30pm — you\'ll hit the tail end; move efficiently' },
          ],
        },
        {
          icon: '🍵',
          label: 'Red Blossom Tea Company',
          meta: 'Browse & shop · 1:15–2:30pm · 45–60 min',
          address: '831 Grant Ave, Chinatown',
          content: 'Treat this as a focused buying trip, not a tasting. Staff are knowledgeable — ask directly. Lead with your collection gaps vs. what you already source from Yunnan Sourcing and white2tea.',
          tips: [
            'Strategy: identify gaps vs. your YS/w2t collection before entering',
            'Ask staff: "What would you prioritize for an oolong and pu-erh collector?"',
            'Request to smell dry leaf before committing — they allow this',
            'Taiwanese oolongs (their strength): Alishan, Dong Ding, Li Shan, Oriental Beauty — $15–60/50g',
            'HK-style aged pu-erh: humid storage profile — good contrast to YS dry storage — $20–80+',
            'Chinese greens (reliable): Longjing, Biluochun — $10–35',
            'White tea: Fuding Baimudan and Shoumei — smaller selection but curated — $12–40',
            'Budget $50–120 for 2–3 focused purchases; avoid over-buying (travel storage is limited)',
            'Grab their card for future online orders',
          ],
          notes: [
            { type: 'warning', text: 'In-store tastings discontinued — browse and buy only' },
            { type: 'info', text: 'Ask about harvest date and storage conditions for any aged items' },
          ],
        },
        {
          icon: '📚',
          label: 'City Lights Bookstore',
          meta: 'North Beach · 2:30–4:00pm',
          address: '261 Columbus Ave, North Beach',
          content: 'Legendary Beat Generation bookshop. Three dense floors. Poetry section (rear, upper floor) is the heart of the place.',
          tips: [
            'Wander all three floors — not huge but very dense',
            'Poetry section is rear, upper floor — City Lights\' legacy',
            'Washington Square Park: 2 blocks away at Filbert & Stockton',
            'Saints Peter and Paul Church: gorgeous white church nearby, great photo',
            'Cafe Trieste (nearby): historic Italian café, atmospheric if touristy',
          ],
          notes: [],
        },
      ],
      logistics: [
        {
          icon: '🚗',
          label: 'Transit Back to Mill Valley',
          content: '• BART: Walk to Civic Center or Powell St → BART to Embarcadero → Ferry or rideshare to Marin\n• Rideshare direct: ~30–40 min, ~$40–60\n• Golden Gate Ferry: BART → Ferry Building → ferry to Marin (check schedule)\n\nRecommendation: Check ferry schedule before leaving. If you\'ll miss it, rideshare is faster and less stressful — you have a dinner to make.',
        },
        {
          icon: '⚡',
          label: 'Pacing & Energy',
          content: 'This is a FULL day on foot. Key notes:\n\n• 8–9am Tartine: High energy, standing\n• 9:30–11am Valencia: Moderate pace, meander and sit\n• 11am–12:30pm Walk to Chinatown: 45–50 min on feet — grab coffee en route if low\n• 12:30–1:15pm Good Mong Kok: Quick refuel\n• 1:15–2:30pm Red Blossom: Slow-paced browsing — perfect timing for the 2pm energy dip\n• 2:30–4pm City Lights: Standing, unhurried\n• 4–5:30pm Transit: Rest time',
        },
        {
          icon: '🎒',
          label: 'What to Bring',
          content: '• Comfortable walking shoes (2+ miles of strolling)\n• Small backpack or crossbody bag (for light purchases)\n• Cash (Good Mong Kok, Red Blossom)\n• Water bottle (refill at cafés)\n• Camera (Valencia murals, North Beach aesthetics)\n• Layers — SF June mornings are chilly, afternoons warm up',
        },
        {
          icon: '⚠️',
          label: 'What to Skip / Alternatives',
          content: 'If energy is low: Skip Valencia; replace with rest or a second coffee stop. Extend Red Blossom visit.\n\nIf compressed for time: Cut North Beach/City Lights; extend Red Blossom and grab tea at a Chinatown café.\n\nRain day: Use BART more liberally; skip outdoor walking sections; Tartine + Red Blossom + City Lights all work in rain.',
        },
      ],
      checklists: [
        {
          id: 'red-blossom',
          label: '🍵 Red Blossom Tea — Browsing Checklist',
          items: [
            'Identify gaps vs. your YS/w2t collection before entering',
            'Ask staff: "What\'s best for an oolong and pu-erh collector?"',
            'Request dry-leaf smell before committing to a purchase',
            'Taiwanese oolongs: ask about Alishan, Dong Ding, Li Shan, Oriental Beauty',
            'Aged pu-erh: ask about humid-storage options (contrast to YS dry storage)',
            'Ask about harvest date and storage conditions for any aged items',
            'Budget $50–120 for 2–3 focused purchases',
            'Request heat-sealed bags for loose-leaf purchases',
            'Grab their card for future online orders',
          ],
        },
      ],
    },
  },
  {
    id: 7,
    date: 'Thursday, June 4',
    location: 'San Francisco',
    sublocation: 'Japantown → Polk → GG Park',
    theme: 'sf',
    stay: "Friends' place, Mill Valley",
    sections: [
      {
        label: 'Breakfast',
        icon: '🍵',
        content: 'Song Tea & Ceramics — intimate tea tasting experience. Reservation via Tock required.',
        address: '2120 Sutter St, San Francisco',
        notes: [
          { type: 'reservation', text: 'Tock reservation required — confirm your booking before leaving' }
        ]
      },
      {
        label: 'Morning',
        icon: '🚶',
        content: 'Fillmore Street corridor — Japantown through Pacific Heights and into Russian Hill.\n\n• Studio Ferris (1504 Vallejo St) — menswear right at Fillmore & Vallejo, Japanese-influenced tailoring\n• Caravane SF (3461 Sacramento St) — beautiful home goods and interiors, a short detour west on Sacramento\n• Presidio Post (1301 Mason St) — Spyplane-endorsed clothing, a few blocks east toward Polk/Russian Hill',
        address: 'Fillmore St from Sutter to Broadway · Studio Ferris: 1504 Vallejo · Caravane: 3461 Sacramento · Presidio Post: 1301 Mason',
        notes: []
      },
      {
        label: 'Lunch',
        icon: '🦪',
        content: 'Swan Oyster Depot — legendary SF raw bar. Counter-only. Cash only. Closes 2:30pm sharp. Order fresh oysters, Dungeness crab, clam chowder.',
        address: '1517 Polk St, San Francisco (Polk Gulch)',
        notes: [
          { type: 'cash', text: 'Cash only — ATM nearby on Polk St' },
          { type: 'warning', text: 'Closes 2:30pm sharp — arrive by noon; line forms early' },
          { type: 'info', text: '18 counter stools only · No reservations' }
        ]
      },
      {
        label: 'Afternoon',
        icon: '🖼️',
        content: 'Option A — Fraenkel Gallery (49 Geary St): check website for current June exhibition before visiting.\n\nOption B — Evan Kinori (1367 Valencia St): Japanese-influenced menswear, open Thu 12–6pm only.\n\nOption C — Golden Gate Park: de Young Museum + Japanese Tea Garden + walk to Ocean Beach. HI NRG (443 Clement St, Inner Richmond) is a great coffee stop before heading in. Rising Star Laundry (858 Cole St, Cole Valley) is worth a detour if approaching from the Haight side.\n\nOption D — Hayes Valley pre-Zuni: Modern Appealing Clothing (387 Grove St) + Reliquary (544 Hayes St) + LOQUAT (198 Gough St) for coffee/pastry. All within a 5-min walk of each other and Zuni. Tacos Oscar (530 Haight St) if you want a light bite before the chicken.',
        address: 'Fraenkel: 49 Geary · Evan Kinori: 1367 Valencia · HI NRG: 443 Clement · MAC: 387 Grove · Reliquary: 544 Hayes',
        notes: [
          { type: 'warning', text: 'Fraenkel Gallery: Check website for current June exhibition and hours' },
          { type: 'warning', text: 'Evan Kinori: Open Thu 12–6pm only · Closed Wednesdays' },
          { type: 'info', text: 'de Young + Japanese Tea Garden: plan ~2–3 hrs for the full park visit' },
          { type: 'info', text: 'Hayes Valley cluster (Option D) is a 5-min walk from Zuni — easy to roll straight into dinner' }
        ]
      },
      {
        label: 'Dinner',
        icon: '🐓',
        content: 'Zuni Café — roast chicken for two is the signature dish. Order immediately on arrival — it takes ~1 hour. Warm, wood-fired room, excellent wine list.',
        address: '1658 Market St, San Francisco',
        notes: [
          { type: 'reservation', text: 'Order roast chicken for two on arrival — ~1 hr wait for the dish' },
          { type: 'info', text: 'Classic SF bistro atmosphere · Great natural wine list' }
        ]
      },
      {
        label: 'Evening',
        icon: '🚗',
        content: 'Return to Mill Valley after dinner.',
        notes: [
          { type: 'info', text: 'Rideshare from Market St to Mill Valley: ~30–40 min' }
        ]
      }
    ],
    deepDive: {
      title: 'Song Tea Morning',
      subtitle: 'Gong fu tasting + teaware browsing · Lower Pacific Heights',
      timeline: [
        { time: 'Reserved slot',  activity: 'Song Tea & Ceramics',           note: 'Seated gong fu tasting' },
        { time: '+60–90 min',     activity: 'Teaware browsing',               note: 'Song ceramics line + Red Blossom if needed' },
        { time: 'Late morning',   activity: 'Japantown / Fillmore walk',      note: 'Per Day 7 itinerary' },
        { time: 'Afternoon',      activity: 'Golden Gate Park',               note: 'de Young + Botanical Garden' },
      ],
      stops: [
        {
          icon: '🍵',
          label: 'Song Tea & Ceramics',
          meta: 'Seated tasting · 60–90 min · Reservation required',
          address: '2120 Sutter St, San Francisco, CA 94115',
          content: 'Intimate gong fu tasting bar — Peter Luong or staff guide you through 2–4 teas with multiple infusions each. Exceptional Taiwanese and Fujian sourcing: high-mountain oolongs (Lishan, Shan Lin Xi), dan cong, rock oolongs (Wuyi). Ask about current white and green tea offerings. Ceramics displayed throughout are also for sale.',
          tips: [
            'Book on Tock as early as possible — slots fill weeks out',
            'Add a note on Tock flagging your collection background for a more tailored session',
            'Confirm reservation 24–48 hours before; some slots require day-of reconfirmation',
            'Relaxed, unhurried pace — multiple infusions per tea, not a quick flight format',
            'Bring a small notebook for tasting notes: tea name, origin, harvest, aroma, finish, would-buy',
            'Budget for ceramics separately if you\'re likely to buy — Song\'s own line is gallery-quality',
            'Wed–Sun 9am–5pm; confirm hours before visiting',
          ],
          notes: [
            { type: 'reservation', text: 'Reservation required — book on Tock: exploretock.com/songtea' },
            { type: 'info', text: 'Est. cost $25–45/person; confirm current pricing on Tock' },
          ],
        },
        {
          icon: '🫖',
          label: 'Teaware Scouting',
          meta: 'What to look for in SF',
          content: 'Song and Red Blossom are the two legitimate teaware sources. Most Chinatown shops sell decorative, not functional ware — avoid heavy patterns or suspiciously low prices. Look for unglazed Yixing-style or plain white porcelain.',
          tips: [
            'Gaiwans: thin porcelain lip (thicker burns fingers), lid sits flush, ~100ml for gong fu',
            'Check interior glaze for pinholes or uneven coverage',
            'Cups: 30–60ml, smooth interior glaze, thin walls preferred',
            'Storage vessels: sealed tin or glazed ceramic — avoid plastic for long-term storage',
            'Song\'s ceramic line: functional and well-made, higher price but excellent craftsmanship',
            'Red Blossom accessory section: practical travel-grade gaiwans and basic cup sets',
          ],
          notes: [
            { type: 'warning', text: 'Chinatown tourist shops: decorative only — skip unless you find plain porcelain at quality price' },
          ],
        },
      ],
      logistics: [
        {
          icon: '📦',
          label: 'Travel Storage for Purchases',
          content: 'Loose-leaf: request heat-sealed bags; store separately from luggage with strong odors.\nPu-erh: leave in original wrapping until home storage.\nLoose oolongs: airtight zip-locks.\nTeaware: wrap in soft clothing in carry-on — never checked bag.',
        },
        {
          icon: '⚡',
          label: 'Pacing Note',
          content: 'Song Tea runs 60–90 min. Don\'t schedule anything immediately after — the session is meant to be unhurried. Japantown is a short walk or rideshare east; GG Park is a 10–15 min ride west.',
        },
      ],
      checklists: [
        {
          id: 'song-tea-tasting',
          label: '🍵 Tasting Notes Template',
          items: [
            'Tea name + origin',
            'Harvest season',
            'Dry leaf aroma',
            'Wet leaf aroma',
            'First infusion: color + taste',
            'How it changes across infusions',
            'Finish / lingering notes',
            'Would buy? Y/N',
          ],
        },
        {
          id: 'teaware-checklist',
          label: '🫖 Teaware Priority List',
          items: [
            '100ml gaiwan (backup or upgrade if Song has a notable piece)',
            '2–4 small gong fu cups (30–60ml)',
            'Pouring pitcher (gongdao bei) — if useful for home setup',
            'Skip Yixing teapots — hard to verify authenticity in SF',
          ],
        },
      ],
    },
  },
  {
    id: 8,
    date: 'Friday, June 5',
    location: 'Mill Valley → Healdsburg',
    sublocation: 'Dry Creek Valley',
    theme: 'healdsburg',
    stay: 'The Lodge at Healdsburg',
    sections: [
      {
        label: 'Drive',
        icon: '🚗',
        content: 'Mill Valley → Healdsburg — ~1h 15m via Hwy 101 north through Marin and Sonoma.',
        notes: [
          { type: 'info', text: '~1h 15m · Hwy 101 north · The Lodge at Healdsburg on arrival' }
        ]
      },
      {
        label: 'Morning',
        icon: '☀️',
        content: 'Healdsburg Plaza — beautiful Spanish colonial town square. Coffee, browse shops, get oriented.',
        address: 'Healdsburg Plaza, Healdsburg, CA',
        notes: []
      },
      {
        label: 'Lunch',
        icon: '🍴',
        content: 'Dry Creek General Store — classic California roadhouse, great sandwiches and local atmosphere.',
        address: '3495 Dry Creek Rd, Healdsburg, CA',
        notes: [
          { type: 'info', text: 'Classic stop en route to the Dry Creek Valley wineries' }
        ]
      },
      {
        label: 'Afternoon',
        icon: '🍷',
        content: 'Dry Creek Valley wineries:\n\n• A. Rafanelli Winery — family-owned, exceptional Zinfandel, appointment preferred\n• Preston Farm & Winery — organic, biodynamic, old-vine Zinfandel and Rhône varieties\n• Healdsburg Farmers\' Market (if timing works)',
        address: 'A. Rafanelli: 4685 W Dry Creek Rd · Preston: 9282 W Dry Creek Rd',
        notes: [
          { type: 'reservation', text: 'A. Rafanelli: Appointment preferred — call ahead' },
          { type: 'info', text: 'Dry Creek Valley is compact — wineries are close together on West Dry Creek Rd' }
        ]
      },
      {
        label: 'Welcome Party',
        icon: '🥂',
        content: 'Preston Farm & Winery — 6:00–9:00 PM.\n\nDress: Casual Chic — sundresses, skirts and tops, jumpsuits; trousers and t-shirts, denim and jackets.',
        address: 'Preston Farm & Winery, West Dry Creek Rd, Healdsburg, CA',
        url: 'https://withjoy.com/michele-and-henri',
        notes: [
          { type: 'info', text: 'Wear sturdy shoes and bring layers' }
        ]
      }
    ]
  },
  {
    id: 9,
    date: 'Saturday, June 6',
    location: 'Healdsburg',
    sublocation: 'Dry Creek Valley',
    theme: 'healdsburg',
    stay: 'The Lodge at Healdsburg',
    sections: [
      {
        label: 'Morning',
        icon: '☀️',
        content: 'Free morning — Healdsburg Plaza, coffee, rest up before the big event.',
        address: 'Healdsburg Plaza, Healdsburg, CA',
        notes: []
      },
      {
        label: 'The Wedding',
        icon: '💍',
        content: 'Ceremony at 4:00 PM.\n\nDress: Formal with Flair — suits and dresses with fun colors, patterns, or accessories.',
        address: '4250 West Dry Creek Road, Healdsburg, CA',
        url: 'https://withjoy.com/michele-and-henri',
        notes: [
          { type: 'info', text: 'Wear sturdy shoes and bring layers' }
        ]
      }
    ]
  },
  {
    id: 10,
    date: 'Sunday, June 7',
    location: 'Healdsburg',
    sublocation: 'Westside Road',
    theme: 'healdsburg',
    stay: 'The Lodge at Healdsburg',
    sections: [
      {
        label: 'Farewell Brunch',
        icon: '🌸',
        content: 'Farewell Brunch — 10:00 AM to 1:00 PM.\n\nDress: Sunday Morning Picnic Attire.',
        address: 'Dragonfly Farm & Floral, Westside Rd, Healdsburg, CA',
        url: 'https://withjoy.com/michele-and-henri',
        notes: [
          { type: 'info', text: '~1h 15m drive from Healdsburg to SFO — depart by 11:00 AM to make your flight' }
        ]
      },
      {
        label: 'Departure',
        icon: '✈️',
        content: 'UA 2480 · SFO → EWR\nDeparts 1:50 PM · Arrives 10:26 PM\nBoeing 787-9 Dreamliner · Seat 34C',
        address: 'SFO · San Francisco International Airport',
        notes: []
      }
    ]
  }
];

const QUICK_REF = {
  cashOnly: [
    { name: 'Good Mong Kok Bakery', detail: 'Cash preferred · 1039 Stockton St, Chinatown · Order at counter · Very busy 11:30am–1:30pm' },
    { name: 'Swan Oyster Depot', detail: 'Cash only · 1517 Polk St, San Francisco · Closes 2:30pm sharp · 18 counter stools · No reservations' },
    { name: 'Ahwahnee Bar', detail: 'Verify cash-only status · Yosemite Valley · Open to public (no hotel stay required)' }
  ],
  hours: [
    { name: 'Swan Oyster Depot', detail: 'Closes 2:30pm sharp — arrive by noon to avoid waiting or missing it entirely' },
    { name: 'Good Mong Kok Bakery', detail: 'Busiest 11:30am–1:30pm — arrive before noon for shorter wait' },
    { name: 'Tartine Manufactory', detail: 'Arrive by 8:15am to beat the morning line — Day 6 breakfast' },
    { name: 'Evan Kinori', detail: 'Open Thu only: 12–6pm · Closed Wednesdays · 1367 Valencia St' },
    { name: 'Red Blossom Tea', detail: 'In-store tastings discontinued — browse and buy only · 735 Grant Ave, Chinatown' },
    { name: 'Fraenkel Gallery', detail: 'Check website for June exhibition hours before visiting · 49 Geary St' }
  ],
  reservations: [
    { name: 'Song Tea & Ceramics', detail: 'Tock reservation required — confirm before Day 7 · 2120 Sutter St, SF' },
    { name: 'Zuni Café', detail: 'Order roast chicken for two immediately on arrival — ~1 hr wait for the dish · Day 7 dinner' },
    { name: 'A. Rafanelli Winery', detail: 'Appointment preferred — call ahead · 4685 W Dry Creek Rd, Healdsburg' },
    { name: 'Fraenkel Gallery', detail: 'Check website for current June exhibition before visiting · 49 Geary St, SF' },
    { name: 'Yosemite Entrance Pass', detail: 'Digital pass required via recreation.gov — have confirmation ready at park entrance' }
  ],
  transit: [
    { name: 'BART Stations (Day 6)', detail: 'Civic Center or Powell St · Day 6 return from North Beach to Mill Valley · Transfer at Embarcadero for ferry' },
    { name: 'Rideshare — North Beach → Mill Valley', detail: '~30–40 min drive · ~$40–60 · Day 6 evening' },
    { name: 'Rideshare — Market St → Mill Valley', detail: '~30–40 min drive · Day 7 after Zuni dinner' },
    { name: 'Golden Gate Ferry', detail: 'Ferry Building → Marin — check schedule in advance · seasonal timing varies' },
    { name: 'Yosemite — Hwy 120', detail: 'Enter via Groveland on Hwy 120 · ~4–5 hrs from SF · Pass Iron Door Saloon at midpoint' },
    { name: 'Mill Valley → Healdsburg', detail: '~1h 15m via Hwy 101 north · Day 8 morning drive' }
  ]
};
