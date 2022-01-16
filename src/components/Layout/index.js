import React from "react";
import "./style.css";
import Header from "../Header";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BsClipboardData,
  BsFillPersonFill,
  BsNewspaper,
  BsSignpostFill,
  BsLayoutTextWindowReverse,
  BsFillCollectionFill,
  BsFillHouseDoorFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";
/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <div className='layout-container'>
            <div className='sidebar'>
              <ul>
                <li>
                  <NavLink to={"/"}>
                    {" "}
                    <BsFillHouseDoorFill /> Home
                  </NavLink>
                </li>
                {auth.user.isMng && (
                  <li>
                    <NavLink to={"/user"}>
                      <BsFillPersonFill /> User
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to={"/product"}>
                    <BsFillCollectionFill /> Product
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/order"}>
                    <BsLayoutTextWindowReverse /> Order
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/post"}>
                    <BsSignpostFill /> Post
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/new"}>
                    <BsNewspaper /> New
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/loyal-client"}>
                    <BsFillSuitSpadeFill /> Loyal client
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/report"}>
                    <BsClipboardData /> Report
                  </NavLink>
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
