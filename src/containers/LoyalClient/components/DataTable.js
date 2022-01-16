import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "../../../components/UI/Table";

const Styles = styled.div`
  padding: 1rem;
`;

function DataTable(props) {
  const columns = React.useMemo(() => [
    {
      Header: "Name",
      columns: [
        { Header: "User Name", accessor: "userName" },
        {
          Header: "First Name",
          accessor: "firstName",
        },
        {
          Header: "Last Name",
          accessor: "lastName",
        },
      ],
    },
    {
      Header: "Info",
      columns: [
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Phone",
          accessor: "phone",
        },
      ],
    },
    {
      Header: "Details",
      columns: [
        {
          Header: "Total Buy",
          accessor: "totalBuy",
        },
      ],
    },
  ]);
  console.log(props.data);

  const makeData = (data) => {
    return data.map((user) => {
      return {
        ...user,
        userName: user._id[0].userName,
        firstName: user._id[0].firstName,
        lastName: user._id[0].lastName,
        email: user._id[0].email,
        phone: user._id[0].phone,
        totalBuy: user.totalBuy,
      };
    });
  };

  return (
    <Styles>
      <Table columns={columns} data={makeData(props.data)} />
    </Styles>
  );
}

export default DataTable;
