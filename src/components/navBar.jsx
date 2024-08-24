import React from 'react';

const Navbar = ({ onConnectWallet }) => {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
    
          <span className="text-white text-2xl font-bold">Ensure</span>
        </div>
        <button 
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out"
          onClick={onConnectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};

export default Navbar;