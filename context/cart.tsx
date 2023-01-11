import create from "zustand";
import { Product } from "../types";
import { persist } from 'zustand/middleware'

interface ShoppingCartState {
  products: Array<{ product: Product; quantity: number }>;
  addProduct: (product: Product, quantity: number, replace?: boolean) => void;
  removeProduct: (productId: number) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
  removeAll: () => void
}


const useShoppingCart = create<ShoppingCartState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product: Product, quantity: number, replace: boolean | undefined = true) =>
        set((state: any) => {
          if (
            state.products.length > 0 &&
            state.products.find(
              (p: { product: Product; quantity: number }) =>
                p.product.id === product.id
            )
          ) {
            if (replace) {
              return {
                products: state.products.map(
                  (p: { product: Product; quantity: number }) =>
                    p.product.id === product.id
                      ? { ...p, quantity: quantity }
                      : p
                ),
              };
            }
            return {
              products: state.products.map(
                (p: { product: Product; quantity: number }) =>
                  p.product.id === product.id
                    ? { ...p, quantity: p.quantity + quantity }
                    : p
              ),
            };
          }
          return {
            products: [...state.products, { product: product, quantity: quantity }],
          }
        }),
      removeProduct: (productId: number) =>
        set((state) => ({
          products: state.products.filter(
            (p) => p.product.id !== productId
          ),
        })),
      removeAll: () =>
        set((state) => ({
          products: state.products = []
        })),
      updateProductQuantity: (productId: number, quantity: number) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.product.id === productId ? { ...p, quantity } : p
          ),
        })),
    }),
    {
      name: 'cart'
    }
  )
)

export default useShoppingCart;
