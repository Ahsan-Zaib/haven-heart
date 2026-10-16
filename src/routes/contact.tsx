import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, WhatsAppButton } from "@/components/site/Layout";
import { Field, inputCls } from "@/components/site/ServicePicker";
import { SERVICES, SITE, telHref } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Haven & Heart" },
      { name: "description", content: "Get in touch with Haven & Heart by form, phone, email or WhatsApp." },
      { property: "og:title", content: "Contact Haven & Heart" },
      { property: "og:description", content: "We're here to help — ask a question or request a personalised quote." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [f, setF] = useState({ name: "", email: "", phone: "", service: "", method: "Email", message: "", website: "" });
  const [error, setError] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (f.website) return; // honeypot
    if (f.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setError("Please enter a valid email address.");
    if (f.message.trim().length < 5) return setError("Please add a short message.");
    const body = `Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nService: ${f.service || "-"}\nPreferred contact: ${f.method}\n\n${f.message}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(body)}`;
  };
  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you." />
      <section className="container-x grid gap-8 py-14 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="grid gap-5 rounded-[1.75rem] bg-card p-6 shadow-soft md:grid-cols-2 md:p-10" noValidate>
          <Field label="Name"><input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inputCls} maxLength={100} /></Field>
          <Field label="Email"><input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={inputCls} maxLength={255} /></Field>
          <Field label="Telephone"><input type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className={inputCls} maxLength={30} /></Field>
          <Field label="Service of interest">
            <select value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })} className={inputCls}>
              <option value="">Not sure yet</option>
              {SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}
            </select>
          </Field>
          <div className="md:col-span-2"><Field label="Preferred contact method">
            <div className="flex gap-4 text-sm">{["Email", "Phone", "WhatsApp"].map((m) => (
              <label key={m} className="flex items-center gap-2"><input type="radio" className="accent-primary" checked={f.method === m} onChange={() => setF({ ...f, method: m })} />{m}</label>
            ))}</div>
          </Field></div>
          <div className="md:col-span-2"><Field label="Message"><textarea rows={5} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className={inputCls} maxLength={2000} /></Field></div>
          <input tabIndex={-1} autoComplete="off" className="hidden" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} aria-hidden />
          {error && <p className="text-sm font-medium text-destructive md:col-span-2">{error}</p>}
          <div className="md:col-span-2"><Button variant="hero" size="xl" type="submit">Send Message</Button></div>
        </form>
        <aside className="space-y-4">
          <div className="space-y-4 rounded-[1.75rem] bg-primary p-7 text-primary-foreground">
            {telHref() ? (
              <a href={telHref()!} className="flex gap-3 hover:text-gold"><Phone className="size-5 text-gold" />{SITE.phone}</a>
            ) : (
              <p className="flex gap-3"><Phone className="size-5 text-gold" />{SITE.phone}</p>
            )}
            <p className="flex gap-3"><Mail className="size-5 text-gold" />{SITE.email}</p>
            <div className="flex gap-3"><Clock className="size-5 text-gold" /><div className="text-sm">{SITE.hours.map((h) => <p key={h.days}>{h.days}: {h.time}</p>)}</div></div>
            <WhatsAppButton variant="heroOutline" className="w-full">Chat on WhatsApp</WhatsAppButton>
          </div>
          <div className="rounded-[1.75rem] bg-card p-7 shadow-soft">
            <p className="flex items-center gap-2 font-semibold text-primary"><MapPin className="size-5 text-gold" />Service areas</p>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.serviceAreas.length ? SITE.serviceAreas.join(", ") : "Our service areas and map will be published shortly. Get in touch to check whether we cover your location."}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
