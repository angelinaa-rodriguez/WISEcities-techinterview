'use client';
import { useCart } from '../lib/CartContext';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white">
      <div
        className="w-full max-w-[1024px] h-16 mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-[17px]"
        style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.72)' }}
      >
              
        {/* Left side (Logo and Name as Link to homepage) */}
        <Link href="/" className="flex items-center w-[127px] h-[32px] gap-0 text-black hover:opacity-80 transition">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={18}
              height={16.74}
              className="object-contain"
            />
          </div>
          <span className="text-[16px] leading-[24px] font-semibold">
            NotAmazon
          </span>
        </Link>

        {/* Right side */}
        <nav>
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <div className="relative w-10 h-10">
                <button
                  className="w-full h-full p-2 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag className="w-[24px] h-[24px] text-black stroke-[2.5]" />

                  {totalItems > 0 && (
                    <div className="absolute -top-1 -right-1 bg-[#f31260] text-white text-xs leading-[16px] font-medium text-center rounded-full px-[6px] py-[2px] min-w-[20px] h-[20px] flex items-center justify-center">
                      {totalItems}
                    </div>
                  )}
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
