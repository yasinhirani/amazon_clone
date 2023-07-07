"use client";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import {
  AuthDataContext,
  CartTotalContext,
  SearchTextContext,
} from "@/core/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Popover, ArrowContainer } from "react-tiny-popover";

function Navbar() {
  const { total } = useContext(CartTotalContext);
  const { searchText, setSearchText } = useContext(SearchTextContext);
  const { authData, setAuthData } = useContext(AuthDataContext);
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  return (
    <nav className="bg-navbar px-5 py-1 flex items-center space-x-5 sm:space-x-8">
      {/* Start Logo */}
      <Link href="/">
        <div className="flex items-start border border-transparent hover:border-white cursor-pointer p-2 rounded-sm">
          <figure>
            <Image
              src="https://links.papareact.com/f90"
              width={130}
              height={130}
              alt="amazon"
              className="min-w-[100px]"
            />
          </figure>
          <p className="text-white font-semibold">.in</p>
        </div>
      </Link>
      {/* End Logo */}
      {/* Start search */}
      <div className="w-full flex-grow bg-[#febd69] flex items-center rounded overflow-hidden relative">
        <input
          type="text"
          name="search"
          id="search"
          value={searchText ? searchText : ""}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 outline-none text-base placeholder:text-gray-500 font-medium"
          placeholder="Search Amazon.in"
        />
        {searchText && (
          <button
            type="button"
            className="absolute right-14"
            onClick={() => setSearchText("")}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
        <button
          type="button"
          className="px-3 py-2"
          onClick={() => {
            if (searchText) {
              router.push(`/search?query=${searchText}`);
            }
          }}
        >
          <MagnifyingGlassIcon className="w-6 h-6 font-semibold" />
        </button>
      </div>
      {/* End search */}
      {/* Start profile */}
      <div className="whitespace-nowrap flex items-center md:space-x-8">
        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom"]}
          align="center"
          padding={0}
          onClickOutside={() => setIsPopoverOpen(false)}
          containerClassName="w-full min-w-[220px] max-w-[220px] z-10"
          content={({ position, childRect, popoverRect }) => (
            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
              position={position}
              childRect={childRect}
              popoverRect={popoverRect}
              arrowColor={"white"}
              arrowSize={6}
              className="popover-arrow-container"
              arrowClassName="popover-arrow"
            >
              <div
                className="bg-white p-3 rounded"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                <p className="font-medium text-center">Hello, {authData?.userName}</p>
                <button type="button" onClick={() => {
                  setAuthData(null);
                  localStorage.removeItem("authData");
                }} className="btn-add-remove mt-3">Sign out</button>
              </div>
            </ArrowContainer>
          )}
        >
          <button
            type="button"
            onClick={() => {
              if (!authData) {
                router.push("/login");
              } else {
                setIsPopoverOpen(!isPopoverOpen);
              }
            }}
            className="text-white hidden md:block cursor-pointer border border-transparent hover:border-white p-2 rounded-sm text-left"
          >
            <p className="text-sm font-semibold leading-3">
              Hello, {authData ? authData.userName : "sign in"}
            </p>
            <p className="font-bold text-base">Accounts & lists</p>
          </button>
        </Popover>
        <div className="text-white hidden md:block border border-transparent hover:border-white cursor-pointer p-2 rounded-sm">
          <p className="text-sm font-semibold leading-3">Returns</p>
          <p className="font-bold text-base">& Orders</p>
        </div>
        <Link
          href="/cart"
          className="text-white flex items-end space-x-1 border border-transparent hover:border-white cursor-pointer p-2 rounded-sm"
        >
          <div className="relative">
            <ShoppingCartIcon className="w-8 h-8" />
            <div className="absolute -top-1.5 -right-1 rounded-full bg-yellow-500 font-medium p-1 w-5 h-5 flex justify-center items-center text-black">
              {total?.totalQuantities ? total.totalQuantities : 0}
            </div>
          </div>
          <p className="font-bold text-sm hidden sm:block">Cart</p>
        </Link>
      </div>
      {/* End profile */}
    </nav>
  );
}
export default Navbar;
