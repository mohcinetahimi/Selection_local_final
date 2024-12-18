import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import '../CreateCommand/tailwind.output.css'; // Make sure this path is correct

interface ButtonDividerProps {
  onClick: () => void;
  title: string;
  className?: string; // Add this to accept custom classes
}

const ButtonDivider: React.FC<ButtonDividerProps> = ({ onClick, title, className }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <button
          type="button"
          onClick={onClick}
          className={`inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${className}`}
        >
          <PlusIcon className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          {title}
        </button>
      </div>
    </div>
  );
};

export default ButtonDivider;
