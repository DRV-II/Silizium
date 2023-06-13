import React from 'react';
import './Sidebar.css';
import { Bee, Home, Policy, TableOfContents, User} from '@carbon/icons-react';
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
        <NavLink to='/Home' activeclassname='active'>
          <Home size='56' className='home' />
        </NavLink>
      </div>
      <div>
        <NavLink to='/Certifications' activeclassname='active'>
          <Policy size='56' className='policy' />
        </NavLink>
      </div>
      <div className='table-container1'>
        <NavLink to='/Bookmark' activeclassname='active'>
          <TableOfContents size='56' className='table1' />
        </NavLink>
      </div>
      <div>
        <NavLink to='/Profile' activeclassname='active'>
          <User size='56' className='profile' />
        </NavLink>
      </div>
      <div>
          <NavLink to='/' activeclassname='active'>
            <LogOut/>
          </NavLink> 
      </div>
    </div>
  );
};


export default Sidebar;
