'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../lib/CartContext';
import Image from 'next/image';
import Link from 'next/link';

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
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const [productRes, allRes] = await Promise.all([
          fetch(`/api/products/${id}`),
          fetch('/api/products'),
        ]);

        if (!productRes.ok || !allRes.ok) throw new Error('Failed to fetch data');

        const productData: Product = await productRes.json();
        const allProducts: Product[] = await allRes.json();

        setProduct(productData);

        const filtered = allProducts.filter((p) => p.id !== productData.id);
        const randomThree = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
        setSimilarProducts(randomThree);
      } catch (err) {
        console.error('❌ Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!product) return <p className="p-8 text-red-600">Product not found</p>;

  return (
    <main className="max-w-5xl mx-auto mt-12 px-4 bg-white">
      {/* Main product section */}
      <div className="flex flex-col lg:flex-row gap-8">
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
                  addToCart({ id: product.id, quantity: 1 });
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
      </div>

      {/* Similar products section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {similarProducts.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
