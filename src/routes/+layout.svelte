<script lang="ts">
  import "./app.css";
  import { ModeWatcher } from "mode-watcher";
  import Nav from "$lib/components/layout/Nav.svelte";
  import BackgroundLines from "$lib/components/ui/BackgroundLines.svelte";

  let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" />

<BackgroundLines />
<Nav />

<main class="min-h-screen">
  {@render children()}
</main>
