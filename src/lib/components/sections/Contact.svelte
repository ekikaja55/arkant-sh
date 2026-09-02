<script lang="ts">
  import { cvData } from "$lib/data/cv";
  import { registerGsap, gsap } from "$lib/utils/animations";

  let container: HTMLElement;

  $effect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          once: true,
        },
      });
    }, container);

    return () => ctx.revert();
  });
</script>

<section
  id="contact"
  bind:this={container}
  class="max-w-3xl mx-auto px-6 py-32 text-center"
>
  <p class="font-mono text-sm text-accent-string mb-2 contact-reveal">
    <span class="text-text-muted">// </span>contact
  </p>

  <h2 class="text-3xl sm:text-4xl font-semibold text-text mb-4 contact-reveal">
    Let's build something.
  </h2>

  <p class="text-text-muted mb-10 max-w-md mx-auto contact-reveal">
    Open to freelance work, collaborations, or just a chat about code.
  </p>

  <div class="flex flex-wrap items-center justify-center gap-4 contact-reveal">
    {#each cvData.socials as social}
      <a
        href={social.url}
        target={social.url.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        class="px-4 py-2 rounded-md border border-text-muted/20 font-mono text-sm text-text-muted hover:border-accent-fn/50 hover:text-accent-fn transition-colors"
      >
        {social.label.toLowerCase()}
      </a>
    {/each}
  </div>
</section>
