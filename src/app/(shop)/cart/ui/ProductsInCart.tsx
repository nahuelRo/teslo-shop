"use client";

import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/product/product-image/ProductImage";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <>Loading...</>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{ width: "100px", height: "100px" }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              {product.size} - {product.title}
            </Link>

            <p>${product.price}</p>

            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(value) =>
                updateProductQuantity(product, value)
              }
            />

            <button
              className="underline mt-3"
              onClick={() => removeProductFromCart(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
