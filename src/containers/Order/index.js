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
} from "../../actions/order.action";
import Spinner from "../../components/UI/Spinner";

/**
 * @author
 * @function Orders
 **/

export const Order = (props) => {
  const { orders, loading, error } = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerOrders());
  }, []);

  const searchForQuery = (e) => {
    e.preventDefault();
    dispatch(getOrdersByEmail({ query, startDate, endDate }));
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
        <input type='date' value={startDate} onChange={handleStartDate} />
        <input type='date' value={endDate} onChange={handleEndDate} />
        <Button onClick={searchForQuery}>Search</Button>
      </div>
      <div style={{ color: "red" }}>{error}</div>
      <DataTable data={orders} />
    </Layout>
  );
};

export default Order;
