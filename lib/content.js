// All site copy lives here — edit text without touching layout code.
export const contact = {
  name: "Colby Williams",
  brokerage: "Innovative Realty Solutions",
  phone: "(256) 710-2384",
  tel: "+12567102384",
  email: "colbywilliamsre@gmail.com",
  city: "Athens, Alabama",
  facebook: "https://www.facebook.com/colby.williams.16906",
  instagram: "https://www.instagram.com/colbywilliamsrealtor/",
};
export const nav = [
  { href: "#listings", label: "Listings" },
  { href: "#valuation", label: "Home Value" },
  { href: "/should-i-move", label: "Should I Move?" },
  { href: "#faq", label: "FAQ" },
];
export const towns = ["Athens", "Madison", "Huntsville", "Decatur", "Rogersville", "Elkmont", "Harvest"];
export const pillars = [
  {
    title: "I actually live here",
    body: "Athens is home. I know the neighborhoods, schools, commutes, and what a fair price looks like block to block.",
  },
  {
    title: "You get the real story",
    body: "No hype, no pressure. I’ll tell you when a house is right, and just as fast when it isn’t.",
  },
  {
    title: "With you start to finish",
    body: "From the first showing or listing photo to closing day, you’ll always know the next step.",
  },
];
export const moveTool = [
  { title: "What you’d walk away with", body: "After commission, closing costs, repairs, and your payoff." },
  {
    title: "What your next payment would really be",
    body: "With Athens, Huntsville, Madison, and Decatur property taxes built in.",
  },
  { title: "An honest verdict", body: "Yes, yes but tight, or not yet, with exactly what’s in the way." },
];
export const about = [
  "Real estate moves fast in North Alabama, and it’s easy to feel rushed into the biggest decision of your life. That’s not how I work. My job is to give you the full picture, the good and the bad, so you can make a confident call, whether you’re buying your first home in Athens or selling to move up in Madison.",
  "I grew up around here and I know these towns, from the neighborhoods and school zones in Athens and Madison to the commute into Huntsville and the quieter pockets of Limestone County. That means real answers about where your money goes furthest and what a home is actually worth, not a national guess.",
  "Whether you’re a first-time buyer trying to make sense of the process, a family relocating for work, or a homeowner weighing whether now is the right time to sell, reach out anytime. I’ll give you an honest read on your situation, and there’s never any pressure to move faster than you’re ready to.",
];
// Fallback listing, shown only if Airtable is unavailable (live listings come from Airtable).
export const defaultListings = [
  {
    address: "213 Rosecliff Drive",
    city: "Harvest, AL 35749",
    price: "$335,000",
    specs: "4 BD · 2.5 BA · 2,442 SQFT",
    beds: 4,
    baths: 2.5,
    sqft: 2442,
    blurb:
      "A classic two-story colonial on a quiet, tree-lined lot in Harvest, just minutes from Madison and the Research Park corridor. Easy layout, lots of natural light, and room to grow. Want to walk through it?",
    status: "For sale",
    images: ["/images/listing-rosecliff.jpg"],
  },
];

export const valuationPoints = [
  "Based on recent local sales, not a national algorithm",
  "No pushy follow-up, just the info you asked for",
  "Handled personally by me, not a call center",
];
export const steps = [
  {
    title: "We talk",
    body: "A quick, no-pressure conversation about what you want, your timeline, and your budget.",
  },
  {
    title: "We make a plan",
    body: "I lay out exactly what happens next, whether you’re listing your home or starting your search.",
  },
  {
    title: "We get to closing",
    body: "I handle the moving parts and keep you updated, so it feels a lot lighter than you’d expect.",
  },
];
// Fallback reviews, shown only if Airtable is unavailable (live reviews come from Airtable).
export const defaultReviews = [
  {
    name: "Jenn Kler",
    meta: "Google review",
    text: "Colby handles business with professionalism, honesty, and genuine care. Communication is excellent, and it is clear that customer satisfaction is a top priority. He is a refreshing professional that is dependable, knowledgeable, and truly takes pride in what he does. I highly recommend Colby for anyone looking to buy or sell a home! Five stars!",
  },
  {
    name: "Rett Krome",
    meta: "Google review",
    text: "Colby is very friendly and detail oriented. He really helped me to understand the home-buying process.",
  },
  { name: "Jim Sieja", meta: "Google review", text: "Colby is an extremely professional and experienced realtor. Very pleased!" },
];

export const faqs = [
  {
    q: "Does it cost me anything to work with you as a buyer?",
    a: "We’ll go over exactly how buyer representation and commissions work in your situation up front, in plain English, before you commit to anything. No surprises.",
  },
  {
    q: "How is your home value different from Zillow’s estimate?",
    a: "Zillow uses a national algorithm that can’t see inside your home or your street. I base your number on recent, comparable sales right here in North Alabama and what buyers are actually paying now.",
  },
  {
    q: "Do you help with relocations and military moves?",
    a: "Yes. A lot of my work is helping families relocating to the Huntsville area, including military moves. I can help remotely before you ever get to town.",
  },
  {
    q: "How soon can we get started?",
    a: "As soon as you’re ready. Send a message or grab your home value above, and I’ll follow up personally to figure out the right next step.",
  },
  {
    q: "Can you help first-time homebuyers?",
    a: "Absolutely! I enjoy helping first-time buyers understand the process from start to finish. I’ll explain every step, answer your questions, and make sure you feel confident throughout the journey.",
  },
];
