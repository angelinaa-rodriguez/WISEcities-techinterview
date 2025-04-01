'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductGrid from './ProductGrid';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function HomeClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Network response was not ok');
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        if ((err instanceof DOMException && err.name !== 'AbortError')) {
          console.error('Failed to load products:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white">
      {/* Hero Image */}
      <div className="w-full flex justify-center mt-5 px-4">
        <div className="relative w-full max-w-[1024px] aspect-[2.5/1] rounded-xl overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="Hero"
            fill
            priority
            className="object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Loading or Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center w-full h-[300px]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
        </div>
      ) : (
        <div className="max-w-[1024px] mx-auto w-full">
          <ProductGrid products={products} />
        </div>
      )}
    </main>
  );
}
