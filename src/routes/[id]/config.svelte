<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Title from "$components/Title.svelte";
  import ColorSelector from "$components/ColorSelector.svelte";
  import type { Config } from "$routes/api/[id]/config";

  const endpoint = `/api/${$page.params.id}/config`;
  let config: Config;

  async function updateConfig() {
    await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(config),
    });
    alert("Config saved.");
  }

  async function copyURL() {
    const url = new URL(`${$page.url.origin}/${$page.params.id}`);
    url.searchParams.append("secret", config.secret);
    await navigator.clipboard.writeText(url.toString());
    alert("Copied. Please do not share this with anyone.");
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
      <div>
        <span class="label">Song Name Color</span>
        <ColorSelector bind:value={config.nameColor} />
      </div>

      <div>
        <span class="label">Artist Color</span>
        <ColorSelector bind:value={config.artistColor} />
      </div>

      <div>
        <span class="label">Background Color</span>
        <ColorSelector bind:value={config.backgroundColor} />
      </div>

      <div>
        <span class="label">Background Opacity</span>
        <input
          type="range"
          min="0"
          max="100"
          bind:value={config.backgroundOpacity}
        />
        <span>{config.backgroundOpacity}%</span>
      </div>

      <div>
        <span class="label">Corner Rounding</span>
        <input
          type="range"
          min="0"
          max="100"
          bind:value={config.cornerRounding}
        />
        <span>{config.cornerRounding}%</span>
      </div>

      <button>Save Config</button>
      <button type="button" on:click={copyURL}>Copy URL</button>
    </form>
  {:else}
    <div>Loading...</div>
  {/if}
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 40rem;
  }

  form div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  form div .label {
    width: 18rem;
  }

  form div input {
    flex-grow: 1;
  }

  form button {
    padding: 1rem;
    background-color: var(--accent-color);
    color: white;
    font-size: 1.6rem;
    border: 0;
    border-radius: 9999px;
    cursor: pointer;
  }
</style>
