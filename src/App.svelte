<script lang="typescript">
  import Result from './Result.svelte';
  import ResultContainer from './ResultContainer.svelte';
  import SearchField from './SearchField.svelte';
  import type { ItemEntry, JSONResponse } from './interfaces';

  let apiKey: string;
  let apiKeySubmitted: boolean = false;
  let currentQuery: string;

  async function httpGET<T>(url: string, headers?: HeadersInit): Promise<T> {
    const request: Request = new Request(url, {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
    });
  
    return fetch(request)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
  
        return response.json() as Promise<T>;
      })
  }

  async function getJSONValues (): Promise<JSONResponse> {
      const response: JSONResponse =  await httpGET(
        `https://api.jsonbin.io/b/5ffaf3ce55b359028dbd32e3/3`,
        { 'secret-key': apiKey ?? '' }
      );
  
      return response;
  }

  function matchEntries (entries: ItemEntry[], query: string): ItemEntry[] {
    return entries.filter((entry) =>
      entry.name.toLowerCase().includes(query?.toLowerCase())
    );
  }

  function handleApiKeyEnter (event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      apiKeySubmitted = true;
    }
  }
</script>

<main>
  {#if apiKeySubmitted}
    <SearchField bind:currentQuery={currentQuery} />
    <ResultContainer>
      {#await getJSONValues() then response}
        {#each matchEntries(response.itemEntries, currentQuery) || [] as entry}
          <Result {entry} />
        {/each}
      {:catch}
        Error fetching values
      {/await}
    </ResultContainer>
  {:else}
    <input placeholder="API Key" bind:value={apiKey} on:keyup={handleApiKeyEnter} />
  {/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
