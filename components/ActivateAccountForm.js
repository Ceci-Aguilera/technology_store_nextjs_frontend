import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/ActivateAccountForm.module.css";
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

const ActivateAccountForm = ({ activated, onClick }) => {
  const router = useRouter();

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>Account Created</Card.Header>
        <Card.Body>
          {activated ? "Account Activated" : "Activate your account"}
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          {activated ? (
            <Link href="/">
              <Button size="lg" className={styles.cardFooterButton}>
                Back to Catalog
              </Button>
            </Link>
          ) : (
            <Button
              onClick={onClick}
              size="lg"
              className={styles.cardFooterButton}
            >
              Activate
            </Button>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ActivateAccountForm;
