export enum Store {
  HOFER = 'HOFER',
  EUROSPIN = 'EUROSPIN',
  TUS = 'TUS',
  SPAR = 'SPAR',
  MERCATOR = 'MERCATOR'
}

export interface StorePrice {
  store: Store;
  price: number;
}

export interface ItemEntry {
    name: string;
    prices: StorePrice[];
}

// Indices returned from Sheets API
// 1: Hofer
// 2: EuroSpin
// 3: Tuš	
// 4: Spar
// 5: Mercator
export type SheetsResponseEntry  = Array<string | number>;

export interface SheetsResponse {
    values: SheetsResponseEntry[];
}

export interface APIKey {
    value: string;
}
