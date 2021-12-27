import React from "react";
import "./style.css";
import Header from "../Header";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col lg={2} className='sidebar'>
              <ul>
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/user"}>User</NavLink>
                </li>
                <li>
                  <NavLink to={"/product"}>Product</NavLink>
                </li>
                <li>
                  <NavLink to={"/order"}>Order</NavLink>
                </li>
                <li>
                  <NavLink to={"/post"}>Post</NavLink>
                </li>
              </ul>
            </Col>
            <Col lg={8} style={{ margin: "auto", paddingTop: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
