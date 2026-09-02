<script lang="ts">
  import { onMount } from 'svelte';
  import { mode } from 'mode-watcher';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let width = 0;
    let height = 0;

    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
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
        vy: (Math.random() - 0.5) * 0.25
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);

      const isDark = mode.current === 'dark';
      const dotColor = isDark ? 'rgba(217, 119, 87, 0.4)' : 'rgba(194, 105, 77, 0.35)';
      const lineColor = isDark ? 'rgba(163, 158, 146, 0.12)' : 'rgba(138, 133, 121, 0.12)';

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    init();
    tick();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 -z-10 pointer-events-none"
></canvas>
