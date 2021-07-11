import Head from "next/head";
import Image from "next/image";
import styles from "../../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../../../components/Footer";
import NextNavbarSimple from "../../../../components/NavbarSimple";
import CheckEmailForm from "../../../../components/CheckEmailForm";
import router from "next/router";
import { useRouter } from "next/router";

export default function CheckEmail() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [user_id, setUser_id] = useState(null)

  useEffect(() => {
      if (id != undefined && id!=null){
          window.localStorage.setItem("user_id", id)
          setUser_id(id)
      }
      else{
          const temp_id = window.localStorage.getItem("user_id")
        setUser_id(temp_id)
      }
  }, [])

//   const onClick = async (body) => {
//     // LINK Prepare credentials for axios
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     await onClickHandler(config, body, setUser);
//   };

  return (user_id == null)?<div></div>:(
    <div className={styles.container}>
      <Head>
        <title>Technology Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextNavbarSimple user={user == null ? null : user} login={true} />

      <main className={styles.main}>
        <CheckEmailForm />
      </main>

      <Footer />
    </div>
  );
}

// const onClickHandler = async (config, body, setUser) => {
//   const login_url = "http://127.0.0.1:8000/customer-account/login/";
//   axios
//     .post(login_url, body, config)
//     .then(async (res) => {
//       const result = await res.data['Register result'];
//       if (result["flag"] == "User Logged In") {
//         setUser(result["user"]);
//         const token = result["token"];
//         window.localStorage.setItem("token", token);
//         router.back()
//       }
//       else{
//         console.log(result)
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
