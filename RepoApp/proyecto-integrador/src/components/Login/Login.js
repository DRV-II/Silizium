import React from 'react';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "https://drv-ii.me/login",
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <form>
        <h5 className="Login">Log In</h5>
        <label htmlFor="credentials"></label>
        <input type="text" name="username" id="login" className="credentials" placeholder="  Credentials" onChange={(e) => setLoginUsername(e.target.value)}/><br></br>
        <label htmlFor="password"></label>
        <input type="password" name="password" id="password" className="passwordL" placeholder="  Password" onChange={(e) => setLoginPassword(e.target.value)}/>
        <button type="submit" className="buttonL" onClick={login}>Log In</button>
      </form>
    </div>
  );
};

export default Login;