
export type CartItemType = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  count: number,
  types: string,
  sizes: number,
};

export interface CartSliceState {
  totalPrice: number,
  items: CartItemType[],
}
