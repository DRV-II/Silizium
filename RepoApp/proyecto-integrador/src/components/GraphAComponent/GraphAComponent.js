import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './GraphAComponent.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphAComponent = ({ jsonData }) => {
  const slicedData = jsonData.slice(0, 6); // Slice the array to get the first 6 items

  const data = {
    labels: slicedData.map(item => item.certification),
    datasets: [
      {
        data: slicedData.map(item => item.cantidad),
        backgroundColor: [
          '#da1e28',
          '#0f62fe',
          '#f1c21b',
          '#42be65',
          '#7F3AE7',
          '#4589ff',
        ],
        hoverBackgroundColor: [
          '#ba1b23',
          '#0353e9',
          '#FFCE56',
          '#157532',
          '#e8daff',
          '#BAE6FF',
        ],
      },
    ],
  };

  return (
    <div className='GraphA-container'>
      <div className='title-a'>
        <h2>Popular Certifications</h2>
      </div>
      <Pie data={data} />
    </div>
  );
};
export default GraphAComponent;
