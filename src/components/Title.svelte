<script lang="ts">
  const name = "Spotify Overlay";
  export let value: string | null = null;
</script>

{#if value === null}
  <title>{name}</title>
{:else}
  <title>{value} | {name}</title>
{/if}
