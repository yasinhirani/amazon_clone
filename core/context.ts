'use client';
import {
  ICartItemsContext,
  ICartTotalContext,
  ISearch,
} from "@/shared/model/products.model";
import { createContext } from "react";

const CartContext = createContext<ICartItemsContext>({
  cartItems: [],
  setCartItems: () => [],
});

const CartTotalContext = createContext<ICartTotalContext>({
  total: null,
  setTotal: () => {},
});

const SearchTextContext = createContext<ISearch>({
  searchText: null,
  setSearchText: () => {},
});

export { CartContext, CartTotalContext, SearchTextContext };
