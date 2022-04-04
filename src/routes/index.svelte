<script lang="ts">
  import Title from "$components/Title.svelte";

  let alpha: number = 255;
</script>

<svelte:head>
  <Title />
</svelte:head>

<div>
  <a href="0">
    <button class="connect">
      <img src="/static/spotify.png" alt="Spotify Logo" />
      <span>Connect Spotify</span>
    </button>
  </a>

  <div>
    <label>
      <span>Song Name Color</span>
      <input type="color" />
    </label>
  </div>

  <div>
    <label>
      <span>Artist Color</span>
      <input type="color" />
    </label>
  </div>

  <div>
    <label>
      <span>Background Color</span>
      <input type="color" />
    </label>
  </div>

  <div>
    <label>
      <span>Background Alpha</span>
      <input type="range" min="0" max="255" bind:value={alpha} />
      <span>{alpha}</span>
    </label>
  </div>

  <div>
    <input readonly value="url" />
    <button>Copy URL</button>
  </div>
</div>

<style>
  :root {
    --accent: #1db954;
  }

  .connect {
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: var(--accent);
    border-radius: 100px;
    border-color: transparent;
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
