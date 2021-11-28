import { Button, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

import TableData from "./components/DataTable";
import { getUsers } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { createAdminUser } from "../../actions/user.actions";
import NewModal from "../../components/UI/Modal";

/**
 * @author
 * @function User
 **/

const User = (props) => {
  const [query, setQuery] = useState("");

  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { users, meta } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addUserForm = (e) => {
    e.preventDefault();
    const user = {
      userName,
      password,
    };
    setShow(false);
    dispatch(createAdminUser(user));
  };

  const searchForQuery = (e) => {
    e.preventDefault();
    console.log(query);
    dispatch(getUsers(query));
  };

  useEffect(() => {
    dispatch(getUsers(""));
  }, []);

  const renderAddUserModal = (
    <NewModal
      show={show}
      handleClose={() => setShow(false)}
      onSubmit={addUserForm}
      modalTitle={"Add new admin user"}
    >
      <Row>
        <Col>
          <Input
            value={userName}
            placeholder={`UserName`}
            onChange={(e) => setUserName(e.target.value)}
            className='form-control-sm'
          />
          <Input
            value={password}
            placeholder={`Password`}
            onChange={(e) => setPassword(e.target.value)}
            className='form-control-sm'
          />
        </Col>
      </Row>
    </NewModal>
  );

  return (
    <Layout sidebar>
      <Row>
        <Col>
          <Input
            placeholder='Search for user'
            value={query}
            type='text'
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </Col>
        <Button onClick={searchForQuery}>Search</Button>
        <Col>
          <Button
            onClick={() => {
              setShow(true);
            }}
          >
            Add new User
          </Button>
        </Col>
      </Row>

      <TableData data={users} />

      {renderAddUserModal}
    </Layout>
  );
};

export default User;
