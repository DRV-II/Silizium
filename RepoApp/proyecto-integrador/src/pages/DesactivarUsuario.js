import React from 'react';
import './DesactivarUsuario.css'

const DesactivarUsuario = () => {
  return (
    <div className='user-container'>
    <h5 className="title">Deactivate User</h5>
      <div className="rectangulo-user"></div>
      <div className="form">
        <form method='POST'>
        <label htmlFor="id"></label>
        <input type="text" name="id" id="id" className="id" placeholder="  ID"/><br></br>
        <button type="submit" className="button">Deactivate</button>
      </form>
      </div>

    </div>
  );
};

export default DesactivarUsuario;