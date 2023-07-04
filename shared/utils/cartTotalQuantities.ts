import { IProductsToAdd } from "../model/products.model";

export const cartTotalQuantities = (cartItems: IProductsToAdd[]) => {
  return cartItems.reduce((acc, value) => acc + value.quantity, 0);
};
