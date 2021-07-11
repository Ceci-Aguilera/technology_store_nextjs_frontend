import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.css";
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

const Footer = () => {
  useEffect(() => {});

  return (
    <footer className={styles.footer}>
      <Row>
        <Col xs={12} md={6} lg={4} className={styles.footerColCenter}>
          <h1 className={styles.footerBrand}>
            <span className={styles.footerSpan}>Technology</span> Store
          </h1>
          <p>
            This is some bla, bla, bla ... about the store
          </p>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Row>
            <Col xs={6} className={styles.footerSubCol}>
              <h2 className={styles.colHeader}> Site Links</h2>
              <p>About us</p>
              <p>Terms & Policy</p>
            </Col>
            <Col xs={6} className={styles.footerSubCol}>
              <h2 className={styles.colHeader}> Follow Us</h2>
              <p>Facebook</p>
              <p>Twitter</p>
            </Col>
          </Row>
        </Col>

        <Col xs={12} md={6} lg={4} className={styles.footerColCenter}>
          <h2 className={styles.colHeaderCenter}>Contact Us</h2>
          <p>Email: SomeEmail@gmail.com</p>
          <p>Address: Some address here</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
