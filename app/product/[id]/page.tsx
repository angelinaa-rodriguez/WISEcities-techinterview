'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../lib/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import ProductGrid from '../../../components/ProductGrid';

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
  const [priceActive, setPriceActive] = useState(false);

  const { cart, addToCart, removeFromCart } = useCart();

  const getQuantity = (productId: number) =>
    cart.find((item) => item.id === productId)?.quantity || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const [productRes, allRes] = await Promise.all([
          fetch(`/api/products/${id}`),
          fetch('/api/products'),
        ]);

        if (!productRes.ok || !allRes.ok)
          throw new Error('Failed to fetch data');

        const productData: Product = await productRes.json();
        const allProducts: Product[] = await allRes.json();

        setProduct(productData);

        const filtered = allProducts.filter((p) => p.id !== productData.id);
        const randomThree = filtered
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setSimilarProducts(randomThree);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[300px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return <p className="p-8 text-red-600">Product not found</p>;

  const quantity = getQuantity(product.id);

  return (
    <main className="max-w-5xl mx-auto mt-12 px-4 bg-white">
      {/* Main product section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product image */}
        <div className="w-full max-w-[512px] h-[512px] relative rounded-xl overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 512px"
          />
        </div>

        {/* Product info container */}
        <div className="w-[500px] h-[512px] flex flex-col justify-center gap-4">
          <h1 className="text-[40px] font-medium leading-[44px]">{product.name}</h1>
          <p className="text-sm text-[rgba(161,161,170,1)]">{product.description}</p>

          {/* Price + Add to Cart Row */}
          <div className="h-[40px] flex items-center justify-start gap-[8px]">
            <div
              className={`h-[40px] rounded-xl px-[14px] py-[10px] cursor-pointer transition-all flex items-center justify-center ${
                priceActive ? 'w-[120px] bg-[#f0ecec]' : 'w-[90px] hover:bg-[#f0ecec]'
              }`}
              onClick={() => setPriceActive((prev) => !prev)}
            >
              <span className="text-sm font-semibold leading-5 tracking-tight text-black">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {quantity > 0 ? (
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
                className="h-[40px] rounded-xl px-[14px] py-[10px] bg-zinc-300 text-black text-sm font-medium leading-5 tracking-tight whitespace-nowrap w-[178px] hover:bg-gray-300 transition"
                onClick={() => addToCart({ id: product.id, quantity: 1 })}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-[600px] h-px bg-gray-300 my-5 mx-auto" />

      {/* Similar Products Header */}
      <h2
        className="text-[32px] font-medium leading-[32px] tracking-tight text-[#11181C] mb-6"
        style={{ width: '492px' }}
      >
        Similar Products
      </h2>

      {/* Similar Products Grid */}
      <ProductGrid products={similarProducts} />

      {/* See More Products button */}
      <div className="mt-8 flex justify-center pb-8">
        <Link
          href="/"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition text-sm font-medium"
        >
          See More Products
        </Link>
      </div>
    </main>
  );
}
