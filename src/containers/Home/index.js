import React, { useState } from "react";
import Layout from "../../components/Layout";
import ProductChart from "./Component/ProductChart";
import IncomeChart from "./Component/IncomeChart";
import HotTagsChart from "./Component/HotTagsChart";
import MonthSaleChart from "./Component/MonthSaleChart";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getPopTags } from "../../actions";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(7);
  const datePick = [
    { day: 7, title: "a week ago" },
    { day: 15, title: "2 week ago" },
    { day: 30, title: "1 month ago" },
    { day: 93, title: "3 month ago" },
    { day: 183, title: "6 month ago" },
    { day: 365, title: "1 year ago" },
  ];
  const handleSelectDate = (value) => {
    console.log(date, value);
    if (value !== date) {
      dispatch(getPopTags({ daysAgo: value }));
      setDate(value);
    }
  };
  return (
    <Layout sidebar>
      <div className='homepage'>
        <div className='chart'>
          <h4>Sales by day of month 1</h4>
          <p>x 10000$</p>
          <IncomeChart />
        </div>
        <div className='chart'>
          <h4>Product sold</h4>
          <p>x 10000$</p>
          <ProductChart totalSale />
        </div>
        <div className='chart'>
          <h4>Sales By Month</h4>
          <p>x 10000$</p>
          <MonthSaleChart />
        </div>
        <div className='chart'>
          <h4>Hot category</h4>
          <div className='select'>
            <select onClick={(e) => handleSelectDate(e.target.value)}>
              {datePick.map((dat) => {
                return <option value={dat.day}>{dat.title}</option>;
              })}
            </select>
          </div>

          <HotTagsChart />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
