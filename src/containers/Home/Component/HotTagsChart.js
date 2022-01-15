import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
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
    name: "Page A",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

const HotTagsChart = () => {
  const { popTags, loadPopTags } = useSelector((state) => state.summary);
  if (loadPopTags) {
    return <Spinner />;
  }
  return (
    <ResponsiveContainer width='100%' height='80%'>
      <ComposedChart
        layout='vertical'
        width={500}
        height={400}
        data={popTags}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke='#f5f5f5' />
        <XAxis type='number' />
        <YAxis dataKey='_id' type='category' scale='band' />
        <Tooltip />
        <Legend />
        <Bar dataKey='totalCount' barSize={20} fill='#413ea0' />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default HotTagsChart;
