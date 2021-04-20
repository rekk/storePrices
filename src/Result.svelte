<script lang="ts">
  import type { ItemEntry } from './interfaces';

  export let entry: ItemEntry;
</script>

<main class="result">
  <div class="result-name">{entry.name}</div>
  {Object.entries(entry?.prices ?? {}).map(entry => entry?.[0]?.toUpperCase() + ': ' + entry?.[1])}
</main>

<style>
  .result {
    padding: 1rem;
    margin: 2rem;
    background: #333;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 12px 24px;
    border-radius: 8px;
    transition: 0.5s;
    overflow: clip;
  }
  .result:hover {
    transform: translateY(-8px);
  }
  .result-name {
    font-weight: bold;
  }
</style>
