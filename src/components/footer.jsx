import React from 'react';
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white text-center py-4 mt-12">
      <p>Made with chahinlink-Plugin by Alex Njoya</p>
      <a 
        href="https://github.com/alexnjoya/bounty.git" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white no-underline flex items-center justify-center space-x-2"
      >
        <FaGithub size={20} className="align-middle" />
        <span>GitHub</span>
      </a>
    </div>
  );
}

export default Footer;