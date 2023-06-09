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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    backgroundColor: {
      color: '#FFFFFF',
    }
  },
};

const labels = [''];

export const data = {
  labels,
  datasets: [
    {
      label: 'Cert A',
      data: [10],
      borderColor: '#FFB200',
      backgroundColor: '#FFB200',
    },
    {
      label: 'Cert B',
      data: [30],
      borderColor: '#4339F2',
      backgroundColor: '#4339F2',
    },
    {
      label: 'Cert C',
      data: [20],
      borderColor: '#02A0FC',
      backgroundColor: '#02A0FC',
    },
    {
      label: 'Cert D',
      data: [25],
      borderColor: '#FF3A29',
      backgroundColor: '#FF3A29',
    },
    
  ],
};

export default function GraphBComponent() {
  return (
    <div className="GraphBContainer">
      <div className="GraphBTitle">
       <h2>Certification Category</h2> 
      </div>
      <Bar options={options} data={data} />
    </div>
  )
}
