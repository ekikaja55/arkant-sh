<script lang="ts">
  import './app.css';
  import { ModeWatcher } from 'mode-watcher';
  import Nav from '$lib/components/layout/Nav.svelte';

  let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" />

<Nav />

<main class="min-h-screen">
  {@render children()}
</main>
