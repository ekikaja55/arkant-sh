<script lang="ts">
  import Icon from "@iconify/svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import { fly, fade } from "svelte/transition";

  const links = [
    { label: "about", href: "#top", icon: "lucide:user" },
    { label: "experience", href: "#experience", icon: "lucide:briefcase" },
    { label: "projects", href: "#projects", icon: "lucide:folder-git-2" },
    { label: "contact", href: "#contact", icon: "lucide:mail" },
  ];

  let expanded = $state(false);
  let mobileOpen = $state(false);

  function closeMobile() {
    mobileOpen = false;
  }
</script>

<!-- ===== DESKTOP: floating vertical dock, left ===== -->
<nav
  class="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col items-stretch gap-1 rounded-2xl border border-text-muted/15 bg-surface/80 backdrop-blur-md p-2 shadow-lg transition-all duration-300"
  class:w-14={!expanded}
  class:w-44={expanded}
>
  <button
    onclick={() => (expanded = !expanded)}
    class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-[var(--nav-icon)] hover:text-[var(--nav-accent-fn)] hover:bg-[var(--nav-accent-fn)]/10 transition-colors"
    aria-label="Toggle nav"
  >
    <Icon
      icon={expanded ? "lucide:chevrons-left" : "lucide:chevrons-right"}
      width="18"
    />
    {#if expanded}
      <span class="font-mono text-xs">collapse</span>
    {/if}
  </button>

  <div class="h-px bg-text-muted/10 my-1"></div>

  {#each links as link}
    <a
      href={link.href}
      class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-[var(--nav-icon)] font-mono text-xs hover:text-[var(--nav-accent-keyword)] hover:bg-[var(--nav-accent-keyword)]/10 transition-colors"
    >
      <Icon icon={link.icon} width="18" class="shrink-0" />
      {#if expanded}
        <span>~/{link.label}</span>
      {/if}
    </a>
  {/each}

  <div class="h-px bg-text-muted/10 my-1"></div>

  <div class="px-1 py-1">
    <ThemeToggle {expanded} />
  </div>
</nav>

<div class="lg:hidden fixed bottom-8 right-5 z-50">
  {#if mobileOpen}
    <div
      class="absolute bottom-full right-0 mb-3 flex flex-col items-stretch gap-1 rounded-2xl border border-text-muted/15 bg-surface/95 backdrop-blur-md p-2 shadow-xl min-w-40"
      in:fly={{ y: 12, duration: 220 }}
      out:fly={{ y: 12, duration: 160 }}
    >
      {#each links as link}
        <a
          href={link.href}
          onclick={closeMobile}
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted font-mono text-xs hover:text-[var(--nav-accent-keyword)] hover:bg-[var(--nav-accent-keyword)]/10 transition-colors"
        >
          <Icon icon={link.icon} width="16" />
          <span>~/{link.label}</span>
        </a>
      {/each}
      <div class="h-px bg-text-muted/10 my-1"></div>
      <div class="px-1">
        <ThemeToggle expanded={true} />
      </div>
    </div>
  {/if}

 <button
    onclick={() => (mobileOpen = !mobileOpen)}
    class="w-14 h-14 rounded-full border border-text-muted/15 bg-surface/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[var(--nav-icon)] hover:text-[var(--nav-accent-fn)] transition-colors"
    aria-label="Toggle menu"
  >
    <Icon icon={mobileOpen ? "lucide:x" : "lucide:menu"} width="20" />
  </button>
</div>

{#if mobileOpen}
  <button
    class="lg:hidden fixed inset-0 z-40 bg-black/20"
    onclick={closeMobile}
    aria-label="Close menu overlay"
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 150 }}
  ></button>
{/if}
