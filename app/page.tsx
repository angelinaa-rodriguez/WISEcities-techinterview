'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductGrid from '../components/ProductGrid';


type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>

      {loading ? (
        // Loading Spinner
        <div className="flex justify-center items-center w-full h-[300px]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (

        /*{ Product Grid }*/
        <div className="max-w-[1024px] mx-auto">
          <ProductGrid products={products} />
        </div>

        
      )}
    </main>
  );
}
