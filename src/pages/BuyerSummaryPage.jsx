import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const COLORS = ["#00C49F", "#FF8042"];

const BuyerSummaryPage = ({ userEmail }) => {
  const axiosSecure = useAxiosSecure();

  const { data: summary, isLoading } = useQuery({
    queryKey: ["buyer-summary", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer-summary?email=${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });
  
  if (isLoading || !summary) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  const chartData = [
    { name: "Properties Bought", value: summary.totalBought },
    { name: "Total Spent (k)", value: summary.totalSpent / 1000 },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-purple-100 to-pink-50">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-purple-700 mb-6"
      >
        🛒 Your Purchase Summary
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card Summary */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-md border border-purple-200"
        >
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Overview</h2>
          <p className="text-gray-700 mb-2">
            <strong>Total Properties Bought:</strong> {summary.totalBought}
          </p>
          <p className="text-gray-700">
            <strong>Total Money Spent:</strong> ${summary.totalSpent.toLocaleString()}
          </p>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full h-64"
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyerSummaryPage;
