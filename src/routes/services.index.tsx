import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero, ServiceIcon, WhatsAppButton } from "@/components/site/Layout";
import { SERVICES, WA } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Haven & Heart" },
      { name: "description", content: "Home services and non-medical senior support: cleaning, laundry, meals, errands, companionship and more." },
      { property: "og:title", content: "Our Services — Haven & Heart" },
      { property: "og:description", content: "Everyday home help and compassionate senior support, tailored to you." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Help at home, shaped around you.">
        Choose one service or combine several in a single booking.
      </PageHero>
      {(["home", "senior"] as const).map((cat) => (
        <section key={cat} className="container-x py-16">
          <h2 className="text-4xl text-primary">{cat === "home" ? "Home Services" : "Senior Support Services"}</h2>
          {cat === "senior" && (
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
              All senior support is non-medical companionship and household help. We do not provide personal care, nursing, or medication administration.
            </p>
          )}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((s) => s.category === cat).map((s) => (
              <article key={s.slug} className="card-lift flex flex-col rounded-2xl bg-card p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-full bg-secondary text-primary"><ServiceIcon name={s.icon} className="size-5" /></span>
                <h3 className="mt-5 font-sans text-xl font-semibold text-primary">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button asChild variant="soft" size="sm"><Link to="/services/$slug" params={{ slug: s.slug }}>Learn More</Link></Button>
                  <Button asChild variant="hero" size="sm"><Link to="/book" search={{ service: s.slug }}>Book This Service</Link></Button>
                  <WhatsAppButton size="sm" variant="soft" message={WA.service(s.name)}>Ask</WhatsAppButton>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
