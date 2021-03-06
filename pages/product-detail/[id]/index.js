import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../../components/Footer";
import NextNavbarSimple from "../../../components/NavbarSimple";
import ProductDetailForm from "../../../components/ProductDetailForm";
import router from "next/router";
import { useRouter } from "next/router";

export default function ProductDetail() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [product_id, setProduct_id] = useState(null);
  const [product, setProduct] = useState(null);
  const [similar_products, setSimilarProducts] = useState(null);
  const [arr, setArr] = useState(null);

  // NOTE Init
  useEffect(async () => {
    // LINK product variation details
    const simple_config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    var temp_product_id = null;
    if (id != undefined && id != null) {
      window.localStorage.setItem("product_id", id);
      setProduct_id(id);
      temp_product_id = id;
    } else {
      temp_product_id = window.localStorage.getItem("product_id");
      setProduct_id(temp_product_id);
    }

    await getProductDetails(
      simple_config,
      temp_product_id,
      setProduct,
      setSimilarProducts
    );

    // LINK user

    await getUserHandler(setUser);

    // LINK Array for amount of product this is a fix for bug
    var temp_arr = Array(100).fill(1);
    setArr(temp_arr);
  }, []);

  // NOTE Add to cart
  const addToCartHandler = async (product_variation, final_color, quantity) => {
    await addToCart(product_variation, final_color, quantity, user);
  };

  // NOTE Change product
  const SimilarProductUrlHandler = (e, similar_product) => {
    e.preventDefault();
    router.push(`/product-detail/${similar_product.id}`);
    setProduct_id(similar_product.id)
    setProduct(similar_product)

  };


  // NOTE Components
 
  return product == undefined || product == null ? (
    <div></div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title>Technology Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextNavbarSimple user={user == null ? null : user} login={true} />

      <main className={styles.main}>
        <ProductDetailForm
          product={product}
          similar_products={similar_products}
          arr={arr}
          addToCart={addToCartHandler}
          SimilarProductUrlHandler={SimilarProductUrlHandler}
        />
      </main>

      <Footer />
    </div>
  );
}

// NOTE Helpers

const getProductDetails = async (
  config,
  id,
  setProduct,
  setSimilarProducts
) => {
  const product_variation_url = `http://127.0.0.1:8000/store/product-detail/${id}`;
  axios
    .get(product_variation_url, config)
    .then(async (res) => {
      const product = await res.data["Product"];
      const similar_products = await res.data["Variations"];
      setProduct(product);
      setSimilarProducts(similar_products);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUserHandler = async (setUser) => {
  const simple_config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = window.localStorage.getItem("token");

  if (token != null && token != undefined) {
    config.headers["authorization"] = `Token ${token}`;
    axios.defaults.headers.common["Authorization"];

    const result = await getUser(config, setUser);
    if (result == null || result == undefined) {
      await getUser(simple_config, setUser);
    }
  } else {
    await getUser(simple_config, setUser);
  }
};

const getUser = async (config, setUser) => {
  const auth_user = "http://127.0.0.1:8000/customer-account/check-auth/";
  axios
    .get(auth_user, config)
    .then(async (res) => {
      const result = await res.data;
      setUser(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
};


const addToCart = async (product_variation, final_color, quantity, user) => {
    const id = product_variation.id;
  
    const config = {
      headers: { "Content-Type": "application/json" },
    };
  
    if (user != null && user != undefined) {
      const token = window.localStorage.getItem("token");
      config.headers["authorization"] = `Token ${token}`;
      axios.defaults.headers.common["Authorization"];
    }
  
    var order_id = -1;
  
    try {
      order_id = window.localStorage.getItem("order_id");
    } catch {
      order_id = -1;
    }
  
    const body = JSON.stringify({
      order_id,
      quantity,
      final_color,
    });
  
    const add_to_cart_url = `http://127.0.0.1:8000/store/product-detail/${id}/`;
  
    axios
      .post(add_to_cart_url, body, config)
      .then(async (res) => {
        const result = await res.data["Result"];
        if (result != "Error") {
          window.localStorage.setItem("order_id", result);
          router.push('/cart');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };