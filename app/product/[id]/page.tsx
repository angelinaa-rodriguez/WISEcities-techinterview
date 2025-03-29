'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const params = useParams();

  useEffect(() => {
    console.log('params:', params);

    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();
      setProduct(data);
    };

    if (params?.id) fetchProduct();
  }, [params]);

  if (!product) return <p className="p-8">Loading...</p>;

  return (
    <main className="max-w-[1024px] mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-[512px] h-[512px] object-cover rounded-xl"
        />
        <div className="flex flex-col gap-6">
          <h1 className="text-[40px] font-medium leading-[44px] tracking-tight w-[492px] h-[28px]">
            {product.name}
          </h1>
          <p className="text-sm font-medium leading-[20px] tracking-tight w-[484px] h-[200px]">
            {product.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">${product.price}</span>
            <button className="bg-black text-white px-6 py-2 rounded hover:opacity-90 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
