import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import router, { useRouter } from "next/router";
import styles from "../styles/ProductDetailForm.module.css";
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
  Dropdown,
  Table,
} from "react-bootstrap";

const ProductDetailForm = ({
  product,
  similar_products,
  arr,
  addToCart,
  SimilarProductUrlHandler,
}) => {
  const [final_color, setFinalColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productVariations, setProductVariations] = useState(null);

  // NOTE functions and handlers
  useEffect(() => {
    setFinalColor(product.color_variations[0]);
    setProductVariations(product.product.category.variations_categories);
  }, []);

  const BorderHandler = (this_color_variation) => {
    return getBorder(this_color_variation, final_color);
  };

  const OnColorClickHandler = (e, this_color_variation) => {
    e.preventDefault();
    setFinalColor(this_color_variation);
  };

  const addToCartHandler = async (e) => {
    e.preventDefault();
    await addToCart(product, final_color, quantity);
  };

  // NOTE Component Helper  
  const DropdownItems = () => {
    return arr == null ? (
      <div></div>
    ) : (
      <Dropdown.Menu className={styles.dropdownContainer}>
        {arr.map((item, index) => {
          return (
            <Dropdown.Item
              className={styles.addAmountOfItemDropdownItem}
              eventKey="1"
              key={index + 1}
              onSelect={(e) => {
                setQuantity((index + 1).toString());
              }}
            >
              {index + 1}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    );
  };

  const ViewButton = ({ item }) => {
    if (item.id != product.id) {
      window.localStorage.setItem("product_id", item.id);
      return (
        <td>
          <Link href={`/product-detail/${item.id}`}>
            <Button className={styles.similarProductsButton}>View</Button>
          </Link>
        </td>
      );
    }
    return <td />;
  };

  // NOTE Components
  return similar_products == null ? (
    <div></div>
  ) : (
    <>
      {/* NOTE  Product Detail*/}
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Row className={styles.cardRow}>
            <Col xs={12} sm={12} md={12} lg={4} className={styles.cardImageCol}>
              <img className={styles.cardImage} src={product.image} />
            </Col>
            <Col xs={12} sm={12} md={12} lg={8}>
              <Container className={styles.cardTitleContainer}>
                <span className={styles.cardTitle}>
                  {product.product.title}
                </span>
              </Container>
              <Container className={styles.cardProductContainer}>
                <span className={styles.cardSectionTitle}>Specs: </span>
                {product.variations.map((variation, index) => {
                  return (
                    <p key={index} className={styles.productInfoP}>
                      - {variation.variation}
                    </p>
                  );
                })}
              </Container>

              <Container className={styles.cardColorInfo}>
                <span className={styles.cardSectionTitle}>
                  Colors available:{" "}
                </span>

                <Container className={styles.cardVariationColorSection}>
                  {product.color_variations.map((color_variation, index) => {
                    return (
                      <Container
                        onClick={(e) => OnColorClickHandler(e, color_variation)}
                        className={styles.colorBlock}
                        key={index}
                        style={{
                          backgroundColor: color_variation.color_in_hex,
                          border: String(BorderHandler(color_variation)),
                          borderRadius: "5px",
                        }}
                      ></Container>
                    );
                  })}
                </Container>
              </Container>

              <Container className={styles.cardDescriptionContainer}>
                <span className={styles.cardSectionTitle}>Description:</span>
                <Container className={styles.cardDescription}>
                  {product.product.description}
                </Container>
              </Container>

              <Row>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <Container className={styles.cardAmountContainer}>
                    <InputGroup className={styles.inputGroup}>
                      <InputGroup.Prepend>
                        <InputGroup.Text
                          id="input-group-cant"
                          className={styles.inputGroupText}
                        >
                          Amount
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          variant="outline-danger"
                          className={styles.addAmountOfItem}
                        >
                          {quantity}
                        </Dropdown.Toggle>

                        <DropdownItems />
                      </Dropdown>
                    </InputGroup>
                  </Container>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <Container className={styles.cardButtonContainer}>
                    <Button
                      onClick={(e) => addToCartHandler(e)}
                      size="lg"
                      className={styles.cardButton}
                    >
                      Add to Cart
                    </Button>
                  </Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Container className={styles.tableContainer}>
        {/* NOTE Similar products */}
        <Table striped bordered variant="dark" responsive className={styles.table}>
          <thead>
            <tr>
              <th>Specifications</th>
              {similar_products.map((item, index) => {
                return <th key={index}>{item.product.title}</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {productVariations.map((variation, index) => {
              return (
                <tr key={index}>
                  <td>{variation.category_title}</td>
                  {similar_products.map((item, sub_index) => {
                    const temp_map = new Map(
                      item.variations.map((key) => [
                        key.variation_category.category_title,
                        key.variation,
                      ])
                    );
                    return (
                      <td key={sub_index}>
                        {temp_map.get(variation.category_title)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              <td>Price</td>
              {similar_products.map((item, index) => {
                return <td key={index}>${item.total_price}</td>;
              })}
            </tr>
            <tr>
              <td> </td>
              {similar_products.map((similar_item, index) => {
                return similar_item.id == product.id ? (
                  <td key={index}></td>
                ) : (
                  <td className={styles.buttonTd} key={index}>
                    <Button
                      onClick={(e) => SimilarProductUrlHandler(e, similar_item)}
                      className={styles.similarProductsButton}
                    >
                      View
                    </Button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ProductDetailForm;

// NOTE Helpers
const getBorder = (this_color_variation, color_variation) => {
  if (this_color_variation == color_variation) {
    return "5px solid #68BBE3";
  }
  return "none";
};
