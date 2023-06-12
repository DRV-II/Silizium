import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Inicio.css';
import Sidebar from '../components/Sidebar/Sidebar';
import GraphAComponent from '../components/GraphAComponent/GraphAComponent';
import GraphBComponent from '../components/GraphBComponent/GraphBComponent';
import CardComponent from '../components/CardComponent/CardComponent';
//require('dotenv').config();


const Inicio = () => {

  const [data,setData] = useState([{}]);

  const getDataCertification = () => {
    axios({
      method: 'GET',
      withCredentials : true,
      url: 'http://localhost:5000/getcerdata' 
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    })
  }

  useEffect(() => {
    getDataCertification();
  },[]);

  return (
    <div className="inicio-container">
      <div className="left-side-inicio">
        <Sidebar/>
      </div>
      <div className="right-side-inicio">
        <h1 className="titulo-inicio">Welcome</h1>
        <div className="right-side-inicio-top">
          <GraphAComponent jsonData = {data} />
          <GraphBComponent jsonData = {data}/>
        </div>
        <br></br>
        <div className="right-side-inicio-bot">
          <CardComponent jsonData = {data[0]}/>
          <CardComponent jsonData = {data[1]}/>
          <CardComponent jsonData = {data[2]}/>
          <CardComponent jsonData = {data[3]}/>
        </div>
      </div>
    </div>
  );
};

export default Inicio;