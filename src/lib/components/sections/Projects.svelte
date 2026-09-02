<script lang="ts">
  import { cvData } from '$lib/data/cv';
  import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
  import { registerGsap, gsap } from '$lib/utils/animations';

  let container: HTMLElement;

  $effect(() => {
    registerGsap();

    const items = container.querySelectorAll('.project-item');

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 32,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          once: true
        }
      });
    }, container);

    return () => ctx.revert();
  });
</script>

<section id="projects" bind:this={container} class="max-w-5xl mx-auto px-6 py-24">
  <p class="font-mono text-sm text-accent-string mb-2">
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
