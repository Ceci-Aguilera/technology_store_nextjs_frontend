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

const NextNavbar = ({ user, categories, onSearchClicked }) => {
  const [isUser, setIsUser] = useState(false);
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState(null)

  const accountString = (user) => {
    return user === null ? "Log In" : `${user["first_name"]}`;
  };

  useEffect(() => {
    setIsUser(user != null);
  });

  return (categories==null)?<></>:(
    <>
      <Navbar variant="dark" expand="md" className={`navbar-expand-md ${style.navbar}`}>
        <Nav.Link className={`navbar-brand d-lg-none ${style.smallScreenBrand}`} href="/">
          Technology <span className={style.brandSpan}>Store</span>
        </Nav.Link>
        <Container className={style.dummy}></Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          <Navbar.Brand className={`d-none d-lg-block ${style.brand}`} href="/">
          Technology <span className={style.brandSpan}>Store</span>
          </Navbar.Brand>

          <Form className="d-flex">
            <InputGroup className={style.inputGroup}>
              <FormControl
                as="select"
                placeholder="Search"
                className={`mr-2 ${style.categoryDropdown}`}
                aria-label="Search"
                onChange={(e) => setCategoryHandler(e.target.value, setCategory, categories)}
              >
                <option>All Categories</option>
                {/* <Category /> */}
                {categories != null ? (
                  categories.map((category, index) => {
                    return (
                      <option value={index} key={index+2}>
                        {category["category_title"]}
                      </option>
                    );
                  })
                ) : (
                  <> <option>No categories</option></>
                )}
              </FormControl>

              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                className={style.searchButton}
                onClick={(e) => onSearchClicked(e, category, keyword)}
              >
                Search
              </Button>
            </InputGroup>
          </Form>

          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className={style.navLink} href="/">
              {accountString(user)}
            </Nav.Link>

            <Nav.Link className={style.navLink} href="/">
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
              <Button onClick={() => LogOut()} className={style.logoutButton}>
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

export default NextNavbar;


const setCategoryHandler = (value, setCategory, categories) => {
  try {
    setCategory(categories[value].id);
  } catch {
    setCategory(-1);
  }
}