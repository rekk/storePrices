// TODO:
// - Add tags to each item for querying categorically ('vegetable', 'meat'...)
// - Ability to add or edit items
const searchField: HTMLElement | null = document.getElementById('search-input');
const results: HTMLElement | null = document.getElementById('search-results');

const onSearchChange = async (e: any): Promise<void> => {
    if (!results || !e?.currentTarget?.value) {
      return;
    };

    results.removeAttribute('hidden');

    const newValue: string = e.currentTarget.value.trim().toLowerCase();
    
    if (!newValue) {
        return;
    };

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

enum Store {
  HOFER = 'HOFER',
  EUROSPIN = 'EUROSPIN',
  TUS = 'TUS',
  SPAR = 'SPAR',
  MERCATOR = 'MERCATOR'
}

interface StorePrice {
  store: Store;
  price: number;
}

interface ItemEntry {
    name: string;
    prices: StorePrice[];
}

// Indices returned from Sheets API
// 1: Hofer
// 2: EuroSpin
// 3: Tuš	
// 4: Spar
// 5: Mercator
type SheetsResponseEntry  = Array<string | number>;

interface SheetsResponse {
    values: SheetsResponseEntry[];
}

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
    return await httpGET('https://sheets.googleapis.com/v4/spreadsheets/1Cx9IaOz8IYaJZu8Qerj2gLucWkhgHrj4AGuHiAtjSmg/values/Sheet1?key=AIzaSyAvMtXOs19y_kMNKSxvs8tCXGkof4vh3bY&valueRenderOption=UNFORMATTED_VALUE&majorDimension=ROWS');
}

async function getItemEntries (): Promise<ItemEntry[]> {
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

    return itemEntries;
}
