import React, { useEffect, useState } from "react";
import API from "../api/axios.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BarChart } from "@mui/x-charts/BarChart";

const Analytics = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCoffee, setTotalCoffee] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);

  const fetchAnalytics = async (start, end) => {
    try {
      const params = {};
      if (start) params.startDate = start.toLocaleDateString('en-CA');
      if (end) params.endDate = end.toLocaleDateString('en-CA');


      const res = await API.get("/entry/get-analytics", { params });

      setTotalPrice(res.data.totalPrice || 0);
      setTotalCoffee(res.data.totalCoffees || 0);

      // If your backend returns daily totals like:
      // { daily: [{ date: '2025-11-01', totalSpent: 200 }, ...] }
      if (res.data.daily) {
        const labels = res.data.daily.map((item) => item.date);
        const data = res.data.daily.map((item) => item.totalSpent);

        setChartLabels(labels);
        setChartSeries([{ data }]);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchAnalytics(startDate, endDate);
    }
  }, [startDate, endDate]);

  return (
    <div className="p-6">
      {/* Date Picker */}
      <div className="flex flex-col items-start gap-3 mb-6">
        <label className="text-gray-700 font-medium">Select Date Range:</label>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setStartDate(update[0]);
            setEndDate(update[1]);
          }}
          isClearable
          placeholderText="Select a date range"
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
        />
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">☕ Total Coffees</h2>
          <p className="text-4xl font-bold text-amber-600">{totalCoffee}</p>
        </div>

        <div className="bg-white border rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">💰 Total Sales</h2>
          <p className="text-4xl font-bold text-amber-600">₱ {totalPrice.toFixed(2)}</p>
        </div>

        <div className="bg-white border rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📈 Average Price</h2>
          <p className="text-4xl font-bold text-amber-600">
            ₱ {totalCoffee > 0 ? (totalPrice / totalCoffee).toFixed(2) : "0.00"}
          </p>
        </div>
      </div>

      {/* MUI X BarChart */}
      <div className="bg-white border rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">💹 Money Spent Chart</h2>
        {chartLabels.length > 0 ? (
          <BarChart
            xAxis={[{ data: chartLabels }]}
            series={chartSeries}
            height={300}
            width={800}
          />
        ) : (
          <p className="text-gray-500">Select a date range to see the chart.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
