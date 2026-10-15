import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaBand, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Haven & Heart" },
      { name: "description", content: "Answers about our services, quotes, bookings, recurring visits and what we do and don't provide." },
      { property: "og:title", content: "Frequently Asked Questions — Haven & Heart" },
      { property: "og:description", content: "Everything you need to know before booking." },
    ],
  }),
  component: Faq,
});

const FAQS: [string, string][] = [
  ["What services do you provide?", "Home services such as cleaning, laundry, meal preparation and errands, and non-medical senior support such as companionship, appointment accompaniment and help with everyday routines."],
  ["Do you provide both home services and senior support?", "Yes — and you can combine them in a single booking."],
  ["How do I get a quote?", "Use our instant estimate on the Pricing page, or request a personalised quote through the contact form or WhatsApp."],
  ["Can I book an appointment online?", "Yes. Our booking page takes you through four short steps, and our team confirms your appointment time."],
  ["Can I book more than one service?", "Absolutely. Select as many services as you need in one request."],
  ["Do you offer recurring visits?", "Yes — weekly, fortnightly, monthly or a custom schedule."],
  ["Can I request the same support worker again?", "We aim for consistency and will always try to send a familiar face whenever possible."],
  ["Are your prices fixed or estimates?", "Online prices are indicative estimates. Your price is confirmed by our team before your appointment."],
  ["What happens after I submit a booking request?", "Our team reviews your request and contacts you to confirm the date, time and price."],
  ["Can I reschedule or cancel?", "Yes, by contacting us. Our cancellation policy will be shared when your booking is confirmed."],
  ["Which locations do you cover?", "Our service areas will be listed on the Contact page. Get in touch to check your location."],
  ["Can a family member arrange a service?", "Yes. Family members can book on behalf of a loved one, and with permission receive visit updates."],
  ["How do you handle customer information?", "We only use your details to provide and arrange your service, and never share them publicly."],
  ["Do you offer medical or personal care?", "No. Our support is non-medical: we do not provide personal care, nursing, medication administration or emergency monitoring."],
  ["How do I contact you on WhatsApp?", "Tap any WhatsApp button on this site to open a chat with our team."],
];

function Faq() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered." />
      <section className="container-x py-14">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl rounded-[1.75rem] bg-card px-6 shadow-soft md:px-10">
          {FAQS.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`}>
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-primary">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <CtaBand />
    </>
  );
}
