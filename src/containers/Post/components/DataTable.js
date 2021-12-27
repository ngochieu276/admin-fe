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
      border-bottom: 0.5px solid gray;
      border-right: 0.5px solid gray;
      text-align: center;
    }
  }
`;

function App(props) {
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
            Header: "CreatedBy",
            accessor: "createdBy",
          },
          {
            Header: "CreatedAt",
            accessor: "createdAt",
          },
          {
            Header: "Tags",
            accessor: "tags",
          },
          {
            Header: "Update",
            accessor: "update",
          },
        ],
      },
    ],
    []
  );

  // const formatDate = (date) => {
  //   if (date) {
  //     const d = new Date(date);
  //     return (
  //       <div style={{ marginTop: "15px" }}>
  //         <div>{`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`}</div>
  //         <div>{`${d.getHours()}:${d.getMinutes()}`}</div>
  //       </div>
  //     );
  //   }
  //   return "";
  // };

  const makeData = (data) => {
    return data.map((post) => {
      return {
        ...post,
        tags: (
          <div>
            {post.tags.map((tag) => (
              <span className='tag'>{tag}</span>
            ))}
          </div>
        ),
        createdBy: post.createdBy.userName,
        // createdAt: formatDate(post.createdAt),
        createdAt: <FormatDate date={post.createdAt} />,
        update: (
          <Button>
            <Link to={`/post/${post._id}`}>Details</Link>
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

export default App;
