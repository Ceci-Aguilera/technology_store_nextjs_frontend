import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/CheckEmailForm.module.css";
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

const CheckEmailForm = () => {
  const router = useRouter();

  // const onClickHandler = async (e) => {
  //   e.preventDefault();
  //   const token = window.localStorage.getItem("token");
  //   onClick(token);
  // };

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>Account Created</Card.Header>
        <Card.Body>Check your email</Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <Link href="/">
            <Button
              size="lg"
              className={styles.cardFooterButton}
            >
              Back to Catalog
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default CheckEmailForm;
