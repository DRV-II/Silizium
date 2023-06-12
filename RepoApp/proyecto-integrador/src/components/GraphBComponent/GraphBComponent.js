import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './GraphBComponent.css'


export default function GraphBComponent({ jsonData }) {

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      align: 'start',
    },
    backgroundColor: {
      color: '#FFFFFF',
    }
  },
};

const labels = [''];

const certs = jsonData.map(item => item.certification);
const amount = jsonData.map(item => item.cantidad);

const data = {
  labels,
  datasets: [
    {
      label: certs[4],
      data: [amount[4]],
      borderColor: '#f1c21b',
      backgroundColor: '#f1c21b',

    },
    {
      label: certs[6],
      data: [amount[6]],
      borderColor: '#0f62fe',
      backgroundColor: '#0f62fe',
    },
    {
      label: certs[16],
      data: [amount[16]],
      borderColor: '#78a9ff',
      backgroundColor: '#78a9ff',
    },
    {
      label: certs[23],
      data: [amount[23]],
      borderColor: '#da1e28',
      backgroundColor: '#da1e28',
    },
    
  ],
};


  return (
    <div className="GraphBContainer">
      <div className="GraphBTitle">
       <h2>Cloud Speciality</h2> 
      </div>
      <Bar options={options} data={data} />
    </div>
  )
}
