import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

const ProductChart = (props) => {
  const { topSales, loadTopSales } = useSelector((state) => state.summary);

  if (loadTopSales) {
    return <Spinner />;
  }
  const modData = topSales.map((dat) => {
    return {
      name: dat._id[0],
      quantity: dat.totalQuantity,
      totalSale: dat.totalSale / 10000,
    };
  });

  let returnChart;
  if (props.quantity) {
    returnChart = (
      <ResponsiveContainer width='100%' height='80%'>
        <ComposedChart
          width={500}
          height={400}
          data={modData}
          margin={{
            top: 0,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis dataKey='name' scale='band' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='quantity' barSize={15} fill='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    );
  } else if (props.totalSale) {
    returnChart = (
      <ResponsiveContainer width='100%' height='80%'>
        <ComposedChart
          width={500}
          height={400}
          data={modData}
          margin={{
            top: 0,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis dataKey='name' scale='band' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='totalSale' barSize={15} fill='#413ea0' />
          <Line type='monotone' dataKey='quantity' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  return returnChart;
};

export default ProductChart;
