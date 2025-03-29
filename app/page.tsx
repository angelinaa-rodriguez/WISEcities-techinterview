'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-white">
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



      {/* Product Grid */}
      <div className="w-full max-w-[1024px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <Link key={id} href={`/product/${id}`} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col items-center">
            <Image src={`/product${id}.jpg`} alt="Product" width={240} height={240} className="rounded-lg object-cover mb-4" />
            <h2 className="text-base font-medium">Product {id}</h2>
            <p className="text-sm text-gray-600">$29.99</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
