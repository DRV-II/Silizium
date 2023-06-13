import React from 'react';
import { NavLink } from 'react-router-dom';
import './Perfil.css';
import {TwoFactorAuthentication, UserFollow, SubtractAlt } from '@carbon/icons-react';
import Sidebar from '../components/Sidebar/Sidebar';

function Perfil() {
  return (
    <div className="perfil-container">
      <div className="left-side-perfil">
      <Sidebar/>
      </div>
      <div className="right-side-perfil">
          <h1 className="title-profile">Profile</h1>
        <div className="right-profile-top">
        <div className="authentification">
        <h5 className="title-a">Doble authentification</h5>
        <br></br>
          <TwoFactorAuthentication size='80' className='authentification-icon' />
          <br></br>
          <NavLink to='/QR' activeClassName='active'>
          <a className="button-A">Setup</a>
          </NavLink>
          <NavLink to='/TokenPage' activeClassName='active'>
          <a className="button-A2">Auth</a>
          </NavLink>
      </div>
      <div className="authentification-2">
        <h5 className="title-r">User Registration</h5>
        <NavLink to='/UserRegistration' activeClassName='active'>
          <UserFollow size='80' className='registration-icon' />
          <a className="button-R">Register</a>
        </NavLink>
      </div>
      <div className="authentification-3">
        <h5 className="title-d">Deactivate User</h5>
        <NavLink to='/DeactivateUser' activeClassName='active'>
          <SubtractAlt size='80' className='deactivate-icon' />
          <a className="button-D">Deactivate</a>
        </NavLink>
      </div>
    </div>
    </div>
    </div>
  );
}
export default Perfil;
