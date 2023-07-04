"use client";
import Navbar from "@/components/Navbar";
import SearchProductCard from "@/components/SearchProductCard";
import { ISearchResults } from "@/shared/model/products.model";
import { productServices } from "@/shared/services/product.service";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";

function Search() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  const [searchResult, setSearchResult] = useState<ISearchResults[] | null>(
    null
  );

  const getSearchResults = () => {
    setSearchResult(null);
    if (searchQuery) {
      productServices.getSearchResults(searchQuery).then((res) => {
        setSearchResult(res.results);
        console.log(res);
      });
    }
  };

  const addToCart = () => {
    console.log("cart");
  };

  useEffect(() => {
    getSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="bg-gray-100 flex-grow">
        <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 py-6">
          <h4 className="font-bold text-xl">
            Search results for: {searchQuery}
          </h4>
          <div className="grid grid-flow-row-dense grid-cols-1 gap-6 mt-6">
            {searchResult &&
              searchResult.map((result) => {
                return (
                  <SearchProductCard
                    key={Math.random()}
                    searchProduct={result}
                    addToCart={addToCart}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
