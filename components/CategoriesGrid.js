import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/CategoriesGrid.module.css";
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

const CategoriesGrid = ({ categories }) => {
  const router = useRouter();

  return categories == null ? (
    <></>
  ) : (
    <Container>
      <Container className={styles.header}>
        <span className={styles.headerSpan}>Cate</span>gories
      </Container>
      <Row>
        {categories.map((item, index) => {
          return (
            <Col key={index} xs={6} sm={6} md={4} lg={3} className={styles.col}>
              <Card className={styles.card}>
                <img
                  className={styles.cardImage}
                  alt="No image of this product"
                  src={item.image}
                />
                <Card.Header className={styles.cardHeader}>
                  {item.category_title}
                </Card.Header>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CategoriesGrid;
