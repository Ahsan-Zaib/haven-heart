import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, ServiceIcon, WhatsAppButton } from "@/components/site/Layout";
import { fmt, getService, WA } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s ? `${s.name} — Haven & Heart` : "Service not found — Haven & Heart";
    return {
      meta: [
        { title },
        { name: "description", content: s?.short ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: s?.short ?? "" },
        ...(s ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  return (
    <>
      <section className="bg-warm">
        <div className="container-x py-16 md:py-24">
          <Link to="/services" className="text-sm text-muted-foreground hover:text-primary">← All services</Link>
          <span className="mt-6 grid size-14 place-items-center rounded-full bg-primary text-gold"><ServiceIcon name={s.icon} className="size-6" /></span>
          <p className="eyebrow mt-6">{s.category === "home" ? "Home Services" : "Senior Support"}</p>
          <h1 className="mt-2 text-5xl text-primary md:text-6xl">{s.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{s.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl"><Link to="/book" search={{ service: s.slug }}>Book This Service</Link></Button>
            <Button asChild variant="soft" size="xl"><Link to="/quote" search={{ service: s.slug }}>Get a Quote</Link></Button>
            <WhatsAppButton size="xl" message={WA.service(s.name)}>Ask on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </section>
      <section className="container-x grid gap-6 py-16 md:grid-cols-3">
        <div className="rounded-2xl bg-card p-7 shadow-soft">
          <h2 className="font-sans text-lg font-semibold text-primary">What's included</h2>
          <ul className="mt-4 space-y-2 text-sm">{s.includes.map((i) => <li key={i} className="flex gap-2"><Check className="size-4 shrink-0 text-gold" />{i}</li>)}</ul>
        </div>
        <div className="rounded-2xl bg-card p-7 shadow-soft">
          <h2 className="font-sans text-lg font-semibold text-primary">Who it may suit</h2>
          <ul className="mt-4 space-y-2 text-sm">{s.suits.map((i) => <li key={i} className="flex gap-2"><Check className="size-4 shrink-0 text-gold" />{i}</li>)}</ul>
        </div>
        <div className="rounded-2xl bg-card p-7 shadow-soft">
          <h2 className="font-sans text-lg font-semibold text-primary">How booking works</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
            <li>Get an estimate or request a personalised quote.</li>
            <li>Choose a preferred date and time.</li>
            <li>Our team confirms your appointment.</li>
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            {s.pricing === "assessment" ? "This service needs a short conversation for a personalised quote." : `Sample rate: from ${fmt(s.rate)} ${s.pricing === "rooms" ? "per room" : "per hour"} (to be confirmed).`}
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
