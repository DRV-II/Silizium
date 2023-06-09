import React from 'react';
import './Inicio.css';
import Sidebar from '../components/Sidebar/Sidebar';
import GraphAComponent from '../components/GraphAComponent/GraphAComponent';
import GraphBComponent from '../components/GraphBComponent/GraphBComponent';
import CardComponent from '../components/CardComponent/CardComponent';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <div className="left-side-inicio">
        <Sidebar/>
      </div>
      <div className="right-side-inicio">
        <div className="right-side-inicio-top">
          <GraphAComponent/>
          <GraphBComponent/>
        </div>
        <div className="right-side-inicio-bot">
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
        </div>
      </div>
    </div>
  );
};

export default Inicio;