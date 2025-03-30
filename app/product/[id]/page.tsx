'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;

        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');

        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('❌ Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!product) return <p className="p-8 text-red-600">Product not found</p>;

  return (
    <main className="max-w-5xl mx-auto mt-12 px-4 flex flex-col lg:flex-row gap-8">
      <div className="w-full max-w-[512px] h-[512px] relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={512}
          height={512}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-[40px] font-medium leading-[44px]">{product.name}</h1>
        <p className="text-sm text-gray-700 max-w-[484px]">{product.description}</p>
        <p className="text-lg font-semibold">${product.price}</p>

        <button
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          onClick={async () => {
            try {
              const res = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id, quantity: 1 }),
              });

              const data = await res.json();
              if (data.success) {
                alert('Added to cart!');
              } else {
                alert('Error adding to cart.');
              }
            } catch (error) {
              alert('Something went wrong.');
              console.error(error);
            }
          }}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
