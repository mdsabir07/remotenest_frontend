"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Loading from "@/app/loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
    // total cities
  const { data: totalCities = 0, isLoading: citiesLoading } = useQuery({
    queryKey: ['totalCities'],
    queryFn: async () => {
      const res = await axios.get('/api/cities');
      return res.data?.cities?.length || 0;
    }
  });

  // total users
  const { data: totalUsers = 0, isLoading: usersLoading } = useQuery({
    queryKey: ['totalUsers'],
    queryFn: async () => {
      const res = await axios.get('/api/users');
      return res.data?.users?.length || 0;
    }
  });

  // chart data
  const chartData = {
    labels: ['Total Users', 'Total Cities'],
    datasets: [
      {
        label: 'Counts',
        data: [totalUsers, totalCities],
        backgroundColor: ['#4f46e5', '#10b981'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'System Metrics Overview',
      },
    },
  };
  if(usersLoading || citiesLoading) return <Loading></Loading>

  console.log(totalUsers, totalCities)
    return (
        <div className="space-y-6">
            {/* Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-lg p-4 shadow">
                      <h3 className="text-lg font-semibold text-indigo-700">Total Users</h3>
                      <p className="text-3xl font-bold">{totalUsers}</p>
                    </div>
                    <div className="rounded-lg p-4 shadow">
                      <h3 className="text-lg font-semibold text-green-700">Total Cities</h3>
                      <p className="text-3xl font-bold">{totalCities}</p>
                    </div>
                  </div>
            
                  {/* Bar Chart */}
                  <div className="bg-white rounded-lg p-6 shadow">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
        </div>
    );
};

export default BarChart;