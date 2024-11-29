import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

interface ResetButtonProps {
  category: string;
}

const categoryTranslations: { [key: string]: string } = {
  BOEUF: 'BEEF',
  POULET: 'CHICKEN',
  PORC: 'PORK',
  POISSON: 'FISH',
  ÉPICERIE: 'GROCERY',
  CONGÉLATEURS: 'FREEZERS',
  FIN: 'END',
};

const ResetButton: React.FC<ResetButtonProps> = ({ category }) => {
  const { resetQuantitiesByCategory, client } = useProductContext();
  const { language } = client;

  const handleReset = () => {
    resetQuantitiesByCategory(category);
  };

  const displayCategory = language === 'Anglais' ? categoryTranslations[category] : category;

  return (
    <button
      onClick={handleReset}
      className="flex items-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
    >
      <ArrowPathIcon className="h-5 w-5" />
      <span>Reset {displayCategory}</span>
    </button>
  );
};

export default ResetButton;
