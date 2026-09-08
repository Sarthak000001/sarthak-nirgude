import { useEffect } from "react";

export function CursorPet() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("cursor-pet")) return;

    const PIXEL = 3;
    const GRID = 16;
    const SIZE = GRID * PIXEL; // 48

    const COLORS = {
      body: "#1A3A5C",
      detail: "#F2EDE4",
      eyes: "#C0392B",
      outline: "#1C1C1C",
    };

    // 16x16 sprite definitions using a char map.
    // . = transparent, O = outline, B = body, D = detail, E = eyes
    const palette: Record<string, string | null> = {
      ".": null,
      O: COLORS.outline,
      B: COLORS.body,
      D: COLORS.detail,
      E: COLORS.eyes,
    };

    // Each sprite: 16 rows of 16 chars
    const SIT = [
      "................",
      "................",
      "..OO........OO..",
      ".OBBO......OBBO.",
      ".OBBBO....OBBBO.",
      ".OBEBO....OBEBO.",
      ".OBBBBOOOOBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBDDBBBBBBDDBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBOO",
      ".OOOOOOOOOOOOOBO",
      "..............OO",
    ];

    const BREATHE = [
      "................",
      "..OO........OO..",
      ".OBBO......OBBO.",
      ".OBBBO....OBBBO.",
      ".OBEBO....OBEBO.",
      ".OBBBBOOOOBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBDDBBBBBBDDBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBOO",
      ".OOOOOOOOOOOOOBO",
      "..............OO",
    ];

    const WALK_1 = [
      "................",
      "..OO........OO..",
      ".OBBO......OBBO.",
      ".OBEBO....OBEBO.",
      ".OBBBBOOOOBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBDDBBBBBBDDBO.",
      ".OBBBBBBBBBBBBO........",
      ".OBBBBBBBBBBBBOOOOOOOOB",
      ".OBBBBBBBBBBBBBBBBBBBBO",
      ".OOOBBOOOOOOBBOOOOOOOOO",
      "...OBO....OBO...",
      "...OBO....OBO...",
      "...OBO....OBO...",
      "...OOO....OOO...",
      "................",
    ].map((r) => r.padEnd(16, ".").slice(0, 16));

    const WALK_2 = [
      "................",
      "..OO........OO..",
      ".OBBO......OBBO.",
      ".OBEBO....OBEBO.",
      ".OBBBBOOOOBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBDDBBBBBBDDBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OBBBBBBBBBBBBO.",
      ".OOOBBOOOOOOBBOO",
      "....OBO..OBO....",
      "....OBO..OBO....",
      "...OBO....OBO...",
      "...OOO....OOO...",
      "................",
    ];

    function drawSprite(canvas: HTMLCanvasElement, sprite: string[]) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < GRID; y++) {
        const row = sprite[y] || "";
        for (let x = 0; x < GRID; x++) {
          const c = row[x] || ".";
          const fill = palette[c];
          if (!fill) continue;
          ctx.fillStyle = fill;
          ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
        }
      }
    }

    // Inject styles
    const style = document.createElement("style");
    style.setAttribute("data-cursor-pet", "true");
    style.textContent = `
      #cursor-pet {
        position: fixed;
        left: 0;
        top: 0;
        width: ${SIZE}px;
        height: ${SIZE}px;
        pointer-events: none;
        z-index: 2147483000;
        transform: translate3d(0,0,0);
        will-change: transform;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
      }
      #cursor-pet canvas {
        width: 100%;
        height: 100%;
        display: block;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transition: transform 120ms linear;
      }
      @media print { #cursor-pet { display: none !important; } }
    `;
    document.head.appendChild(style);

    const wrap = document.createElement("div");
    wrap.id = "cursor-pet";
    wrap.setAttribute("aria-hidden", "true");
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    wrap.appendChild(canvas);
    document.body.appendChild(wrap);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // State
    let petX = window.innerWidth / 2;
    let petY = window.innerHeight / 2;
    let targetX = petX;
    let targetY = petY;
    let lastMoveAt = performance.now() - 5000;
    let facing: 1 | -1 = 1;
    type State = "RUNNING" | "SLOWING" | "IDLE";
    let state: State = "IDLE";
    let walkFrame = 0;
    let lastWalkSwap = 0;
    let idleFrame = 0;
    let lastIdleSwap = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX + 18;
      targetY = e.clientY + 18;
      lastMoveAt = performance.now();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    function tick(now: number) {
      const dx = targetX - petX;
      const dy = targetY - petY;
      const dist = Math.hypot(dx, dy);
      const sinceMove = now - lastMoveAt;

      if (reduced) {
        state = "IDLE";
      } else if (sinceMove > 1500 && dist < 120) {
        state = "IDLE";
      } else if (dist > 80) {
        state = "RUNNING";
      } else {
        state = "SLOWING";
      }

      let sprite = SIT;
      if (state === "RUNNING") {
        const lerp = 0.08;
        petX += dx * lerp;
        petY += dy * lerp;
        if (Math.abs(dx) > 1) facing = dx < 0 ? -1 : 1;
        if (now - lastWalkSwap > 120) {
          walkFrame ^= 1;
          lastWalkSwap = now;
        }
        sprite = walkFrame ? WALK_2 : WALK_1;
      } else if (state === "SLOWING") {
        const lerp = 0.04;
        petX += dx * lerp;
        petY += dy * lerp;
        if (Math.abs(dx) > 1) facing = dx < 0 ? -1 : 1;
        if (now - lastWalkSwap > 200) {
          walkFrame ^= 1;
          lastWalkSwap = now;
        }
        sprite = walkFrame ? WALK_2 : WALK_1;
      } else {
        if (now - lastIdleSwap > 900) {
          idleFrame ^= 1;
          lastIdleSwap = now;
        }
        sprite = idleFrame ? BREATHE : SIT;
      }

      drawSprite(canvas, sprite);
      canvas.style.transform = `scaleX(${facing})`;
      wrap.style.transform = `translate3d(${Math.round(petX - SIZE / 2)}px, ${Math.round(petY - SIZE / 2)}px, 0)`;

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      wrap.remove();
      style.remove();
    };
  }, []);

  return null;
}
