// ─────────────────────────────────────────────────────────────
// City page data · Colby Williams · Innovative Realty Solutions
//
// THIS IS THE ONLY FILE YOU EDIT TO FIX A CITY PAGE.
// Change a price, swap a restaurant, add a school — do it here and
// all four pages update. Market numbers were pulled mid-2026 and
// will drift, so the pages tell visitors to ask you for today's
// figures (that's the lead hook). Refresh these a couple times a year.
//
// To add a 5th city later: copy a block, change the slug + data. Done.
// ─────────────────────────────────────────────────────────────

export const CITIES = {
  athens: {
    slug: "athens",
    name: "Athens",
    county: "Limestone County",
    // Hero image — uses an image you already have in /public/images.
    // Swap the path if you want a different photo.
    image: "/images/city-athens.jpg",
    tagline: "Small-town square, big-city commute",
    intro: [
      "Athens is the Limestone County seat, and it's the town I know block by block — I'm based here. You get a walkable historic square built around the 1919 courthouse, a genuinely small-town pace, and an easy shot down US-72 to the jobs in Huntsville and Madison. That combination is exactly why it keeps drawing first-time buyers and families who want more house and land for the money.",
      "It's also home to Athens State University, the oldest higher-ed institution in Alabama, which keeps downtown lively with events like the Fiddlers Convention and the Athens Farmers Market. If you want space and a quieter pace without giving up the commute, this is usually the sweet spot in North Alabama.",
    ],
    market: {
      // Figures as of mid-2026. Redfin: ~$355K median sale (3 mo ending
      // May 2026), roughly balanced market, ~50 days on market.
      median: "~$355,000",
      asOf: "mid-2026",
      trend: "up slightly year-over-year",
      dom: "around 50 days on market",
      summary:
        "Athens sits in balanced territory right now — not the frenzy of a few years back, but well-priced homes still move. Buyers have a little room to think; sellers who price right and show well still do fine. It's more affordable than Madison and generally gives you more land for the price.",
    },
    schools: {
      note: "Athens is served by two systems: Athens City Schools (inside the city) and Limestone County Schools (surrounding areas). Which one a home falls in matters, and I'll check the exact zone for any address you're considering.",
      list: [
        "Athens City Schools — Athens High School, Athens Intermediate, and neighborhood elementaries",
        "Limestone County Schools — including East Limestone and West Limestone High Schools",
        "Athens State University — the oldest college in Alabama, right downtown",
      ],
    },
    dining: {
      note: "Downtown Athens has quietly built a real food and shopping scene around the square — family-owned restaurants, coffee shops, a brewery, and boutiques, most within a short walk.",
      list: [
        "The historic downtown square — locally-owned restaurants, cafes, a soda fountain, and boutiques",
        "Athens Farmers Market — seasonal, at Doug Gates Park / the Square",
        "1818 Farms (Mooresville) and Belle Chevre Creamery (Elkmont) nearby for a weekend outing",
        "Big-box shopping and chains along US-72 near I-65",
      ],
    },
    parks: {
      note: "For a town its size, Athens has a lot of green space, plus one of the region's best state parks just up the road.",
      list: [
        "Big Spring Park — the well-known park right in downtown, with a playground",
        "Swan Creek Park — fishing, dog park, sports fields, and trails",
        "Athens Greenway — paved trail system connecting parks and neighborhoods",
        "Joe Wheeler State Park (about 20 min) — lake, golf, hiking, and lodging on the Tennessee River",
      ],
    },
    seo: {
      title: "Athens, AL Homes for Sale & Real Estate | Colby Williams, Realtor",
      description:
        "Local guide to living in Athens, Alabama — home prices, market trends, schools, parks, and dining. Work with Athens AL Realtor Colby Williams to buy or sell in Limestone County.",
    },
  },

  madison: {
    slug: "madison",
    name: "Madison",
    county: "Madison & Limestone Counties",
    image: "/images/city-madison.jpg",
    tagline: "Top schools, fast market, family favorite",
    intro: [
      "Madison is one of the fastest-growing cities in Alabama, and it's the go-to for families who put schools at the top of the list. It sits right between Huntsville and the Research Park corridor, so the commute to the big aerospace and defense employers is short, and the whole city is built around new-ish neighborhoods, greenways, and family amenities.",
      "It's home to Toyota Field and the Rocket City Trash Pandas, a genuinely charming Main Street historic district, and some of the most sought-after schools in the state. All of that demand makes Madison the priciest and one of the fastest-moving markets of the four towns I cover — so buying here is competitive, and pricing to sell here is its own skill.",
    ],
    market: {
      // Madison city trends higher than the county. Zillow avg ~$376K;
      // list prices commonly $425K+. Fast-moving (Zillow pending ~23 days).
      median: "roughly the $375,000–$450,000 range",
      asOf: "mid-2026",
      trend: "holding steady, still the priciest of the four",
      dom: "well-priced homes move quickly",
      summary:
        "Madison is the top of the local market and the fastest mover. Strong schools and proximity to Research Park keep demand high, so buyers need to be ready to move on the right house and sellers benefit from sharp pricing and presentation. Expect to pay more here than in Athens or Decatur for a comparable home.",
    },
    schools: {
      note: "Madison City Schools is the big draw — consistently among the highest-rated districts in Alabama, which is a large part of why homes here hold their value. Some outlying addresses fall in Madison County or Limestone County systems, so I'll always confirm the exact zone before you fall in love with a house.",
      list: [
        "Madison City Schools — highly rated statewide",
        "Bob Jones High School and James Clemens High School — the two well-regarded city high schools",
        "A mix of newer elementary and middle schools serving the growing neighborhoods",
      ],
    },
    dining: {
      note: "Downtown Madison is a designated Main Street community — boutique shops, cafes, and locally-owned restaurants, with plenty of national dining and shopping a few minutes away toward Huntsville.",
      list: [
        "Historic Downtown Madison — boutiques, cafes, and events like 3rd Thursdays on Main",
        "Madison City Farmers Market — seasonal, with live music and local vendors",
        "Madison Station Antiques and downtown specialty shops",
        "Quick access to Bridge Street Town Centre and Huntsville dining nearby",
      ],
    },
    parks: {
      note: "Madison runs 500+ acres of parks, greenways, and trails, and you're minutes from some of the region's best-known outdoor spots.",
      list: [
        "Bradford Creek Greenway — paved trail popular with walkers and cyclists",
        "Rainbow Mountain Nature Preserve — trails, rock outcroppings, and city views",
        "Dublin Memorial Park and Palmer Park — sports fields, playgrounds, dog parks",
        "Toyota Field — home of the Rocket City Trash Pandas (Minor League Baseball)",
      ],
    },
    seo: {
      title: "Madison, AL Homes for Sale & Real Estate | Colby Williams, Realtor",
      description:
        "Local guide to living in Madison, Alabama — home prices, market trends, top-rated schools, parks, and dining. Buy or sell in Madison AL with Realtor Colby Williams.",
    },
  },

  huntsville: {
    slug: "huntsville",
    name: "Huntsville",
    county: "Madison County",
    image: "/images/city-huntsville.jpg",
    tagline: "Rocket City — jobs, growth, and everything to do",
    intro: [
      "Huntsville is the biggest city in Alabama now, and the engine behind the whole region's housing demand. Redstone Arsenal, NASA's Marshall Space Flight Center, U.S. Army and Space Command, and the tech companies at Cummings Research Park bring a steady stream of high-skill jobs — and a steady stream of people who need somewhere to live.",
      "For buyers, that means real range: tight, competitive entry-level neighborhoods, a busy move-up market with lots of new construction, and a luxury tier with more room to negotiate. It's a great landing spot for relocations and military moves, and there's genuinely a lot to do — the Space & Rocket Center, Monte Sano, Lowe Mill, Campus 805, and Bridge Street are all here.",
    ],
    market: {
      // Median single-family ~$315K (up ~5% YoY, April 2026). List
      // prices ~$355K. Slight seller's advantage; well-priced homes <30 days.
      median: "~$315,000–$350,000",
      asOf: "mid-2026",
      trend: "up modestly year-over-year, with a slight seller's edge",
      dom: "well-priced homes often sell in under 30 days",
      summary:
        "Huntsville is one of the most resilient markets in the Southeast thanks to its job base. Prices vary a lot by tier and neighborhood — entry-level under ~$275K stays tight and competitive, the move-up range has more balance and new builds, and higher-end homes give buyers the most negotiating room. A quick micro-market read on your specific zip code matters here more than the citywide average.",
    },
    schools: {
      note: "Most of Huntsville is served by Huntsville City Schools, with some areas in Madison County Schools. The district runs magnet and specialty programs alongside neighborhood schools, and there are strong private options too. I'll pin down the exact zone and program fit for any address.",
      list: [
        "Huntsville City Schools — including magnet and specialty programs",
        "Parts of the metro fall in Madison County Schools",
        "Well-regarded private schools around the city",
        "University of Alabama in Huntsville and Alabama A&M nearby",
      ],
    },
    dining: {
      note: "Huntsville has the region's deepest food, arts, and shopping scene — from converted-warehouse entertainment districts to chef-driven downtown restaurants.",
      list: [
        "Campus No. 805 — breweries, restaurants, and entertainment in a converted school",
        "Lowe Mill ARTS & Entertainment — the largest private arts facility in the South",
        "Cotton Row and downtown's chef-driven restaurant scene",
        "Bridge Street Town Centre — outdoor shopping, dining, and a cinema",
      ],
    },
    parks: {
      note: "Between mountain trails, the Tennessee River, and downtown parks, Huntsville makes it easy to get outside.",
      list: [
        "Monte Sano State Park — hiking, overlooks, and picnic areas above the city",
        "Big Spring Park — the green heart of downtown",
        "Huntsville Botanical Garden",
        "Ditto Landing — marina and recreation on the Tennessee River",
        "U.S. Space & Rocket Center — the state's most-visited attraction",
      ],
    },
    seo: {
      title: "Huntsville, AL Homes for Sale & Real Estate | Colby Williams, Realtor",
      description:
        "Local guide to living in Huntsville, Alabama — home prices, market trends, schools, parks, and dining. Buy, sell, or relocate to the Rocket City with Realtor Colby Williams.",
    },
  },

  decatur: {
    slug: "decatur",
    name: "Decatur",
    county: "Morgan County",
    image: "/images/city-decatur.jpg",
    tagline: "River City charm at the region's best prices",
    intro: [
      "Decatur sits right on the Tennessee River in Morgan County, and it's the most affordable of the four towns I cover — which makes it a favorite for first-time buyers and anyone who wants historic character without the North Alabama premium. The Old Decatur and Albany historic districts hold the largest concentration of Victorian-era homes in the state, the 'Painted Ladies.'",
      "It's a real city with its own identity: riverfront parks, the standout Cook Museum of Natural Science, a genuine barbecue landmark in Big Bob Gibson, and easy access up to Huntsville for work. If your budget is tighter or you love an older home with personality, Decatur is worth a serious look.",
    ],
    market: {
      // Most affordable. Zillow avg ~$216K (+2.4%); Movoto median sale
      // ~$263K (April 2026); pending ~27 days.
      median: "~$215,000–$265,000",
      asOf: "mid-2026",
      trend: "up modestly year-over-year",
      dom: "typically pending within about a month",
      summary:
        "Decatur is the value play in North Alabama — median prices run well below Madison and Huntsville, so your money stretches further, especially on historic and character homes. It's a steady, more affordable market that's a strong fit for first-time buyers and anyone commuting into Huntsville who wants a lower price point.",
    },
    schools: {
      note: "Decatur is served by Decatur City Schools, with surrounding areas in Morgan County Schools. Zones and program options vary across the city, so I'll confirm the details for any specific home.",
      list: [
        "Decatur City Schools — including Decatur High School and Austin High School",
        "Surrounding areas served by Morgan County Schools",
        "Alabama Center for the Arts — a downtown arts college",
      ],
    },
    dining: {
      note: "Decatur's downtown is full of Victorian architecture, antique shops, and cafes — and it's home to one of the most famous barbecue restaurants in the country.",
      list: [
        "Big Bob Gibson Bar-B-Q — a barbecue landmark since 1928, famous for its white sauce",
        "Downtown Bank Street and 2nd Avenue — antiques, boutiques, and fine dining",
        "Decatur Farmers Market — local produce and seasonal events",
        "Simp McGhee's and the downtown restaurant scene",
      ],
    },
    parks: {
      note: "River access and big regional parks are Decatur's outdoor calling card.",
      list: [
        "Point Mallard Park — water park, golf course, campground, and trails on the river",
        "Wilson Morgan Park — playground, sports facilities, and walking trails",
        "Tennessee Riverwalk and Rhodes Ferry Park — riverfront strolls and sunset views",
        "Wheeler National Wildlife Refuge — sandhill cranes and eagles in winter",
        "Cook Museum of Natural Science — a standout downtown family attraction",
      ],
    },
    seo: {
      title: "Decatur, AL Homes for Sale & Real Estate | Colby Williams, Realtor",
      description:
        "Local guide to living in Decatur, Alabama — affordable home prices, market trends, schools, riverfront parks, and dining. Buy or sell in Decatur AL with Realtor Colby Williams.",
    },
  },
};

export const CITY_SLUGS = Object.keys(CITIES);
