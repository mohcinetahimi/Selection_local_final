import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import '../CreateCommand/tailwind.output.css';

interface Product {
  id: number;
  name: string;
  nameEn: string;
  format: string;
  price: number;
  quantities: number[];
  basicQuantities: number[];
  category: string;
}

interface SummaryTableProps {
  selectedCategory: string;
}

export default function SummaryTable({ selectedCategory }: SummaryTableProps) {
  const { products, nombreOfLivraison, client } = useProductContext();
  const { language } = client;

  const calculateTotalPrice = (quantities: number[], price: number): number => {
    const limitedQuantities = quantities.slice(0, nombreOfLivraison);
    return limitedQuantities.reduce((total, quantity) => total + quantity * price, 0);
  };

  let totalAjout = 0;
  let totalCredit = 0;

  const filteredProducts = products.filter(
    (product: Product) => product.category === selectedCategory
  );

  return (
    <div className="px-2 py-2 sm:px-6 sm:py-6 lg:px-8 lg:py-8 bg-white rounded-xl shadow-lg">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl sm:text-3xl font-bold leading-8 text-blue-900">{selectedCategory}</h1>
        </div>
      </div>
      <div className="overflow-x-auto sm:overflow-visible -mx-4 sm:mx-0">
        <table className="min-w-full max-w-full divide-y divide-gray-200 table-auto">
          <thead className="border-b-2 border-blue-300 bg-blue-100 text-gray-900 rounded-t-lg">
            <tr>
              <th className="py-2 pl-4 pr-2 text-left text-xs sm:text-sm lg:text-base font-semibold sm:pl-6 border-r">Description</th>
              <th className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold border-r">Format</th>
              <th className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold border-r">Prix boîte</th>
              <th className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold border-r">Qté base</th>
              <th className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold border-r">Qté</th>
              {[...Array(4).keys()].map((i) => (
                <th key={i} className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold border-r">Liv {i + 1}</th>
              ))}
              <th className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold">Crédits / Ajouts</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product: Product) => {
              const totalPrice = calculateTotalPrice(product.quantities, product.price);
              const totalPriceBasicQuantity = calculateTotalPrice(product.basicQuantities, product.price);
              const difference = totalPrice - totalPriceBasicQuantity;

              if (difference > 0) {
                totalAjout += difference;
              } else if (difference < 0) {
                totalCredit += difference;
              }

              return (
                <tr key={product.id} className="hover:bg-gray-100 transition-colors">
                  <td className="py-2 pl-4 pr-2 text-xs sm:text-sm lg:text-base font-medium text-gray-900 sm:pl-6 border-b border-gray-300">
                    {language === 'Anglais' ? product.nameEn : product.name}
                  </td>
                  <td className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base text-gray-500 border-b border-gray-300">{product.format}</td>
                  <td className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base text-gray-500 border-b border-gray-300">{product.price.toFixed(2)}$</td>
                  <td className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base text-gray-500 border-b border-gray-300">{product.basicQuantities.slice(0, nombreOfLivraison).reduce((sum, q) => sum + q, 0)}</td>
                  <td className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base text-gray-500 border-b border-gray-300">{product.quantities.slice(0, nombreOfLivraison).reduce((sum, q) => sum + q, 0)}</td>
                  {product.quantities.slice(0, nombreOfLivraison).map((quantity, index) => (
                    <td key={index} className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base text-gray-500 border-b border-gray-300">{quantity}</td>
                  ))}
                  {[...Array(4 - Math.min(nombreOfLivraison, product.quantities.length))].map((_, index) => (
                    <td key={index} className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base text-gray-500 border-b border-gray-300">-</td>
                  ))}
                  <td
                    className={`px-2 py-2 text-right text-xs sm:text-sm lg:text-base ${difference < 0 ? 'text-red-500' : 'text-green-500'} border-b border-gray-300`}
                  >
                    {difference.toFixed(2)}$
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-blue-50">
            <tr>
              <td colSpan={8} className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold text-gray-900">Total Ajout (Positive):</td>
              <td className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold text-green-500">{totalAjout.toFixed(2)}$</td>
            </tr>
            <tr>
              <td colSpan={8} className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold text-gray-900">Total Crédit (Negative):</td>
              <td className="px-2 py-2 text-right text-xs sm:text-sm lg:text-base font-semibold text-red-500">{totalCredit.toFixed(2)}$</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
