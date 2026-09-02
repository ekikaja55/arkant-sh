<script lang="ts">
  import { cvData } from '$lib/data/cv';
  import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
  import { registerGsap, gsap } from '$lib/utils/animations';

  let container = $state<HTMLElement>();
  let labelEl = $state<HTMLElement>();

  $effect(() => {
    if (!container || !labelEl) return;

    const section = container;
    const label = labelEl;

    registerGsap();

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll('.project-item');

      // 1. Reveal saat masuk viewport — opacity only, sekali jalan
      gsap.from(items, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true
        }
      });

      // 2. Row-depth parallax — jalan terus mengikuti scroll
      items.forEach((item, i) => {
        const depthOffset = i % 2 === 0 ? -24 : 24;
        gsap.to(item, {
          y: depthOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      });

      // 3. Label section — gerak lebih lambat dari heading
      gsap.to(label, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, section);

    return () => ctx.revert();
  });
</script>

<section id="projects" bind:this={container} class="max-w-5xl mx-auto px-6 py-24">
  <p bind:this={labelEl} class="font-mono text-sm text-accent-string mb-2">
    <span class="text-text-muted">// </span>projects
  </p>
  <h2 class="text-3xl font-semibold text-text mb-10">Things I've built</h2>

  <div class="grid sm:grid-cols-2 gap-6">
    {#each cvData.projects as project}
      <div class="project-item">
        <ProjectCard {project} />
      </div>
    {/each}
  </div>
</section>
