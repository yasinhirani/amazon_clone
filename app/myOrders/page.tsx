"use client";
import { AuthDataContext, CartContext, CartTotalContext } from "@/core/context";
import {
  IOrders,
  IOrdersReq,
  IProductsToAdd,
} from "@/shared/model/products.model";
import { productServices } from "@/shared/services/product.service";
import { cartSubTotal } from "@/shared/utils/cartSubTotal";
import { cartTotalQuantities } from "@/shared/utils/cartTotalQuantities";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function MyOrders() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { authData } = useContext(AuthDataContext);
  const { total, setTotal } = useContext(CartTotalContext);

  const router = useRouter();

  const [orders, setOrders] = useState<IOrders[] | null>(null);

  const addToCart = (item: IProductsToAdd) => {
    const copyCart = [...cartItems];
    const existingIndex = copyCart.findIndex(
      (product) => product.orderId === item.orderId
    );
    copyCart[existingIndex].quantity += 1;
    copyCart[existingIndex].total =
      copyCart[existingIndex].price * copyCart[existingIndex].quantity;
    setCartItems(copyCart);
  };

  const getUserOrders = () => {
    if (authData) {
      productServices
        .getUserOrders({ userEmail: authData?.userEmail })
        .then((res) => {
          if (res.data.success) {
            setOrders(res.data.orders);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  };

  useEffect(() => {
    if (authData) {
      const copyCart = [...cartItems];
      setTotal({
        totalQuantities: cartTotalQuantities(copyCart),
        subTotal: cartSubTotal(copyCart),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, authData]);

  useEffect(() => {
    if (authData) {
      getUserOrders();
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData]);
  return (
    <div className="bg-gray-100 flex-grow flex flex-col">
      <div className="w-full max-w-[90rem] mx-auto px-6 py-6 flex flex-col">
        <section className="flex-grow">
          <figure className="md:col-span-full">
            <Image
              src="https://links.papareact.com/ikj"
              alt=""
              width={1020}
              height={250}
              className="w-full h-40 object-cover object-center sm:h-44 md:h-full"
            />
          </figure>
          {orders && orders.length === 0 && (
            <div className="mt-5 border-b pb-2">
              <p className="font-semibold text-2xl">
                Looks like you haven&apos;t ordered anything yet.
              </p>
            </div>
          )}
          {orders && orders.length > 0 && (
            <>
              <div className="my-5 border-b pb-2">
                <p className="font-semibold text-2xl">My Orders</p>
              </div>
              <div className="flex flex-col space-y-10 bg-white p-4 rounded">
                {orders &&
                  orders.map((item) => {
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
                            //   onClick={() => addToCart(item)}
                          >
                            Buy again
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default MyOrders;
