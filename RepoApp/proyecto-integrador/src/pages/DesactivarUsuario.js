import React from 'react';
import './DesactivarUsuario.css'

const DesactivarUsuario = () => {
  return (
    <div className='user-container'>
    <h5 className="title">Deactivate User</h5>
      <div className="rectangulo-user"></div>
      <div className="form">
        <form action='http://localhost:5000/delete' method='POST'>
          <label htmlFor="id"></label>
          <input type="text" name="username" id="id" className="id" placeholder="  ID"/><br></br>
          <button type="submit" className="button">Deactivate</button>
        </form>
      </div>

    </div>
  );
};

export default DesactivarUsuario;