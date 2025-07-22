import React, { useEffect, useState } from 'react';

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

const SellerSummary = ({ userEmail }) => {
  const [summary, setSummary] = useState({ totalSold: 0, totalEarnings: 0 });
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosSecure.get(`/seller-summary?email=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`
          }
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Error fetching summary:', err);
      }
    };

    if (userEmail) {
      fetchSummary();
    }
  }, [userEmail]);

  const data = [
    { name: 'Total Sold Properties', value: summary.totalSold },
    { name: 'Total Earnings ($)', value: summary.totalEarnings }
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700 ">Seller Performance Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold text-center mb-2">Pie Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold text-center mb-2">Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SellerSummary;
