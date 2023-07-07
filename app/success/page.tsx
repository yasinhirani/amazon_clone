"use client";
import { CartContext } from "@/core/context";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

function Success() {
  const { setCartItems } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-gray-100 flex-auto">
      <div className="w-full max-w-[60rem] mx-auto flex-grow">
        <div className="w-full p-5 bg-white mt-5 rounded-md">
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="text-green-500 w-10 h-10" />
            <h5 className="font-semibold text-2xl">
              Thank you, your order has been confirmed!
            </h5>
          </div>
          <p className="mt-5 font-medium text-base">
            Thank you for shopping with us. We&apos;ll send a confirmation once
            your item has shipped. If you would like to check the status of your
            order(s), please press the link below.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="btn-add-remove mt-5"
          >
            Go to my orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
