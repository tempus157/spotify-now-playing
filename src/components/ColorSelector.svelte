<script lang="ts">
  import styleVars from "$libs/styleVars";

  export let value = "#000000";
  $: style = styleVars({ value });
</script>

<label {style}>
  <input type="color" bind:value />
  <span>{value.toUpperCase()}</span>
  <div />
</label>

<style>
  :root {
    --border-radius: 0.5rem;
  }

  label {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem;
    border: 0.1rem solid gray;
    border-radius: var(--border-radius);
  }

  input {
    display: none;
  }

  div {
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--value);
    border: 0.1rem solid rgba(128, 128, 128, 0.5);
    border-radius: var(--border-radius);
  }

  span {
    margin-left: 0.5rem;
    width: 8rem;
  }
</style>
