import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import mybg from '../styles/bg1.jpg';

const CombinedCharts = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/api/csv/getCombinedReport', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.split('\n');
        const processedData = data.map((item) => {
          const [category, values] = item.split(': ');
          const [fetched, total, violations, date] = values.split(' | ');
          return { category, fetched, total, violations, date };
        });
        setBarChartData(processedData);
        setPieChartData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (barChartData.length > 0) {
      const chartLabels = barChartData.map((item) => item.category.replace("Data values fetched successfully from ", ""));
      const chartValues = barChartData.map((item) => item.fetched);

      const data = {
        labels: chartLabels,
        datasets: [
          {
            label: 'Data Fetched Sucessfully',
            data: chartValues,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          x: {
            type: 'category',
            labels: chartLabels,
          },
          y: {
            beginAtZero: true,
          },
        },
      };

      const chartCanvas = document.getElementById('bar-chart-canvas');
      if (chartCanvas) {
        chartCanvas.remove();
      }

      const newCanvas = document.createElement('canvas');
      newCanvas.id = 'bar-chart-canvas';
      newCanvas.style.width = '400px';
      newCanvas.style.height = '300px';
      newCanvas.style.margin = 'auto';

      const chartContainer = document.querySelector('.chart-left');
      if (chartContainer) {
        chartContainer.innerHTML = '';//replace null values
        chartContainer.appendChild(newCanvas);
      }

      new Chart(newCanvas, {
        type: 'bar',
        data: data,
        options: options,
      });
    }
  }, [barChartData]);

  useEffect(() => {
    if (pieChartData.length > 0) {
      const chartLabels = pieChartData.map((item) => item.category.replace("Data values fetched successfully from ", ""));
      const chartValues = pieChartData.map((item) => item.fetched);

      const data = {
        labels: chartLabels,
        datasets: [
          {
            label: 'Data Fetched Sucessfully',
            data: chartValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
            ],
            borderWidth: 1,
          },
        ],
      };

      // const options = {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // };

      const chartCanvas = document.getElementById('pie-chart-canvas');
      if (chartCanvas) {
        chartCanvas.remove();
      }

      const newCanvas = document.createElement('canvas');
      newCanvas.id = 'pie-chart-canvas';
      newCanvas.style.width = '340px';
      newCanvas.style.height = '290px';
      newCanvas.style.margin = 'auto';

      const chartContainer = document.querySelector('.chart-right');
      if (chartContainer) {
        chartContainer.innerHTML = '';//removes existing content
        chartContainer.appendChild(newCanvas);
      }

      new Chart(newCanvas, {
        type: 'pie',
        data: data,
        // options: options,
      });
    }
  }, [pieChartData]);

  return (
    <>
   <div className="d-flex flex-column" style={{ minHeight: "100vh", overflow: "hidden" }}>
        <div className="vh-100 d-flex justify-content-center align-items-center " style={{ backgroundImage: `url(${mybg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container card-container card p-3 shadow mt-5 pt-3" style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
    <h2 className="text-center pt-0"style={{ marginRight: '305px', marginBottom: '20px' }}>Bar Chart</h2>
    <h2 className="text-center pt-0"style={{ marginBottom: '10px' }}>Pie Chart</h2>
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <div className="chart-left" style={{ marginRight: '80px', marginBottom: '20px' }}>
      <div style={{ width: '400px', height: '350px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <div id="bar-chart-canvas" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
    <div className="chart-right" style={{ marginLeft: '50px', marginBottom: '20px' }}>
      <div style={{width: '400px', height: '350px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <div id="pie-chart-canvas" style={{width: '100%', height: '100%' }}></div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>

  </>
  );
};

export default CombinedCharts;
