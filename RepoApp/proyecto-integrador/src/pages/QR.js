import React, { useEffect, useState } from 'react';
import './QR.css';
import QRCode from 'qrcode.react';
import axios from 'axios';

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

  useEffect(() => {
    authSetup();
  }, []);

  //var dataQr = data;
  const qrString = data.qrCode;
  const secret = data.secret;

  console.log(data);

  return (
    <div className="qr-container">
      <h1 className='tituloQR'>QR</h1>
      <p className='textoQR'> Scan the QR into an authenticator app to get your token </p>
      <div className="img-container">
        <QRCode value={qrString} size={300} fgColor="#000000" bgColor="#ffffff" className="QR" />
      </div>
      <div>
        <p className='texto1QR'> Or enter this text in an authenticator app</p>
        <p className="claveQR">{secret}</p>
      </div>
      <div className="rectangulo"></div>
    </div>
  );
};

export default QR;
