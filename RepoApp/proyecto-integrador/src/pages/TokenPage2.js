import React from 'react';
import Token from '../components/Token/Token';

const TokenPage2 = () => {
  return (
    <div className='token-container'>
          <Token urlEnd='http://localhost:5000/verify'/>
      <div className="rectangulo"></div>
    </div>
  );
};

export default TokenPage2;