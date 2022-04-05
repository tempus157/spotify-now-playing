<script lang="ts">
  const name = "Spotify Now Playing";
  export let value: string | null = null;
</script>

{#if value}
  <title>{value} | {name}</title>
{:else}
  <title>{name}</title>
{/if}
