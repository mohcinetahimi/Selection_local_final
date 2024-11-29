import React from 'react';
import {  Link } from 'react-router-dom';

const Welcome: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <nav className="w-full px-4">
      <div>
        <h3 className="mb-4 text-center text-lg font-semibold text-black">MENU</h3>
        <ul className="flex flex-col items-center gap-4">
          <li className="w-full">
            <Link
              className="group relative flex items-center justify-center w-full py-4 px-6 text-lg font-bold text-black bg-gray-200 rounded-lg hover:bg-gray-300"
              to="/Clients"
            >
              All Clients
            </Link>
          </li>
          <li className="w-full">
            <Link
              className="group relative flex items-center justify-center w-full py-4 px-6 text-lg font-bold text-black bg-gray-200 rounded-lg hover:bg-gray-300"
              to="/AddClient"
            >
              Add Client
            </Link>
          </li>
          <li className="w-full">
            <Link
              className="group relative flex items-center justify-center w-full py-4 px-6 text-lg font-bold text-black bg-gray-200 rounded-lg hover:bg-gray-300"
              to="/Commands"
            >
              All Commands
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  );
};

export default Welcome;
