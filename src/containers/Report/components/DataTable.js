import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Table from "../../../components/UI/Table";
import { Link } from "react-router-dom";
import FormatDate from "../../../components/UI/FormatDate";

const Styles = styled.div`
  padding: 1rem;
  display: block;
  max-width: 100%;
`;

const App = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "ActionBy",
            accessor: "actionBy",
          },
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: " Role",
            accessor: "role",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Field",
            accessor: "field",
          },
          {
            Header: "Action",
            accessor: "action",
          },
        ],
      },
      {
        Header: "InFor",
        columns: [
          {
            Header: "Content",
            accessor: "content",
          },
          {
            Header: "Action at",
            accessor: "createdAt",
          },
        ],
      },
    ],
    []
  );

  const renderContent = (report) => {
    if (report.action == "create" && report.field == "order") {
      return (
        <p>
          <b>{report.content.role}</b>
          <b> {report.content.userName}</b> order with id
          <b>
            {" "}
            <Link to={`/order/${report.content.orderId}`}>
              {report.content.orderId}
            </Link>
          </b>
        </p>
      );
    }
    if (report.action == "update" && report.field == "order") {
      return (
        <p>
          <b>{report.content.role}</b>
          <b> {report.content.userName}</b> was update order
          <b>
            {" "}
            <Link to={`/order/${report.content.orderId}`}>
              {report.content.orderId}
            </Link>
          </b>{" "}
          to
          <b> {report.content.type}</b>
        </p>
      );
    }
    if (report.action == "delete" && report.field == "order") {
      return (
        <p>
          <b>{report.content.role}</b>
          <b> {report.content.userName}</b> was cencel order
          <b>
            {" "}
            <Link to={`/order/${report.content.orderId}`}>
              {report.content.orderId}
            </Link>
          </b>{" "}
        </p>
      );
    }
  };

  const makeData = (data) => {
    return data.map((report) => {
      return {
        ...report,
        email: report.actionBy.email,
        actionBy: report.actionBy.userName,
        role: report.actionBy.role,
        createdAt: <FormatDate date={report.createdAt} />,
        content: renderContent(report),
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
