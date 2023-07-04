import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import React, { useContext } from "react";

interface IProps {
  title: string;
  image: string;
  price: number;
  desc?: string;
  has_prime?: boolean;
  total_reviews?: number;
  is_amazon_choice?: boolean;
  is_best_seller?: boolean;
  rating?: number;
  setIsExpandedViewOpen: (isOpen: boolean) => void;
}

function ExpandedProductView({
  title,
  image,
  price,
  desc,
  rating,
  has_prime,
  is_amazon_choice,
  is_best_seller,
  total_reviews,
  setIsExpandedViewOpen,
}: IProps) {
  return (
    <div
      role="button"
      onClick={() => setIsExpandedViewOpen(false)}
      className="fixed inset-0 bg-black bg-opacity-60 z-30 flex justify-center items-center cursor-default"
    >
      <div
        className="bg-white p-4 rounded w-[500px] flex flex-col items-center relative overflow-hidden"
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
        <div className="mt-5 space-y-3">
          <h3 className="font-medium text-2xl line-clamp-1">{title}</h3>
          {desc && (
            <p className="text-sm font-medium text-gray-500">
              {desc}
            </p>
          )}
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
          //   onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ExpandedProductView;
