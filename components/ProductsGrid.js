import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/ProductsGrid.module.css";
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

const ProductsGrid = ({ products }) => {
  const router = useRouter();

  return products == null ? (
    <></>
  ) : (
    <Container>
      <Container className={styles.header}>
        <span className={styles.headerSpan}>Top</span> Sells
      </Container>
      <Row>
        {products.map((item, index) => {
          return (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className={styles.card}>
                <img
                  className={styles.cardImage}
                  alt="No image of this product"
                  src={item.image}
                />
                <Card.Header className={styles.cardHeader}>
                  {item.product.title}
                </Card.Header>
                <Card.Body>
                  {item.variations.map((variation, index) => {
                    if (index < 4) {
                      return (
                        <p key={index}>
                          {" "}
                          - {variation.variation}{" "}
                          {variation.variation_category.category_title}
                        </p>
                      );
                    }
                  })}
                  <h4 className={styles.price}>${item.total_price}</h4>
                </Card.Body>
                <Card.Footer className={styles.cardFooter}>
                  <Row>
                    <Col xs={12} lg={6}>
                      <Button className={styles.cardButton}>Add to Cart</Button>
                    </Col>

                    <Col xs={12} lg={6}>
                      <Button className={styles.cardButton}>View</Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ProductsGrid;
