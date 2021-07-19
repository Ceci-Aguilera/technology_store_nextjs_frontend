import Link from "next/link";
import Image from "next/image";
import style from "../styles/Navbar.module.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Button,
  Col,
  Row,
  ControlLabel,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";

const NextNavbarSimple = ({ user, login }) => {
  const [isUser, setIsUser] = useState(false);
  const [linkTo, setLinkTo] = useState(false);

  const accountString = (user) => {
    if (user == null && login == true) {
      return "Register";
    } else if (user == null) {
      return "Log In";
    } else {
      return `${user["first_name"]}`;
    }
  };

  useEffect(() => {
    setIsUser(user != null);
    if (user == null && login) {
      setLinkTo("/register");
    } else if (user == null) {
      setLinkTo("/login");
    } else {
      setLinkTo(`/account/${user.id}/manage`);
    }
  });

  const LogoutHandler = async () => {
    Logout();
    router.push('/');
  };
  
  return (
    <>
      <Navbar
        variant="dark"
        expand="md"
        className={`navbar-expand-md ${style.navbar}`}
      >
        <Nav.Link
          className={`navbar-brand d-lg-none ${style.smallScreenBrand}`}
          href="/"
        >
          Technology <span className={style.brandSpan}>Store</span>
        </Nav.Link>
        <Container className={style.dummy}></Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          <Navbar.Brand className={`d-none d-lg-block ${style.brand}`} href="/">
            Technology <span className={style.brandSpan}>Store</span>
          </Navbar.Brand>

          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className={style.navLink} href={linkTo}>
              {accountString(user)}
            </Nav.Link>

            <Nav.Link className={style.navLink} href="/cart">
              Cart
            </Nav.Link>

            <NavDropdown
              className={style.dropDownButton}
              title="Link"
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="/">Action</NavDropdown.Item>
              <NavDropdown.Item href="/">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Something else here</NavDropdown.Item>
            </NavDropdown>

            {isUser ? (
              <Button
                onClick={() => LogoutHandler()}
                className={style.logoutButton}
              >
                Log Out
              </Button>
            ) : (
              <div></div>
            )}
          </Nav>
        </Navbar.Collapse>
        <Container className={style.dummy}></Container>
      </Navbar>
    </>
  );
};

export default NextNavbarSimple;

const Logout = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = window.localStorage.getItem("token");
  if (token != null && token != undefined) {
    config.headers["authorization"] = `Token ${token}`;
    axios.defaults.headers.common["Authorization"];
  }

  const body = {};
  const logout_url = "http://127.0.0.1:8000/customer-account/logout/";
  axios
    .post(logout_url, body, config)
    .then((res) => {
      window.localStorage.removeItem("token");
    })
    .catch((error) => {
      console.log(error);
    });
};
