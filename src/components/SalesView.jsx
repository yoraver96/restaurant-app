import React, { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesView = ({ orders }) => {
  const [view, setView] = useState("daily"); // daily | monthly

  // Process real orders
  const { dailySales, monthlySales } = useMemo(() => {
    const daily = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    const monthly = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
    };

    orders.forEach((order) => {
      const date = new Date(order.id);
      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
      const month = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ][date.getMonth()];

      if (daily[weekday] !== undefined) daily[weekday] += order.quantity || 1;
      if (monthly[month] !== undefined) monthly[month] += order.quantity || 1;
    });

    return {
      dailySales: Object.values(daily),
      monthlySales: Object.values(monthly),
    };
  }, [orders]);

  const data = {
    labels:
      view === "monthly"
        ? ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      {
        label: view === "monthly" ? "Monthly Orders" : "Daily Orders",
        data: view === "monthly" ? monthlySales : dailySales,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Restaurant Sales Report" },
    },
    animation: {
      duration: 1000,
      easing: "easeOutCubic",
    },
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Tab Switch */}
      <div className="flex justify-center mb-6 gap-3">
        <button
          onClick={() => setView("daily")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            view === "daily"
              ? "bg-teal-600 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          📊 Daily
        </button>
        <button
          onClick={() => setView("monthly")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            view === "monthly"
              ? "bg-teal-600 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          📅 Monthly
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">
        {view === "monthly" ? "📅 Monthly Sales" : "📊 Daily Sales"}
      </h2>
      <Bar data={data} options={options} />
    </motion.div>
  );
};

export default SalesView;
