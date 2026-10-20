import { animate, inView, scroll } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const HIDDEN = "perspective(900px) translateY(40px) rotateX(16deg)";
const SHOWN = "perspective(900px) translateY(0px) rotateX(0deg)";
const SELECTOR = "section h2, section h3, section p, section img, section article, section figure, section .card-lift, section li, section .reveal-me";

/**
 * Framer Motion scroll entrances (once), 3D hover tilt and light parallax.
 * Enhances static copy only; never touches forms or dialogs.
 */
export function setupScrollReveals(root: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const stops: Array<() => void> = [];
  const restores: Array<() => void> = [];

  const all = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR))
    .filter((el) => !el.closest("[data-no-reveal], form, [role='dialog'], header, nav"));
  const set = new Set(all);
  // Animate the outermost target only, so cards move as a unit.
  const targets = all.filter((el) => {
    for (let p = el.parentElement; p && p !== root; p = p.parentElement) if (set.has(p)) return false;
    return el.getBoundingClientRect().top > window.innerHeight * 0.94 && !el.classList.contains("animate-kenburns");
  });

  // Stagger: elements entering in the same frame queue one after another.
  let batch = 0;
  let frame = 0;
  const nextDelay = () => {
    if (!frame) frame = requestAnimationFrame(() => { batch = 0; frame = 0; });
    return Math.min(batch++ * 0.09, 0.6);
  };

  targets.forEach((el) => {
    const prev = { o: el.style.opacity, t: el.style.transform };
    el.style.opacity = "0";
    el.style.transform = HIDDEN;
    el.style.transformOrigin = "50% 100%";
    restores.push(() => { el.style.opacity = prev.o; el.style.transform = prev.t; });
    const trigger = el.tagName === "IMG" ? el.parentElement ?? el : el;
    stops.push(inView(trigger, () => {
      animate(el, { opacity: [0, 1], transform: [HIDDEN, SHOWN] }, { duration: 0.75, ease: EASE, delay: nextDelay() })
        .then(() => { el.style.transform = ""; });
    }, { margin: "0px 0px -8% 0px", amount: 0.1 }));
  });

  // Parallax on hero/background imagery and decorative glows (uses `translate` so CSS transforms keep running).
  root.querySelectorAll<HTMLElement>("section img.absolute, section .animate-blob").forEach((el) => {
    const section = el.closest("section");
    if (!section) return;
    const range = el.tagName === "IMG" ? 90 : -70;
    stops.push(scroll((p: number) => { el.style.translate = `0 ${(p * range).toFixed(1)}px`; }, { target: section, offset: ["start start", "end start"] }));
    restores.push(() => { el.style.translate = ""; });
  });

  // Subtle 3D hover tilt on cards and images (pointer devices only).
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    root.querySelectorAll<HTMLElement>(".card-lift, .img-zoom").forEach((el) => {
      if (el.closest("form")) return;
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = "transform .2s ease-out, box-shadow .3s ease-out";
        el.style.transform = `perspective(900px) translateY(-6px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
        el.style.boxShadow = "0 24px 50px -24px hsl(160 35% 15% / .35)";
      };
      const leave = () => {
        el.style.transition = "transform .6s cubic-bezier(.16,1,.3,1), box-shadow .6s ease-out";
        el.style.transform = "";
        el.style.boxShadow = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      stops.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); leave(); });
    });
  }

  return () => { if (frame) cancelAnimationFrame(frame); stops.forEach((s) => s()); restores.forEach((r) => r()); };
}
