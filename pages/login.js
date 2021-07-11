import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "../components/ProductsGrid";
import ProductsSlides from "../components/ProductsSlides";
import CategoriesGrid from "../components/CategoriesGrid";
import Footer from "../components/Footer";
import NextNavbarSimple from "../components/NavbarSimple";
import LoginForm from "../components/LoginForm";
import router from "next/router";

export default function Login() {
  const [user, setUser] = useState(null);

  const onClick = async (body) => {
    // LINK Prepare credentials for axios
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await onClickHandler(config, body, setUser);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Technology Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextNavbarSimple user={user == null ? null : user} login={true} />

      <main className={styles.main}>
        <LoginForm onClick={onClick} />
      </main>

      <Footer />
    </div>
  );
}

const onClickHandler = async (config, body, setUser) => {
  const login_url = "http://127.0.0.1:8000/customer-account/login/";
  axios
    .post(login_url, body, config)
    .then(async (res) => {
      const result = await res.data['Register result'];
      if (result["flag"] == "User Logged In") {
        setUser(result["user"]);
        const token = result["token"];
        window.localStorage.setItem("token", token);
        router.back()
      }
      else{
        console.log(result)
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
