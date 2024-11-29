import React from 'react';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

// Define the type for props
interface FoodCategoryProps {
  icon: React.ReactNode; // Can be a JSX element or a string
  step: number;
  title: string;
  description: string;
  note?: string; // Optional prop
}

const FoodCategory: React.FC<FoodCategoryProps> = ({ icon, step, title, description, note }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-6">
      <div className="text-4xl">{icon}</div>
      <h2 className="text-sm text-gray-500">ÉTAPE {step}</h2>
      <h1 className="text-4xl text-gray-900 font-bold">{title}</h1>
      <p className="text-gray-700 max-w-2xl text-lg">
        {description}
      </p>
      {note && (
        <p className="text-red-500 text-sm mt-2">
          *{note}
        </p>
      )}
    </div>
  );
};

export default FoodCategory;
