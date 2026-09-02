<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { onMount } from "svelte";

  interface Props {
    color?: string;
    opacity?: number;
  }

  let { color = "#61AFEF", opacity = 0.35 }: Props = $props();

  let mesh: any = $state();
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });

  let targetRotX = $state(0);
  let targetRotY = $state(0);

  $effect(() => {
    if (!mounted) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = x * 0.4;
      targetRotX = y * 0.3;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  });

  useTask((delta) => {
    if (!mesh) return;
    mesh.rotation.y += delta * 0.08;
    mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.05;
  });
</script>

<T.Mesh bind:ref={mesh}>
  <T.IcosahedronGeometry args={[2, 4]} />
  <T.MeshBasicMaterial {color} wireframe transparent {opacity} />
</T.Mesh>
