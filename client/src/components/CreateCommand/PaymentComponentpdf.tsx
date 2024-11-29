import React, { useState } from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import Select from './Select';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

const PaymentComponent = () => {
  const [paymentType, setPaymentType] = useState('Financement');
  const [firstDeliveryDate, setFirstDeliveryDate] = useState('');
  const { products, nombreOfLivraison } = useProductContext();

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  return (
    <div className="p-8 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Options de Paiement</h2>

        <div className="mb-8">
          <label className="block text-xl text-gray-700 font-semibold mb-4">Type de Paiement</label>
          <div className="flex items-center justify-around">
            <label className="flex items-center">
              <input
                type="radio"
                value="Financement"
                checked={paymentType === 'Financement'}
                onChange={handlePaymentTypeChange}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-lg text-gray-700">Financement</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Payable sur réception"
                checked={paymentType === 'Payable sur réception'}
                onChange={handlePaymentTypeChange}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-lg text-gray-700">Payable sur réception</span>
            </label>
          </div>
        </div>

        {paymentType === 'Financement' && (
          <div className="mb-8">
            <Select /> {/* Using the Select component */}
          </div>
        )}

        {paymentType === 'Payable sur réception' && (
          <div className="mb-8">
            <label className="block text-xl text-gray-700 font-semibold mb-4">Livraisons</label>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livraison</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(nombreOfLivraison)].map((_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Livraison {index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {products.reduce((sum, product) => sum + product.quantities[index] * product.price, 0).toFixed(2)}$
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mb-8">
          <label className="block text-xl text-gray-700 font-semibold mb-4">Date du premier paiement</label>
          <input
            type="date"
            value={firstDeliveryDate}
            onChange={(e) => setFirstDeliveryDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

      </div>
    </div>
  );
};

export default PaymentComponent;
