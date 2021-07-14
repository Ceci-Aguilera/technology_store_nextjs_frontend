import Link from "next/link";
import Image from "next/image";
import styles from "../styles/AccountInfoForm.module.css";
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
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";

const AccountInfoForm = ({
  user,
  shipping_addresses,
  billing_addresses,
  onAddressClick,
}) => {
  useEffect(() => {});

  return user == null ? (
    <div></div>
  ) : (
    <Container className={styles.accountContainer}>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>
          Hi, {user.first_name} !
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          <span className={styles.spanSectionHeader}>Personal Info:</span>
          <ul className={styles.personalInfoList}>
            <li>First Name: {user.first_name}</li>
            <li>Last Name: {user.last_name}</li>
            <li>Email Address: {user.email}</li>
            <li>Phone Number: {user.phone}</li>
          </ul>
          <span className={styles.spanSectionHeader}>Payment Info:</span>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6} className={styles.SubSectionCol}>
              {shipping_addresses == undefined ||
              shipping_addresses == null ||
              shipping_addresses.length === 0 ? (
                <div></div>
              ) : (
                <>
                  <Container className={styles.addContainer}>
                    <span className={styles.spanSectionSubHeader}>
                      Shipping Address
                    </span>

                    <span className={styles.spanSectionSubHeaderAdd}>
                      Add +
                    </span>
                  </Container>
                  <ListGroup className={styles.listGroup}>
                    {shipping_addresses.map((add, index) => {
                      return (
                        <Link
                          key={index}
                          href={`/account/${user.id}/manage-address/${add.id}/`}
                        >
                          <ListGroupItem
                            style={{
                              backgroundColor:
                                add.default == true ? "#009682" : "transparent",
                            }}
                            className={styles.listGroupItem}
                          >
                            <p className={styles.addP}>
                              {add.street_address +
                                " " +
                                add.apartment_address +
                                " " +
                                add.state_or_province +
                                " " +
                                add.country +
                                " " +
                                add.zip}
                            </p>
                            <span className={styles.SpanAddListItem}>Edit</span>
                          </ListGroupItem>
                        </Link>
                      );
                    })}
                  </ListGroup>
                </>
              )}
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} className={styles.SubSectionCol}>
              {billing_addresses == undefined ||
              billing_addresses == null ||
              billing_addresses.length === 0 ? (
                <div></div>
              ) : (
                <>
                  <Container className={styles.addContainer}>
                    <span className={styles.spanSectionSubHeader}>
                      Billing Address
                    </span>

                    <span className={styles.spanSectionSubHeaderAdd}>
                      Add +
                    </span>
                  </Container>
                  <ListGroup className={styles.listGroup}>
                    {billing_addresses.map((add, index) => {
                      return (
                        <Link
                          key={index}
                          href={`/account/${user.id}/manage-address/${add.id}/`}
                        >
                          <ListGroupItem
                            style={{
                              backgroundColor:
                                add.default == true ? "#009682" : "transparent",
                            }}
                            className={styles.listGroupItem}
                          >
                            <p className={styles.addP}>
                              {add.street_address +
                                " " +
                                add.apartment_address +
                                " " +
                                add.state_or_province +
                                " " +
                                add.country +
                                " " +
                                add.zip}
                            </p>
                            <span className={styles.SpanAddListItem}>Edit</span>
                          </ListGroupItem>
                        </Link>
                      );
                    })}
                  </ListGroup>
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AccountInfoForm;
