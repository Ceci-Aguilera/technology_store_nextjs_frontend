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

const LoginForm = ({ Login, onClick, onResetPassword }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    email, password
  }
  const body = JSON.stringify({
    user,
  });

  const onClickHandler = async (e) => {
    e.preventDefault();
    onClick(body);
  };

  const onResetPasswordHandler = async (e) => {
    e.preventDefault();
    const reset_body = JSON.stringify({
      email,
    });
    await onResetPassword(reset_body);
  };


  return (
    <Container>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>Login</Card.Header>
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
          </Form>
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <Button
            onClick={onClickHandler}
            size="lg"
            className={styles.cardFooterButton}
          >
            Login
          </Button>
          <p className={styles.p}>
            If you do not have an account go to{" "}
            <Link href="/register">
              <a className={styles.a}>Register</a>
            </Link>
          </p>

          <p className={styles.p}>
            If you forgot your password click on {" "}
              <span onClick={(e) => {onResetPasswordHandler(e)}} className={styles.a}>Reset Password</span>{" "},
              and check your email.
          </p>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginForm;
