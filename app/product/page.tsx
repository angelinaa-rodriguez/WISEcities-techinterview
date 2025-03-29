'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;

  // Fake data for now
  const product = {
    id: productId,
    name: `Product ${productId}`,
    description: 'This is a detailed product description.',
    price: 59.99,
    imageUrl: `/product${productId}.jpg`,
  };

  if (!product) return notFound();

  return (
    <main className="max-w-[1024px] mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-xl object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-6">${product.price}</p>
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Similar Products Section */}
      <h2 className="text-xl font-semibold mb-6">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[7, 8, 9].map((id) => (
          <div key={id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
            <Image src={`/product${id}.jpg`} alt="Product" width={240} height={240} className="rounded-lg object-cover mb-4" />
            <h2 className="text-base font-medium">Product {id}</h2>
            <p className="text-sm text-gray-600">$39.99</p>
          </div>
        ))}
      </div>
    </main>
  );
}
