import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';
// types.ts
export interface Product {
  name: string;
  quantity: number[];
  price: number;
}


export interface Command {
  _id: { $oid: string };
  orderNumber: string;
  clientName: string;
  consultantId: { $oid: string };
  clientId: { $oid: string };
  note: string;
  object: object;
  date: string;
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
}

interface CommandDetailsProps {
  commandId: string;
}

const CommandDetails: React.FC<CommandDetailsProps> = () => {
  const { commandId } = useParams<{ commandId: string }>();
  const [command, setCommand] = useState<Command | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCommand = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:7070/api/consultant/getcommandbyid/${commandId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCommand(response.data);
        console.log(response.data)
        setLoading(false);

      } catch (err) {
        toast.error("We can't retrieve command!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        setLoading(false);
      }
    };

    fetchCommand();
  }, [commandId]);

  if (loading) return <Loader />;
  if (!command) return <p className="text-center text-gray-500">No data available</p>;

  const calculateTotals = (products: Product[]) => {
    let totalAmount = 0;
    const productRows = products.map((product) => {
      const amount = product.quantity.reduce((sum, qty) => sum + qty, 0) * product.price;
      totalAmount += amount;
      return {
        name: product.name,
        price: product.price,
        quantities: product.quantity,
        amount
      };
    });
    return { productRows, totalAmount };
  };

  const categories = Object.keys(command.object.products) as (keyof typeof command.object.products)[];
  let grandTotal = 0;

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust formatting as needed
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Command Details</h1>
      <div className="mb-6">
        <p className="text-lg text-gray-700 mb-2"><strong>Order Number:</strong> {command.orderNumber}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Client Name:</strong> {command.clientName}</p>
        <p className="text-lg text-gray-700 mb-4"><strong>Date:</strong> {formatDate(command.date)}</p>
      </div>

      {categories.map(category => {
        const { productRows, totalAmount } = calculateTotals(command.object.products[category]);

        grandTotal += totalAmount;

        return (
          <div key={category} className="bg-white shadow-md rounded-lg mb-8 p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{category}</h2>
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">Product</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
                  {[...Array(command.object.NL)].map((_, i) => (
                    <th key={i} className="px-4 py-2 text-left text-sm font-medium">{`LV${i + 1}`}</th>
                  ))}
                  <th className="px-4 py-2 text-left text-sm font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productRows.map(row => (
                  <tr key={row.name}>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">${row.price.toFixed(2)}</td>
                    {row.quantities.map((qty, index) => (
                      <td key={index} className="px-4 py-3 text-sm text-gray-600">{qty}</td>
                    ))}
                    <td className="px-4 py-3 text-sm text-gray-600">${row.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100">
                <tr>
                  <td colSpan={command.object.NL + 3} className="px-4 py-2 text-sm font-medium text-gray-700">Total</td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-700">${totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}

      {/* Calculate and display grand total */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Grand Total</h2>
        <p className="text-lg text-gray-700 mb-2"><strong>Total Amount:</strong> ${grandTotal.toFixed(2)}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Taxes (0.56 per product):</strong> ${(grandTotal * 0.56).toFixed(2)}</p>
        <p className="text-lg font-bold text-gray-900"><strong>Grand Total:</strong> ${(grandTotal + (grandTotal * 0.56)).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CommandDetails;
