import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "../../../components/UI/Table";

const Styles = styled.div`
  padding: 1rem;
`;

function DataTable(props) {
  const columns = React.useMemo(
    () => [
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
          {
            Header: "Role",
            accessor: "role",
          },
        ],
      },
      {
        Header: "Details",
        columns: [
          {
            Header: "Details",
            accessor: "details",
          },
          {
            Header: "Delete",
            accessor: "delete",
          },
        ],
      },
    ],
    []
  );

  const deleteHandler = (userId) => {
    props.onDelete(userId);
  };

  const makeData = (data) => {
    return data.map((user) => {
      return {
        ...user,
        details: (
          <Button>
            <Link to={`/user/${user._id}`}>Details</Link>
          </Button>
        ),
        delete: (
          <Button
            onClick={() => {
              deleteHandler(user._id);
            }}
          >
            Delete
          </Button>
        ),
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
