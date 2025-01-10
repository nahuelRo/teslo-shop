import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  getSumarryInformation: () => {
    total: number;
    subtotal: number;
    tax: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSumarryInformation() {
        const { cart } = get();

        const subtotal = cart.reduce(
          (subtotal, product) => product.quantity * product.price + subtotal,
          0
        );
        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          total,
          subtotal,
          tax,
          itemsInCart,
        };
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // Se que el producto existe por talla tengo que incrementar la cantidad
        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        });

        set({ cart: updatedCartProduct });
      },
      updateProductQuantity: (product, quantity) => {
        const { cart } = get();

        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }

          return item;
        });

        set({ cart: updatedCartProduct });
      },
      removeProductFromCart: (product) => {
        const { cart } = get();

        const updatedCartProduct = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProduct });
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    { name: "shopping-cart" }
  )
);
