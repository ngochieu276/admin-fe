import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "../../../components/UI/Table";
import { getLoyalByCondition } from "../../../actions/loyal.action";
import { useDispatch } from "react-redux";

const Styles = styled.div`
  padding: 1rem;
`;

const voucherList = ["discount5", "discount10", "discount15"];

function DataTable(props) {
  const [voucher, setVoucher] = useState("");
  const dispatch = useDispatch();
  const columns = React.useMemo(() => [
    {
      Header: "Name",
      columns: [
        {
          Header: " Select",
          accessor: "select",
        },
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

  const makeData = (data) => {
    return data.map((user) => {
      return {
        ...user,
        select: (
          <input
            type='checkbox'
            id={user._id}
            name={user._id}
            value={user._id}
            onChange={() => console.log(user._id)}
          />
        ),
        userName: user._id[0].userName,
        firstName: user._id[0].firstName,
        lastName: user._id[0].lastName,
        email: user._id[0].email,
        phone: user._id[0].phone,
        totalBuy: user.totalBuy,
      };
    });
  };

  const handleFilterLoyal = (value) => {
    if (voucher != value) {
      dispatch(getLoyalByCondition({ condition: value }));
      setVoucher(value);
    }
  };

  const selectVoucher = (
    <div style={{ display: "flex" }}>
      <div className='select'>
        <select
          className='standard-select'
          onClick={(e) => handleFilterLoyal(e.target.value)}
        >
          <option value=''>Select condition</option>
          {voucherList.map((vou) => {
            return <option value={vou}>{vou}</option>;
          })}
        </select>
      </div>
      <Button
        onClick={() => {
          console.log("as");
        }}
      >
        Add voucher
      </Button>
    </div>
  );

  return (
    <Styles>
      {selectVoucher}
      <Table columns={columns} data={makeData(props.data)} checkBox />
    </Styles>
  );
}

export default DataTable;
