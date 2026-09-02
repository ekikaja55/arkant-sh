<script lang="ts">
  interface Props {
    status: 'live' | 'archived' | 'wip';
  }

  let { status }: Props = $props();

  const config = {
    live: { label: 'live', dot: 'bg-accent-string', text: 'text-accent-string' },
    wip: { label: 'wip', dot: 'bg-accent-number', text: 'text-accent-number' },
    archived: { label: 'archived', dot: 'bg-text-muted', text: 'text-text-muted' }
  };
</script>

<span class="inline-flex items-center gap-1.5 font-mono text-xs {config[status].text}">
  <span class="w-1.5 h-1.5 rounded-full {config[status].dot}"></span>
  {config[status].label}
</span>
