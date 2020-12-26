// TODO:
// - Add tags to each item for querying categorically ('vegetable', 'meat'...)
// - Ability to add or edit items

import { APIKey, Store } from './interfaces';
import type { ItemEntry, StorePrice, SheetsResponse, SheetsResponseEntry } from './interfaces';

const searchField: HTMLElement | null = document.getElementById('search-input');
const results: HTMLElement | null = document.getElementById('search-results');

let apiKey: string | null = getAPIKey();
if (!apiKey || apiKey === '') {
    apiKey = prompt('Enter API key: ');
    window.localStorage.setItem('apiKey', apiKey ?? '');
};

const onSearchChange = async (e: any): Promise<void> => {
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

const createSearchEntry = (match: ItemEntry): HTMLDivElement => {
    const container: HTMLDivElement = document.createElement('div') as HTMLDivElement;

    const title: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    const titleValue: Text = document.createTextNode(match.name) as Text;

    const prices: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    const storePrices: StorePrice[] = match.prices.filter((storePrice: StorePrice) => storePrice.price);

    console.log(storePrices);

    const priceNodes: Array<Text> = storePrices.map((storePrice: StorePrice ) =>
      document.createTextNode(`${storePrice.store.toUpperCase()}: €${storePrice.price}`) as Text
    );

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

const createErrorEntry = (): HTMLDivElement => {
    const container: HTMLDivElement = document.createElement('div') as HTMLDivElement;

    const title: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    const titleValue: Text = document.createTextNode('No results found!') as Text;

    title.appendChild(titleValue);
    title.classList.add('search-entry-title');

    container.appendChild(title);
    container.classList.add('search-entry');

    return container;
};

const removeAllChildren = (element: HTMLElement): void => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
};

async function httpGET<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json() as Promise<T>;
    })
}

async function getSheetValues (): Promise<SheetsResponse> {
    return await httpGET(`https://sheets.googleapis.com/v4/spreadsheets/1Cx9IaOz8IYaJZu8Qerj2gLucWkhgHrj4AGuHiAtjSmg/values/Sheet1?key=${apiKey}&valueRenderOption=UNFORMATTED_VALUE&majorDimension=ROWS`);
}

async function getItemEntries (): Promise<ItemEntry[]> {

    if (!document.cookie.includes('itemEntriesLastUpdate')) {
        window.localStorage.removeItem('itemEntries');
    };

    try {
        const storedItemEntries: ItemEntry[] = JSON.parse(window.localStorage.getItem('itemEntries') ?? '');
        return storedItemEntries;
    } catch(e) {
        console.warn('Could not find cached items, trying API call...');
    }

    const response: SheetsResponse = await getSheetValues();
    const entries: SheetsResponseEntry[] = response.values;
    console.log(entries);
    const itemEntries: ItemEntry[] = entries.map((entry: SheetsResponseEntry) => Object({
        name: entry[0],
        prices: [
            {
                store: Store.HOFER,
                price: Number(entry[1]),
            },
            {
                store: Store.EUROSPIN,
                price: Number(entry[2]),
            },
            {
                store: Store.TUS,
                price: Number(entry[3]),
            },
            {
                store: Store.SPAR,
                price: Number(entry[4]),
            },
            {
                store: Store.MERCATOR,
                price: Number(entry[5]),
            },
        ],
    }));

    window.localStorage.setItem('itemEntries', JSON.stringify(itemEntries));
    document.cookie = `itemEntriesLastUpdate=${Date.now()};max-age=86400;samesite=strict`;

    return itemEntries;
}

function getAPIKey (): string | null {
    try {
        const storedAPIKey: APIKey = JSON.parse(window.localStorage.getItem('apiKey') ?? '');
        return storedAPIKey.value;
    } catch(e) {
        console.warn('Could not find API key. Requests will fail.');
        return null;
    }
}
