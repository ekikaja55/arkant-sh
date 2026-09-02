<script lang="ts">
  import { onMount } from 'svelte';
  import { mode } from 'mode-watcher';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let width = 0;
    let height = 0;
    let scrollY = 0;

    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
      depth: number; // 0 = dekat (parallax kuat), 1 = jauh (parallax halus)
    }

    let points: Point[] = [];
    const COUNT = 55;
    const LINK_DIST = 130;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function init() {
      points = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        depth: Math.random()
      }));
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);

      const isDark = mode.current === 'dark';
      const dotColor = isDark ? 'rgba(217, 119, 87, 0.95)' : 'rgba(194, 105, 77, 0.85)';
      const lineColor = isDark ? 'rgba(163, 158, 146, 0.55)' : 'rgba(120, 117, 110, 0.45)';

      const rendered = points.map((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // parallax offset: titik depth rendah (dekat) bergerak lebih jauh saat scroll
        const parallaxStrength = (1 - p.depth) * 0.15;
        const offsetY = scrollY * parallaxStrength;

        return {
          x: p.x,
          y: ((p.y + offsetY) % height + height) % height,
          depth: p.depth
        };
      });

      for (const p of rendered) {
        const sizeFactor = 0.6 + (1 - p.depth) * 0.8; // titik dekat lebih besar
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6 * sizeFactor, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.globalAlpha = 0.4 + (1 - p.depth) * 0.6; // titik dekat lebih pekat
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < rendered.length; i++) {
        for (let j = i + 1; j < rendered.length; j++) {
          const dx = rendered[i].x - rendered[j].x;
          const dy = rendered[i].y - rendered[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DIST) {
            const opacityFactor = 1 - dist / LINK_DIST;
            const avgDepth = (rendered[i].depth + rendered[j].depth) / 2;
            ctx.beginPath();
            ctx.moveTo(rendered[i].x, rendered[i].y);
            ctx.lineTo(rendered[j].x, rendered[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1.6;
            ctx.globalAlpha = opacityFactor * (0.4 + (1 - avgDepth) * 0.6);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    init();
    tick();

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 -z-10 pointer-events-none"
></canvas>
