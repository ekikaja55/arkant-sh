<script lang="ts">
  import TypedText from "$lib/components/ui/TypedText.svelte";
  import { cvData } from "$lib/data/cv";
  import { registerGsap, gsap } from "$lib/utils/animations";
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";

  let heroSection = $state<HTMLElement>();
  let wireframeWrapper = $state<HTMLElement>();

  let showTagline = $state(false);
  let WireframeScene = $state<any>(null);

  onMount(async () => {
    const mod = await import("$lib/components/three/WireframeScene.svelte");
    WireframeScene = mod.default;
  });

  $effect(() => {
    if (!heroSection || !wireframeWrapper) return;

    const section = heroSection;
    const wrapper = wireframeWrapper;

    registerGsap();

    const ctx = gsap.context(() => {
      gsap.to(wrapper, {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  });
</script>

<section
  bind:this={heroSection}
  id="top"
  class="relative max-w-6xl mx-auto px-6 min-h-[85vh] flex items-center overflow-hidden"
>
  <div class="relative z-10 max-w-2xl">
    <p class="font-mono text-sm text-accent-string mb-4">
      <span class="text-text-muted">// </span>whoami
    </p>

    <h1
      class="text-4xl sm:text-6xl font-semibold tracking-tight text-text mb-4"
    >
      <span class="text-accent-fn">const</span>
      <span class="text-text"> who? </span>
      <span class="text-text-muted">=</span>
      <span class="text-accent-string"> "{cvData.name}"</span>
    </h1>

    <div class="font-mono text-lg sm:text-xl text-text-muted min-h-[1.75em]">
      <TypedText
        text={[
          "Be aware before changing ur theme...",
          "I love cat btw...",
          "Currently exploring low-level systems....",
        ]}
        speed={30}
        delay={600}
        onComplete={() => (showTagline = true)}
      />
    </div>

    {#if showTagline}
      <div
        class="mt-8 flex gap-4 font-mono text-sm"
        in:fly={{ y: 16, duration: 500, delay: 100 }}
      >
        <a
          href="#projects"
          class="group relative px-4 py-2 rounded-md bg-accent-fn/10 border border-accent-fn/30 text-accent-fn overflow-hidden transition-all duration-300 hover:border-accent-fn hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-fn/20"
        >
          <span class="relative z-10">./view-projects</span>
          <span
            class="absolute inset-0 bg-accent-fn/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-600"
          ></span>
        </a>

        <a
          href="#contact"
          class="group relative px-4 py-2 rounded-md border border-text-muted/20 text-text-muted overflow-hidden transition-all duration-600 hover:border-accent-keyword/50 hover:text-accent-keyword hover:-translate-y-0.5"
        >
          <span class="relative z-10">./contact</span>
          <span
            class="absolute inset-0 bg-accent-keyword/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
          ></span>
        </a>
      </div>
    {/if}
  </div>

  {#if WireframeScene}
    <div
      bind:this={wireframeWrapper}
      class="hidden lg:block absolute right-[-0.8%] top-[55%] -translate-y-1/2 w-[42%] max-w-105 aspect-square pointer-events-none"
    >
      <WireframeScene />
    </div>
    <div
      class="lg:hidden absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0"
    >
      <div class="w-[80vw] aspect-square">
        <WireframeScene />
      </div>
    </div>
  {/if}
</section>
