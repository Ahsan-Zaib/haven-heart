import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, HandHeart, MessageSquare, CalendarClock, Receipt, Smile, Home, Sparkles, ShieldCheck, Clock, Users, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, ServiceIcon, WhatsAppButton } from "@/components/site/Layout";
import { SERVICES } from "@/lib/site";
import hero from "@/assets/hero.jpg";
import homeImg from "@/assets/home-services.jpg";
import seniorImg from "@/assets/senior-support.jpg";
import familyImg from "@/assets/family.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haven & Heart — Home Services & Senior Support" },
      { name: "description", content: "Reliable home help and compassionate, non-medical senior support. Get an instant estimate and request a booking online." },
      { property: "og:title", content: "Haven & Heart — Care That Feels Like Home" },
      { property: "og:description", content: "Reliable home services and compassionate senior support for you and the people you love." },
    ],
  }),
  component: Index,
});

const TRUST = ["Personalized support", "Reliable appointments", "Respectful, compassionate service", "Support tailored to individual needs"];

const WHY = [
  { icon: HandHeart, t: "Tailored to you", d: "Support shaped around individual needs and household preferences." },
  { icon: Smile, t: "Respect & dignity", d: "Kindness and respect in every visit, every conversation." },
  { icon: MessageSquare, t: "Reliable communication", d: "Clear updates — and updates for family when you authorise them." },
  { icon: Users, t: "Consistency", d: "The same familiar faces whenever possible." },
  { icon: Receipt, t: "Transparent pricing", d: "Clear estimates and honest expectations before we begin." },
  { icon: Clock, t: "Flexible scheduling", d: "One-off help or weekly, fortnightly and monthly visits." },
  { icon: Home, t: "Your home, your way", d: "We follow your routines and how you like things done." },
  { icon: Repeat, t: "Lasting relationships", d: "We aim to be there for the long term, not just one visit." },
];

const STEPS = [
  { t: "Tell Us What You Need", d: "Select services and share your requirements." },
  { t: "Receive Your Quote", d: "Review your estimated or personalized price." },
  { t: "Choose Your Appointment", d: "Request a suitable date and time." },
  { t: "Enjoy Peace of Mind", d: "Receive confirmation and service updates." },
];

function Index() {
  const home = SERVICES.filter((s) => s.category === "home").slice(0, 3);
  const senior = SERVICES.filter((s) => s.category === "senior").slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Older woman sharing tea and laughter with a Haven & Heart companion" width={1600} height={1104} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-x py-24 md:py-36">
          <div className="max-w-2xl text-primary-foreground">
            <p className="eyebrow animate-rise">Care That Feels Like Home</p>
            <h1 className="mt-4 text-5xl leading-[1.02] md:text-7xl animate-rise">A Little More Care. <em className="text-gold">A Lot More</em> Peace of Mind.</h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/85 animate-rise">
              From everyday help around the home to compassionate support for older adults, Haven &amp; Heart is here to make life safer, easier, and more comfortable for you and the people you love.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 animate-rise">
              <Button asChild variant="gold" size="xl"><Link to="/book">Book a Service</Link></Button>
              <Button asChild variant="heroOutline" size="xl"><Link to="/quote">Get a Free Quote</Link></Button>
              <WhatsAppButton variant="heroOutline" size="xl">Speak to Our Team</WhatsAppButton>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/15 bg-primary/70 backdrop-blur">
          <ul className="container-x grid grid-cols-2 gap-4 py-5 text-sm text-primary-foreground md:grid-cols-4">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-gold" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="container-x py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">Two ways we help, one standard of care.</h2>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {[
            { title: "Home Services", img: homeImg, list: home, desc: "Cleaning, laundry, meals, errands and the little jobs that keep a home running." },
            { title: "Senior Support", img: seniorImg, list: senior, desc: "Friendly, non-medical companionship and everyday help that supports independence." },
          ].map((c) => (
            <article key={c.title} className="overflow-hidden rounded-[1.75rem] bg-card shadow-soft">
              <img src={c.img} alt={c.title} loading="lazy" width={1200} height={912} className="h-64 w-full object-cover" />
              <div className="p-8">
                <h3 className="text-3xl text-primary">{c.title}</h3>
                <p className="mt-2 text-muted-foreground">{c.desc}</p>
                <ul className="mt-6 space-y-3">
                  {c.list.map((s) => (
                    <li key={s.slug}>
                      <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-muted">
                        <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary"><ServiceIcon name={s.icon} className="size-5" /></span>
                        <span className="flex-1">
                          <span className="block font-semibold">{s.name}</span>
                          <span className="block text-sm text-muted-foreground">{s.short}</span>
                        </span>
                        <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="soft" className="mt-6"><Link to="/services">View all services</Link></Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-secondary/60 py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Why Haven &amp; Heart</p>
            <h2 className="mt-3 text-4xl text-primary md:text-5xl">The kind of help you'd want for your own family.</h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.t} className="card-lift rounded-2xl bg-card p-6 shadow-soft">
                <w.icon className="size-7 text-gold" />
                <h3 className="mt-4 font-sans text-lg font-semibold text-primary">{w.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-x py-24">
        <div className="text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">Simple from the very first step.</h2>
        </div>
        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="relative rounded-2xl border border-border bg-card p-7">
              <span className="font-display text-5xl text-gold">0{i + 1}</span>
              <h3 className="mt-3 font-sans text-lg font-semibold text-primary">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Button asChild variant="hero" size="xl"><Link to="/quote">Let's Get Started <ArrowRight className="size-4" /></Link></Button>
        </div>
      </section>

      {/* Family */}
      <section className="container-x grid items-center gap-12 pb-8 lg:grid-cols-2">
        <img src={familyImg} alt="Family embracing their grandmother at home" loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
        <div>
          <p className="eyebrow">For families</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">Reassurance, even from a distance.</h2>
          <p className="mt-5 text-lg text-muted-foreground">Arrange support for someone you love and, with their permission, stay informed along the way.</p>
          <ul className="mt-6 space-y-3">
            {["Book on behalf of a parent or relative", "Share household instructions and preferences", "Visit-completion updates when authorised", "Regular, familiar check-in visits"].map((t) => (
              <li key={t} className="flex gap-3"><ShieldCheck className="size-5 shrink-0 text-gold" />{t}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">Our support is non-medical. We do not provide emergency monitoring or medical supervision.</p>
        </div>
      </section>

      {/* Reviews teaser */}
      <section className="container-x py-24">
        <div className="rounded-[2rem] border border-dashed border-gold/60 bg-card p-10 text-center">
          <Sparkles className="mx-auto size-7 text-gold" />
          <h2 className="mt-3 text-3xl text-primary md:text-4xl">Kind words, coming soon.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">We only publish genuine reviews from real customers. Once our first clients share their experiences, you'll find them here.</p>
          <Button asChild variant="soft" className="mt-6"><Link to="/reviews">Share Your Experience</Link></Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
