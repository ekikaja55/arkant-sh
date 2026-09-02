<script lang="ts">
  import { toggleMode, mode } from 'mode-watcher';
  import Icon from '@iconify/svelte';

  interface Props {
    expanded?: boolean;
  }

  let { expanded = false }: Props = $props();
</script>

<button
  onclick={toggleMode}
  class="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-[var(--nav-icon)] hover:text-[var(--nav-accent-fn)] hover:bg-[var(--nav-accent-fn)]/10 transition-colors"
  aria-label="Toggle theme"
>
  <Icon icon={mode.current === 'dark' ? 'lucide:moon' : 'lucide:sun'} width="18" class="shrink-0" />
  {#if expanded}
    <span class="font-mono text-xs">{mode.current === 'dark' ? 'dark' : 'light'}</span>
  {/if}
</button>
