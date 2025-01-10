"use client";

import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { ButtonMenu } from "../button-menu/ButtonMenu";
import { CartTopMenu } from "../cart-top-menu/CartTopMenu";

export const TopMenu = () => {
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>

      {/* Center menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/search"
        >
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <CartTopMenu />

        <ButtonMenu />
      </div>
    </nav>
  );
};
