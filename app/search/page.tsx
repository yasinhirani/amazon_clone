"use client";
import Navbar from "@/components/Navbar";
import SearchProductCard from "@/components/SearchProductCard";
import { ISearchResults } from "@/shared/model/products.model";
import { productServices } from "@/shared/services/product.service";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function Search() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  const [searchResult, setSearchResult] = useState<ISearchResults[] | null>(
    null
  );

  const mainDivRef = useRef<HTMLDivElement>(null);

  const getSearchResults = () => {
    setSearchResult(null);
    if (searchQuery) {
      productServices.getSearchResults(searchQuery).then((res) => {
        setSearchResult(res.results);
      });
    }
  };

  useEffect(() => {
    setSearchResult(null);
    getSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  return (
    <div className="bg-gray-100 flex-grow">
      <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 py-6">
        <h4 className="font-bold text-xl">Search results for: {searchQuery}</h4>
        <div className="grid grid-flow-row-dense grid-cols-1 gap-6 mt-6">
          {searchResult &&
            searchResult.map((result, index) => {
              return (
                <SearchProductCard
                  key={Math.random()}
                  searchProduct={result}
                  scrollHideRef={mainDivRef.current}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Search;
