<script lang="ts">
  import Title from "$components/Title.svelte";

  let nameColor = "#8ab4f8";
  let artistColor = "#ffffff";
  let backgroundColor = "#202124";
  let backgroundOpacity = 25;
  let cornerRounding = 40;

  function hello() {
    alert("Hello");
  }
</script>

<svelte:head>
  <Title />
</svelte:head>

<div>
  {#if true}
    <a href="/api/auth">
      <button class="connect">
        <img src="/static/spotify.png" alt="Spotify Logo" />
        <span>Connect Spotify</span>
      </button>
    </a>
  {:else}
    <form on:submit|preventDefault={hello}>
      <label>
        <span>Song Name Color</span>
        <input type="color" bind:value={nameColor} />
      </label>

      <label>
        <span>Artist Color</span>
        <input type="color" bind:value={artistColor} />
      </label>

      <label>
        <span>Background Color</span>
        <input type="color" bind:value={backgroundColor} />
      </label>

      <label>
        <span>Background Opacity</span>
        <input type="range" min="0" max="100" bind:value={backgroundOpacity} />
        <span>{backgroundOpacity}%</span>
      </label>

      <label>
        <span>Corner Rounding</span>
        <input type="range" min="0" max="100" bind:value={cornerRounding} />
        <span>{cornerRounding}%</span>
      </label>

      <button>Save Config</button>
    </form>

    <button>Copy URL</button>
  {/if}
</div>

<style>
  label {
    display: block;
  }

  .connect {
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: #1db954;
    border-color: transparent;
    border-radius: 100px;
  }

  .connect img {
    width: 40px;
    height: 40px;
  }

  .connect span {
    margin: 0 5px 0 10px;
    color: white;
    font-size: x-large;
  }
</style>
