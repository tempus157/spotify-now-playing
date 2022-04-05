<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Title from "$components/Title.svelte";
  import Player from "$components/Player.svelte";
  import type { NowPlaying } from "$routes/api/[id]";
  import type { Config } from "$routes/api/[id]/config";

  let config: Config | null;
  let nowPlaying: NowPlaying | null;

  async function fetchConfig() {
    const res = await fetch(`/api/${$page.params.id}/config`);
    config = res.status === 200 ? await res.json() : null;
  }

  async function fetchNowPlaying() {
    const res = await fetch(`/api/${$page.params.id}${$page.url.search}`);
    nowPlaying = res.status === 200 ? await res.json() : null;
  }

  onMount(() => {
    fetchConfig();
    fetchNowPlaying();
    setInterval(fetchNowPlaying, 10000);
  });
</script>

<svelte:head>
  <Title value="Overlay" />
</svelte:head>

{#if config && nowPlaying}
  <Player
    songName={nowPlaying.name}
    artist={nowPlaying.artists.join(", ")}
    albumArt={nowPlaying.albumArt}
    nameColor={config.nameColor}
    artistColor={config.artistColor}
    backgroundColor={config.backgroundColor +
      Math.round((config.backgroundOpacity / 100) * 255).toString(16)}
    cornerRounding={config.cornerRounding}
  />
{:else}
  <div />
{/if}
