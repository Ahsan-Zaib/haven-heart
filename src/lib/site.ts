/**
 * Business settings for Haven & Heart.
 * OWNER: replace every value marked PLACEHOLDER before launch.
 */
export const SITE = {
  name: "Haven & Heart",
  tagline: "Care That Feels Like Home.",
  supporting: "Reliable Home Services. Compassionate Senior Support.",
  // DEMO numbers for testing the call and WhatsApp buttons — replace with the real numbers before launch.
  whatsappNumber: "447700900123",
  phone: "+44 20 7946 0958", // DEMO
  email: "hello@havenandheart.example", // PLACEHOLDER
  hours: [
    { days: "Monday – Friday", time: "To be confirmed" }, // PLACEHOLDER
    { days: "Saturday", time: "To be confirmed" },
    { days: "Sunday", time: "To be confirmed" },
  ],
  serviceAreas: [] as string[], // PLACEHOLDER — e.g. ["SW1", "SW3"] postcode prefixes
};

export function telHref(): string | null {
  const digits = SITE.phone.replace(/[^\d+]/g, "");
  return digits.replace(/\D/g, "").length >= 7 ? `tel:${digits}` : null;
}

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return SITE.whatsappNumber
    ? `https://wa.me/${SITE.whatsappNumber}?text=${text}`
    : null;
}

export const WA = {
  general: "Hello Haven & Heart, I'd like to ask about your services.",
  service: (s: string) => `Hello Haven & Heart, I'd like to ask about your ${s} service.`,
  quote: (summary: string) => `Hello Haven & Heart, I'd like a quote for: ${summary}`,
  recurring: "Hello Haven & Heart, I'm interested in recurring support. Could you tell me more?",
  booking: (ref: string) => `Hello Haven & Heart, I'm checking on my booking request ${ref}.`,
};

export type Category = "home" | "senior";
export type PricingMode = "hourly" | "rooms" | "assessment";

export interface Service {
  slug: string;
  name: string;
  category: Category;
  icon: string; // lucide icon name
  short: string;
  description: string;
  includes: string[];
  suits: string[];
  pricing: PricingMode;
  /** SAMPLE pricing — owner must configure. hourly rate or per-room rate. */
  rate: number;
  defaultHours: number;
}

export const SERVICES: Service[] = [
  {
    slug: "house-cleaning",
    name: "General House Cleaning",
    category: "home",
    icon: "Sparkles",
    short: "Regular, thorough cleaning that keeps your home fresh and welcoming.",
    description:
      "A dependable clean of your living spaces, kitchen and bathrooms, carried out with care for your belongings and your preferences.",
    includes: ["Dusting and surface wiping", "Vacuuming and mopping", "Kitchen and bathroom clean", "Tidying living areas", "Emptying bins"],
    suits: ["Busy households", "Older adults living independently", "Weekly or fortnightly upkeep"],
    pricing: "rooms",
    rate: 20,
    defaultHours: 2,
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    category: "home",
    icon: "SprayCan",
    short: "A top-to-bottom refresh for kitchens, bathrooms and hard-to-reach areas.",
    description:
      "A detailed clean for when your home needs extra attention — seasonal refreshes, moving in or out, or after a long period without help.",
    includes: ["Inside appliances on request", "Limescale and grout attention", "Skirting boards and door frames", "Behind and under furniture", "Kitchen and bathroom detail"],
    suits: ["Seasonal refresh", "Moving in or out", "Preparing for visitors"],
    pricing: "rooms",
    rate: 35,
    defaultHours: 4,
  },
  {
    slug: "laundry-linen",
    name: "Laundry, Ironing & Linen",
    category: "home",
    icon: "Shirt",
    short: "Washing, ironing, bed changing and fresh linen, done the way you like.",
    description: "Practical help keeping clothes and bedding fresh, folded and put away according to your household routine.",
    includes: ["Washing and drying", "Ironing and folding", "Bed changing", "Linen replacement", "Putting items away"],
    suits: ["Anyone who finds laundry tiring", "Recurring weekly help"],
    pricing: "hourly",
    rate: 22,
    defaultHours: 2,
  },
  {
    slug: "errands-shopping",
    name: "Grocery Shopping & Errands",
    category: "home",
    icon: "ShoppingBasket",
    short: "Groceries, prescriptions collection and everyday essentials, handled for you.",
    description: "We collect groceries and essentials from your list, or accompany you so you can shop at your own pace.",
    includes: ["Shopping from your list", "Accompanied shopping", "Post and parcel errands", "Unpacking and putting away"],
    suits: ["Those with limited mobility", "Families living at a distance"],
    pricing: "hourly",
    rate: 22,
    defaultHours: 1.5,
  },
  {
    slug: "meal-preparation",
    name: "Meal Preparation",
    category: "home",
    icon: "ChefHat",
    short: "Simple, nourishing home-cooked meals prepared to your tastes.",
    description: "Preparing everyday meals and snacks in your kitchen, following your preferences and any dietary needs you share with us.",
    includes: ["Preparing meals and snacks", "Batch cooking for the week", "Kitchen tidy afterwards", "Hydration reminders"],
    suits: ["Older adults", "Recovering from a busy period", "Families wanting reassurance"],
    pricing: "hourly",
    rate: 24,
    defaultHours: 2,
  },
  {
    slug: "home-organising-garden",
    name: "Organising, Garden & Seasonal Help",
    category: "home",
    icon: "Flower2",
    short: "Decluttering cupboards, light garden upkeep and seasonal home preparation.",
    description: "Help organising living spaces, light garden maintenance, and getting the home ready for the changing seasons.",
    includes: ["Cupboard and wardrobe organising", "Light garden tidying", "Seasonal preparation", "Basic home safety walk-through"],
    suits: ["Downsizing", "Seasonal changes", "Keeping the home safe and tidy"],
    pricing: "assessment",
    rate: 0,
    defaultHours: 3,
  },
  {
    slug: "companionship",
    name: "Friendly Companionship",
    category: "senior",
    icon: "HeartHandshake",
    short: "Warm conversation, shared hobbies and good company, at home or out and about.",
    description:
      "Regular visits from a friendly companion for conversation, hobbies, walks and social activities — supporting wellbeing and connection.",
    includes: ["Conversation and social engagement", "Hobbies, games and reading", "Walks and outings", "Regular check-in visits"],
    suits: ["Older adults living alone", "Families wanting regular contact", "Anyone who enjoys company"],
    pricing: "hourly",
    rate: 25,
    defaultHours: 2,
  },
  {
    slug: "appointment-accompaniment",
    name: "Appointment Accompaniment",
    category: "senior",
    icon: "CalendarCheck",
    short: "A reassuring companion to and from appointments and errands.",
    description:
      "Accompaniment to appointments, social events and errands. Transport is offered only where available and appropriately insured.",
    includes: ["Accompaniment to appointments", "Help with errands", "Waiting and returning home together", "Notes shared with family when authorised"],
    suits: ["Medical or dental appointments", "Social occasions", "Family peace of mind"],
    pricing: "hourly",
    rate: 25,
    defaultHours: 2,
  },
  {
    slug: "daily-routines",
    name: "Everyday Routines & Independence",
    category: "senior",
    icon: "Sun",
    short: "Gentle help with daily routines so independence at home can continue.",
    description:
      "Personalised non-medical support with everyday routines — light housekeeping, meals, reminders and keeping the home running smoothly.",
    includes: ["Help with household routines", "Light housekeeping", "Meal and hydration reminders", "Personalised support plan"],
    suits: ["Maintaining independence", "After a hospital stay (non-medical support)", "Ongoing weekly visits"],
    pricing: "hourly",
    rate: 25,
    defaultHours: 3,
  },
  {
    slug: "family-respite",
    name: "Family Respite & Check-in Visits",
    category: "senior",
    icon: "Users",
    short: "Scheduled companionship that gives family carers time to rest.",
    description:
      "Scheduled companionship visits and regular check-ins so family members can take a break, knowing their loved one is in good company.",
    includes: ["Scheduled companionship", "Regular check-in visits", "Visit updates for authorised family", "Flexible recurring schedules"],
    suits: ["Family carers needing a break", "Relatives living far away"],
    pricing: "assessment",
    rate: 0,
    defaultHours: 4,
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/**
 * SAMPLE PRICING SETTINGS — not real prices. The owner must configure these before launch.
 */
export const PRICING = {
  currency: "GBP",
  isSample: true,
  minimumCharge: 40,
  travelFee: 8,
  roomHours: 0.5, // estimated hours per room for room-based services
  addOns: [
    { id: "oven", label: "Inside oven clean", price: 25 },
    { id: "fridge", label: "Inside fridge clean", price: 15 },
    { id: "windows", label: "Interior windows", price: 20 },
    { id: "supplies", label: "We bring cleaning supplies", price: 6 },
  ],
  recurringDiscount: { weekly: 0.1, fortnightly: 0.05, monthly: 0, custom: 0 } as Record<string, number>,
  cancellationPolicy: "Cancellation policy to be confirmed by Haven & Heart before launch.",
};

export type Frequency = "once" | "weekly" | "fortnightly" | "monthly" | "custom";

export interface QuoteInput {
  services: string[];
  rooms: number;
  hours: number;
  frequency: Frequency;
  addOns: string[];
}

export interface QuoteLine {
  label: string;
  amount: number | null;
  detail?: string;
}

export function calculateQuote(input: QuoteInput) {
  const lines: QuoteLine[] = [];
  let subtotal = 0;
  let hoursTotal = 0;
  let needsAssessment = false;
  for (const slug of input.services) {
    const s = getService(slug);
    if (!s) continue;
    if (s.pricing === "assessment") {
      needsAssessment = true;
      lines.push({ label: s.name, amount: null, detail: "Personalised quote needed" });
    } else if (s.pricing === "rooms") {
      const amt = s.rate * input.rooms;
      hoursTotal += input.rooms * PRICING.roomHours;
      subtotal += amt;
      lines.push({ label: s.name, amount: amt, detail: `${input.rooms} rooms × ${fmt(s.rate)}` });
    } else {
      const amt = s.rate * input.hours;
      hoursTotal += input.hours;
      subtotal += amt;
      lines.push({ label: s.name, amount: amt, detail: `${input.hours} hrs × ${fmt(s.rate)}` });
    }
  }
  const addOnLines = PRICING.addOns.filter((a) => input.addOns.includes(a.id));
  for (const a of addOnLines) {
    subtotal += a.price;
    lines.push({ label: a.label, amount: a.price, detail: "Add-on" });
  }
  const priced = subtotal > 0;
  const travel = priced ? PRICING.travelFee : 0;
  const discountRate = PRICING.recurringDiscount[input.frequency] ?? 0;
  const discount = Math.round(subtotal * discountRate * 100) / 100;
  let total = subtotal - discount + travel;
  const minimumApplied = priced && total < PRICING.minimumCharge;
  if (minimumApplied) total = PRICING.minimumCharge;
  return { lines, subtotal, travel, discount, discountRate, total, hoursTotal, needsAssessment, minimumApplied, priced };
}

export function fmt(n: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: PRICING.currency }).format(n);
}
