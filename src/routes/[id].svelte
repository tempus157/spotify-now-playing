<script lang="ts">
  import Title from "$components/Title.svelte";

  import type { Output } from "./[id]";

  export let output: Output;
  let infoWidth: number;
  let nameWidth: number;
  let artistWidth: number;

  $: nameClass = nameWidth > infoWidth ? "name scroll" : "name";
  $: artistClass = artistWidth > infoWidth ? "artist scroll" : "artist";
</script>

<svelte:head>
  {#if !output}
    <Title value="Not Playing" />
  {:else}
    <Title value={`${output.track.name} - ${output.track.artist}`} />
  {/if}
</svelte:head>

{#if !output}
  <div />
{:else}
  <div class="container">
    <img src={output.track.albumArt} alt="Album Art" class="album-art" />
    <div class="info" bind:clientWidth={infoWidth}>
      <div class={nameClass} bind:clientWidth={nameWidth}>
        {output.track.name}
      </div>
      <div class={artistClass} bind:clientWidth={artistWidth}>
        {output.track.artist}
      </div>
    </div>
  </div>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap");

  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
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
    padding-left: 25vh;
    color: white;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 30vh;
    line-height: 120%;
    text-shadow: 0 0 1px #000, 0 0 2px #000;
  }

  .artist {
    width: fit-content;
    padding-left: 25vh;
    color: gray;
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
