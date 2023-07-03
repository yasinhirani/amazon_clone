export interface IProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: IRating;
}
export interface IRating {
  rate: number;
  count: number;
}
export interface IProductsToAdd extends IProducts {
  quantity: number;
  orderId: string;
  total: number;
}
export interface ICartItemsContext {
  cartItems: IProductsToAdd[];
  setCartItems: React.Dispatch<React.SetStateAction<IProductsToAdd[]>>;
}
export interface ICartTotal {
  totalQuantities: number;
  subTotal: number;
}

export interface ICartTotalContext {
  total: ICartTotal | null;
  setTotal: React.Dispatch<React.SetStateAction<ICartTotal | null>>;
}
export interface ISearch {
  searchText: string | null;
  setSearchText: React.Dispatch<React.SetStateAction<string | null>>;
}
