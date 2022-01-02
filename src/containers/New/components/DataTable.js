import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Table from "../../../components/UI/Table";
import { Link } from "react-router-dom";
import FormatDate from "../../../components/UI/FormatDate";

const Styles = styled.div`
  padding: 1rem;
  table {
    th {
      text-align: center;
    }
  }
`;

function App(props) {
  const getNewDetails = (newLetter) => {
    props.showNewDetails(newLetter);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "Title",
            accessor: "title",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Send by",
            accessor: "createdBy",
          },
          {
            Header: "Send at",
            accessor: "createdAt",
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
    return data.map((newLetter) => {
      return {
        ...newLetter,
        createdBy: newLetter.createdBy.userName,
        createdAt: <FormatDate date={newLetter.createdAt} />,
        details: (
          <Button onClick={() => getNewDetails(newLetter)}>Details</Button>
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

export default App;
