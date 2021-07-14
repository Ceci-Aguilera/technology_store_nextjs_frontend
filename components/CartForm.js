import Link from "next/link";
import Image from "next/image";
import styles from "../styles/CartForm.module.css";
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
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";

const CartForm = ({ order, user }) => {
  useEffect(() => {});

  return order == null ? (
    <></>
  ) : (
    <Container className={styles.cardContainer}>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>
          <Container className={styles.cardHeaderTitleContainer}>
            <h1 className={styles.cardHeaderTitle}>Cart</h1>
          </Container>
          <Container className={styles.cardHeaderButtonContainer}>
            <Button size="lg" className={styles.cardButton}>
              Checkout
            </Button>
          </Container>
        </Card.Header>
        <Card.Body>
          {order.items.map((item, index) => {
            return (
              <>
                <Row key={index} className={styles.productRow}>
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className={styles.productCol}
                  >
                    <img
                      src={item.final_product.image}
                      className={styles.productImage}
                    />
                  </Col>
                  <Col
                    xs={12}
                    sm={5}
                    md={7}
                    lg={8}
                    className={styles.productInfoCol}
                  >
                    <Card className={styles.productCard}>
                      <Card.Body className={styles.productCardBody}>
                        <h4>{item.final_product.product.title}</h4>
                        {productVariationString(item.final_product)}
                        <p className={styles.productAmount}>
                          Amount: {item.quantity}
                        </p>
                      </Card.Body>
                      <Card.Footer className={styles.productCardFooter}>
                        <Link href={`/product-detail/${item.final_product.id}`}>
                          <Button size="lg" className={styles.button}>
                            Edit
                          </Button>
                        </Link>
                        <Button size="lg" className={styles.button}>
                          Delete
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </>
            );
          })}
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <Button variant="danger" size="lg">
            Delete order
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default CartForm;

const productVariationString = (final_product) => {
  var variations = "";
  final_product.variations.map((variation, index) => {
    if (index == 0) {
      variations =
        variation.variation + " " + variation.variation_category.category_title;
    } else if (index < 5) {
      variations =
        variations +
        ", " +
        variation.variation +
        " " +
        variation.variation_category.category_title;
    }
  });
  return <p className={styles.productP}>{variations}</p>;
};
