import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import checkedImg from "../../../../public/images/checked.jpeg";
import axios from "axios";
import Navbar from "../../../../components/global/Navbar";

const VerifiedEmail = () => {
  const [validUrl, setValidUrl] = useState<boolean>(false);
  const router = useRouter();
  const { id, token } = router.query;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `http://localhost:5500/auth/${id}/verify/${token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (err) {
        console.log(err);
        setValidUrl(false);
      }
    };
    verifyEmail();
  }),
    [id, token];

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "150px", minHeight: '100%'}}>
        {!validUrl ? (
          <div className="verified-email">
            <div className="img-container">
              <Image src={checkedImg} alt="success_img" />
            </div>
            <h1>Email verified successfully!</h1>
            <Link href="/login">
              <button>Login</button>
            </Link>
          </div>
        ) : (
          <div className="verified-email">
            <h2>404 Not found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifiedEmail;
