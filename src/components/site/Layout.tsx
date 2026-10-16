import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import * as Icons from "lucide-react";
import { Menu, X, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, WA, whatsappLink, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const I = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Heart;
  return <I className={className} />;
}

export function WhatsAppButton({
  message = WA.general,
  children = "Chat on WhatsApp",
  variant = "whatsapp",
  size = "lg",
  className,
}: {
  message?: string;
  children?: ReactNode;
  variant?: "whatsapp" | "soft" | "heroOutline";
  size?: "sm" | "lg" | "xl" | "default";
  className?: string;
}) {
  const href = whatsappLink(message);
  if (!href) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <Link to="/contact" title="WhatsApp number coming soon — contact us here instead">
          <MessageCircle className="size-4" /> {children}
        </Link>
      </Button>
    );
  }
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="size-4" /> {children}
      </a>
    </Button>
  );
}

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/quote", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2">
      <span className="grid size-9 place-items-center rounded-full bg-primary text-gold shadow-soft transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
        <Heart className="size-4 fill-current" />
      </span>
      <span className="font-display text-2xl font-semibold text-primary">Haven &amp; Heart</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all",
        scrolled ? "border-border bg-background/90 shadow-soft backdrop-blur" : "border-transparent bg-background",
      )}
    >
      <div className="container-x flex h-18 items-center justify-between py-3">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-underline text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <WhatsAppButton size="sm" variant="soft">WhatsApp</WhatsAppButton>
          <Button asChild variant="hero" size="sm" className="btn-shine px-5">
            <Link to="/book">Book a Service</Link>
          </Button>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="animate-menu border-t border-border bg-background shadow-soft lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <Button asChild variant="hero" size="xl" className="mt-2">
              <Link to="/book" onClick={() => setOpen(false)}>Book a Service</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden bg-forest text-primary-foreground">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-gold/15 blur-3xl animate-blob" />
      <div className="container-x relative grid gap-10 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-4xl">Haven &amp; Heart</p>
          <p className="mt-2 font-display text-xl italic text-gold">{SITE.tagline}</p>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/75">{SITE.supporting}</p>
          <p className="mt-6 max-w-md text-xs text-primary-foreground/60">
            Haven &amp; Heart provides non-medical household help and companionship. We do not provide personal care,
            nursing, medication administration or emergency monitoring.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-primary-foreground/80 hover:text-gold">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Get in touch</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>{telHref() ? <a href={telHref()!} className="hover:text-gold">{SITE.phone}</a> : SITE.phone}</li>
            <li>{SITE.email}</li>
            <li><Link to="/book" className="hover:text-gold">Book a service</Link></li>
            <li><Link to="/quote" className="hover:text-gold">Get a free quote</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-x py-5 text-xs text-primary-foreground/60">© {new Date().getFullYear()} Haven &amp; Heart. All rights reserved.</div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const href = whatsappLink(WA.general);
  const cls = "fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift ring-4 ring-whatsapp/25 transition-transform hover:scale-110 animate-floaty";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={cls}>
      <MessageCircle className="size-6" />
    </a>
  ) : (
    <Link to="/contact" aria-label="Contact us (WhatsApp coming soon)" className={cls}>
      <MessageCircle className="size-6" />
    </Link>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section data-no-reveal className="grain relative isolate overflow-hidden bg-forest text-primary-foreground">
      <div aria-hidden className="pointer-events-none absolute -right-20 top-10 -z-10 size-96 rounded-full bg-accent/30 blur-3xl animate-blob" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-10 -z-10 size-80 rounded-full bg-gold/20 blur-3xl animate-blob [animation-delay:-6s]" />
      <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute -right-10 bottom-0 -z-10 hidden h-[120%] text-primary-foreground/5 md:block">
        <path fill="currentColor" d="M100 178s-70-40-70-92c0-24 18-42 40-42 13 0 24 7 30 17 6-10 17-17 30-17 22 0 40 18 40 42 0 52-70 92-70 92z" />
      </svg>
      <div className="container-x relative py-20 md:py-28">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-5xl md:text-7xl animate-rise delay-1">{title}</h1>
        <span aria-hidden className="mt-6 block h-px w-24 bg-gold animate-rise delay-2" />
        {children && <div className="mt-6 max-w-2xl text-lg text-primary-foreground/80 animate-rise delay-3">{children}</div>}
      </div>
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute -bottom-px left-0 h-10 w-full text-background md:h-14">
        <path fill="currentColor" d="M0 60V30C240 0 480 0 720 25s480 30 720 0v35z" />
      </svg>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="container-x py-20">
      <div className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-forest px-8 py-16 text-center text-primary-foreground shadow-lift md:px-16 md:py-20">
        <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 -z-10 size-72 rounded-full bg-gold/25 blur-3xl animate-blob" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-10 -z-10 size-80 rounded-full bg-accent/30 blur-3xl animate-blob [animation-delay:-8s]" />
        <p className="eyebrow">Let's talk</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-4xl md:text-6xl">Tell us what would make life a little <em className="text-gold-shine">easier.</em></h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gold" size="xl" className="btn-shine"><Link to="/book">Book a Service</Link></Button>
          <Button asChild variant="heroOutline" size="xl"><Link to="/quote">Get a Free Quote</Link></Button>
          <WhatsAppButton variant="heroOutline" size="xl">Speak to Our Team</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
