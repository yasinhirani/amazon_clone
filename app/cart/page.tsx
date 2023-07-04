"use client";
import Navbar from "@/components/Navbar";
import { CartContext, CartTotalContext } from "@/core/context";
import { IProductsToAdd } from "@/shared/model/products.model";
import { cartSubTotal } from "@/shared/utils/cartSubTotal";
import { cartTotalQuantities } from "@/shared/utils/cartTotalQuantities";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { total, setTotal } = useContext(CartTotalContext);

  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const addToCart = (item: IProductsToAdd) => {
    const productToAdd: IProductsToAdd = {
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      orderId: "abc123",
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

  const removeFromCart = (item: IProductsToAdd) => {
    const copyCart = [...cartItems];
    const itemToRemoveIndex = copyCart.findIndex(
      (product) => product.orderId === item.orderId
    );
    if (copyCart[itemToRemoveIndex].quantity > 1) {
      copyCart[itemToRemoveIndex].quantity -= 1;
      copyCart[itemToRemoveIndex].total =
        copyCart[itemToRemoveIndex].quantity *
        copyCart[itemToRemoveIndex].price;
      setCartItems(copyCart);
    } else {
      copyCart.splice(itemToRemoveIndex, 1);
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
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="bg-gray-100 flex-grow">
        <div className="w-full max-w-[90rem] mx-auto px-6 py-6 flex flex-col lg:flex-row lg:space-x-6 space-y-8 lg:space-y-0">
          <section className="flex-grow">
            <figure className="md:col-span-full">
              <Image
                src="https://links.papareact.com/ikj"
                alt=""
                width={1020}
                height={250}
                className="w-full"
              />
            </figure>
            {cartItems.length === 0 && (
              <div className="mt-5 border-b pb-2">
                <p className="font-semibold text-2xl">Your Cart is Empty</p>
              </div>
            )}
            {cartItems.length > 0 && (
              <>
                <div className="my-5 border-b pb-2">
                  <p className="font-semibold text-2xl">Shopping Cart</p>
                </div>
                <div className="flex flex-col space-y-10 bg-white p-4 rounded">
                  {cartItems.map((item) => {
                    return (
                      <div
                        key={Math.random()}
                        className="flex flex-col sm:flex-row justify-between sm:items-center sm:space-x-10 space-y-6 sm:space-y-0"
                      >
                        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-10 space-x-6 sm:space-y-0">
                          <figure>
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={300}
                              height={300}
                              className="w-32 h-32 max-w-[128px] lg:w-52 lg:h-52 lg:max-w-[200px] object-contain"
                              priority
                            />
                          </figure>
                          <div>
                            <p className="font-medium text-2xl line-clamp-1">
                              {item.title}
                            </p>
                            {/* <p className="font-medium mt-3 line-clamp-3">
                              {item.description}
                            </p> */}
                            <p className="font-medium text-sm mt-1">
                              quantity: {item.quantity}
                            </p>
                            <div className="flex items-start mt-4">
                              <span className="text-sm font-medium">₹</span>
                              <span className="text-3xl font-medium">
                                {item.price}
                              </span>
                              <span className="text-sm font-medium">00</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-5 whitespace-nowrap">
                          <button
                            type="button"
                            className="btn-add-remove"
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart
                          </button>
                          <button
                            type="button"
                            className="btn-add-remove"
                            onClick={() => removeFromCart(item)}
                          >
                            Remove from Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
          {cartItems.length > 0 && (
            <section className="w-full lg:max-w-[30%] bg-white p-4">
              <h4 className="font-semibold text-lg">
                Subtotal ({total?.totalQuantities} Items): ₹{total?.subTotal}
              </h4>
              <button
                type="button"
                className="btn-cart-sign-in"
                //   onClick={() => addToCart(product)}
              >
                Sign in to checkout
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
