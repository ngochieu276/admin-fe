import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

/**
* @author
* @function Login

**/

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <Container style={{ padding: "50px" }}>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <h5></h5>
            <h5>For nomarl admin test</h5>
            <p>Test account: admin1@gmail.com</p>
            <p>pass: 123456</p>
            <h5>For manager test</h5>
            <p>Test account: admin99@gmail.com</p>
            <p>pass: 123456</p>
            <Form onSubmit={userLogin}>
              <Input
                placeholder='Email'
                value={email}
                type='email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <Input
                placeholder='Password'
                value={password}
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div style={{ color: "red", textAlign: "left" }}>
                {auth.error}
              </div>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;
