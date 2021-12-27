import { Button, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

import TableData from "./components/DataTable";
import { getUsers } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { createAdminUser, deleteUser } from "../../actions/user.actions";
import NewModal from "../../components/UI/Modal";
import Spinner from "../../components/UI/Spinner";

/**
 * @author
 * @function User
 **/

const User = (props) => {
  const [query, setQuery] = useState("");

  const [show, setShow] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [userToDelete, setUserToDelete] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { users, loading } = useSelector((state) => state.user);

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

  const onDelete = (userId) => {
    setShowDel(true);
    setUserToDelete(userId);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(userToDelete));
    setShowDel(false);
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
  const renderConfirmDelete = (
    <NewModal
      show={showDel}
      handleClose={() => setShowDel(false)}
      onSubmit={() => {}}
      modalTitle={"This action can't be undone,sure ?"}
    >
      <Row>
        <Col>
          <Button onClick={confirmDelete}>Delete</Button>
          <Button onClick={() => setShowDel(false)}>Cancel</Button>
        </Col>
      </Row>
    </NewModal>
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
      <div style={{ display: "flex", padding: "1rem" }}>
        <Input
          placeholder='Search for user'
          value={query}
          type='text'
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Button onClick={searchForQuery}>Search</Button>
        <Button
          onClick={() => {
            setShow(true);
          }}
        >
          Add new User
        </Button>
      </div>
      <TableData data={users} onDelete={onDelete} />
      {renderAddUserModal}
      {renderConfirmDelete}
    </Layout>
  );
};

export default User;
