import { describe, expect, it } from "vitest";
import { calculateQuote, PRICING } from "./site";

describe("quote calculator", () => {
  it("updates when services change", () => {
    const a = calculateQuote({ services: ["laundry-linen"], rooms: 3, hours: 2, frequency: "once", addOns: [] });
    const b = calculateQuote({ services: ["laundry-linen", "meal-preparation"], rooms: 3, hours: 2, frequency: "once", addOns: [] });
    expect(b.total).toBeGreaterThan(a.total);
  });
  it("applies the minimum charge", () => {
    const q = calculateQuote({ services: ["errands-shopping"], rooms: 1, hours: 0.5, frequency: "once", addOns: [] });
    expect(q.total).toBe(PRICING.minimumCharge);
  });
  it("flags assessment-only services", () => {
    const q = calculateQuote({ services: ["family-respite"], rooms: 1, hours: 2, frequency: "once", addOns: [] });
    expect(q.needsAssessment).toBe(true);
    expect(q.priced).toBe(false);
  });
});
