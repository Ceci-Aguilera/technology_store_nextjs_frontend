import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/LoginForm.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
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
  Alert,
} from "react-bootstrap";

const RegisterForm = ({ Login, onClick }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");

  const body = JSON.stringify({
    email,
    password,
    re_password,
    first_name,
    last_name,
    phone,
  });

  const onClickHandler = async (e) => {
    e.preventDefault();
    onClick(body);
  };

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>Register</Card.Header>
        <Card.Body>
          <Form className={styles.form}>
            <Form.Group
              size="lg"
              controlId="email"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>Email</Form.Label>
              <Form.Control
                className={styles.formControl}
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="password"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>Password</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="re_password"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>Re-Enter Password</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="password"
                value={re_password}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="first_name"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>First Name</Form.Label>
              <Form.Control
                className={styles.formControl}
                autoFocus
                type="text"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="last_name"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>Last Name</Form.Label>
              <Form.Control
                className={styles.formControl}
                autoFocus
                type="text"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="phone"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>Phone Number</Form.Label>
              <Form.Control
                className={styles.formControl}
                autoFocus
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

          </Form>
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <Button
            onClick={onClickHandler}
            size="lg"
            className={styles.cardFooterButton}
          >
            Register
          </Button>
          <p className={styles.p}>
            If you already have an account go to{" "}
            <Link href="/login">
              <a className={styles.a}>Login</a>
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default RegisterForm;
