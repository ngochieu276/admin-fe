import React, { useState, useEffect } from "react";

import {
  Navbar,
  Nav,
  Button,
  Container,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../actions";
import { BsBell } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { updateReportsToChecked } from "../../actions";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const { reports } = useSelector((state) => state.report);
  const [count, setCount] = useState();
  const dispatch = useDispatch();

  const signout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setCount(reports.filter((report) => report.isChecked === false).length);
  }, [reports]);

  const unCheckedReports = reports.filter(
    (report) => report.isChecked === false
  );

  const handleSetChecked = () => {
    setCount(0);
    dispatch(updateReportsToChecked());
  };

  const renderLoggedinLinks = (
    <Nav>
      <OverlayTrigger
        trigger='click'
        key={"bottom"}
        placement={"bottom-end"}
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Header as='h3'>{`New reports`}</Popover.Header>
            <Popover.Body>
              {unCheckedReports.map((report) => {
                if (report.field === "order") {
                  return (
                    <Link
                      to={`/order/${report.content.orderId}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <div
                        style={{
                          borderBottom: "0.5px solid #eee",
                          padding: "5px 10px",
                        }}
                      >
                        {report.actionBy.userName} was {report.action} an order
                      </div>
                    </Link>
                  );
                }
              })}
            </Popover.Body>
            <Popover.Header as='h3'>
              <Link to='/report'>Go to reports</Link>
            </Popover.Header>
          </Popover>
        }
      >
        <Button
          variant='secondary'
          style={{ padding: "0px", backgroundColor: "inherit", border: "none" }}
        >
          <li className='nav-item'>
            <span className='nav-link' onClick={() => {}}>
              <BsBell
                style={{ fontSize: "1.5rem" }}
                onClick={handleSetChecked}
              />
              <span className='count-reports'>{count}</span>
            </span>
          </li>{" "}
        </Button>
      </OverlayTrigger>

      <li className='nav-item'>
        <span to='/login' className='nav-link' onClick={signout}>
          Signout
        </span>
      </li>
    </Nav>
  );
  const renderNonLoggedInLink = (
    <Nav>
      <li className='nav-item'>
        <NavLink to='/login' className='nav-link'>
          Signin
        </NavLink>
      </li>

      <li className='nav-item'>
        <NavLink to='/signup' className='nav-link'>
          Signup
        </NavLink>
      </li>
    </Nav>
  );

  return (
    <Navbar
      collapseOnSelect
      fixed='top'
      expand='lg'
      bg='dark'
      variant='dark'
      style={{ zIndex: "1" }}
    >
      <Container fluid>
        {/* <Navbar.Brand href='#home'>Admin dashboard</Navbar.Brand> */}
        <Link to='/' className='navbar-brand'>
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'></Nav>
          {auth.authenticate ? renderLoggedinLinks : renderNonLoggedInLink}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
