import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../actions";
import { Row, Col, Button } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import { Container } from "@material-ui/core";
import { updateAdminUser } from "../../../actions";

/**
 * @author
 * @function UserDetails
 **/

const UserDetails = (props) => {
  const { selectedUser, loadingSpec } = useSelector((state) => state.user);
  const { userId } = useParams();

  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserById(userId));
  }, []);

  const updateUserHandler = (e) => {
    const payload = {
      updateUser: {
        userId: selectedUser._id,
        firstName: firstName || selectedUser.firstName,
        lastName: lastName || selectedUser.lastName,
        email: email || selectedUser.lastName,
        phone: phone || selectedUser.phone,
        password: password || selectedUser.password,
      },
    };
    dispatch(updateAdminUser(payload));
    history.goBack();
  };

  if (loadingSpec) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout sidebar>
      <Container className='detail-card'>
        <div className='card-input'>
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
        </div>
        <Button onClick={updateUserHandler}>Update User</Button>
      </Container>
    </Layout>
  );
};

export default UserDetails;
