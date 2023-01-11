import { useEffect, useState } from 'react';
import useShoppingCart from '../context/cart';

export default function useCart() {
  const [removeProduct, updateProductQuantity, addProduct, removeAll] = useShoppingCart((state) => [state.removeProduct, state.updateProductQuantity, state.addProduct, state.removeAll]);
  const products = useShoppingCart((state) => state.products)
  const [cart, setCart] = useState<any>()

  useEffect(() => {
    setCart(products)
  }, [products])

  return { removeProduct, updateProductQuantity, cart, addProduct, removeAll };
}