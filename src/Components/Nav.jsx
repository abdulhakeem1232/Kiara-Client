import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='flex justify-between items-center mx-14 mt-5 mb-2'>
      <div>
        <p className='font-semibold text-xl cursor-pointer'>Kiara</p>
      </div>
      <div className='flex space-x-9'>
        <Link to="/" className='cursor-pointer'>User</Link>
        <Link to="/client" className='cursor-pointer'>Client</Link>
        <Link to="/admin" className='cursor-pointer'>Admin</Link>
      </div>      
    </div>
  );
}

export default Nav;
