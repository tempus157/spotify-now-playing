<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Title from "$components/Title.svelte";
  import type { Config } from "$routes/api/[id]/config";

  let endpoint = `/api/${$page.params.id}/config`;
  let config: Config;

  async function updateConfig() {
    await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(config),
    });
  }

  onMount(async () => {
    const res = await fetch(endpoint);
    if (res.status !== 200) {
      goto("/");
    }
    config = await res.json();
  });
</script>

<svelte:head>
  <Title value="Config" />
</svelte:head>

<div>
  {#if config}
    <form on:submit|preventDefault={updateConfig}>
      <label>
        <span>Song Name Color</span>
        <input type="color" bind:value={config.nameColor} />
      </label>

      <label>
        <span>Artist Color</span>
        <input type="color" bind:value={config.artistColor} />
      </label>

      <label>
        <span>Background Color</span>
        <input type="color" bind:value={config.backgroundColor} />
      </label>

      <label>
        <span>Background Opacity</span>
        <input
          type="range"
          min="0"
          max="100"
          bind:value={config.backgroundOpacity}
        />
        <span>{config.backgroundOpacity}%</span>
      </label>

      <label>
        <span>Corner Rounding</span>
        <input
          type="range"
          min="0"
          max="100"
          bind:value={config.cornerRounding}
        />
        <span>{config.cornerRounding}%</span>
      </label>

      <button>Save Config</button>
    </form>

    <button>Copy URL</button>
  {:else}
    <div>Loading...</div>
  {/if}
</div>

<style>
  label {
    display: block;
  }
</style>
