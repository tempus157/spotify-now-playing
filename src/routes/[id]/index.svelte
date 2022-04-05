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
    const config = await fetch(`/api/${$page.params.id}/config`);
    return config.status === 200 ? await config.json() : null;
  }

  async function fetchNowPlaying() {
    const nowPlaying = await fetch(
      `/api/${$page.params.id}${$page.url.search}`
    );
    return nowPlaying.status === 200 ? await nowPlaying.json() : null;
  }

  onMount(async () => {
    config = await fetchConfig();
    nowPlaying = await fetchNowPlaying();
    setInterval(fetchNowPlaying, 5000);
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
