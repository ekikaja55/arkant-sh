<!-- CustomCursor.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { registerGsap, gsap } from '$lib/utils/animations';
  import Icon from '@iconify/svelte';

  let ring = $state<HTMLElement>();
  let isHovering = $state(false);
  let cursorIcon = $state('');
  let isTouch = $state(false);

  onMount(() => {
    isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch || !ring) return;

    registerGsap();

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let lastX = 0;
    let lastY = 0;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const el = target.closest<HTMLElement>('[data-cursor]');
      const interactive = target.closest('a, button, .stack-card, [role="article"]');

      isHovering = !!interactive;
      cursorIcon = el?.dataset.cursor ?? '';
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    gsap.ticker.add(() => {
      if (!ring) return;

      ringX += (mouseX - ringX) * 0.3;
      ringY += (mouseY - ringY) * 0.3;

      const vx = ringX - lastX;
      const vy = ringY - lastY;
      const speed = Math.min(Math.sqrt(vx * vx + vy * vy) * 1.2, 18);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      gsap.set(ring, {
        x: ringX,
        y: ringY,
        rotate: angle,
        scaleX: 1 + speed / 40,
        scaleY: 1 - speed / 90
      });

      lastX = ringX;
      lastY = ringY;
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  });
</script>

{#if !isTouch}
  <div
    bind:this={ring}
    class="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference bg-white flex items-center justify-center transition-[width,height] duration-200"
    class:w-3={!isHovering}
    class:h-3={!isHovering}
    class:w-11={isHovering}
    class:h-11={isHovering}
  >
    {#if isHovering && cursorIcon}
      <Icon icon={cursorIcon} width="18" class="text-black" style="rotate: 0deg;" />
    {/if}
  </div>
{/if}
