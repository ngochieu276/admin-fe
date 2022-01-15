import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/UI/Spinner";
import { getReports, getAdvangeSearchReports } from "../../actions";
import DataTable from "./components/DataTable";
import "./style.css";

/**
 * @author
 * @function Report
 **/

export const Report = (props) => {
  const { reports, loading } = useSelector((state) => state.report);

  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [role, setRole] = useState("");
  const [field, setField] = useState("");
  const [action, setAction] = useState("");

  const dispatch = useDispatch();

  const handleStartDate = (e) => {
    const date = e.target.value;
    setStartDate(date);
  };

  const handleEndDate = (e) => {
    const date = e.target.value;
    setEndDate(date);
  };
  const handleAdvangeSearch = () => {
    const payload = {
      query,
      role: role ? new Array(role) : ["admin", "user"],
      field: field ? new Array(field) : ["order", "product"],
      action: action ? new Array(action) : ["create", "update", "delete"],
      startDate: startDate || new Date("2021-01-01").toISOString().slice(0, 10),
      endDate: endDate || new Date().toISOString().slice(0, 10),
    };
    dispatch(getAdvangeSearchReports(payload));
    setRole("");
    setField("");
    setAction("");
  };
  const handleRole = (value) => {
    setRole([...role, value]);
  };
  const handleField = (value) => {};

  const handleAction = (value) => {};

  const renderAdvangeSearch = (
    <div className='advangeSearch'>
      <Input
        placeholder='Search for user'
        value={query}
        type='text'
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <input type='date' value={startDate} onChange={handleStartDate} />
      <input
        type='date'
        value={endDate}
        onChange={handleEndDate}
        disabled={startDate ? false : true}
      />
      <div style={{ padding: "0 50px", display: "flex" }}>
        <div className='select'>
          <select onClick={(e) => setRole(e.target.value)} name='actionBy'>
            <option value={""}>Action By</option>
            <option value={"admin"}>Admin</option>
            <option value={"user"}>User</option>
          </select>
        </div>
        <div className='select'>
          <select
            onClick={(e) => {
              setField(e.target.value);
            }}
            name='field'
          >
            <option value={""}>Field</option>
            <option value={"order"}>Order</option>
            <option value={"product"}>Product</option>
          </select>
        </div>
        <div className='select'>
          <select onClick={(e) => setAction(e.target.value)} name='action'>
            <option value={""}>Action</option>
            <option value={"create"}>Create</option>
            <option value={"update"}>Update</option>
            <option value={"delete"}>Delete</option>
          </select>
        </div>
      </div>
      <Button onClick={handleAdvangeSearch}>Search</Button>
    </div>
  );

  if (loading) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout sidebar>
      {renderAdvangeSearch}
      <DataTable data={reports} />
    </Layout>
  );
};
