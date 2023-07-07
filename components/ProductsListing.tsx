"use client";
import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { IProducts, IProductsToAdd } from "@/shared/model/products.model";
import Image from "next/image";
import { CartContext, CartTotalContext } from "@/core/context";
import { cartTotalQuantities } from "@/shared/utils/cartTotalQuantities";
import { cartSubTotal } from "@/shared/utils/cartSubTotal";
import {v4 as uuidV4} from "uuid";

interface IProps {
  products: IProducts[] | null;
}

function ProductsListing({ products }: IProps) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { setTotal } = useContext(CartTotalContext);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const addToCart = (item: IProducts) => {
    const productToAdd: IProductsToAdd = {
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      orderId: uuidV4(),
      image: item.image,
      price: item.price,
      quantity: 1,
      total: item.price,
    };
    const copyCart = [...cartItems];
    const existingIndex = copyCart.findIndex(
      (product) => product.id === productToAdd.id
    );
    if (existingIndex === -1) {
      setCartItems((prevItems) => {
        return [...prevItems, productToAdd];
      });
    } else {
      copyCart[existingIndex].quantity += 1;
      copyCart[existingIndex].total =
        copyCart[existingIndex].price * copyCart[existingIndex].quantity;
      setCartItems(copyCart);
    }
  };

  useEffect(() => {
    const copyCart = [...cartItems];
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    localStorage.setItem("cartItems", JSON.stringify(copyCart));
    setTotal({
      totalQuantities: cartTotalQuantities(copyCart),
      subTotal: cartSubTotal(copyCart),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);
  return (
    <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products &&
        products.slice(0, 4).map((product) => {
          return (
            <ProductCard
              key={Math.random()}
              product={product}
              addToCart={addToCart}
            />
          );
        })}
      {products && (
        <figure className="md:col-span-full">
          <Image
            src="https://links.papareact.com/dyz"
            alt=""
            width={1000}
            height={1000}
            className="w-full"
          />
        </figure>
      )}
      {/* <div className="lg:col-span-2 xl:col-span-3">
          {products &&
            products.slice(4, 5).map((product) => {
              return <ProductCard key={Math.random()} {...product} />;
            })}
        </div>
        {products &&
          products.slice(5, 6).map((product) => {
            return <ProductCard key={Math.random()} {...product} />;
          })}
        {products &&
          products.slice(6, products.length).map((product) => {
            return <ProductCard key={Math.random()} {...product} />;
          })} */}
      {products &&
        products.length >= 5 &&
        products.slice(4, products.length).map((product) => {
          return (
            <ProductCard
              key={Math.random()}
              product={product}
              addToCart={addToCart}
            />
          );
        })}
    </div>
  );
}

export default ProductsListing;
