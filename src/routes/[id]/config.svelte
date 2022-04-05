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
  <Title value="Config" />
</svelte:head>

<div>
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

    <button>Save Preferences</button>
  </form>

  <button>Copy URL</button>
</div>

<style>
  label {
    display: block;
  }
</style>
