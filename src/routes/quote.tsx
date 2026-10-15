import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, WhatsAppButton } from "@/components/site/Layout";
import { Field, ServicePicker, inputCls } from "@/components/site/ServicePicker";
import { calculateQuote, fmt, getService, PRICING, WA, type Category, type Frequency } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quote")({
  validateSearch: (s: Record<string, unknown>) => ({ service: typeof s.service === "string" ? s.service : undefined }),
  head: () => ({
    meta: [
      { title: "Pricing & Instant Quote — Haven & Heart" },
      { name: "description", content: "Build an instant estimate for home services and senior support, then continue to booking." },
      { property: "og:title", content: "Get an Instant Estimate — Haven & Heart" },
      { property: "og:description", content: "Select services, hours and frequency to see an indicative price." },
    ],
  }),
  component: QuotePage,
});

const FREQS: { id: Frequency; label: string }[] = [
  { id: "once", label: "One-time" },
  { id: "weekly", label: "Weekly" },
  { id: "fortnightly", label: "Fortnightly" },
  { id: "monthly", label: "Monthly" },
  { id: "custom", label: "Custom" },
];

function QuotePage() {
  const { service } = Route.useSearch();
  const [category, setCategory] = useState<Category | "all">("all");
  const [services, setServices] = useState<string[]>(service && getService(service) ? [service] : []);
  const [rooms, setRooms] = useState(3);
  const [hours, setHours] = useState(2);
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [postcode, setPostcode] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const q = useMemo(() => calculateQuote({ services, rooms, hours, frequency, addOns }), [services, rooms, hours, frequency, addOns]);
  const usesRooms = services.some((s) => getService(s)?.pricing === "rooms");
  const usesHours = services.some((s) => getService(s)?.pricing === "hourly");
  const summary = services.map((s) => getService(s)?.name).join(", ") || "general enquiry";
  const waMsg = WA.quote(`${summary}; ${FREQS.find((f) => f.id === frequency)?.label}; ${postcode || "location TBC"}${date ? `; preferred ${date}` : ""}${notes ? `; notes: ${notes}` : ""}`);

  return (
    <>
      <PageHero eyebrow="Pricing" title="Your instant estimate.">
        Choose what you need and see an indicative price update as you go.
      </PageHero>
      <section className="container-x grid gap-8 py-14 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8 rounded-[1.75rem] bg-card p-6 shadow-soft md:p-10">
          <div className="flex flex-wrap gap-2">
            {(["all", "home", "senior"] as const).map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={cn("rounded-full px-4 py-2 text-sm font-medium", category === c ? "bg-primary text-primary-foreground" : "bg-muted")}>
                {c === "all" ? "All services" : c === "home" ? "Home services" : "Senior support"}
              </button>
            ))}
          </div>
          <Field label="1. Select one or more services"><ServicePicker value={services} onChange={setServices} category={category} /></Field>
          <div className="grid gap-6 md:grid-cols-2">
            {usesRooms && (
              <Field label={`Number of rooms: ${rooms}`}>
                <input type="range" min={1} max={10} value={rooms} onChange={(e) => setRooms(+e.target.value)} className="w-full accent-primary" />
              </Field>
            )}
            {usesHours && (
              <Field label={`Hours per visit: ${hours}`}>
                <input type="range" min={1} max={8} step={0.5} value={hours} onChange={(e) => setHours(+e.target.value)} className="w-full accent-primary" />
              </Field>
            )}
          </div>
          <Field label="How often?">
            <div className="flex flex-wrap gap-2">
              {FREQS.map((f) => (
                <button key={f.id} onClick={() => setFrequency(f.id)} className={cn("rounded-full border px-4 py-2 text-sm", frequency === f.id ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
                  {f.label}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Optional add-ons">
            <div className="grid gap-2 sm:grid-cols-2">
              {PRICING.addOns.map((a) => (
                <label key={a.id} className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm">
                  <input type="checkbox" className="accent-primary" checked={addOns.includes(a.id)} onChange={() => setAddOns(addOns.includes(a.id) ? addOns.filter((x) => x !== a.id) : [...addOns, a.id])} />
                  <span className="flex-1">{a.label}</span><span className="text-muted-foreground">+{fmt(a.price)}</span>
                </label>
              ))}
            </div>
          </Field>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Preferred date & time"><input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} /></Field>
            <Field label="Postcode or area"><input value={postcode} onChange={(e) => setPostcode(e.target.value)} className={inputCls} placeholder="e.g. SW1A" /></Field>
          </div>
          <Field label="Additional requirements"><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={inputCls} /></Field>
        </div>

        <aside className="h-fit rounded-[1.75rem] bg-primary p-7 text-primary-foreground shadow-lift lg:sticky lg:top-24">
          <p className="eyebrow">Your estimate</p>
          {services.length === 0 ? (
            <p className="mt-4 text-primary-foreground/75">Select a service to see your estimate.</p>
          ) : (
            <>
              <ul className="mt-5 space-y-3 text-sm">
                {q.lines.map((l) => (
                  <li key={l.label} className="flex justify-between gap-3">
                    <span>{l.label}<span className="block text-xs text-primary-foreground/60">{l.detail}</span></span>
                    <span className="shrink-0">{l.amount === null ? "Quote" : fmt(l.amount)}</span>
                  </li>
                ))}
                {q.priced && <li className="flex justify-between text-primary-foreground/80"><span>Travel fee</span><span>{fmt(q.travel)}</span></li>}
                {q.discount > 0 && <li className="flex justify-between text-gold"><span>Recurring discount ({q.discountRate * 100}%)</span><span>−{fmt(q.discount)}</span></li>}
              </ul>
              <div className="mt-5 border-t border-primary-foreground/20 pt-5">
                <div className="flex items-end justify-between">
                  <span className="text-sm">Estimated total{frequency !== "once" && " per visit"}</span>
                  <span className="font-display text-4xl">{q.priced ? fmt(q.total) : "—"}</span>
                </div>
                {q.priced && <p className="mt-1 text-xs text-primary-foreground/60">≈ {q.hoursTotal} hours{q.minimumApplied && ` · minimum charge of ${fmt(PRICING.minimumCharge)} applied`}</p>}
              </div>
              {q.needsAssessment && (
                <p className="mt-4 flex gap-2 rounded-xl bg-primary-foreground/10 p-3 text-xs"><Info className="size-4 shrink-0 text-gold" />Some services need a personalised quote after a short conversation.</p>
              )}
            </>
          )}
          <p className="mt-4 text-xs text-primary-foreground/60">
            Indicative estimate only — not a confirmed price.{PRICING.isSample && " Sample prices shown until Haven & Heart publishes its rates."}
          </p>
          <div className="mt-6 grid gap-2">
            <Button asChild variant="gold" size="xl" disabled={!services.length}>
              <Link to="/book" search={{ service: services.join(",") || undefined }}>Continue to Booking</Link>
            </Button>
            <WhatsAppButton variant="heroOutline" size="xl" message={waMsg}>Get My Quote</WhatsAppButton>
            <Button asChild variant="heroOutline" size="xl"><Link to="/contact">Request a Personalized Quote</Link></Button>
          </div>
        </aside>
      </section>
    </>
  );
}
