import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="bg-white shadow-md pt-4 pb-1">
      <div className="container mx-auto flex justify-between items-center px-14">
        <div className="text-2xl font-bold text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-300">
          Kiara
        </div>
        
        <div className="flex space-x-8">
          <Link
            to="/"
            className="text-lg text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
          >
            User
          </Link>
          <Link
            to="/client"
            className="text-lg text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
          >
            Client
          </Link>
          <Link
            to="/admin"
            className="text-lg text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
