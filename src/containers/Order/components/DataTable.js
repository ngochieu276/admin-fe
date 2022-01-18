import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Table from "../../../components/UI/Table";
import { Link } from "react-router-dom";
import { getOrderBy, addOrdersToAdmin } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import FormatDate from "../../../components/UI/FormatDate";

const Styles = styled.div`
  padding: 1rem;
  display: block;
  max-width: 100%;
`;

const App = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [checked, setChecked] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const sortOrderBy = (value) => {
    if (value === "1" || value === "-1") {
      dispatch(getOrderBy(Number(value)));
    }
  };
  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const handleAddOrderToAd = () => {
    const payload = {
      adminId: selectedUser,
      orderArray: checked,
    };
    if (auth.user.isMng) {
      dispatch(addOrdersToAdmin(payload));
    }
  };

  const adminList = users.filter(
    (user) => user.role === "admin" && !user.isMng
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: " Select",
            accessor: "select",
          },
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
            accessor: "status",
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
  const renderStatus = (status) => {
    if (status === "completed") {
      return <p style={{ color: "green" }}>{status}</p>;
    } else if (status === "in_progress") {
      return <p style={{ color: "blue" }}>{status}</p>;
    } else if (status === "ordered") {
      return <p style={{ color: "orange" }}>{status}</p>;
    } else if (status === "cancelled") {
      return <p style={{ color: "gray" }}>{status}</p>;
    }
  };

  const makeData = (data) => {
    return data.map((order) => {
      return {
        ...order,
        select: (
          <input
            type='checkbox'
            id={order._id}
            name={order._id}
            value={order._id}
            onChange={handleCheck}
          />
        ),
        status: renderStatus(order.status),
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

  const selectUser = (
    <div style={{ display: "flex" }}>
      <div className='select'>
        <select
          className='standard-select'
          onClick={(e) => setSelectedUser(e.target.value)}
        >
          <option value=''>Select admin:</option>
          {adminList.map((user) => {
            return <option value={user._id}>{user.userName}</option>;
          })}
        </select>
      </div>
      <Button onClick={handleAddOrderToAd}>Assign for </Button>
    </div>
  );

  return (
    <Styles>
      {auth.user.isMng && selectUser}
      <Table columns={columns} data={makeData(props.data)} checkBox />
    </Styles>
  );
};

export default App;
