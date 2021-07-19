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

const CustomerInfoForm = ({ user, onEdit }) => {
  const router = useRouter();

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setFirst_name(user.first_name);
    setLast_name(user.last_name);
    setPhone(user.phone);
  }, []);

  const body = JSON.stringify({
    first_name,
    last_name,
    phone,
  });

  const onEditHandler = async (e) => {
    e.preventDefault();
    await onEdit(body);
    router.push(`/account/${user.id}/manage`);
  };

  return user == null ? (
    <div></div>
  ) : (
    <Container>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>Personal Info</Card.Header>
        <Card.Body>
          <Form className={styles.form}>
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
            onClick={onEditHandler}
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

export default CustomerInfoForm;
