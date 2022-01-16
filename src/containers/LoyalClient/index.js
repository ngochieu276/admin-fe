import { Button, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

import TableData from "./components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import NewModal from "../../components/UI/Modal";
import Spinner from "../../components/UI/Spinner";

/**
 * @author
 * @function LoyalClient
 **/

const LoyalClient = (props) => {
  const { usersBuyList, loadUserBuyList } = useSelector(
    (state) => state.summary
  );
  if (loadUserBuyList) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }
  return (
    <Layout sidebar>
      <TableData data={usersBuyList} />
    </Layout>
  );
};

export default LoyalClient;
