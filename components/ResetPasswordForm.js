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

const ResetPasswordForm = ({ onResetPassword }) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const body = JSON.stringify({
    password,
    re_password,
  });

  const onResetPasswordHandler = async (e) => {
    e.preventDefault();
    onResetPassword(body);
  };

  return (
    <Container className={styles.containerCard}>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>Reset Password</Card.Header>
        <Card.Body>
          <Form className={styles.form}>

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

          </Form>
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <Button
            onClick={(e)  => onResetPasswordHandler(e)}
            size="lg"
            className={styles.cardFooterButton}
          >
            Save
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ResetPasswordForm;
