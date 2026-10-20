/** Enhance static page copy only; never touch controls or editable fields. */
export function setupScrollReveals(root: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const restored: Array<() => void> = [];
  const targets = Array.from(root.querySelectorAll<HTMLElement>("section h2, section h3, section p, section img, section .reveal-me"))
    .filter((el) => !el.closest("[data-no-reveal], form, [role='dialog']"));
  const observed = new Map<Element, HTMLElement>();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      (observed.get(entry.target) ?? entry.target).classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.12 });

  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.94) return;
    if (el.tagName === "IMG") {
      el.classList.add("reveal-image");
      restored.push(() => el.classList.remove("reveal-image", "is-in"));
    } else {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node instanceof Text && node.textContent?.trim() && !node.parentElement?.closest("a, button, svg")) nodes.push(node);
      }
      let index = 0;
      nodes.forEach((node) => {
        const wrapper = document.createElement("span");
        wrapper.className = "reveal-copy";
        (node.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (!part.trim()) { wrapper.append(document.createTextNode(part)); return; }
          const word = document.createElement("span");
          word.className = "reveal-word";
          word.textContent = part;
          word.style.setProperty("--word-delay", `${Math.min(index * 28, 650)}ms`);
          index += 1;
          wrapper.append(word);
        });
        node.replaceWith(wrapper);
        restored.push(() => wrapper.replaceWith(node));
      });
      el.classList.add("reveal-text");
      restored.push(() => el.classList.remove("reveal-text", "is-in"));
    }
    // Clipped images have no intersection area until revealed; watch their frame.
    const trigger = el.tagName === "IMG" ? el.parentElement ?? el : el;
    observed.set(trigger, el);
    observer.observe(trigger);
  });
  return () => { observer.disconnect(); restored.reverse().forEach((restore) => restore()); };
}