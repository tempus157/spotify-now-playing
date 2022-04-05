<script lang="ts">
  const name = "Spotify Now Playing";
  export let value: string | null = null;
</script>

{#if value === null}
  <title>{name}</title>
{:else}
  <title>{value} | {name}</title>
{/if}
