<script lang="ts">
  import Title from "$components/Title.svelte";

  let alpha: number = 255;
  let radius: number = 0;

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
      <input type="color" />
    </label>

    <label>
      <span>Artist Color</span>
      <input type="color" />
    </label>

    <label>
      <span>Background Color</span>
      <input type="color" />
    </label>

    <label>
      <span>Background Alpha</span>
      <input type="range" min="0" max="255" bind:value={alpha} />
      <span>{alpha}</span>
    </label>

    <label>
      <span>Corner Rounding</span>
      <input type="range" min="0" max="100" bind:value={radius} />
      <span>{radius}%</span>
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
