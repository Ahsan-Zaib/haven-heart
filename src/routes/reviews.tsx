import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { CtaBand, PageHero, WhatsAppButton } from "@/components/site/Layout";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Haven & Heart" },
      { name: "description", content: "Genuine experiences from Haven & Heart customers, and how to share your own." },
      { property: "og:title", content: "Customer Reviews — Haven & Heart" },
      { property: "og:description", content: "We publish only genuine, verified customer reviews." },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <>
      <PageHero eyebrow="Reviews" title="Kind words from real customers.">
        We only publish genuine reviews. Ours will appear here as our first customers share their experiences.
      </PageHero>
      <section className="container-x grid gap-6 py-14 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-dashed border-gold/60 bg-card p-7">
            <div className="flex gap-1 text-gold/40">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="size-4" />)}</div>
            <p className="mt-4 text-sm italic text-muted-foreground">Sample placeholder — a genuine customer review will appear here once approved.</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Awaiting first review</p>
          </div>
        ))}
      </section>
      <section className="container-x pb-8 text-center">
        <h2 className="text-3xl text-primary">Share Your Experience</h2>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">Had a visit from us? We'd love to hear how it went.</p>
        <div className="mt-6 flex justify-center"><WhatsAppButton message="Hello Haven & Heart, I'd like to share feedback about my recent visit.">Send Feedback</WhatsAppButton></div>
      </section>
      <CtaBand />
    </>
  );
}
