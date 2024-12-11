import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import ProductCard from './ProductCard';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

interface ListofProductsProps {
  category: string;
}

const ListofProducts: React.FC<ListofProductsProps> = ({ category }) => {
  const { getProductsByCategory } = useProductContext();
  const productsByCategory = getProductsByCategory();
  const products = productsByCategory[category] || [];
  console.log("SALAM",productsByCategory)
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListofProducts;
