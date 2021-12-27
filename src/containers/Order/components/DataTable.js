import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Table from "../../../components/UI/Table";
import { Link } from "react-router-dom";
import { getOrderBy } from "../../../actions";
import { useDispatch } from "react-redux";
import FormatDate from "../../../components/UI/FormatDate";

const Styles = styled.div`
  padding: 1rem;
`;

const App = (props) => {
  const dispatch = useDispatch();

  const sortOrderBy = (value) => {
    if (value === "1" || value === "-1") {
      dispatch(getOrderBy(Number(value)));
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: " OrderBy",
            accessor: "orderBy",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Total Amount",
            accessor: "totalAmount",
          },
          {
            Header: "Total Item",
            accessor: "totalItem",
          },
          {
            Header: "Type",
            accessor: "paymentType",
          },
        ],
      },
      {
        Header: "Update",
        columns: [
          {
            Header: "Status",
            accessor: "paymentStatus",
          },
          {
            Header: (
              <div style={{ padding: "0 50px", boxSizing: "border-box" }}>
                <p>CreatedAt</p>
                <select
                  onClick={(e) => sortOrderBy(e.target.value)}
                  style={{ border: "0.5px solid gray", borderRadius: "4px" }}
                >
                  <option value={""}>Sort by</option>
                  <option value={-1}>Newest</option>
                  <option value={1}>Oldest</option>
                </select>
              </div>
            ),
            accessor: "createdAt",
          },
          {
            Header: "UpdatedAt",
            accessor: "updatedAt",
          },
          {
            Header: "Details",
            accessor: "details",
          },
        ],
      },
    ],
    []
  );

  const makeData = (data) => {
    return data.map((order) => {
      return {
        ...order,
        orderBy: order.user.email,
        totalItem: order.items
          .map((item) => item.purchaseQty)
          .reduce((a, b) => a + b),
        details: (
          <Button>
            <Link to={`/order/${order._id}`}>Details</Link>
          </Button>
        ),
        updatedAt: <FormatDate date={order.updatedAt} />,
        createdAt: <FormatDate date={order.createdAt} />,
      };
    });
  };

  return (
    <Styles>
      <Table columns={columns} data={makeData(props.data)} />
    </Styles>
  );
};

export default App;
