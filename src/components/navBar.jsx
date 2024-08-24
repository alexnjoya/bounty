import React from 'react';

const Navbar = ({ onConnectWallet }) => {
  return (
    <nav className="bg-gray-900 pl-[40px] pt-[10px] pb-[10px] shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-2xl ml-10px font-bold">Ensure</span>
        </div>
        <button 
          className="bg-blue-600 mr-[50px] text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out"
          onClick={onConnectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};

export default Navbar;