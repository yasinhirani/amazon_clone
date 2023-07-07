import { IBase } from "@/core/model/auth.model";

export interface IProducts {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
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
export interface ISearchResults {
  id: number;
  type: string;
  position: number;
  name: string;
  image: string;
  has_prime: boolean;
  is_best_seller: boolean;
  is_amazon_choice: boolean;
  is_limited_deal: boolean;
  stars: number;
  total_reviews: number;
  url: string;
  availability_quantity: null;
  price_string: string;
  price_symbol: string;
  price: number;
}

export interface IOrders {
  title: string;
  image: string;
  quantity: number;
  price: number;
  orderId: string;
  orderedOn: Date;
}
export interface IOrdersReq {
  userEmail: string;
  items: IOrders[]
}
export interface IOrdersRes
  extends IBase<{ success: boolean; message: string }> {}
export interface IUserOrdersRes
  extends IBase<{ success: boolean; message: string; orders: IOrders[] }> {}
