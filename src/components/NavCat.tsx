import { useEffect } from "react";

export function NavCat() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const BODY_DARK = "#1A3A5C";
    const BODY_LIGHT = "#2E5F8A";
    const DETAIL = "#F2EDE4";
    const EYES = "#C0392B";
    const OUTLINE = "#1C1C1C";

    const MESSAGES = [
      "Hire me.. 🐾",
      "I heard he debugs fast.",
      "Strong hire. Trust me.",
      "9.02 GPA. Just saying.",
      "He won't ghost you.",
      "Available to join ASAP.",
      "Full-stack. Full send.",
      "Low maintenance hire.",
      "Click contact. Do it.",
    ];

    let cleanup: (() => void) | null = null;
    let tries = 0;

    const findHeader = (): HTMLElement | null => {
      const headers = Array.from(document.querySelectorAll("header"));
      return (headers.find((h) => getComputedStyle(h).position === "sticky") as HTMLElement) || null;
    };

    const tryInit = () => {
      const header = findHeader();
      if (!header) {
        if (tries++ < 40) setTimeout(tryInit, 100);
        return;
      }
      cleanup = init(header);
    };

    function init(navEl: HTMLElement) {
      const style = document.createElement("style");
      style.setAttribute("data-navcat", "");
      style.textContent = `
        #nav-cat-zone {
          position: fixed;
          pointer-events: none;
          overflow: visible;
          z-index: 60;
        }
        #nav-cat-canvas {
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 32px;
          height: 32px;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
          pointer-events: none;
        }
        #nav-cat-bubble {
          position: absolute;
          bottom: 36px;
          left: 0;
          background: #F2EDE4;
          border: 1.5px solid #1A3A5C;
          color: #1A3A5C;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.03em;
          padding: 4px 8px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translate(-50%, 4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          border-radius: 0;
        }
        #nav-cat-bubble.visible { opacity: 1; transform: translate(-50%, 0); }
        #nav-cat-bubble::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #1A3A5C;
        }
      `;
      document.head.appendChild(style);

      const zone = document.createElement("div");
      zone.id = "nav-cat-zone";
      zone.setAttribute("aria-hidden", "true");
      const canvas = document.createElement("canvas");
      canvas.id = "nav-cat-canvas";
      canvas.width = 16;
      canvas.height = 16;
      const bubble = document.createElement("div");
      bubble.id = "nav-cat-bubble";
      zone.appendChild(canvas);
      zone.appendChild(bubble);
      document.body.appendChild(zone);

      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = false;

      function px(x: number, y: number, c: string) { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); }
      function rect(x: number, y: number, w: number, h: number, c: string) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }

      function drawBase(headOffsetX: number, bellyOffsetY: number, sit: boolean) {
        const hx = 5 + headOffsetX, hy = 6;
        rect(hx, hy, 4, 3, BODY_DARK);
        px(hx, hy - 1, BODY_DARK); px(hx + 3, hy - 1, BODY_DARK);
        px(hx, hy, OUTLINE); px(hx + 3, hy, OUTLINE);
        px(hx + 1, hy, BODY_LIGHT);
        px(hx + 1, hy + 1, EYES); px(hx + 2, hy + 1, EYES);
        px(hx - 1, hy + 2, DETAIL); px(hx + 4, hy + 2, DETAIL);
        const bx = 4, by = 9, bw = 6, bh = sit ? 4 : 3;
        rect(bx, by, bw, bh, BODY_DARK);
        rect(bx + 2, by + 1 + bellyOffsetY, 2, 2, BODY_LIGHT);
      }
      function drawLegs(frontDown: boolean) {
        if (frontDown) { rect(8, 12, 1, 2, BODY_DARK); px(7, 13, BODY_DARK); px(8, 14, DETAIL); }
        else { rect(8, 12, 1, 1, BODY_DARK); rect(7, 12, 1, 2, BODY_DARK); px(7, 14, DETAIL); }
        if (!frontDown) { rect(4, 12, 1, 2, BODY_DARK); px(5, 13, BODY_DARK); px(4, 14, DETAIL); }
        else { rect(4, 12, 1, 1, BODY_DARK); rect(5, 12, 1, 2, BODY_DARK); px(5, 14, DETAIL); }
      }
      function drawTail(step: number) {
        const tx = 3, ty = 10 - step;
        px(tx, ty, BODY_DARK); px(tx - 1, ty - 1, BODY_DARK); px(tx - 1, ty - 2, BODY_DARK);
      }
      function drawWalk(a: boolean) { ctx.clearRect(0, 0, 16, 16); drawBase(a ? 0 : 1, 0, false); drawLegs(a); drawTail(a ? 0 : 1); }
      function drawSit(breathe: boolean) {
        ctx.clearRect(0, 0, 16, 16);
        drawBase(0, breathe ? -1 : 0, true);
        rect(4, 13, 2, 1, BODY_DARK); rect(8, 13, 2, 1, BODY_DARK);
        px(4, 13, DETAIL); px(9, 13, DETAIL);
        px(10, 12, BODY_DARK); px(10, 11, BODY_DARK); px(11, 11, BODY_DARK);
      }

      type State = "RUNNING" | "IDLE";
      let state: State = "IDLE";
      let direction: 1 | -1 = 1;
      let speed = 0;
      const MAX_SPEED = 1.8;
      let catX = 0;

      let logoRight = 0, linksLeft = 0;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function measure() {
        const navRect = navEl.getBoundingClientRect();
        zone.style.left = navRect.left + "px";
        zone.style.top = navRect.top + "px";
        zone.style.width = navRect.width + "px";
        zone.style.height = navRect.height + "px";

        const logo = navEl.querySelector("a") || navEl.querySelector(".font-display") as HTMLElement | null;
        const linksContainer = navEl.querySelector("nav") as HTMLElement | null;
        if (!logo || !linksContainer) return;
        const logoRect = logo.getBoundingClientRect();
        const linksRect = linksContainer.getBoundingClientRect();

        const isMobile = window.innerWidth < 640;
        if (isMobile) {
          logoRight = 8;
          linksLeft = navRect.width - 8;
          zone.style.display = "";
        } else {
          logoRight = logoRect.right - navRect.left + 12;
          linksLeft = linksRect.left - navRect.left - 12;
          if (linksLeft - logoRight < 60) {
            zone.style.display = "none";
          } else {
            zone.style.display = "";
          }
        }
        catX = Math.max(logoRight, Math.min(catX || (logoRight + linksLeft) / 2 - 16, linksLeft - 32));
      }
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(navEl);
      ro.observe(document.body);
      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure, { passive: true });

      let lastScrollY = window.scrollY;
      let lastScrollAt = 0;
      const onScroll = () => {
        const y = window.scrollY;
        if (y > lastScrollY) direction = 1;
        else if (y < lastScrollY) direction = -1;
        lastScrollY = y;
        lastScrollAt = performance.now();
        if (!reduced) { state = "RUNNING"; speed = MAX_SPEED; hideBubble(); }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      let bubbleShownAt = 0;
      let bubbleHiddenAt = performance.now();
      let nextBubbleDelay = 4000;
      let bubbleVisible = false;
      let lastMsg = -1;
      let firstBubble = true;

      function showBubble() {
        let idx = Math.floor(Math.random() * MESSAGES.length);
        if (idx === lastMsg) idx = (idx + 1) % MESSAGES.length;
        lastMsg = idx;
        bubble.textContent = firstBubble ? "Hire me.. 🐾" : MESSAGES[idx];
        firstBubble = false;
        positionBubble();
        bubble.classList.add("visible");
        bubbleVisible = true;
        bubbleShownAt = performance.now();
      }
      function hideBubble() {
        if (!bubbleVisible) return;
        bubble.classList.remove("visible");
        bubbleVisible = false;
        bubbleHiddenAt = performance.now();
        nextBubbleDelay = 5000 + Math.random() * 3000;
      }
      function positionBubble() {
        const centerX = catX + 16;
        const w = bubble.offsetWidth || 100;
        const half = w / 2 + 4;
        const navW = parseFloat(zone.style.width) || 800;
        const clamped = Math.max(half, Math.min(centerX, navW - half));
        bubble.style.left = clamped + "px";
      }

      let lastFrame = 0, walkTimer = 0, walkA = true, breatheTimer = 0, breatheState = false, raf = 0;

      function frame(t: number) {
        const dt = lastFrame ? t - lastFrame : 16;
        lastFrame = t;

        if (reduced) {
          drawSit(false); renderCanvas(); handleBubble(t);
          raf = requestAnimationFrame(frame); return;
        }

        if (state === "RUNNING" && t - lastScrollAt > 800) {
          speed *= 0.85;
          if (speed < 0.1) { speed = 0; state = "IDLE"; bubbleHiddenAt = t; nextBubbleDelay = 2500; }
        } else if (state === "RUNNING") {
          speed = MAX_SPEED;
        }

        if (state === "RUNNING" || speed > 0) {
          catX += speed * direction;
          if (catX < logoRight) { catX = logoRight; direction = 1; }
          else if (catX + 32 > linksLeft) { catX = linksLeft - 32; direction = -1; }
          walkTimer += dt;
          if (walkTimer > 100) { walkTimer = 0; walkA = !walkA; }
          drawWalk(walkA);
        } else {
          breatheTimer += dt;
          if (breatheTimer > 900) { breatheTimer = 0; breatheState = !breatheState; }
          drawSit(breatheState);
        }

        renderCanvas();
        handleBubble(t);
        raf = requestAnimationFrame(frame);
      }

      function renderCanvas() {
        canvas.style.left = catX + "px";
        canvas.style.transform = direction === -1 ? "scaleX(-1)" : "scaleX(1)";
        if (bubbleVisible) positionBubble();
      }

      function handleBubble(t: number) {
        if (state !== "IDLE") { if (bubbleVisible) hideBubble(); return; }
        if (bubbleVisible) { if (t - bubbleShownAt > 3000) hideBubble(); }
        else { if (t - bubbleHiddenAt > nextBubbleDelay) showBubble(); }
      }

      const onVisibility = () => {
        if (document.hidden) { cancelAnimationFrame(raf); raf = 0; lastFrame = 0; }
        else if (!raf) { raf = requestAnimationFrame(frame); }
      };
      document.addEventListener("visibilitychange", onVisibility);

      raf = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("scroll", measure);
        window.removeEventListener("resize", measure);
        document.removeEventListener("visibilitychange", onVisibility);
        ro.disconnect();
        zone.remove();
        style.remove();
      };
    }

    tryInit();

    return () => { if (cleanup) cleanup(); };
  }, []);

  return null;
}
