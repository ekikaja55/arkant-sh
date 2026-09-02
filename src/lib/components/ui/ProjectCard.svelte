<script lang="ts">
  import type { Project } from "$lib/types";
  import Badge from "./Badge.svelte";

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();
  let hovered = $state(false);
</script>

<article
  data-cursor="lucide:eye"
  class="group relative rounded-lg border border-text-muted/15 bg-surface overflow-hidden transition-all duration-300 hover:border-accent-fn/40 hover:-translate-y-1"
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
  // role="article"
>
  <!-- fake tab bar -->
  <div
    class="flex items-center justify-between px-4 py-2 border-b border-text-muted/10 bg-bg/40"
  >
    <span class="font-mono text-xs text-text-muted truncate">
      {project.title.toLowerCase().replace(/\s+/g, "-")}
    </span>
    {#if project.status}
      <Badge status={project.status} />
    {/if}
  </div>

  {#if project.thumbnail}
    <div class="aspect-video overflow-hidden">
      <picture>
        <source
          srcset={project.thumbnail.replace(".webp", ".avif")}
          type="image/avif"
        />
        <img
          src={project.thumbnail}
          alt="{project.title} screenshot"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </picture>
    </div>
  {/if}

  <div class="p-5">
    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="text-lg font-semibold text-text">{project.title}</h3>
      {#if project.year}
        <span class="font-mono text-xs text-text-muted shrink-0"
          >{project.year}</span
        >
      {/if}
    </div>

    <p class="text-sm text-text-muted leading-relaxed mb-4">
      {project.description}
    </p>

    <div class="flex flex-wrap gap-1.5 mb-4">
      {#each project.technologies as tech}
        <span
          class="px-2 py-0.5 rounded font-mono text-xs bg-accent-fn/10 text-accent-fn"
        >
          {tech}
        </span>
      {/each}
    </div>

    <div class="flex gap-3 font-mono text-sm">
      {#if project.liveUrl}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-accent-string hover:underline"
        >
          → live
        </a>
      {/if}
      {#if project.githubUrl}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-muted hover:text-accent-keyword hover:underline"
        >
          → source
        </a>
      {/if}
    </div>
  </div>
</article>
