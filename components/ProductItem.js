/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import AtcIcon from "../styles/Icons/atc-icon";

// export default function ProductItem({ product, addToCartHandler }) {
export default function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded object-cover h-64 w-full hidden"
        />

        <div
          className="image-card"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm text-center mb-1">{product.name}</h2>
        </Link>
        <p className="mb-2 text-xs text-zinc-400 bg-slate-50 py-1 px-2 rounded-lg capitalize">{product.brand}</p>
        <p className="font-semibold text-lime-900">₹{product.price}</p>
        {/* <button class="button-84 mt-2" 
        type="button"
        onClick={() => addToCartHandler(product)}
        >
          <span class="text"> Add to cart  <AtcIcon /> </span>
        </button> */}
      </div>
    </div>

  

    
  );
}
