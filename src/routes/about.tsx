import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/Layout";
import familyImg from "@/assets/family.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Haven & Heart" },
      { name: "description", content: "Our mission: helping people feel comfortable, independent and cared for in their own homes." },
      { property: "og:title", content: "About Haven & Heart" },
      { property: "og:description", content: "Respectful, dependable home help and companionship." },
    ],
  }),
  component: About,
});

const VALUES = [
  ["Comfort at home", "Helping people feel safe, settled and comfortable in the place they love most."],
  ["Independence", "Supporting everyday wellbeing so people can keep living life their way."],
  ["Every person is individual", "No two homes or routines are the same, and our support reflects that."],
  ["Dependable relationships", "Trust built visit by visit through reliable, consistent service."],
  ["Peace of mind for families", "Helping loved ones feel reassured, wherever they are."],
];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Care that feels like home.">
        Haven &amp; Heart offers reliable home services and compassionate, non-medical support for older adults — delivered with warmth, respect and dignity.
      </PageHero>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <img src={familyImg} alt="A family together at home" loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
        <div className="space-y-4">
          {VALUES.map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-card p-5 shadow-soft">
              <h2 className="font-sans text-lg font-semibold text-primary">{t}</h2>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-x pb-8">
        <div className="rounded-[2rem] border border-dashed border-gold/60 p-10 text-center">
          <h2 className="text-3xl text-primary">Meet the team</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Our founder's story, team photographs and verified qualifications will appear here soon.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
