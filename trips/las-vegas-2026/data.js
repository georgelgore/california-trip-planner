// ─── TRIP META ────────────────────────────────────────────────────────────────
const TRIP_META = {
  name: 'Las Vegas & Bryce Canyon 2026',
  shortName: 'Las Vegas 2026',
  dates: 'Aug 8–13, 2026',
  travelers: 'George & Doug',
  startDate: '2026-08-08',
};

// ─── EDIT CONFIG ──────────────────────────────────────────────────────────────
const EDIT_CFG = {
  tripId:       'lv-trip-v1',
  githubOwner:  'georgelgore',
  githubRepo:   'trip-itinerary',
  githubBranch: 'main',
  editsPath:    'trips/las-vegas-2026/edits.json',
  storageKey:   'lv-trip-v1:days',
  initialTab:   'hours',
  catLabels: {
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
    date: 'Saturday, August 8 — Arrival Day',
    location: 'The Strip',
    sublocation: 'EWR → LAS · Check in · Strip walk · First night out',
    theme: 'strip',
    stay: 'Park MGM · 3770 S Las Vegas Blvd',
    sections: [
      {
        label: 'Flight — UA 1631 · EWR → LAS',
        icon: '✈️',
        content: 'Depart Newark (EWR) at 9:00 AM, arrive Las Vegas (LAS) at 11:28 AM — 5h 28m flight. Boeing 737 MAX 8, United Economy. Seats 14C & 14D.',
        address: 'Newark Liberty International (EWR) → Harry Reid International (LAS)',
        notes: [
          { type: 'info', text: 'Complimentary Premier Upgrade requested — check status closer to departure.' }
        ]
      },
      {
        label: 'Transfer — Airport to Park MGM',
        icon: '🚗',
        content: 'Harry Reid International is about 4 miles south of the Strip — roughly 15–20 minutes by Uber. Pick up on Level 2M of the main terminal (follow "Rideshare" signs). Taxis available curbside but pricier.',
        notes: [
          { type: 'info', text: 'Check-in opens at 3pm. Arrive before rooms are ready? Bell desk will store bags — head to Eataly for lunch.' }
        ]
      },
      {
        label: 'Check-In',
        icon: '🏨',
        content: 'Drop bags and get oriented. Park MGM is smoke-free — a genuine rarity on the Strip — with clean, modern rooms and a calm vibe. Walk straight through to the Park for outdoor space before the Strip chaos.',
        address: 'Park MGM · 3770 S Las Vegas Blvd',
        notes: [
          { type: 'info', text: 'Room may not be ready at 11am. Leave bags with bell desk and head to Eataly for lunch.' }
        ]
      },
      {
        label: 'Lunch',
        icon: '🍴',
        content: 'Eataly Las Vegas — right in your hotel. Graze the market counters — pasta, charcuterie, espresso, pastries. Good for an easy first meal while you\'re still in arrival mode. Pick up snacks for the room while you\'re at it.',
        address: 'Park MGM · Italian Market Hall',
        notes: []
      },
      {
        label: 'Afternoon — Strip Walk',
        icon: '🚶',
        content: 'Walk north on the Strip: Park MGM → Cosmopolitan → Bellagio. Wander through the Cosmopolitan\'s art-forward interiors, then cut through Bellagio to see the conservatory garden. Peek into Aria\'s lobby architecture. This stretch is unusually dense with interesting interiors — treat it like a neighborhood walk.',
        address: 'Park MGM → Cosmopolitan → Bellagio · Las Vegas Blvd',
        notes: [
          { type: 'info', text: 'Best light for photos: 4–5pm golden hour from the Bellagio fountain overlook.' }
        ]
      },
      {
        label: 'Dinner — Sparrow + Wolf',
        icon: '🍽️',
        content: 'The best restaurant in Las Vegas that isn\'t on the Strip — and it\'s not particularly close. Worth the short Uber. A globally-informed small-plates menu that changes constantly: they\'ll want you to let the kitchen guide you. Don\'t fight it. Multiple reviewers call it the best meal they\'ve ever had.',
        address: '4480 Spring Mountain Rd · Chinatown-Adjacent',
        notes: [
          { type: 'reservation', text: 'Book ahead — this place fills up. Let the server make recommendations.' }
        ]
      },
      {
        label: 'Show — Cirque du Soleil · Mystère',
        icon: '🎪',
        content: 'One of the longest-running shows in Las Vegas — an athletic, gravity-defying spectacle unlike anything else on the Strip. Plan dinner by 7:30pm to arrive at Treasure Island relaxed. Doors open 30 min before showtime.',
        address: 'Treasure Island · 3300 S Las Vegas Blvd',
        notes: [
          { type: 'reservation', text: 'Saturday August 8 · 9:30–10:30pm · Tickets required' },
          { type: 'info', text: 'Short Uber from Sparrow + Wolf (~10 min up the Strip). Arrive 15 min early — seating is reserved but entry lines form quickly.' }
        ]
      },
      {
        label: 'Drinks — Stray Pirate',
        icon: '🍹',
        content: 'Dog-themed tiki bar in the Arts District — artisan tropical cocktails in a genuinely weird, lovingly decorated room. Small and popular, so go early-ish or expect to wait. The bartenders are serious about their craft. Don\'t miss the bathrooms.',
        address: '1321 S Commerce St · Arts District',
        notes: []
      }
    ]
  },
  {
    id: 2,
    date: 'Sunday — Arts District & Chinatown',
    location: 'Arts District & Chinatown',
    sublocation: 'Off-strip eating · Neon Museum · Fremont East',
    theme: 'offstrip',
    stay: 'Park MGM · 3770 S Las Vegas Blvd',
    sections: [
      {
        label: 'Coffee — Iwana Specialty',
        icon: '☕',
        content: 'Las Vegas\'s best specialty roaster, tucked just off Main Street in the Arts District. Excellent pour overs, a lovely bright space, and solid food. The lavender latte is a standout. Combine with a short wander of the surrounding murals after.',
        address: '61 W Utah Ave · Arts District',
        notes: [
          { type: 'info', text: 'Free street parking on Sundays.' }
        ]
      },
      {
        label: 'Morning — Arts District Walk',
        icon: '🎨',
        content: 'The real creative heart of Las Vegas. Hit The Arts Factory (multi-studio complex, artists in residence), MAD Gallery (curated local work, small but excellent), and wander Art Square for murals. Vintage and thrift shops in between. The whole district rewards wandering.',
        address: 'Main St & Charleston Blvd',
        notes: []
      },
      {
        label: 'Lunch — Ton Shou Katsu',
        icon: '🍱',
        content: '4.9 stars and 1,200+ reviews — it\'s the real deal. Premium pork katsu with kettle-cooked rice, ramen, takoyaki. Inside Las Vegas\'s underrated Chinatown strip on Spring Mountain Road. Get there early or expect a wait.',
        address: '4049 Spring Mountain Rd · Las Vegas Chinatown',
        notes: [
          { type: 'reservation', text: 'Reservations recommended · Long waits without one' },
          { type: 'info', text: 'Spring Mountain Road is the move for serious eating in Vegas — don\'t let anyone tell you otherwise.' }
        ]
      },
      {
        label: 'Afternoon — Chinatown',
        icon: '🍵',
        content: 'Explore the strip of markets, bakeries, and specialty shops on Spring Mountain Road. Pop into True Matcha (matcha-only café, ceremonial grade) for an afternoon drink. Browse the Korean and Chinese grocery stores — there are some interesting finds for tea accompaniments.',
        address: 'Spring Mountain Rd corridor',
        notes: []
      },
      {
        label: 'Evening — Neon Museum',
        icon: '🌆',
        content: 'A graveyard of vintage casino signs — Stardust, Caesars, the Horseshoe. The twilight tour (starting just before sunset) is the best way to experience it, with the refurbished signs lit up against a darkening sky. Buy tickets online in advance; they sell out.',
        address: '770 Las Vegas Blvd N · Book the twilight tour',
        notes: [
          { type: 'reservation', text: 'Buy tickets online in advance — they sell out. Twilight tour is the move.' },
          { type: 'info', text: 'Tip your guide — they\'re worth it.' }
        ]
      },
      {
        label: 'Dinner — Casa Di Amore',
        icon: '🍝',
        content: 'A deeply local institution: red sauce Italian with a live piano player, communal booths, and a crowd that actually lives here. The lasagna and mushroom risotto are legendary. They make you feel like family — the reviews all say the same thing. Very off-strip, very worth it.',
        address: '2850 E Tropicana Ave · Old Vegas Italian',
        notes: [
          { type: 'warning', text: 'Closes Tuesday & Wednesday — Sunday works perfectly.' }
        ]
      },
      {
        label: 'Late Night — Fremont East',
        icon: '🥃',
        content: 'Oak & Ivy is a serious whiskey and spirits bar inside the Downtown Container Park — small, excellent, bartenders who know their stuff. Wander the Container Park\'s outdoor collection of shops and small bars. The vibe is entirely different from the Strip: locals, cool air, no casino noise.',
        address: '707 E Fremont St · Downtown Container Park',
        notes: []
      }
    ]
  },
  {
    id: 3,
    date: 'Monday — Big Day',
    location: 'Downtown & The Strip',
    sublocation: 'Peppermill · Old Vegas · Bavette\'s · Late night',
    theme: 'downtown',
    stay: 'Park MGM · 3770 S Las Vegas Blvd',
    sections: [
      {
        label: 'Breakfast — Peppermill',
        icon: '🍳',
        content: 'One of the great American diners. Open since 1972, with a fire pit lounge that glows pink and magenta at all hours. Enormous portions — omelets built for two people, ribeyes, crab cakes. The old-Vegas aesthetic is fully intact and not ironic. Order the onion rings.',
        address: '2985 Las Vegas Blvd S · Open 24 hours',
        notes: [
          { type: 'info', text: 'Sit in the Fireside Lounge section if you can. It\'s the whole point.' }
        ]
      },
      {
        label: 'Morning — Old Vegas Walking Tour',
        icon: '🏛️',
        content: 'Las Vegas Walking Tours runs a 2-hour tour out of Old Downtown covering 100 years of history: mob era casinos, the original Strip, classic architecture, the transformation of Fremont. Guide Kelly is reliably excellent — dry humor, deep local knowledge. Tours start at 11am and 2:30pm; book ahead.',
        address: 'Downtown Las Vegas · Las Vegas Walking Tours',
        notes: [
          { type: 'reservation', text: 'Book ahead · Tours at 11am and 2:30pm' },
          { type: 'info', text: 'Skip the Fremont Experience light show — walk east on Fremont Street instead, it\'s more interesting.' }
        ]
      },
      {
        label: 'Late Lunch — Yardbird',
        icon: '🍗',
        content: 'Chicken and waffles that people come back to Las Vegas specifically for, plus solid avocado toast, biscuits, and grits. The bar seats are good if it\'s crowded. Save room for dinner.',
        address: 'The Venetian · 3355 S Las Vegas Blvd',
        notes: []
      },
      {
        label: 'Afternoon — Rest & Pool',
        icon: '🌴',
        content: 'Take a breath. Park MGM\'s casino floor is low-key compared to the mega-resorts, which makes it a good place to actually enjoy a few games without sensory overload. Or just lay by the pool. Big dinner tonight.',
        address: 'Park MGM',
        notes: []
      },
      {
        label: 'Dinner — Bavette\'s Steakhouse',
        icon: '🥩',
        content: 'The best dinner on the trip, right in your hotel. French-inflected steakhouse with a moody, intimate room — dark wood, warm light, classic cocktails. The dry-aged bone-in ribeye with peppercorn crust is the move. Get the bone marrow and Brussels sprouts. The fried chicken is reportedly life-changing if you\'re not feeling steak.',
        address: 'Park MGM · In-hotel',
        notes: [
          { type: 'reservation', text: 'Reservation recommended · Back bar ("secret room") is walk-in if unavailable.' }
        ]
      },
      {
        label: 'Show — RuPaul\'s Drag Race LIVE',
        icon: '👑',
        content: 'Las Vegas\'s resident Drag Race show — cast members performing live in a classic mid-century showroom. Plan an early Bavette\'s dinner (5:30–6pm) to arrive at Flamingo relaxed. The Flamingo is an easy walk up the Strip from Park MGM (~15 min) or a quick Uber.',
        address: 'Flamingo Showroom · Flamingo Las Vegas · 3555 S Las Vegas Blvd',
        notes: [
          { type: 'reservation', text: 'Monday August 10 · Tickets required · Flamingo Showroom' }
        ]
      },
      {
        label: 'Late Night — Petite Boheme',
        icon: '🍸',
        content: 'Best bar in Las Vegas for the vibe you two would actually like — Bohemian-industrial, arts district, cozy couches, genuinely great cocktails. Multiple reviewers compare it to a great NYC bar. Order the Dealer\'s Choice and let them go. Open until 2am.',
        address: '1407 S Main St · Arts District',
        notes: []
      }
    ]
  },
  {
    id: 4,
    date: 'Tuesday — Drive to Bryce Canyon',
    location: 'Las Vegas → Bryce Canyon, UT',
    sublocation: 'Park MGM checkout · 4-hr drive · Under Canvas check-in',
    theme: 'strip',
    stay: 'Under Canvas Bryce Canyon',
    sections: [
      {
        label: 'Breakfast — Eataly Café',
        icon: '☕',
        content: 'Quick and easy: walk downstairs, grab an espresso and cornetti before the drive. Or grab something to go from the market counter.',
        address: 'Park MGM · Opens 7am',
        notes: []
      },
      {
        label: 'Check-Out — Park MGM',
        icon: '🏨',
        content: 'Standard checkout 11am. Load the car and head out — you have a 4-hour drive ahead.',
        address: 'Park MGM · 3770 S Las Vegas Blvd',
        notes: []
      },
      {
        label: 'Drive — Las Vegas to Bryce Canyon',
        icon: '🚗',
        content: 'About 4 hours via I-15 N → UT-20 E → US-89 N. The landscape shifts dramatically as you leave the desert basin — red rock country starts around Zion. Fill up gas before leaving Las Vegas; options get thin on the Utah stretch.',
        notes: [
          { type: 'info', text: 'UT-9 through Zion is a scenic detour (+30 min) — worth it if you want a taste of Zion Canyon on the way.' },
          { type: 'warning', text: 'Last real gas and grocery stop: Cedar City, UT — about 50 miles before Bryce.' }
        ]
      },
      {
        label: 'Check-In — Under Canvas Bryce Canyon',
        icon: '⛺',
        content: 'Under Canvas is a glamping resort just outside the national park — safari-style canvas tents with real beds, wood-burning stoves, and private outdoor spaces. Check-in at 3pm. The camp has a communal fire area, a café/bar, and organized activities including guided hikes and stargazing.',
        address: 'Under Canvas Bryce Canyon · 2600 N Highway 12, Tropic, UT',
        notes: [
          { type: 'info', text: 'Pick up the activity schedule at check-in — guided sunset hikes and stargazing programs book up fast.' }
        ]
      }
    ]
  },
  {
    id: 5,
    date: 'Wednesday — Bryce Canyon',
    location: 'Bryce Canyon National Park',
    sublocation: 'Hoodoos · Navajo Loop · Sunset Point',
    theme: 'brycecanyon',
    stay: 'Under Canvas Bryce Canyon',
    sections: [
      {
        label: 'Morning — Sunrise Point & Navajo Loop',
        icon: '🌄',
        content: 'Start at Sunrise Point before the crowds arrive — the light on the hoodoos in the early morning is the defining Bryce image. From there, drop into the canyon via the Navajo Loop (1.3 miles, steep but manageable) for the only perspective you can\'t get from the rim. The Wall Street slot canyon section is the highlight.\n\nNavajo Loop + Queens Garden combo (3 miles total) is the single best hike in the park for first-timers.',
        address: 'Sunrise Point Trailhead · Bryce Canyon NP',
        notes: [
          { type: 'warning', text: 'Altitude is 8,000–9,000 ft — take it easy and hydrate more than you think you need to.' }
        ]
      },
      {
        label: 'Afternoon — Rim Trail & Inspiration Point',
        icon: '🥾',
        content: 'Walk the paved Rim Trail between Sunrise and Sunset Points — mostly flat, best for absorbing the panorama at your own pace. Stop at Inspiration Point for the most dramatic hoodoo amphitheater in the park. The free park shuttle connects all major viewpoints if your legs need a rest.',
        address: 'Rim Trail · Bryce Canyon NP',
        notes: []
      },
      {
        label: 'Evening — Under Canvas',
        icon: '🔭',
        content: 'Back at camp for sunset and the dark-sky experience Bryce is famous for. The sky here is legitimately dark — one of the best stargazing locations in the continental US. Under Canvas runs guided stargazing programs from the communal fire area.',
        address: 'Under Canvas Bryce Canyon',
        notes: [
          { type: 'info', text: 'No light pollution for miles. A clear night here is unforgettable — worth staying up for.' }
        ]
      }
    ]
  },
  {
    id: 6,
    date: 'Thursday, August 13 — Departure',
    location: 'Bryce Canyon → Las Vegas',
    sublocation: 'Morning walk · Checkout · Drive to LAS · UA 1386 home',
    theme: 'brycecanyon',
    stay: 'Under Canvas Bryce Canyon · Checkout 11am',
    sections: [
      {
        label: 'Morning — One Last Look',
        icon: '🌅',
        content: 'One more early morning at the rim before the day heats up. Sunset Point at dawn is often quieter than Sunrise Point and the light reverses beautifully onto the far canyon wall. Short and sweet before packing up.',
        address: 'Sunset Point · Bryce Canyon NP',
        notes: [
          { type: 'warning', text: 'Flight departs LAS at 3:41 PM — you need to leave camp by 10:00 AM at the latest for the 4-hour drive. Ask Under Canvas about early checkout or bag drop the night before.' }
        ]
      },
      {
        label: 'Check-Out — Under Canvas',
        icon: '🏕️',
        content: 'Standard checkout at 11am, but aim to be on the road by 10:00 AM given your flight. Arrange bags with camp staff the night before if possible. Load up, gas up in Tropic or Panguitch, and head south.',
        address: 'Under Canvas Bryce Canyon · 2600 N Highway 12, Tropic, UT',
        notes: [
          { type: 'warning', text: 'Leave no later than 10:00 AM — the drive is ~4 hours and you need to be at LAS by 2:00 PM for a 3:41 PM flight.' }
        ]
      },
      {
        label: 'Drive — Bryce Canyon to Las Vegas',
        icon: '🚗',
        content: 'About 4 hours via US-89 S → I-15 S. Fill up in Cedar City, UT (~1.5 hrs in) — last reliable gas before the Nevada state line. The landscape shifts from red rock canyon country back into the flat Mojave basin as you approach Vegas.',
        notes: [
          { type: 'info', text: 'Scenic route via UT-9 through Zion Canyon adds ~30 min — skip it today given the flight timing.' },
          { type: 'warning', text: 'Last gas/grocery stop: Cedar City, UT (~50 miles before the Nevada border).' }
        ]
      },
      {
        label: 'Flight — UA 1386 · LAS → EWR',
        icon: '✈️',
        content: 'Depart Las Vegas (LAS) at 3:41 PM, arrive Newark (EWR) at 11:44 PM — 5h 3m flight. Boeing 737 MAX 8, United Economy. Seats 10C & 10D.',
        address: 'Harry Reid International (LAS) → Newark Liberty International (EWR)',
        notes: [
          { type: 'info', text: 'Complimentary Premier Upgrade requested — check status closer to departure.' },
          { type: 'warning', text: 'Return car and clear security by 2:00 PM. Harry Reid is efficient but give yourself the full 90 minutes.' }
        ]
      }
    ]
  }
];

// ─── QUICK REF ────────────────────────────────────────────────────────────────
const QUICK_REF = {
  hours: [
    { name: 'Peppermill Restaurant', detail: 'Open 24 hours · 2985 Las Vegas Blvd S · Fireside Lounge section is the whole point' },
    { name: 'Casa Di Amore', detail: 'Closed Tuesday & Wednesday — Sunday works perfectly · 2850 E Tropicana Ave' },
    { name: 'Stray Pirate', detail: 'Go early or expect to wait — small and popular · 1321 S Commerce St, Arts District' },
    { name: 'Petite Boheme', detail: 'Open until 2am · 1407 S Main St, Arts District' },
    { name: 'Eataly Las Vegas', detail: 'Opens 7am · Park MGM · Perfect for quick departure breakfast' },
    { name: 'Iwana Specialty Coffee', detail: 'Arts District roaster · 61 W Utah Ave · Free street parking on Sundays' }
  ],
  reservations: [
    { name: 'Cirque du Soleil — Mystère', detail: 'Saturday August 8 · 9:30pm · Treasure Island · Tickets required in advance' },
    { name: 'Drag Race LIVE', detail: 'Monday August 10 · Flamingo Showroom · Tickets required in advance' },
    { name: 'Under Canvas Bryce Canyon', detail: 'August 11–13 · Check-in 3pm · Checkout 11am · 2600 N Highway 12, Tropic, UT' },
    { name: 'Sparrow + Wolf', detail: 'Reservation required · 4480 Spring Mountain Rd · Let the server guide you — do not fight it' },
    { name: 'Ton Shou Premium Katsu', detail: 'Reservations recommended · 4049 Spring Mountain Rd · Long waits without one' },
    { name: 'Bavette\'s Steakhouse', detail: 'Reservation recommended · Park MGM · Walk-in at the back bar ("secret room") if unavailable' },
    { name: 'Neon Museum', detail: 'Buy tickets online in advance — sells out · 770 Las Vegas Blvd N · Twilight tour recommended' },
    { name: 'Las Vegas Walking Tours', detail: 'Book ahead · 2-hour tour starting 11am or 2:30pm · Downtown Las Vegas' }
  ],
  transit: [
    { name: 'UA 1631 — EWR → LAS (Day 1)', detail: 'Departs Newark 9:00 AM · Arrives LAS 11:28 AM · Seats 14C & 14D · Rideshare pickup Level 2M' },
    { name: 'UA 1386 — LAS → EWR (Day 6)', detail: 'Departs LAS 3:41 PM · Arrives EWR 11:44 PM · Seats 10C & 10D · Be at airport by 2:00 PM · Leave Bryce by 10:00 AM' },
    { name: 'Airport Transfer — LAS to Park MGM', detail: 'Uber/Lyft from Level 2M · ~4 miles · 15–20 min · Taxis available curbside' },
    { name: 'Drive — Las Vegas to Bryce Canyon', detail: '~4 hrs · I-15 N → UT-20 E → US-89 N · Last gas/grocery: Cedar City, UT (~50 mi before Bryce)' },
    { name: 'Mystère (Treasure Island)', detail: 'Short Uber from Sparrow + Wolf or Park MGM (~10 min up the Strip)' },
    { name: 'Drag Race LIVE (Flamingo)', detail: 'Walk up the Strip from Park MGM (~15 min) or quick Uber' },
    { name: 'Sparrow + Wolf', detail: 'Short Uber from Strip (~10 min) · 4480 Spring Mountain Rd · Not walkable from Park MGM' },
    { name: 'Arts District', detail: 'Short Uber from Park MGM · Main St & Charleston Blvd · Free street parking on Sundays' },
    { name: 'Stray Pirate', detail: 'Uber to Arts District · 1321 S Commerce St · Not on the Strip' },
    { name: 'Neon Museum', detail: 'Uber recommended (~10 min from Strip) · 770 Las Vegas Blvd N' },
    { name: 'Casa Di Amore', detail: 'Uber required — east side, off-strip · 2850 E Tropicana Ave · ~15 min from Park MGM' },
    { name: 'Park MGM Tram', detail: 'Connects directly to Bellagio — useful for Strip exploration or killing time before checkout' }
  ],
  tips: [
    { name: 'Bryce Canyon altitude', detail: '8,000–9,000 ft — go slower than you think, drink extra water, especially on Day 1 at altitude.' },
    { name: 'Bryce stargazing', detail: 'One of the best dark-sky locations in the US. Under Canvas runs guided programs — sign up at check-in.' },
    { name: 'Mystère dinner timing', detail: 'Book Sparrow + Wolf for 7–7:30pm to arrive at Treasure Island relaxed before the 9:30pm show.' },
    { name: 'Drag Race LIVE dinner timing', detail: 'Book Bavette\'s for 5:30–6pm on Monday so you\'re at Flamingo before showtime.' },
    { name: 'Park MGM is smoke-free', detail: 'One of the only smoke-free casino hotels on the Strip. The calm vibe is real — worth choosing wisely.' },
    { name: 'Spring Mountain Road', detail: 'The move for serious eating in Vegas. Sparrow + Wolf, Ton Shou, and True Matcha are all in this corridor.' },
    { name: 'Bellagio Fountain overlook', detail: 'Best photos 4–5pm during golden hour. The park bridge south of Bellagio gives the best unobstructed angle.' },
    { name: 'Fremont Street — go east', detail: 'Skip the Fremont Experience light show. Walk east on Fremont St instead — more interesting, more local.' },
    { name: 'Bavette\'s back bar', detail: 'If you can\'t get a dinner reservation, the "secret room" back bar is walk-in. Same kitchen, same quality.' },
    { name: 'Neon Museum twilight tour', detail: 'The twilight tour is the only way to do it — signs are lit against a darkening sky. Afternoon tours miss the whole point.' }
  ]
};
