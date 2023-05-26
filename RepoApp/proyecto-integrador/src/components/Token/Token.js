import React from 'react';
import './Token.css';

const Token = (props) => {
  const { urlEnd } = props;
  return (
    <div className="qr-container">
    <h1 className='titulo'>Token</h1>
        <p className='texto'> Enter the code you got from the QR </p>
    <div className="token-container">
        <form action={ urlEnd } method='POST'>
            <label htmlFor="credentials"></label>
            <input type="text" name="token" id="login" className="token" placeholder="  Token"/><br></br>
            <div>
            <button type="submit" className="button">Send</button>
            </div>
        </form>
    </div>

    </div>
  );
};

export default Token;