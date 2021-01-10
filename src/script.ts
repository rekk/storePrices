// TODO:
// - Add tags to each item for querying categorically ('vegetable', 'meat'...)
// - Ability to add or edit items

import type { APIKey, JSONResponse, ItemEntry, StorePrice } from './interfaces';

const searchField: HTMLElement | null = document.getElementById('search-input');
const results: HTMLElement | null = document.getElementById('search-results');

let apiKey: string | null = getAPIKey();
if (!apiKey || apiKey === '') {
    apiKey = prompt('Enter API key: ');
    window.localStorage.setItem('apiKey', JSON.stringify({ value: apiKey } as APIKey));
};

async function onSearchChange (e: any): Promise<void> {
    if (!results || !e?.currentTarget?.value) {
      return;
    };

    const newValue: string = e.currentTarget.value.trim().toLowerCase();
    
    if (!newValue) {
        return;
    };

    results.removeAttribute('hidden');

    const itemEntries: ItemEntry[] = await getItemEntries();

    const matches: ItemEntry[] = itemEntries.filter((item: ItemEntry) =>
        (item.name.toLowerCase().includes(newValue))
    );

    if (matches.length < 1) {
        removeAllChildren(results);
        results.appendChild(createErrorEntry());

        return;
    };

    const elements: Array<HTMLDivElement> = matches.map((match: ItemEntry) => {
        return createSearchEntry(match);
    });

    removeAllChildren(results);
    elements.forEach(element => results.appendChild(element));
}; 

searchField?.addEventListener('change', onSearchChange);

function createSearchEntry (match: ItemEntry): HTMLDivElement {
    const container: HTMLDivElement = document.createElement('div') as HTMLDivElement;

    const title: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    const titleValue: Text = document.createTextNode(match.name) as Text;

    const prices: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    const storePrices: StorePrice[] = match.prices as StorePrice[];

    const priceNodes: Array<Text> = Object.entries(storePrices).map(
      ([store, price]) => document.createTextNode(`${store.toUpperCase()}: €${price}`) as Text);

    title.appendChild(titleValue);
    title.classList.add('search-entry-title');
    priceNodes.forEach((node: Text) => { 
        prices.appendChild(node)
        prices.appendChild(document.createElement('br'))
    });
    
    container.appendChild(title);
    container.appendChild(prices);
    container.classList.add('search-entry');

    return container;
};

function createErrorEntry (): HTMLDivElement {
    const container: HTMLDivElement = document.createElement('div') as HTMLDivElement;

    const title: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    const titleValue: Text = document.createTextNode('No results found!') as Text;

    title.appendChild(titleValue);
    title.classList.add('search-entry-title');

    container.appendChild(title);
    container.classList.add('search-entry');

    return container;
};

function removeAllChildren (element: HTMLElement): void {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
};

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
      `https://api.jsonbin.io/b/5ffaf3ce55b359028dbd32e3/2`,
      { 'secret-key': apiKey ?? '' }
    );

    return response;
}

async function getItemEntries (): Promise<ItemEntry[]> {

    if (!document.cookie.includes('itemEntriesLastUpdate')) {
        window.localStorage.removeItem('itemEntries');
    };

    try {
        const storedItemEntries: ItemEntry[] = JSON.parse(window.localStorage.getItem('itemEntries') ?? '');
        return storedItemEntries;
    } catch(e) {
        // eslint-disable-next-line no-console
        console.warn('Could not find cached items, trying API call...');
    }

    const response: JSONResponse = await getJSONValues();
    const itemEntries: ItemEntry[] = response.itemEntries;

    window.localStorage.setItem('itemEntries', JSON.stringify(itemEntries));
    document.cookie = `itemEntriesLastUpdate=${Date.now()};max-age=86400;samesite=strict`;

    return itemEntries;
}

function getAPIKey (): string | null {
    try {
        const storedAPIKey: APIKey = JSON.parse(window.localStorage.getItem('apiKey') ?? '');
        return storedAPIKey.value;
    } catch(e) {
        // eslint-disable-next-line no-console 
        console.warn('Could not find API key.');
        return null;
    }
}
