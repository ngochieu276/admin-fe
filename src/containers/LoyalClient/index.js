import { Button, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

import TableData from "./components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import NewModal from "../../components/UI/Modal";
import Spinner from "../../components/UI/Spinner";
import { getLoyalList } from "../../actions/loyal.action";

/**
 * @author
 * @function LoyalClient
 **/

const LoyalClient = (props) => {
  const { loyalList, loading } = useSelector((state) => state.loyal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoyalList());
  }, []);

  if (loading) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }
  return <Layout sidebar>{<TableData data={loyalList} />}</Layout>;
};

export default LoyalClient;
