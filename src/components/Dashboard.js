import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css"; // Dashboard specific styles

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [hotelCount, setHotelCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    // Fetch hotel count
    axios
      .get("/api/hotels/count")
      .then((response) => setHotelCount(response.data.count))
      .catch((error) => console.error("Error fetching hotel count", error));

    // Fetch food count
    axios
      .get("/api/foods/count")
      .then((response) => setFoodCount(response.data.count))
      .catch((error) => console.error("Error fetching food count", error));

    // Fetch monthly data for the chart
    axios
      .get("/api/monthly-data")
      .then((response) => setMonthlyData(response.data))
      .catch((error) => console.error("Error fetching monthly data", error));
  }, []);

  const data = {
    labels: monthlyData.labels || [],
    datasets: [
      {
        label: "Hotels",
        data: monthlyData.hotelData || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Foods",
        data: monthlyData.foodData || [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-info">
        <p>Total Hotels: {hotelCount}</p>
        <p>Total Foods: {foodCount}</p>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
