import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4 text-lg font-semibold tracking-wide">&copy; {new Date().getFullYear()} Crypto Insurance. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="#privacy" className="hover:text-gray-400 transition duration-300 text-lg font-medium">Privacy Policy</a>
          <a href="#terms" className="hover:text-gray-400 transition duration-300 text-lg font-medium">Terms of Service</a>
          <a href="#contact" className="hover:text-gray-400 transition duration-300 text-lg font-medium">Contact Us</a>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300">
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300">
            <i className="fab fa-linkedin-in text-2xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;