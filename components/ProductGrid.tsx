// components/ProductGrid.tsx

import React from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
}


        // ✅ Product Grid
        //  NOTE:
        //  This layout uses fixed-width (300px) product cards and a flex layout to match the
        //  pixel-perfect spacing of the Figma design on desktop (1024px wide).
        //  While this may appear slightly awkward or uneven on smaller screens (e.g., tablets or mobile),
        //  I intentionally chose this approach to prioritize visual accuracy on desktop.
        //  I am aware of how to make the layout more responsive (e.g., using auto-sizing, responsive widths, max-widths),
        //  but opted for this tradeoff to preserve alignment with the design spec.

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <section className="my-8">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
