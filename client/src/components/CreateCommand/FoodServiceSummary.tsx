import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';

// Define translations
const translations = {
  Francais: {
    description: 'Description',
    weekly: 'Hebdomadaire',
    annual: 'Annuel',
    totalService: 'Total de votre service alimentaire: ',
    includes: 'Inclut viandes, repas préparés, épicerie sèche, et congélateur (si option sélectionnée):',
    maintenance: 'Frais de maintenance:',
  },
  english: {
    description: 'Description',
    weekly: 'Weekly',
    annual: 'Annual',
    totalService: 'Total of your food service:',
    includes: 'Includes meats, prepared meals, dry groceries, and freezer (if option selected):',
    maintenance: 'Maintenance expenses:',
  }
};

const FoodServiceSummary: React.FC = () => {
  const { calculateTotalFoodService, client } = useProductContext();
  const  {language} = client;
  const { totalService, maintenanceExpenses, totalProductsPrice } = calculateTotalFoodService();

  // Assuming the provided amounts are weekly and multiplying by 52 for annual calculations
  const weeklyTotalService = totalService / 52;
  const weeklyMaintenanceExpenses = maintenanceExpenses / 52;
  const weeklyTotalProductsPrice = totalProductsPrice / 52;

  const content = language === 'Francais' ? translations.Francais : translations.english;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="text-xl font-semibold">{content.description}</th>
            <th className="text-xl font-semibold text-right">{content.weekly}</th>
            <th className="text-xl font-semibold text-right">{content.annual}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">{content.totalService}</td>
            <td className="py-2 text-right">${weeklyTotalService.toFixed(2)}</td>
            <td className="py-2 text-right">${totalService.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-2">{content.includes}</td>
            <td className="py-2 text-right">${weeklyTotalProductsPrice.toFixed(2)}</td>
            <td className="py-2 text-right">${totalProductsPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-2">{content.maintenance}</td>
            <td className="py-2 text-right">${weeklyMaintenanceExpenses.toFixed(2)}</td>
            <td className="py-2 text-right">${maintenanceExpenses.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FoodServiceSummary;
