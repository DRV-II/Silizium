import React from 'react';
import Token from '../components/Token/Token';

const TokenPage = () => {
  return (
    <div className='token-container'>
          <Token urlEnd='https://drv-ii.me/verify-otp'/>
      <div className="rectangulo"></div>
    </div>
  );
};

export default TokenPage;