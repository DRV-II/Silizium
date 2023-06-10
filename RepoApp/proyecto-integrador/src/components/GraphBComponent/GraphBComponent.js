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
      borderColor: '#f1c21b',
      backgroundColor: '#f1c21b',
    },
    {
      label: 'Cert B',
      data: [30],
      borderColor: '#0f62fe',
      backgroundColor: '#0f62fe',
    },
    {
      label: 'Cert C',
      data: [20],
      borderColor: '#78a9ff',
      backgroundColor: '#78a9ff',
    },
    {
      label: 'Cert D',
      data: [25],
      borderColor: '#da1e28',
      backgroundColor: '#da1e28',
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
