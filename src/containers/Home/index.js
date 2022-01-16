import React, { useState } from "react";
import Layout from "../../components/Layout";
import ProductChart from "./Component/ProductChart";
import IncomeChart from "./Component/IncomeChart";
import HotTagsChart from "./Component/HotTagsChart";
import MonthSaleChart from "./Component/MonthSaleChart";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getPopTags, getSalesByDay, getTopSales } from "../../actions";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(7);
  const [salesMonth, setSalesMonth] = useState(new Date().getMonth() + 1);
  const [productMonth, setProductMonth] = useState(new Date().getMonth() + 1);
  const datePick = [
    { day: 7, title: "a week ago" },
    { day: 15, title: "2 week ago" },
    { day: 30, title: "1 month ago" },
    { day: 93, title: "3 month ago" },
    { day: 183, title: "6 month ago" },
    { day: 365, title: "1 year ago" },
  ];
  const monthList = [
    { value: 1, title: "January" },
    { value: 2, title: "Febuary" },
    { value: 3, title: "March" },
    { value: 4, title: "April" },
    { value: 5, title: "May" },
    { value: 6, title: "Jun" },
    { value: 7, title: "July" },
    { value: 8, title: "August" },
    { value: 9, title: "September" },
    { value: 10, title: "October" },
    { value: 11, title: "November" },
    { value: 12, title: "December" },
  ];
  const tagSelectDate = (value) => {
    if (value !== date) {
      dispatch(getPopTags({ daysAgo: value }));
      setDate(value);
    }
  };
  const daySaleSelectMonth = (value) => {
    if (value != salesMonth) {
      dispatch(getSalesByDay({ month: Number(value) }));
      setSalesMonth(value);
    }
  };
  const productSelectMonth = (value) => {
    console.log(value);
    if (value != productMonth) {
      dispatch(getTopSales({ month: Number(value) }));
      setProductMonth(value);
    }
  };
  return (
    <Layout sidebar>
      <div className='homepage'>
        <div className='chart'>
          <h4>{`Sales by day of month ${salesMonth}`}</h4>
          <div className='chart-header'>
            <p>x 10000$</p>
            <div className='select'>
              <select onClick={(e) => daySaleSelectMonth(e.target.value)}>
                {monthList.map((mont) => {
                  return <option value={mont.value}>{mont.title}</option>;
                })}
              </select>
            </div>
          </div>

          <IncomeChart />
        </div>
        <div className='chart'>
          <h4>{`Product sold of month ${productMonth}`} </h4>
          <div className='chart-header'>
            <p>x 10000$</p>
            <div className='select'>
              <select onClick={(e) => productSelectMonth(e.target.value)}>
                {monthList.map((mont) => {
                  return <option value={mont.value}>{mont.title}</option>;
                })}
              </select>
            </div>
          </div>
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
            <select onClick={(e) => tagSelectDate(e.target.value)}>
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
