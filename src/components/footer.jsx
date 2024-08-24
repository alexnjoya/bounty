import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 display-flex ">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Crypto Insurance. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#privacy" className="hover:text-gray-400 transition duration-300">Privacy Policy</a>
          <a href="#terms" className="hover:text-gray-400 transition duration-300">Terms of Service</a>
          <a href="#contact" className="hover:text-gray-400 transition duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;