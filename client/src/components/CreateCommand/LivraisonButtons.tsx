import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

const LivraisonButtons: React.FC = () => {
  const { updateNombreOfLivraison, nombreOfLivraison } = useProductContext();

  return (
    <div className="flex justify-end mt-4 pr-5 items-center space-x-6">
      <span className="text-lg font-semibold text-gray-700">NB LIVRAISON:</span>
      <div className="flex space-x-4">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            onClick={() => updateNombreOfLivraison(num)}
            className={`px-4 py-2 rounded-full border-2 transition-colors duration-200 ${
              nombreOfLivraison === num
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LivraisonButtons;
