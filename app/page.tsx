/* eslint-disable @next/next/no-img-element */
"use client";
import Navbar from "@/components/Navbar";
import ProductsListing from "@/components/ProductsListing";
import { CartContext } from "@/core/context";
import { IProducts } from "@/shared/model/products.model";
import { productServices } from "@/shared/services/product.service";
import { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Main() {
  const [products, setProducts] = useState<IProducts[] | null>(null);

  const getProducts = () => {
    productServices.getAllProducts().then((res) => {
      const updatedPrice = res.map((product) => {
        product.price = Math.floor(product.price * 20);
        return product;
      });
      setProducts(updatedPrice);
    });
  };

  // const searchProduct = () => {
  //   if (searchText !== null && products) {
  //     const searchedProducts = products.filter((product) =>
  //       product.title.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     setProductsCopy(searchedProducts);
  //     console.log(searchedProducts);
  //   } else {
  //     return;
  //   }
  // };

  // const clearSearchField = () => {
  //   setSearchText(null);
  //   setProductsCopy(products);
  // };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="bg-gray-100 flex-grow">
        <div className="w-full max-w-[90rem] mx-auto pb-10">
          {/* Start Carousal */}
          <div className="relative">
            {products && (
              <div className="absolute left-0 right-0 h-10 sm:h-40 md:h-52 bg-gradient-to-b from-transparent to-gray-100 bottom-0 z-10" />
            )}
            <Carousel
              autoPlay
              infiniteLoop
              showIndicators={false}
              showThumbs={false}
              showStatus={false}
              interval={5000}
              // onChange={(e) => console.log(e)}
            >
              <figure>
                <img src="https://links.papareact.com/gi1" alt="" />
              </figure>
              <figure>
                <img src="https://links.papareact.com/6ff" alt="" />
              </figure>
              <figure>
                <img src="https://links.papareact.com/7ma" alt="" />
              </figure>
            </Carousel>
          </div>
          {/* End Carousal */}
          {/* Start Products */}
          <div className="md:-mt-24 lg:-mt-52 relative z-20 px-6">
            <ProductsListing products={products} />
          </div>
          {/* End Products */}
        </div>
      </div>
    </div>
  );
}
export default Main;
