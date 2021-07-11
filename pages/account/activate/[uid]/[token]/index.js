import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NextNavbarSimple from "../../../../../components/NavbarSimple";
import ActivateAccountForm from "../../../../../components/ActivateAccountForm";
import Footer from "../../../../../components/Footer";

export default function ActivateAccount() {
  const router = useRouter();
  const { uid } = router.query;
  const { token } = router.query;

  const [userActive, setUserActive] = useState(false);

  const ActivateAccount = async (e) => {
    e.preventDefault();
    ActivateAccountHandler(uid, token, setUserActive);
  };

  return uid == null ||
    uid == undefined ||
    token == null ||
    token == undefined ? (
    <div></div>
  ) : (
    <div>
      <Head>
        <title>Technology Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextNavbarSimple user={null} login={false} />

      <main></main>
      <ActivateAccountForm activated={userActive} onClick={ActivateAccount} />
      <Footer />
    </div>
  );
}

const ActivateAccountHandler = async (uid, token, setUserActive) => {
  const config = { headers: { "Content-Type": "application/json" } };

  const activate_account_url = `http://127.0.0.1:8000/customer-account/activate-account/${uid}/${token}/`;

  axios
    .get(activate_account_url, config)
    .then(async (res) => {
      const result = await res.data;
      setUserActive(true);
    })
    .catch((error) => {
      console.log(error);
    });
};