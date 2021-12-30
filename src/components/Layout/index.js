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
          <div className='layout-container'>
            <div className='sidebar'>
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
                <li>
                  <NavLink to={"/report"}>Report</NavLink>
                </li>
              </ul>
            </div>
            <div className='content'>{props.children}</div>
          </div>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
