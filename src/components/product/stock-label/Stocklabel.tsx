"use client";

import { useEffect, useState } from "react";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";

interface Props {
  slug: string;
}

export const Stocklabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getStock(slug);
  }, [slug]);

  const getStock = async (slug: string) => {
    const inStock = await getStockBySlug(slug);

    setStock(inStock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h2
          className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </h2>
      ) : (
        <h2 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h2>
      )}
    </>
  );
};
