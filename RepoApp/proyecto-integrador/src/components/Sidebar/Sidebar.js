import React from 'react';
import './Sidebar.css';
import { Bee, Home, Policy, TableOfContents } from '@carbon/icons-react';
import { NavLink } from 'react-router-dom';
import LogOut from '../Logout/Logout';

const Sidebar = () => {
  return (
    <div className='container-sidebar'>
      <div>
          <Bee size='56' className='bee' />
      </div>
      <div className='linea'></div>
      <div>
        <NavLink to='/Inicio' activeClassName='active'>
          <Home size='56' className='home' />
        </NavLink>
      </div>
      <div>
        <NavLink to='/' activeClassName='active'>
          <Policy size='56' className='policy' />
        </NavLink>
      </div>
      <div className='table-container1'>
        <NavLink to='/Bookmark' activeClassName='active'>
          <TableOfContents size='56' className='table1' />
        </NavLink>
      </div>
      <div>
          <NavLink to='/LoginPage' activeClassName='active'>
            <LogOut/>
          </NavLink> 
      </div>
    </div>
  );
};


export default Sidebar;
