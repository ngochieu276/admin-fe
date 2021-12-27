import React from "react";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signout = () => {
    dispatch(logout());
  };

  const renderLoggedinLinks = (
    <Nav>
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
