import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './GraphAComponent.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphAComponent = () => {
  // Data for the chart
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Light-blue'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
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
