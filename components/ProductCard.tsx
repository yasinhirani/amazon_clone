import { IProducts } from "@/shared/model/products.model";
import Image from "next/image";

interface IProps {
  product: IProducts;
  addToCart: (item: IProducts) => void;
}

function ProductCard({ product, addToCart }: IProps) {
  const { image, title, description, price } = product;
  return (
    <div className="bg-white rounded p-4 flex flex-col">
      <div className="flex flex-col items-center flex-grow mb-6">
        <figure>
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="w-52 h-52 max-w-[200px] object-contain"
            priority
          />
        </figure>
        <div className="mt-5 space-y-3">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <p className="text-sm font-medium text-gray-500 line-clamp-2">
            {description}
          </p>
          <div className="flex items-start">
            <span className="text-sm font-medium">₹</span>
            <span className="text-2xl font-medium">{price}</span>
            <span className="text-sm font-medium">00</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn-add-remove"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;