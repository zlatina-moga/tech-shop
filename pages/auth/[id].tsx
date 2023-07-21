import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import checkedImg from "../../public/images/checked.jpeg";
import axios from "axios";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";

const VerifiedEmail = () => {
  const [validUrl, setValidUrl] = useState<boolean>(false);
  const router = useRouter();
  const { id, token } = router.query;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `https://pc-bun-api.onrender.com/auth/${id}?token=${token}`;
        const { data } = await axios.get(url);
        console.log('data: ', data)
        setValidUrl(true);
      } catch (err) {
        console.log(err.message);
        setValidUrl(false);
      }
    };
    verifyEmail();
  }),
    [id, token];

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "150px", minHeight: "100%" }}>
        {!validUrl ? (
          <div className="verified-email">
            <div className="img-container">
              <Image src={checkedImg} alt="success_img" />
            </div>
            <h1>E-mail verificat cu succes!</h1>
            <Link href="/login">
              <button>Intra în cont</button>
            </Link>
          </div>
        ) : (
          <div className="verified-email">
            <h2>Este ceva în neregulă, vă rugăm să încercați din nou.</h2>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default VerifiedEmail;
