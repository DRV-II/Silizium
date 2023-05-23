import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div>
      <form action='http://localhost:5000/login' method='POST'>
        <h5 className="Login">Log In</h5>
        <label htmlFor="credentials"></label>
        <input type="text" name="username" id="login" className="credentials" placeholder="  Credentials"/><br></br>
        <label htmlFor="password"></label>
        <input type="password" name="password" id="password" className="password" placeholder="  Password" />
        <button type="submit" className="button">Log In</button>
      </form>
    </div>
  );
};

export default Login;