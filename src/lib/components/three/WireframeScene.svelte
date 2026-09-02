<script lang="ts">
  import { Canvas, T } from "@threlte/core";
  import WireframeMesh from "./WireframeMesh.svelte";
  import { mode } from "mode-watcher";

  let color = $derived(mode.current === "dark" ? "#61AFEF" : "#1E5A8A");
  let opacity = $derived(mode.current === "dark" ? 0.6 : 0.75);
</script>

<Canvas>
  <T.PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
  <WireframeMesh {color} {opacity} />
</Canvas>
