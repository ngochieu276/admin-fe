import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import DataTable from "./components/DataTable";
import { Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";

import {
  getCustomerOrders,
  getOrdersByEmail,
  getCaredOrders,
  getUncaredOrders,
  managerSearchOrder,
} from "../../actions/order.action";
import { BsFillCalendarCheckFill, BsFillCalendar2XFill } from "react-icons/bs";
import Spinner from "../../components/UI/Spinner";

/**
 * @author
 * @function Orders
 **/

export const Order = (props) => {
  const { orders, loading, error } = useSelector((state) => state.order);
  const auth = useSelector((state) => state.auth);

  const [type, setType] = useState("unCare");
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.isMng) {
      dispatch(getUncaredOrders());
    } else {
      dispatch(getCustomerOrders());
    }
  }, []);

  const searchForQuery = (e) => {
    e.preventDefault();
    if (!auth.user.isMng) {
      dispatch(getOrdersByEmail({ query, startDate, endDate }));
    }
    dispatch(
      managerSearchOrder({ query, startDate, endDate, orderType: type })
    );
  };

  const handleUncaredOrders = () => {
    setType("unCare");
    dispatch(getUncaredOrders());
  };

  const handleCaredOrders = () => {
    setType("care");
    dispatch(getCaredOrders());
  };

  const handleStartDate = (e) => {
    const date = e.target.value;
    setStartDate(date);
  };

  const handleEndDate = (e) => {
    const date = e.target.value;
    setEndDate(date);
  };

  if (loading) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout sidebar>
      <div style={{ display: "flex", paddingLeft: "1rem" }}>
        <Input
          placeholder='Search for user'
          value={query}
          type='text'
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <input
          type='date'
          value={startDate}
          onChange={handleStartDate}
          style={{
            borderRadius: "4px",
            border: "0.5px solid rgb(180, 167, 167)",
          }}
        />
        <input
          type='date'
          value={endDate}
          onChange={handleEndDate}
          style={{ borderRadius: "4px" }}
          disabled={startDate ? false : true}
        />
        <Button onClick={searchForQuery}>Search</Button>
      </div>
      {auth.user.isMng && (
        <div>
          <Button
            className={type === "unCare" ? "active" : null}
            onClick={handleUncaredOrders}
          >
            <BsFillCalendar2XFill /> Uncare Orders
          </Button>
          <Button
            className={type === "care" ? "active" : null}
            onClick={handleCaredOrders}
          >
            <BsFillCalendarCheckFill /> Caring Orders
          </Button>
        </div>
      )}
      <div style={{ color: "red" }}>{error}</div>
      <DataTable data={orders} />
    </Layout>
  );
};

export default Order;
