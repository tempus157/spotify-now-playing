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
      {songName}입니다
    </div>
    <div class={artistClass} bind:clientWidth={artistWidth}>
      {artist}입니다
    </div>
  </div>
</div>

<style>
  @font-face {
    font-family: "Product Sans Bold";
    src: url("/fonts/Product Sans Bold.ttf") format("truetype");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo Bold";
    src: url("/fonts/SpoqaHanSansNeo-Bold.ttf") format("truetype");
  }

  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background-color: var(--background-color);
    border-radius: var(--corner-rounding);
  }

  .album-art {
    width: 100vh;
    height: 100vh;
    border-radius: var(--corner-rounding);
  }

  .info {
    align-self: center;
    overflow: hidden;
    white-space: nowrap;
  }

  .name {
    width: fit-content;
    padding: 0 25vh 0 25vh;
    color: var(--name-color);
    font-family: "Product Sans Bold", "Spoqa Han Sans Neo Bold", serif;
    font-size: 30vh;
    text-shadow: 0 0 1px #000, 0 0 2px #000;
  }

  .artist {
    width: fit-content;
    padding: 0 25vh 0 25vh;
    color: var(--artist-color);
    font-family: "Product Sans Bold", "Spoqa Han Sans Neo Bold", sans-serif;
    font-size: 20vh;
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
