import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, WhatsAppButton } from "@/components/site/Layout";
import { Field, ServicePicker, inputCls } from "@/components/site/ServicePicker";
import { calculateQuote, fmt, getService, SITE, WA, type Frequency } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): { service?: string } => (typeof s["service"] === "string" ? { service: s["service"] } : {}),
  head: () => ({
    meta: [
      { title: "Book a Service — Haven & Heart" },
      { name: "description", content: "Request a home service or senior support visit in a few simple steps." },
      { property: "og:title", content: "Book a Service — Haven & Heart" },
      { property: "og:description", content: "Choose services, pick a preferred time and send your booking request." },
    ],
  }),
  component: BookPage,
});

const STEPS = ["Services", "Schedule", "Your details", "Review"];

function BookPage() {
  const { service } = Route.useSearch();
  const initial = (service ?? "").split(",").filter((s) => getService(s));
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<string[]>(initial);
  const [requirements, setRequirements] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Morning");
  const [d, setD] = useState({ name: "", email: "", phone: "", address: "", access: "", family: "" });
  const [error, setError] = useState("");
  const [ref, setRef] = useState<string | null>(null);
  const q = useMemo(() => calculateQuote({ services, rooms: 3, hours: 2, frequency, addOns: [] }), [services, frequency]);

  const next = () => {
    setError("");
    if (step === 0 && !services.length) return setError("Please choose at least one service.");
    if (step === 1 && !date) return setError("Please choose a preferred date.");
    if (step === 2) {
      if (d.name.trim().length < 2) return setError("Please enter your name.");
      if (!/^\S+@\S+\.\S+$/.test(d.email)) return setError("Please enter a valid email address.");
      if (d.phone.replace(/\D/g, "").length < 7) return setError("Please enter a valid telephone number.");
      if (d.address.trim().length < 5) return setError("Please enter the service address.");
    }
    setStep(step + 1);
  };

  const names = services.map((s) => getService(s)?.name).join(", ");
  const body = `Booking request\nServices: ${names}\nRequirements: ${requirements || "-"}\nFrequency: ${frequency}\nPreferred: ${date} (${time})\nName: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nAddress: ${d.address}\nAccess notes: ${d.access || "-"}\nFamily contact (with permission): ${d.family || "-"}\nEstimate: ${q.priced ? fmt(q.total) : "personalised quote"}`;

  const submit = () => {
    setRef(`HH-${Date.now().toString(36).toUpperCase().slice(-6)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (ref) {
    return (
      <section className="container-x py-24">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-card p-10 text-center shadow-lift">
          <CheckCircle2 className="mx-auto size-12 text-gold" />
          <h1 className="mt-4 text-4xl text-primary">One last step — send your request</h1>
          <p className="mt-3 text-muted-foreground">Your reference is <strong className="text-primary">{ref}</strong>. Send your details to our team by email or WhatsApp and we'll confirm your appointment time.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Booking request ${ref}`)}&body=${encodeURIComponent(`Reference: ${ref}\n${body}`)}`}><Mail className="size-4" /> Send by email</a>
            </Button>
            <WhatsAppButton size="xl" message={`${WA.booking(ref)}\n${body}`}>Send on WhatsApp</WhatsAppButton>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">This is a booking request, not a confirmed appointment. Times are confirmed by our team.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Book a service" title="Request your visit.">
        Four short steps. Our team will confirm the time with you.
      </PageHero>
      <section className="container-x py-14">
        <ol className="mb-8 grid grid-cols-4 gap-2">
          {STEPS.map((s, i) => (
            <li key={s} className={cn("rounded-full px-3 py-2 text-center text-xs font-semibold md:text-sm", i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              {i + 1}. {s}
            </li>
          ))}
        </ol>
        <div className="mx-auto max-w-3xl space-y-6 rounded-[1.75rem] bg-card p-6 shadow-soft md:p-10">
          {step === 0 && (
            <>
              <Field label="Choose one or more services"><ServicePicker value={services} onChange={setServices} /></Field>
              <Field label="Tell us about your requirements"><textarea rows={4} value={requirements} onChange={(e) => setRequirements(e.target.value)} className={inputCls} /></Field>
            </>
          )}
          {step === 1 && (
            <>
              <Field label="One-time or recurring">
                <select value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)} className={inputCls}>
                  <option value="once">One-time</option><option value="weekly">Weekly</option><option value="fortnightly">Fortnightly</option><option value="monthly">Monthly</option><option value="custom">Custom</option>
                </select>
              </Field>
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Preferred date"><input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} className={inputCls} /></Field>
                <Field label="Preferred time">
                  <select value={time} onChange={(e) => setTime(e.target.value)} className={inputCls}><option>Morning</option><option>Afternoon</option><option>Evening</option></select>
                </Field>
              </div>
              <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">Live availability isn't switched on yet — this is a preferred time, and our team will confirm it with you.</p>
            </>
          )}
          {step === 2 && (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name"><input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} className={inputCls} /></Field>
              <Field label="Email"><input type="email" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} className={inputCls} /></Field>
              <Field label="Telephone"><input type="tel" value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} className={inputCls} /></Field>
              <Field label="Service address"><input value={d.address} onChange={(e) => setD({ ...d, address: e.target.value })} className={inputCls} /></Field>
              <div className="md:col-span-2"><Field label="Access instructions & preferences"><textarea rows={3} value={d.access} onChange={(e) => setD({ ...d, access: e.target.value })} className={inputCls} /></Field></div>
              <div className="md:col-span-2"><Field label="Family contact (optional, with their permission)"><input value={d.family} onChange={(e) => setD({ ...d, family: e.target.value })} className={inputCls} /></Field></div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-3 text-sm">
              <h2 className="text-3xl text-primary">Review your request</h2>
              {[["Services", names], ["Requirements", requirements || "—"], ["Frequency", frequency], ["Preferred", `${date} · ${time}`], ["Name", d.name], ["Contact", `${d.email} · ${d.phone}`], ["Address", d.address], ["Estimate", q.priced ? `${fmt(q.total)} (indicative${q.needsAssessment ? ", plus personalised quote items" : ""})` : "Personalised quote"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-border py-2"><span className="text-muted-foreground">{k}</span><span className="text-right font-medium">{v}</span></div>
              ))}
            </div>
          )}
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          <div className="flex justify-between">
            {step > 0 ? <Button variant="soft" size="lg" onClick={() => setStep(step - 1)}>Back</Button> : <Button asChild variant="soft" size="lg"><Link to="/quote">See pricing</Link></Button>}
            {step < 3 ? <Button variant="hero" size="lg" onClick={next}>Continue</Button> : <Button variant="gold" size="lg" onClick={submit}>Submit Booking Request</Button>}
          </div>
        </div>
      </section>
    </>
  );
}
