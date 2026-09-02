<script lang="ts">
  import { cvData } from "$lib/data/cv";
  import { registerGsap, gsap, ScrollTrigger } from "$lib/utils/animations";

  let container = $state<HTMLElement>();
  let labelEl = $state<HTMLElement>();
  let activeIndex = $state(0);

  $effect(() => {
    if (!container || !labelEl) return;

    const section = container;
    const label = labelEl;

    registerGsap();

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const nextCard = cards[i + 1];

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          filter: "blur(2px)",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              if (self.progress > 0.5 && activeIndex < i + 1) {
                activeIndex = i + 1;
              } else if (self.progress <= 0.5 && activeIndex > i) {
                activeIndex = i;
              }
            },
          },
        });
      });

      gsap.to(label, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  });
</script>

<section
  id="experience"
  bind:this={container}
  class="max-w-4xl mx-auto px-6 py-24"
>
  <p bind:this={labelEl} class="font-mono text-sm text-accent-string mb-2">
    <span class="text-text-muted">// </span>experience
  </p>
  <h2 class="text-3xl font-semibold text-text mb-16">Where I've worked</h2>

  <div class="flex gap-8 sm:gap-12">
    <!-- LEFT: sticky rail -->
    <div class="hidden sm:block w-32 shrink-0 relative">
      <div class="sticky top-40 flex flex-col gap-10">
        <div
          class="absolute left-[7px] top-1 bottom-1 w-px bg-text-muted/15"
        ></div>
        {#each cvData.experiences as experience, i}
          <div class="relative flex items-center gap-3">
            <span
              class="w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 shrink-0"
              class:bg-accent-fn={activeIndex === i}
              class:border-accent-fn={activeIndex === i}
              class:scale-125={activeIndex === i}
              class:bg-surface={activeIndex !== i}
              class:border-text-muted={activeIndex !== i}
            ></span>
            <span
              class="font-mono text-xs whitespace-nowrap transition-colors duration-300"
              class:text-accent-fn={activeIndex === i}
              class:text-text-muted={activeIndex !== i}
            >
              {experience.period.split(" — ")[0]}
            </span>
          </div>
        {/each}
      </div>
    </div>

    <!-- RIGHT: stacking cards -->
    <div class="relative flex-1">
      {#each cvData.experiences as experience, i}
        <div
          class="stack-card sticky top-28 mb-6 origin-top"
          style="z-index: {i + 1};"
        >
          <div
            class="rounded-2xl border border-text-muted/15 bg-surface p-6 sm:p-8 shadow-lg"
          >
            <p class="font-mono text-xs text-accent-string mb-2">
              {experience.period}
            </p>
            <h3 class="text-xl font-semibold text-text mb-1">
              {experience.role}
            </h3>
            <p class="font-mono text-sm text-text-muted mb-4">
              {experience.company}
            </p>
            <p class="text-sm text-text-muted leading-relaxed mb-5">
              {experience.description}
            </p>
            <div class="flex flex-wrap gap-1.5">
              {#each experience.technologies as tech}
                <span
                  class="px-2 py-0.5 rounded font-mono text-xs bg-accent-keyword/10 text-accent-keyword"
                >
                  {tech}
                </span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
