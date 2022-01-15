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

const MonthSaleChart = (props) => {
  const { salesByMonth, loadSalesByMonth } = useSelector(
    (state) => state.summary
  );

  if (loadSalesByMonth) {
    return <Spinner />;
  }
  const modData = salesByMonth.map((dat) => {
    return {
      name: dat._id,
      totalQuantity: dat.totalQuantity,
      totalSale: dat.totalSale / 10000,
    };
  });

  let returnChart = (
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
        <Line type='monotone' dataKey='totalQuantity' stroke='#ff7300' />
      </ComposedChart>
    </ResponsiveContainer>
  );

  return returnChart;
};

export default MonthSaleChart;
