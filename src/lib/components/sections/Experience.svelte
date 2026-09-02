<script lang="ts">
  import { cvData } from "$lib/data/cv";
  import TimelineItem from "$lib/components/ui/TimelineItem.svelte";
  import { registerGsap, gsap } from "$lib/utils/animations";

  let container: HTMLElement;

  $effect(() => {
    registerGsap();

    const items = container.querySelectorAll(".timeline-item");

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 32,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          once: true,
        },
      });
    }, container);

    return () => ctx.revert();
  });
</script>

<section
  id="experience"
  bind:this={container}
  class="max-w-3xl mx-auto px-6 py-24"
>
  <p class="font-mono text-sm text-accent-string mb-2">
    <span class="text-text-muted">// </span>experience
  </p>
  <h2 class="text-3xl font-semibold text-text mb-12">Where I've worked</h2>

  <div>
    {#each cvData.experiences as experience, i}
      <div class="timeline-item">
        <TimelineItem
          {experience}
          isLast={i === cvData.experiences.length - 1}
        />
      </div>
    {/each}
  </div>
</section>
