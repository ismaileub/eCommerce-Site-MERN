import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 21000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 25000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 27000 },
  { month: "Jul", revenue: 30000 },
  { month: "Aug", revenue: 28000 },
  { month: "Sep", revenue: 32000 },
  { month: "Oct", revenue: 35000 },
  { month: "Nov", revenue: 40000 },
  { month: "Dec", revenue: 45000 },
];

const SalesChart: React.FC = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e6eef5" />
          <XAxis dataKey="month" tick={{ fill: "#475569" }} />
          <YAxis tick={{ fill: "#475569" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
