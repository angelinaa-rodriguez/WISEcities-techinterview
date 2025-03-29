'use client';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white">
    {/* Inner container with centered border */}
    <div className="w-full max-w-[1024px] h-16 mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-[17px] border-b">
      
        {/* Left side */}
        <div className="flex items-center w-[127px] h-[32px] gap-0 text-black">
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
        </div>

  
        {/* Right side */}
        <nav>
            <ul className="flex gap-6 text-sm font-medium">
                <li>
                {/* Wrapper to position the badge */}
                <div className="relative w-10 h-10">
                    <button
                    className="w-full h-full p-2 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                    aria-label="Shopping Cart"
                    >
                    <ShoppingBag className="w-[24px] h-[24px] text-black stroke-[2.5]" />
                    
                    {/* Cart count badge */}
                    <div className="absolute -top-1 -right-1 bg-[#f31260] text-white text-xs leading-[16px] font-medium text-center rounded-full px-[6px] py-[2px] min-w-[20px] h-[20px] flex items-center justify-center">
                        3
                    </div>

                    </button>

                    
                </div>
                </li>
            </ul>
        </nav>


  
    </div>
  </header>
  

  );
}
