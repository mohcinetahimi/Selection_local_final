import React, { useState } from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import Select from './Select';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

const translations = {
  french: {
    title: 'Options de Paiement',
    paymentTypeLabel: 'Type de Paiement',
    financement: 'Financement',
    payableOnReceipt: 'Payable sur réception',
    deliveriesLabel: 'Livraisons',
    delivery: 'Livraison',
    amount: 'Montant',
    firstPaymentDate: 'Date du premier paiement',
  },
  english: {
    title: 'Payment Options',
    paymentTypeLabel: 'Payment Type',
    financement: 'Financing',
    payableOnReceipt: 'Payable on Receipt',
    deliveriesLabel: 'Deliveries',
    delivery: 'Delivery',
    amount: 'Amount',
    firstPaymentDate: 'First Payment Date',
  }
};

const PaymentComponent = () => {
  const [paymentType, setPaymentType] = useState('Financement');
  const [firstDeliveryDate, setFirstDeliveryDate] = useState('');
  const { products, nombreOfLivraison,client } = useProductContext();
  const {language} =  client;

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const content = language === 'Francais' ? translations.french : translations.english;

  return (
    <div className="p-8 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{content.title}</h2>

        <div className="mb-8">
          <label className="block text-xl text-gray-700 font-semibold mb-4">{content.paymentTypeLabel}</label>
          <div className="flex items-center justify-around">
            <label className="flex items-center">
              <input
                type="radio"
                value={content.financement}
                checked={paymentType === content.financement}
                onChange={handlePaymentTypeChange}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-lg text-gray-700">{content.financement}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value={content.payableOnReceipt}
                checked={paymentType === content.payableOnReceipt}
                onChange={handlePaymentTypeChange}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-lg text-gray-700">{content.payableOnReceipt}</span>
            </label>
          </div>
        </div>

        {paymentType === content.financement && (
          <div className="mb-8">
            <Select /> {/* Using the Select component */}
          </div>
        )}

        {paymentType === content.payableOnReceipt && (
          <div className="mb-8">
            <label className="block text-xl text-gray-700 font-semibold mb-4">{content.deliveriesLabel}</label>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{content.delivery}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{content.amount}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(nombreOfLivraison)].map((_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{content.delivery} {index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {products.reduce((sum, product) => sum + product.quantities[index] * product.price + product.quantities[index] * product.price * 0.56, 0).toFixed(2)}$
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mb-8">
          <label className="block text-xl text-gray-700 font-semibold mb-4">{content.firstPaymentDate}</label>
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
