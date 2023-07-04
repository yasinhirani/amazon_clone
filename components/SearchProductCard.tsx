import { ISearchResults } from "@/shared/model/products.model";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";

interface IProps {
  searchProduct: ISearchResults;
  addToCart: (item: ISearchResults) => void;
}

function SearchProductCard({ searchProduct, addToCart }: IProps) {
  const {
    image,
    name,
    price,
    has_prime,
    is_amazon_choice,
    is_best_seller,
    stars,
    total_reviews
  } = searchProduct;
  return (
    <div className="bg-white rounded p-4 flex flex-col relative overflow-hidden">
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
      <div className="flex flex-col md:flex-row items-center md:items-stretch md:space-x-10">
        <figure>
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="w-64 h-64 max-w-[256px] object-contain"
            priority
          />
        </figure>
        <div className="mt-5 md:mt-0 flex flex-col justify-between space-y-5">
          <div>
            <h3 className="font-medium text-xl">{name}</h3>
            <div className="flex items-center space-x-1">
              <Rating
                style={{ maxWidth: 90 }}
                value={stars}
                transition="none"
                readOnly
              />
              <span className="font-semibold text-sm">
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(total_reviews)}
              </span>
            </div>
            <div className="flex items-start mt-2">
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
          {/* <button
            type="button"
            className="btn-add-remove"
            onClick={() => addToCart(searchProduct)}
          >
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default SearchProductCard;
