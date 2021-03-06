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
import RegisterForm from "../components/RegisterForm";
import router from "next/router";

export default function Register() {
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

      <NextNavbarSimple user={user == null ? null : user} login={false} />

      <main className={styles.main}>
        <RegisterForm onClick={onClick} />
      </main>

      <Footer />
    </div>
  );
}

const onClickHandler = async (config, body, setUser) => {
  const sign_up_url = "http://127.0.0.1:8000/customer-account/sign-up/";
  axios
    .post(sign_up_url, body, config)
    .then(async (res) => {
      const result = await res.data['Register result'];
      if (result["flag"] == 'User created') {
        setUser(result["user"]);
        const token = result["token"];
        window.localStorage.setItem("token", token);
        const id = result['user']['id']
        router.push(`/account/${id}/check-email/`)
      }
      else{
        console.log(result)
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
