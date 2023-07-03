"use client";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { CartContext } from "@/core/context";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const router = useRouter();
  return (
    <nav className="bg-navbar px-5 py-2 flex items-center space-x-8">
      {/* Start Logo */}
      <Link href="/">
        <div className="flex items-start border border-transparent hover:border-white cursor-pointer p-2">
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
          className="w-full px-4 py-2 outline-none text-base placeholder:text-gray-500 font-medium"
          placeholder="Search Amazon.in"
        />
        {/* {searchText && (
          <button
            type="button"
            className="absolute right-14"
            onClick={() => {}}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )} */}
        <button
          type="button"
          className="px-3 py-2"
          onClick={() =>
            router.push(`/search?query=mens`)
          }
        >
          <MagnifyingGlassIcon className="w-6 h-6 font-semibold" />
        </button>
      </div>
      {/* End search */}
      {/* Start profile */}
      <div className="whitespace-nowrap flex items-center md:space-x-8">
        <div className="text-white hidden md:block hover:underline cursor-pointer">
          <p className="text-xs font-semibold">Hello, sign in</p>
          <p className="font-bold text-sm">Accounts & lists</p>
        </div>
        <div className="text-white hidden md:block hover:underline cursor-pointer">
          <p className="text-xs font-semibold">Returns</p>
          <p className="font-bold text-sm">& Orders</p>
        </div>
        <Link
          href="/cart"
          className="text-white flex items-end space-x-1 hover:underline cursor-pointer"
        >
          <div className="relative">
            <ShoppingCartIcon className="w-8 h-8" />
            <div className="absolute -top-1.5 -right-1 rounded-full bg-yellow-500 font-medium p-1 w-5 h-5 flex justify-center items-center text-black">
              {cartItems.length}
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
