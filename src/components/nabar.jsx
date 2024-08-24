import React, { useState } from 'react';

import './styles.css'; // Corrected import statement

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className='header'>
      <div className='container'>
        <h1 className='logo'>Logo</h1>
    
        <div className='btn-group'>
          <button className='btn'>Connect Wallet</button>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
