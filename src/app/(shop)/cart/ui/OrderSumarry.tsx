"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSumarry = () => {
  const { itemsInCart, subtotal, tax, total } = useCartStore((state) =>
    state.getSumarryInformation()
  );

  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <>Loading...</>;
  }

  if (totalItemsInCart === 0) {
    redirect("/empty");
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. productos</span>
      <span>
        {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
      </span>

      <span>Subtotal</span>
      <span>${currencyFormat(subtotal)}</span>

      <span>Impuestos (15%)</span>
      <span>${currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl">${currencyFormat(total)}</span>
    </div>
  );
};
