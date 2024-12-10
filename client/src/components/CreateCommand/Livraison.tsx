import React, { useState } from "react";
import { useProductContext } from "../../contexts/ProductContext";

const Livraison: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>("soir");
  const { nombreOfLivraison } = useProductContext();

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-6">LIVRAISON</h1>
      
      <div className="mb-4">
        <p className="text-lg font-semibold">Préférence d'heure de livraison ?</p>
        <div className="flex items-center mt-2">
          <label className="flex items-center mr-4">
            <input
              type="radio"
              name="time"
              value="jour"
              checked={selectedTime === "jour"}
              onChange={() => setSelectedTime("jour")}
              className="form-radio h-5 w-5 text-red-600"
            />
            <span className="ml-2 text-lg">DE JOUR (12:00 À 17:00)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="time"
              value="soir"
              checked={selectedTime === "soir"}
              onChange={() => setSelectedTime("soir")}
              className="form-radio h-5 w-5 text-red-600"
            />
            <span className="ml-2 text-lg">DE SOIR (17:00 À 21:00)</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: nombreOfLivraison }, (_, index) => (
          <div key={index}>
            <label className="block text-sm font-semibold mb-2">
              DATE LIVRAISON {index + 1}
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Livraison;
