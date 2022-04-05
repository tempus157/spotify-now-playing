<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Title from "$components/Title.svelte";
  import type { NowPlaying } from "$routes/api/[id]";
  import type { Config } from "$routes/api/[id]/config";

  let config: Config | null;
  let nowPlaying: NowPlaying | null;

  let infoWidth: number;
  let nameWidth: number;
  let artistWidth: number;

  $: nameClass = nameWidth > infoWidth ? "name scroll" : "name";
  $: artistClass = artistWidth > infoWidth ? "artist scroll" : "artist";

  $: styles = [
    `--name-color: ${config?.nameColor}`,
    `--artist-color: ${config?.artistColor}`,
    `--background-color: ${
      config?.backgroundColor +
      Math.round((config?.backgroundOpacity / 100) * 255).toString(16)
    }`,
    `--corner-rounding: ${config?.cornerRounding / 2}vh`,
  ].join(";");

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
    setInterval(fetchNowPlaying, 5000);
  });
</script>

<svelte:head>
  <Title value="Overlay" />
</svelte:head>

{#if config && nowPlaying}
  <div class="container" style={styles}>
    <img src={nowPlaying.albumArt} alt="Album Art" class="album-art" />
    <div class="info" bind:clientWidth={infoWidth}>
      <div class={nameClass} bind:clientWidth={nameWidth}>
        {nowPlaying.name}
      </div>
      <div class={artistClass} bind:clientWidth={artistWidth}>
        {nowPlaying.artists.join(", ")}
      </div>
    </div>
  </div>
{:else}
  <div />
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap");

  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background-color: var(--background-color);
    border-radius: var(--corner-rounding);
  }

  .album-art {
    position: relative;
    width: 100vh;
    height: 100vh;
    border-radius: var(--corner-rounding);
  }

  .info {
    width: calc(100vw - 100vh);
    padding-bottom: 10vh;
    align-self: center;
    overflow: hidden;
    white-space: nowrap;
  }

  .name {
    width: fit-content;
    padding: 0 25vh 0 25vh;
    color: var(--name-color);
    font-family: "Noto Sans KR", sans-serif;
    font-size: 30vh;
    line-height: 120%;
    text-shadow: 0 0 1px #000, 0 0 2px #000;
  }

  .artist {
    width: fit-content;
    padding: 0 25vh 0 25vh;
    color: var(--artist-color);
    font-family: "Noto Sans KR", sans-serif;
    font-size: 20vh;
    line-height: 120%;
    text-shadow: 0 0 1px #000, 0 0 2px #000;
  }

  .scroll {
    animation: slide 10s linear infinite;
  }

  @keyframes slide {
    from {
      transform: translateX(calc(100vw - 100vh));
    }
    to {
      transform: translateX(-100%);
    }
  }
</style>
