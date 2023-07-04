import { IProductsToAdd } from "../model/products.model";

export const cartSubTotal = (cartItems: IProductsToAdd[]) => {
  return cartItems.reduce((acc, value) => acc + value.total, 0);
};
