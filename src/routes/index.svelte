<script lang="ts">
  import Title from "$components/Title.svelte";
</script>

<svelte:head>
  <Title />
</svelte:head>

<div>
  <a href="/api/auth">
    <button class="connect">
      <img src="/static/spotify.png" alt="Spotify Logo" />
      <span>Connect Spotify</span>
    </button>
  </a>
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
