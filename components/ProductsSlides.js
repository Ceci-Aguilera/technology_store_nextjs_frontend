import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/ProductsSlides.module.css";
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
  Carousel,
} from "react-bootstrap";

const ProductsSlides = ({ products }) => {
  const router = useRouter();

  return products == null ? (
    <></>
  ) : (
      <Carousel className={styles.carousel}>
        {products.map((item, index) => {
          return (
            <Carousel.Item className={styles.carouselItem}>
              <img
                key={index}
                className={`d-block w-100 center ${styles.carouselImage}`}
                alt="No image of this product"
                src={item.image}
              />
              <Carousel.Caption>
                <h1>{item.product.title}</h1>

                <h5>
                  {" "}
                  {item.variations.map((variation, index) => {
                    if (index < 4)
                      return (
                        variation.variation + " " +
                        variation.variation_category.category_title
                      );
                  })}
                </h5>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
  );
};

export default ProductsSlides;
