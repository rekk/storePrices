export enum Store {
  HOFER = 'hofer',
  EUROSPIN = 'eurospin',
  TUS = 'tus',
  SPAR = 'spar',
  MERCATOR = 'mercator'
}

export interface StorePrice {
  store: Store;
  price: number;
}

export interface ItemEntry {
    name: string;
    prices: StorePrice[];
}

export interface JSONResponse {
    itemEntries: ItemEntry[];
}

export interface APIKey {
    value: string;
}
