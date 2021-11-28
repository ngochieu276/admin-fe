import React from "react";
import styled from "styled-components";
import { useTable, usePagination, useRowSelect } from "react-table";
import ProductDetailsAndUpdate from "./ProductDetailsAndUpdate";
import { Link } from "react-router-dom";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

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

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type='checkbox' ref={resolvedRef} {...rest} />
      </>
    );
  }
);

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
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <BsFillSkipBackwardFill />
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <BsFillArrowLeftSquareFill />
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <BsFillArrowRightSquareFill />
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <BsFillSkipForwardFill />
        </button>{" "}
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
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: " Avatar",
            accessor: "avatar",
          },
          {
            Header: " Name",
            accessor: "name",
          },
          {
            Header: "Listed Price",
            accessor: "listedPrice",
          },
          {
            Header: "Discount Price",
            accessor: "discountPrice",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Quantity",
            accessor: "quantity",
          },
          {
            Header: "Is Hot",
            accessor: "is_hot",
          },
          {
            Header: "In Slider",
            accessor: "in_slider",
          },
        ],
      },
      {
        Header: "Update",
        columns: [
          {
            Header: "Update",
            accessor: "update",
          },
        ],
      },
    ],
    []
  );

  const makeData = (data) => {
    return data.map((product) => {
      return {
        ...product,
        avatar: <img className='avatar' src={product.avatar} />,
        is_hot: product.is_hot ? <BsFillCheckCircleFill /> : "",
        in_slider: product.in_slider ? <BsFillCheckCircleFill /> : "",
        update: <Link to={`/product/${product._id}`}>Details</Link>,
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
