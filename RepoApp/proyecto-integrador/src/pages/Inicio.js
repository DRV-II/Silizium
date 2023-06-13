import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inicio.css';
import Sidebar from '../components/Sidebar/Sidebar';
import GraphAComponent from '../components/GraphAComponent/GraphAComponent';
import GraphBComponent from '../components/GraphBComponent/GraphBComponent';
import CardComponent from '../components/CardComponent/CardComponent';

const Inicio = () => {
  const [data, setData] = useState(null);

  const getDataCertification = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:5000/getcerdata',
    })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDataCertification();
  }, []);

  return (
    <div className="inicio-container">
      <div className="left-side-inicio">
        <Sidebar />
      </div>
      <div className="right-side-inicio">
        <h1 className="titulo-inicio">Welcome</h1>
        <div className="right-side-inicio-top">
          {data && <GraphAComponent jsonData={data} />}
          {data && <GraphBComponent jsonData={data} />}
        </div>
        <br />
        <div className="right-side-inicio-bot">
          {data &&
            data.slice(0, 4).map((item, index) => (
              <CardComponent key={index} jsonData={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
