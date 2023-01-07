export type FetchPizzasArgs = {
  currentPage: number,
  categoryId: number,
  searchValue: string,
  sort: {
    sortProperty: string
  },
};

export type PizzaItems = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItems[],
  status: Status,
}
