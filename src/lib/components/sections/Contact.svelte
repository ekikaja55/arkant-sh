<!-- src/lib/components/sections/Contact.svelte -->
<script lang="ts">
  import { cvData } from "$lib/data/cv";
  import { registerGsap, gsap } from "$lib/utils/animations";
  import { onMount } from "svelte";

  let container = $state<HTMLElement>();
  let headingEl = $state<HTMLElement>();
  let terminalLine = $state("");
  let showLinks = $state(false);

  const command = "./contact --list";

  onMount(() => {
    let cancelled = false;

    async function typeCommand() {
      for (let i = 0; i <= command.length; i++) {
        if (cancelled) return;
        terminalLine = command.slice(0, i);
        await new Promise((r) => setTimeout(r, 55));
      }
      await new Promise((r) => setTimeout(r, 300));
      if (!cancelled) showLinks = true;
    }

    // trigger typing saat section masuk viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          typeCommand();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (container) observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  });

  $effect(() => {
    if (!container || !headingEl) return;

    const section = container;
    const heading = headingEl;

    registerGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 40%",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  });

  // magnetic effect handler
  function magnetic(node: HTMLElement) {
    function onMove(e: MouseEvent) {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(node, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    function onLeave() {
      gsap.to(node, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
    }
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return {
      destroy() {
        node.removeEventListener("mousemove", onMove);
        node.removeEventListener("mouseleave", onLeave);
      },
    };
  }
</script>

<section
  id="contact"
  bind:this={container}
  class="max-w-3xl lg:max-w-4xl mx-auto px-6 py-32 lg:py-40 text-center"
>
  <p class="font-mono text-sm lg:text-base text-accent-string mb-2 lg:mb-3">
    <span class="text-text-muted">// </span>contact
  </p>

  <h2
    bind:this={headingEl}
    class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-text mb-10 lg:mb-14"
  >
    Let's build something.
  </h2>

  <div
    class="inline-block text-left rounded-xl border border-text-muted/15 bg-surface px-6 py-5 lg:px-9 lg:py-7 font-mono text-sm lg:text-base min-w-[280px] lg:min-w-[380px] shadow-lg"
  >
    <div class="flex items-center gap-1.5 lg:gap-2 mb-3 lg:mb-4">
      <span class="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-accent-variable/60"
      ></span>
      <span class="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-accent-number/60"
      ></span>
      <span class="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-accent-string/60"
      ></span>
    </div>

    <div class="text-text-muted">
      <span class="text-accent-fn">arkant</span><span class="text-text-muted"
        >@sh</span
      ><span class="text-text">:~$</span>
      {terminalLine}<span
        class="inline-block w-[2px] lg:w-[2.5px] h-[1em] bg-accent-fn ml-0.5 align-middle animate-pulse"
      ></span>
    </div>

    {#if showLinks}
      <div class="mt-3 lg:mt-4 flex flex-col gap-1.5 lg:gap-2">
        {#each cvData.socials as social}
          <a
            href={social.url}
            data-cursor="lucide:arrow-up-right"
            target={social.url.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            use:magnetic
            class="inline-block w-fit px-3 py-1.5 lg:px-4 lg:py-2 rounded-md text-accent-keyword hover:bg-accent-keyword/10 transition-colors"
          >
            → {social.label.toLowerCase()}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
