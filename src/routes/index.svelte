<script lang="ts">
  import Title from "$components/Title.svelte";
</script>

<svelte:head>
  <Title />
</svelte:head>

<div>
  <a href="/api/auth">
    <button class="connect">
      <img src="/images/spotify.png" alt="Spotify Logo" />
      <span>Connect Spotify</span>
    </button>
  </a>
</div>

<style>
  a {
    text-decoration: none;
  }

  .connect {
    padding: 1rem;
    display: flex;
    align-items: center;
    background-color: var(--accent-color);
    border: 0;
    border-radius: 9999px;
  }

  .connect img {
    width: 4rem;
    height: 4rem;
  }

  .connect span {
    margin: 0 0.5rem 0 1rem;
    color: white;
    font-size: 2.2rem;
  }
</style>
