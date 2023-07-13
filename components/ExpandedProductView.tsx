import { CartContext, CartTotalContext } from "@/core/context";
import { IProductsToAdd } from "@/shared/model/products.model";
import { cartSubTotal } from "@/shared/utils/cartSubTotal";
import { cartTotalQuantities } from "@/shared/utils/cartTotalQuantities";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidV4 } from "uuid";

interface IProps {
  id?: number;
  title: string;
  image: string;
  price: number;
  desc?: string;
  has_prime?: boolean;
  total_reviews?: number;
  is_amazon_choice?: boolean;
  is_best_seller?: boolean;
  rating?: number;
  position?: number;
  setIsExpandedViewOpen: (isOpen: boolean) => void;
}

function ExpandedProductView({
  id,
  title,
  image,
  price,
  desc,
  rating,
  has_prime,
  is_amazon_choice,
  is_best_seller,
  total_reviews,
  position,
  setIsExpandedViewOpen,
}: IProps) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { setTotal } = useContext(CartTotalContext);
  const product = {
    id: id ? id : position ? position : 0,
    title,
    image,
    price,
    quantity: 1,
    total: price,
    orderId: "",
  };
  const addToCart = (e: any, product: IProductsToAdd) => {
    e.stopPropagation();
    const productToAdd: IProductsToAdd = {
      id: product.id,
      image: product.image,
      orderId: uuidV4(),
      price: product.price,
      quantity: product.quantity,
      title: product.title,
      total: product.total,
    };
    const copyCart = [...cartItems];
    const productToAddIndex = copyCart.findIndex(
      (item) => item.image === product.image
    );
    if (productToAddIndex === -1) {
      copyCart.push(productToAdd);
      setCartItems((prev) => {
        return [...prev, productToAdd];
      });
    } else {
      copyCart[productToAddIndex].quantity += 1;
      copyCart[productToAddIndex].total =
        copyCart[productToAddIndex].price *
        copyCart[productToAddIndex].quantity;
      setCartItems(copyCart);
    }
    localStorage.setItem("cartItems", JSON.stringify(copyCart));
    setTotal({
      totalQuantities: cartTotalQuantities(copyCart),
      subTotal: cartSubTotal(copyCart),
    });
    toast.success("Added to cart");
  };
  return (
    <div
      role="button"
      onClick={() => setIsExpandedViewOpen(false)}
      className="fixed inset-0 bg-black bg-opacity-60 z-30 flex justify-center items-center cursor-default p-6"
    >
      <div
        className="bg-white p-4 rounded w-full sm:w-[500px] flex flex-col items-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {is_amazon_choice && (
          <p className="absolute top-0 left-0 bg-[#002f36] px-3 py-1 text-white font-semibold text-sm">
            Amazon&apos;s <span className="text-yellow-600">Choice</span>
          </p>
        )}
        {is_best_seller && (
          <p className="absolute top-0 left-0 bg-[#e67a00] px-3 py-1 text-white font-semibold text-sm">
            Best Seller
          </p>
        )}
        <figure>
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="w-72 h-72 max-w-[288px] object-contain"
          />
        </figure>
        <div className="mt-5 space-y-3 self-start">
          <h3 className="font-medium text-2xl line-clamp-1">{title}</h3>
          {desc && <p className="text-sm font-medium text-gray-500">{desc}</p>}
          <div className="flex items-center space-x-1">
            <Rating
              style={{ maxWidth: 90 }}
              value={rating ? rating : 0}
              transition="none"
              readOnly
            />
            {total_reviews && (
              <span className="font-semibold text-sm">
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(total_reviews)}
              </span>
            )}
          </div>
          <div className="flex items-start">
            <span className="text-sm font-medium">₹</span>
            <span className="text-3xl font-medium">{price}</span>
            <span className="text-sm font-medium">00</span>
          </div>
          {has_prime && (
            <div className="flex items-center space-x-2 mt-4">
              <figure>
                <Image
                  src="/images/prime-delivery.png"
                  width={60}
                  height={60}
                  alt="has prime"
                />
              </figure>
              <p className="font-medium text-sm">FREE Next-day Delivery</p>
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn-add-remove mt-8"
          onClick={(e) => addToCart(e, product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ExpandedProductView;
