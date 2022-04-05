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
