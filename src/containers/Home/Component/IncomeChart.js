import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import Spinner from "../../../components/UI/Spinner";

const data = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "H",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page I",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page K",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page L",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "M",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "N",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const IncomeChart = (props) => {
  const { salesByDay, loadSalesByDay } = useSelector((state) => state.summary);
  if (loadSalesByDay) {
    return <Spinner />;
  }
  const modData = salesByDay.map((dat) => {
    return {
      name: dat._id,
      totalSale: dat.totalSale / 10000,
    };
  });

  const returnChart = (
    <ResponsiveContainer width='100%' height='80%'>
      <LineChart
        width={500}
        height={300}
        data={modData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='totalSale'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return returnChart;
};

export default IncomeChart;
