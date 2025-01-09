import React from 'react';
import SummaryTable from './SummaryTable';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

// Define the type for items
interface Item {
  id: number;
  category: string;
}

const items: Item[] = [
  { id: 1, category: 'BEEF' },
  { id: 2, category: 'CHICKEN' },
  { id: 3, category: 'PORK' },
  { id: 4, category: 'FISH' },
  { id: 5, category: 'FREEZERS' },
  // More items...
];

const MenuBase: React.FC = () => {
  return (
    <ul role="list" className="space-y-1">
      {items.map((item) => (
        <li key={item.id} className="overflow-hidden rounded-md bg-white shadow ">
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={item.category} />
        </li>
      ))}
    </ul>
  );
};

export default MenuBase;
