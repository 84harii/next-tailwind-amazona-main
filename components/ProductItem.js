/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function ProductItem({ product, addToCartHandler }) {
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
      <div className="flex flex-col items-center justify-center p-5 ">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-md">{product.name}</h2>
        </Link>
        <p className="mb-2 text-xs text-zinc-400 bg-slate-100 py-1 px-2 rounded-lg">{product.brand}</p>
        <p className="font-semibold text-lime-900">₹{product.price}</p>
        {/* <button
          className="primary-button mt-2"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button> */}
      </div>
    </div>
  );
}
