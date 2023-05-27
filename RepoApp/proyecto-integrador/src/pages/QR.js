import React from 'react';
import './QR.css';
import QRCode from 'qrcode.react';
import axios from 'axios';
import { useState } from 'react';

const QR = () => {
  const [data, setData] = useState("");

  const authSetup = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/tfsetup",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };
  authSetup(); // Solo llamalo una vez
  //var dataQr = data;
  const qrString = data.qrCode;
  const secret = data.secret;

  console.log(data);

  return (
    <div className="qr-container">
        <h1 className='titulo'>QR</h1>
        <p className='texto'> Scan the QR into an authenticator app to get your token </p>
    <div className="img-container">
         <QRCode value={qrString} size={300} fgColor="#000000" bgColor="#ffffff" className="QR" />
    </div>
    <div>
    <p className='texto1'> Or enter this text in an authenticator app</p>
    <p className="clave">{secret}</p>
    </div>
    <div className="rectangulo"></div>
    </div>
  );
};

export default QR;