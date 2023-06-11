import React from 'react';
import './EmpleadoPage.css'
import Sidebar from '../components/Sidebar/Sidebar';
import Empleado from '../components/Empleado/Empleado';
import { useParams } from 'react-router-dom';

const EmpleadoPage = () => {
  const { id } = useParams();
  return (
    <div className="empleadoPage-container">
      <div className="left-empleadoPage">
        <Sidebar />
      </div>
      <div className="right-empleadoPage">
        <Empleado id={id} />
      </div>
    </div>
  );
};

export default EmpleadoPage;
