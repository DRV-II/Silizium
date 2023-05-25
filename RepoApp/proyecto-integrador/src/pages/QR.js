import React from 'react';
import './QR.css';
import QRCode from 'qrcode.react';

const QR = () => {
const qrString = 'otpauth://totp/IBM_Dashboard?secret=LIRTQ7LWMN5UKXJXENPFMIKBOV5DKOZZJE6FAWSJIFFHO3BYMZ3A';
  return (
    <div className="qr-container">
        <h1 className='titulo'>QR</h1>
        <p className='texto'> Scan the QR into an authenticator app to get your token </p>
    <div className="img-container">
         <QRCode value={qrString} size={300} fgColor="#000000" bgColor="#ffffff" className="QR" />
    </div>
    <div>
    <p className='texto1'> Or enter this text in an authenticator app</p>
    <p className="clave">otpauth://totp/IBM_Dashboard?secret=LIRTQ7LWMN5UKXJXENPFMIKBOV5DKOZZJE6FAWSJIFFHO3BYMZ3A</p>
    </div>
    <div className="rectangulo"></div>
    </div>
  );
};

export default QR;