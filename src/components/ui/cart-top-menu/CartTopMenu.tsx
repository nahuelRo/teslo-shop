"use client";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export const CartTopMenu = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  // Solucion al problema de hidratación
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Link
      className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
      href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
    >
      <div className="relative">
        <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
          {loaded && totalItemsInCart > 0 && totalItemsInCart}
        </span>
        <IoCartOutline className="w-5 h-5" />
      </div>
    </Link>
  );
};
//
