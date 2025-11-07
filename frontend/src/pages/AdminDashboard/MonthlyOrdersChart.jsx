import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MonthlyOrdersChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonthlyOrders = async () => {
      try {
        const res = await fetch("http://localhost:8085/api/admin/monthly-orders");
        if (!res.ok) throw new Error("Failed to fetch monthly orders");
        const result = await res.json();

        // Format month as "MMM YYYY"
        const formatted = result.map(item => ({
          month: new Date(item.month + "-01").toLocaleString("default", { month: "short", year: "numeric" }),
          orders: item.orders_count
        }));

        setData(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMonthlyOrders();
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyOrdersChart;
