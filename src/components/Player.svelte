<script lang="ts">
  import styleVars from "$libs/styleVars";

  export let songName: string;
  export let artist: string;
  export let albumArt: string;
  export let nameColor: string;
  export let artistColor: string;
  export let backgroundColor: string;
  export let cornerRounding: number;

  let infoWidth: number;
  let nameWidth: number;
  let artistWidth: number;

  $: nameClass = nameWidth > infoWidth ? "name scroll" : "name";
  $: artistClass = artistWidth > infoWidth ? "artist scroll" : "artist";

  $: style = styleVars({
    "name-color": nameColor,
    "artist-color": artistColor,
    "background-color": backgroundColor,
    "corner-rounding": `${cornerRounding / 2}vh`,
  });
</script>

<div class="container" {style}>
  <img src={albumArt} alt="Album Art" class="album-art" />
  <div class="info" bind:clientWidth={infoWidth}>
    <div class={nameClass} bind:clientWidth={nameWidth}>
      {songName}
    </div>
    <div class={artistClass} bind:clientWidth={artistWidth}>
      {artist}
    </div>
  </div>
</div>

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
