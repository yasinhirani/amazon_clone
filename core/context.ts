"use client";
import {
  ICartItemsContext,
  ICartTotalContext,
  ISearch,
} from "@/shared/model/products.model";
import { createContext } from "react";
import { IAuthDataContext } from "./model/auth.model";

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

const AuthDataContext = createContext<IAuthDataContext>({
  authData: null,
  setAuthData: () => {},
});

export { CartContext, CartTotalContext, SearchTextContext, AuthDataContext };
