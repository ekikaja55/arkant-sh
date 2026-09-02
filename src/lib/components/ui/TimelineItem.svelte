<script lang="ts">
  import type { Experience } from '$lib/types';

  interface Props {
    experience: Experience;
    isLast?: boolean;
  }

  let { experience, isLast = false }: Props = $props();
</script>

<div class="relative pl-8 pb-12">
  {#if !isLast}
    <span class="absolute left-1.25 top-3 bottom-0 w-px bg-text-muted/15"></span>
  {/if}

  <span
    class="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-accent-fn ring-4 ring-bg"
  ></span>

  <p class="font-mono text-xs text-accent-string mb-1.5">
    {experience.period}
  </p>

  <h3 class="text-lg font-semibold text-text">
    {experience.role}
  </h3>
  <p class="font-mono text-sm text-text-muted mb-3">
    {experience.company}
  </p>

  <p class="text-sm text-text-muted leading-relaxed mb-4 max-w-2xl">
    {experience.description}
  </p>

  <div class="flex flex-wrap gap-1.5">
    {#each experience.technologies as tech}
      <span class="px-2 py-0.5 rounded font-mono text-xs bg-accent-keyword/10 text-accent-keyword">
        {tech}
      </span>
    {/each}
  </div>
</div>
