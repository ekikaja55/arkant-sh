<script lang="ts">
  import Hero from '$lib/components/sections/Hero.svelte';
  import Experience from '$lib/components/sections/Experience.svelte';
  import Projects from '$lib/components/sections/Projects.svelte';
  import Contact from '$lib/components/sections/Contact.svelte';

  import { cvData } from '$lib/data/cv';

  const title = `${cvData.name} — ${cvData.role}`;
  const description = cvData.tagline;
  const url = 'https://arkant-sh.vercel.app'; // sesuaikan domain final
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content="{url}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:site_name" content="arkant.sh" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="{url}/og-image.png" />

  <link rel="canonical" href={url} />
</svelte:head>

<Hero />
<Experience />
<Projects />
<Contact />
