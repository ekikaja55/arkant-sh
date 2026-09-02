<!-- src/lib/components/ui/TypedText.svelte -->
<script lang="ts">
  interface Props {
    text: string | string[];
    speed?: number;
    deleteSpeed?: number;
    pauseAfterType?: number;
    pauseAfterDelete?: number;
    delay?: number;
    loop?: boolean;
    class?: string;
    onComplete?: () => void;
  }

  let {
    text,
    speed = 45,
    deleteSpeed = 25,
    pauseAfterType = 1800,
    pauseAfterDelete = 400,
    delay = 0,
    loop = false,
    class: className = "",
    onComplete,
  }: Props = $props();

  let texts = $derived(Array.isArray(text) ? text : [text]);

  let displayed = $state("");
  let firstPassDone = $state(false);

  $effect(() => {
    let cancelled = false;
    let textIndex = 0;

    function wait(ms: number) {
      return new Promise<void>((resolve) => setTimeout(resolve, ms));
    }

    async function typeOnce(str: string) {
      for (let i = 0; i <= str.length; i++) {
        if (cancelled) return;
        displayed = str.slice(0, i);
        await wait(speed);
      }
    }

    async function deleteOnce(str: string) {
      for (let i = str.length; i >= 0; i--) {
        if (cancelled) return;
        displayed = str.slice(0, i);
        await wait(deleteSpeed);
      }
    }

    async function run() {
      await wait(delay);

      do {
        const current = texts[textIndex % texts.length];
        await typeOnce(current);
        if (cancelled) return;

        if (!firstPassDone) {
          firstPassDone = true;
          onComplete?.();
        }

        if (!loop && textIndex >= texts.length - 1) break;

        await wait(pauseAfterType);
        if (cancelled) return;

        await deleteOnce(current);
        if (cancelled) return;

        await wait(pauseAfterDelete);
        textIndex++;
      } while (loop || textIndex < texts.length);
    }

    run();

    return () => {
      cancelled = true;
    };
  });
</script>

<span class={className}>
  {displayed}<span
    class="inline-block w-0.5 h-[1em] bg-accent-fn ml-0.5 align-middle animate-pulse"
  ></span>
</span>
