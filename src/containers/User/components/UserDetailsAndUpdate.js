import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NewModal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import { useDispatch } from "react-redux";
import { updateAdminUser } from "../../../actions";

/**
 * @author
 * @function UserDetailsAndUpdate
 **/

const UserDetailsAndUpdate = (props) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const updateUserHandler = (e) => {
    const payload = {
      updateUser: {
        userId: selectedUser._id,
        firstName,
        lastName,
        email,
        phone,
        password,
      },
    };
    setShow(false);
    dispatch(updateAdminUser(payload));
  };

  const renderUpdateUserModal = (user) => {
    return (
      <NewModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={updateUserHandler}
        modalTitle={"User details"}
      >
        <Row>
          <Col>
            <Input
              label={"First Name"}
              value={firstName}
              placeholder={selectedUser.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='form-control-sm'
            />
            <Input
              label={"Last Name"}
              value={lastName}
              placeholder={selectedUser.lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='form-control-sm'
            />

            <Input
              label={"Password"}
              value={password}
              placeholder={`Password`}
              onChange={(e) => setPassword(e.target.value)}
              className='form-control-sm'
            />
            <Input
              label={"Email"}
              value={email}
              placeholder={selectedUser.email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control-sm'
            />
            <Input
              label={"Phone"}
              value={phone}
              placeholder={selectedUser.phone}
              onChange={(e) => setPhone(e.target.value)}
              className='form-control-sm'
            />
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <div>
      {props.selectedFlatRows &&
        props.selectedFlatRows.map((user) => (
          <div>
            {user.original.userName}
            <Button style={{ margin: "3px" }}>View details</Button>
            <Button
              onClick={() => {
                setShow(true);
                setSelectedUser(user.original);
              }}
            >
              Update
            </Button>
            {renderUpdateUserModal(user)}
          </div>
        ))}
    </div>
  );
};

export default UserDetailsAndUpdate;
