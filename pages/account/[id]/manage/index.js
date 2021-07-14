import Head from "next/head";
import Image from "next/image";
import styles from "../../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../../../components/Footer";
import NextNavbarSimple from "../../../../components/NavbarSimple";
import AccountInfoForm from "../../../../components/AccountInfoForm";
import router from "next/router";
import { useRouter } from "next/router";

export default function AccountInfo() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [user_id, setUser_id] = useState(null);
  const [shipping_addresses, setShippingAddresses] = useState(null);
  const [billing_addresses, setBillingAddresses] = useState(null);

  useEffect(async () => {
    var temp_id;
    if (id != undefined && id != null) {
      window.localStorage.setItem("user_id", id);
      temp_id = id;
      setUser_id(temp_id);
    } else {
      temp_id = window.localStorage.getItem("user_id");
      setUser_id(temp_id);
    }

    await getUser(setUser);
    await getAddresses(setShippingAddresses, setBillingAddresses);
  }, []);

  return user == null ? (
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
        <AccountInfoForm
          user={user}
          shipping_addresses={shipping_addresses}
          billing_addresses={billing_addresses}
        />
      </main>

      <Footer />
    </div>
  );
}

const getUser = async (setUser) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = window.localStorage.getItem("token");

  config.headers["authorization"] = `Token ${token}`;
  axios.defaults.headers.common["Authorization"];

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

const getAddresses = async (setShippingAddresses, setBillingAddresses) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = window.localStorage.getItem("token");

  config.headers["authorization"] = `Token ${token}`;
  axios.defaults.headers.common["Authorization"];

  const auth_user = "http://127.0.0.1:8000/customer-account/user-addresses/";
  axios
    .get(auth_user, config)
    .then(async (res) => {
      const shipping_addresses = await res.data["Shipping_addresses"];
      const billing_addresses = await res.data["Billing_addresses"];
      setShippingAddresses(shipping_addresses);
      setBillingAddresses(billing_addresses);
    })
    .catch((error) => {
      console.log(error);
    });
};