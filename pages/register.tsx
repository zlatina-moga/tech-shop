import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/global/Navbar";
import Image from "next/image";
import showPasswordIcon from "../public/svg/password-show.svg";
import hidePasswordIcon from "../public/svg/password-hide.svg";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleSecondPassword = () => {
    setShowSecondPassword(!showSecondPassword);
  };

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="container">
          <h1>Register</h1>
          <form className="form">
          <input type="text" placeholder="Name" />
            <input type="text" placeholder="Username" />
            <div  style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
              {" "}
              <input type={showPassword ? 'text': 'password'} placeholder="Password" />
              <Image src={showPassword ? showPasswordIcon : hidePasswordIcon} style={{height: '15px', width: '15px', position: 'absolute', right: '190px', bottom: '25px'}} onClick={togglePassword} alt='image'/>
            </div>
            <div  style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
              {" "}
              <input type={showSecondPassword ? 'text': 'password'} placeholder="Repeat Password" />
              <Image src={showSecondPassword ? showPasswordIcon : hidePasswordIcon} style={{height: '15px', width: '15px', position: 'absolute', right: '190px', bottom: '25px'}} onClick={toggleSecondPassword} alt='image'/>
            </div>

            <button
              type="submit"
              id="login-button"
              style={{ marginTop: "50px" }}
            >
              Register
            </button>
          </form>
        </div>
        <ul className="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Register;
