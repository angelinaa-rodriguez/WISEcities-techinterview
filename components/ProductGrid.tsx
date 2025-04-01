'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../lib/CartContext';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  const [activePriceId, setActivePriceId] = useState<number | null>(null);
  const { cart, addToCart, removeFromCart } = useCart();

  // Memoized quantity map for faster lookup
  const quantityMap = useMemo(() => {
    const map: Record<number, number> = {};
    cart.forEach((item) => {
      map[item.id] = item.quantity;
    });
    return map;
  }, [cart]);

  const handleTogglePrice = (id: number) => {
    setActivePriceId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="my-4 px-4">
      {title && (
        <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">
          {title}
        </h2>
      )}

      <div className="mx-auto max-w-[1024px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const isPriceActive = activePriceId === product.id;
          const quantity = quantityMap[product.id] || 0;
          const inCart = quantity > 0;

          return (
            <div
              key={product.id}
              className="w-full max-w-[320px] mx-auto p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <Link href={`/product/${product.id}`} prefetch>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-3">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-[rgba(161,161,170,1)] text-sm line-clamp-3">
                  {product.description}
                </p>
              </Link>

              {/* Price & Add to Cart Row */}
              <div className="h-[64px] flex items-center justify-between px-[12px] gap-[8px] mt-3">
                {/* Price Pill */}
                <div
                  className={`h-[40px] rounded-xl px-[14px] py-[10px] cursor-pointer transition-all flex items-center justify-center text-black ${
                    isPriceActive ? 'w-[120px] bg-[#f0ecec]' : 'w-[90px] hover:bg-[#f0ecec]'
                  }`}
                  onClick={() => handleTogglePrice(product.id)}
                >
                  <span className="text-sm font-semibold leading-[20px] tracking-tight text-black">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {/* Cart Controls */}
                {inCart ? (
                  <div className="flex items-center h-[40px] overflow-hidden">
                    <button
                      className="w-11 h-full bg-zinc-300 text-black text-sm font-medium leading-5 tracking-tight rounded-xl"
                      onClick={() => removeFromCart(product.id)}
                    >
                      −
                    </button>
                    <div className="px-4 text-sm font-medium leading-5 tracking-tight text-black">
                      {quantity}
                    </div>
                    <button
                      className="w-11 h-full bg-zinc-300 text-black text-sm font-medium leading-5 tracking-tight rounded-xl"
                      onClick={() => addToCart({ id: product.id, quantity: 1 })}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="h-[40px] rounded-xl px-[14px] py-[10px] bg-zinc-300 text-black text-sm font-medium leading-5 tracking-tight whitespace-nowrap w-[178px]"
                    onClick={() => addToCart({ id: product.id, quantity: 1 })}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductGrid;
