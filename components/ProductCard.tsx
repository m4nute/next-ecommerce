import React from "react";
import { Product } from "../types";
import Image from "next/image";
import Link from "next/link";
import useShoppingCart from "../context/cart";

function ProductCard({ prod, index }: { prod: Product, index: number }) {

  const { products, addProduct, removeProduct, updateProductQuantity } = useShoppingCart();

  return (
    <>
      <div className="bg-black text-white pb-4 mb-8 h-80 product-card transition-all duration-100 rounded-md">
        <div className="h-4/5 relative w-full bg-222">
          <Image
            src={prod.thumbnail}
            alt={prod.title}
            fill
            priority={index < 8 ? true : false}
            sizes="(max-width: 1400px) 60%, (max-width: 1100px) 50%"
            className="object-contain"
          />
        </div>
        <div className="p-3 info-tab bg-black overflow-hidden">
          <Link href={`/product/${prod.id}`}>
            <h1 className="text-888 text-ellipsis overflow-hidden w-full whitespace-nowrap product-title duration-300 transition-all">
              {prod.title}
            </h1>
          </Link>
          <p className="pb-2">
            <span className="text-xl">$ {prod.price}</span>
            <span className="text-green-400 text-sm pl-1">
              {prod.discountPercentage}% OFF
            </span>
          </p>
          <div className="flex justify-between">
            {products.length !== 0 && products.some(item => item.product.id === prod.id) ?
              <button className="px-2 rounded-md bg-green-600 text-white w-full h-10 transition-all duration-200 hover:bg-green-500">
                Already In Cart 🛒
              </button>
              :
              <button onClick={() => { addProduct(prod, 1); }} className="px-2 rounded-md bg-222 text-white w-full h-10 transition-all duration-200 hover:bg-gray-200 hover:text-222">
                Add to Cart 🛒
              </button>
            }

          </div>
        </div>
      </div>
    </>
  );
}
export default ProductCard;
