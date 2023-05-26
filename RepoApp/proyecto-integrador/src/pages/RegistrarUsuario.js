import React from 'react';
import './RegistrarUsuario.css'

const RegistrarUsuario = () => {
  return (
    <div className='user-container'>
    <h5 className="title">User Registration</h5>
      <div className="rectangulo-user"></div>
      <div className="form">
        <form method='POST'>
        <label htmlFor="id"></label>
        <input type="text" name="id" id="id" className="id2" placeholder="  ID"/><br></br>
        <label htmlFor="password"></label>
        <input type="password" name="password" id="password" className="password" placeholder="  Password" />
        <label htmlFor="confirm-password"></label>
        <input type="password" name="confirm-password" id="confirm-password" className="confirm-password" placeholder="  Confirm your password" />
        <button type="submit" className="button">Register</button>
      </form>
      </div>

    </div>
  );
};

export default RegistrarUsuario;