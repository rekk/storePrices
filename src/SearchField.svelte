<script lang="ts">
  export let currentQuery: string;
</script>

<main>
  <input bind:value={currentQuery} placeholder="Search..." />
</main>
