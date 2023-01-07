import {calcTotalPrice} from './calcTotalPrice';
import {CartItemType} from '../redux/cart/types';

export const getCartFromLS = () => {
  const storageData = localStorage.getItem('cartItems');
  const items = storageData ? JSON.parse(storageData) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItemType[],
    totalPrice,
  };
};
