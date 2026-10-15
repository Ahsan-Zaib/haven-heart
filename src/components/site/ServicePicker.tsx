import { Check } from "lucide-react";
import { SERVICES, type Category } from "@/lib/site";
import { ServiceIcon } from "./Layout";
import { cn } from "@/lib/utils";

export function ServicePicker({ value, onChange, category }: { value: string[]; onChange: (v: string[]) => void; category?: Category | "all" }) {
  const list = SERVICES.filter((s) => !category || category === "all" || s.category === category);
  const toggle = (slug: string) => onChange(value.includes(slug) ? value.filter((x) => x !== slug) : [...value, slug]);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {list.map((s) => {
        const on = value.includes(s.slug);
        return (
          <button
            type="button"
            key={s.slug}
            onClick={() => toggle(s.slug)}
            aria-pressed={on}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
              on ? "border-primary bg-primary/5 shadow-soft" : "border-border bg-card hover:border-accent",
            )}
          >
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", on ? "bg-primary text-gold" : "bg-secondary text-primary")}>
              {on ? <Check className="size-4" /> : <ServiceIcon name={s.icon} className="size-4" />}
            </span>
            <span className="text-sm font-medium">{s.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-primary">{label}</span>
      <div className="mt-2">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputCls = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-ring/30";
