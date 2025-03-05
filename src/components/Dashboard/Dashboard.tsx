"use client";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CardDataStats from "../CardDataStats";
import { useSelector } from "react-redux";

interface BalanceData {
  income: number;
  expenses: number;
}

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState<BalanceData>({ income: 0, expenses: 0 });
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const currentUser = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        console.log(currentUser)
        const response = await fetch("http://localhost:3000/api/income"); // Replace with your API
        if (!response.ok) throw new Error("Failed to fetch balance data");

        const res = await response.json();
        console.log(res)
        setBalance({ income: res.data.amount || 0, expenses: res.expenses || 0 });

        // Prepare chart data
        setChartData([
          { name: "Income", value: res.income || 0 },
          { name: "Expenses", value: res.expenses || 0 }
        ]);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBalanceData();
  }, []);

  return (
    <>
      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        {/* Income Card */}
        <CardDataStats title="Total Income" total={`$${balance.income.toLocaleString()}`} rate="↑ 5.2%" levelUp>
          <svg className="fill-green-500 dark:fill-white" width="22" height="22" viewBox="0 0 24 24">
            <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.828l6 6V18h-4v-4H10v4H6v-7.172l6-6z" />
          </svg>
        </CardDataStats>

        {/* Expenses Card */}
        <CardDataStats title="Total Expenses" total={`$${balance.expenses.toLocaleString()}`} rate="↓ 2.8%" levelDown>
          <svg className="fill-red-500 dark:fill-white" width="22" height="22" viewBox="0 0 24 24">
            <path d="M12 22l10-10h-3V4H5v8H2l10 10zm0-2.828l-6-6V6h12v7.172l-6 6z" />
          </svg>
        </CardDataStats>

      </div>

      {/* Bar Chart Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;
