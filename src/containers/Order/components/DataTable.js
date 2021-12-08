import React, {useState,useEffect} from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useTable, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { getOrderBy } from "../../../actions";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { useDispatch } from "react-redux";

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     // Let's make a column for selection
    //     {
    //       id: "selection",
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox
    //       Header: ({ getToggleAllPageRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );

  // Render the UI for your table
  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className='pagination'>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <BsFillSkipBackwardFill />
        </Button>{" "}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <BsFillArrowLeftSquareFill />
        </Button>{" "}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          <BsFillArrowRightSquareFill />
        </Button>{" "}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <BsFillSkipForwardFill />
        </Button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function App(props) {
  const dispatch = useDispatch()

  const sortOrderBy = (value) => {
     if (value === '1' || value === '-1') {
      dispatch(getOrderBy(Number(value)))
     }
     
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: " OrderId",
            accessor: "_id",
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
            Header: <div style={{ padding: "0 50px", boxSizing: "border-box" }}>
              <option value={""}>CreatedAt</option>
              <select onClick={(e) => sortOrderBy(e.target.value)}>
              <option value={""}>Sort by</option>
                <option value={-1} >
                  Newest</option>
                <option value={1} >
                  Oldest</option>

              </select>
            </div>,
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

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return (
        <div style={{ marginTop: "15px" }}>
          <div>{`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`}</div>
          <div>{`${d.getHours()}:${d.getMinutes()}`}</div>
        </div>
      );
    }
    return "";
  };

  const makeData = (data) => {
    return data.map((order) => {
      return {
        ...order,
        totalItem: order.items
          .map((item) => item.purchaseQty)
          .reduce((a, b) => a + b),
        details: (
          <Button>
            <Link to={`/order/${order._id}`}>Details</Link>
          </Button>
        ),
        updatedAt: formatDate(order.updatedAt),
        createdAt: formatDate(order.createdAt)
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
