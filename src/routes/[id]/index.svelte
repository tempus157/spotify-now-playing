<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Title from "$components/Title.svelte";
  import type { NowPlaying } from "$routes/api/[id]";

  let infoWidth: number;
  let nameWidth: number;
  let artistWidth: number;
  let nowPlaying: NowPlaying | null;

  $: nameClass = nameWidth > infoWidth ? "name scroll" : "name";
  $: artistClass = artistWidth > infoWidth ? "artist scroll" : "artist";

  async function fetchData() {
    const res = await fetch(`/api/${$page.params.id}${$page.url.search}`);
    nowPlaying = res.status === 200 ? await res.json() : null;
  }

  onMount(() => {
    fetchData();
    setInterval(fetchData, 5000);
  });
</script>

<svelte:head>
  <Title value="Overlay" />
</svelte:head>

{#if nowPlaying}
  <div class="container">
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
    background-color: #2021343f;
    border-radius: 20vh;
  }

  .album-art {
    position: relative;
    width: 100vh;
    height: 100vh;
    border-radius: 20vh;
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
    color: #8ab4f8;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 30vh;
    line-height: 120%;
    text-shadow: 0 0 1px #000, 0 0 2px #000;
  }

  .artist {
    width: fit-content;
    padding: 0 25vh 0 25vh;
    color: #ffffff;
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
