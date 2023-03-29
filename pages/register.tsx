import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/global/Navbar";
import Image from "next/image";
import showPasswordIcon from "../public/svg/password-show.svg";
import hidePasswordIcon from "../public/svg/password-hide.svg";
import toast from "react-hot-toast";
import Footer from "../components/global/Footer";
import * as userService from "../services/userService";

interface IFillTheForm {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: IFillTheForm = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<IFillTheForm>(initialValues);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleSecondPassword = () => {
    setShowSecondPassword(!showSecondPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm(formValues);
  };

  async function validateForm(formValues: IFillTheForm) {
    if (!formValues.name) {
      toast.error("Vă rugăm să introduceți numele", {
        style: { marginTop: "100px" },
      });
    }
    if (!formValues.email) {
      toast.error("Vă rugăm să introduceți adresa de e-mail", {
        style: { marginTop: "100px" },
      });
    }
    if (!formValues.password) {
      toast.error("Vă rugăm să introduceți parolă", {
        style: { marginTop: "100px" },
      });
    }
    if (formValues.password != formValues.repeatPassword) {
      toast.error("Parolele introduse nu se potrivesc", {
        style: { marginTop: "100px" },
      });
    }

    if (
      formValues.name &&
      formValues.email &&
      formValues.password &&
      formValues.password == formValues.repeatPassword
    ) {
      toast.loading("Vă rugăm asteptați", {
        style: { marginTop: "100px" },
        duration: 2000,
      });
      await register();
    }
  }

  async function register() {
    userService
      .register(formValues.name, formValues.email, formValues.password)
      .then(() => {
        setFormValues(initialValues);
        toast.success("Vă rog să vă verificați adresa de email", {
          style: { marginTop: "100px" },
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err, {
          style: { marginTop: "100px" },
        });
      });
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="container">
          <h1 style={{ color: "white" }}>
            Inregistrează-te pentru a crea un cont nou
          </h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nume*"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email*"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Parolă*"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <Image
                src={showPassword ? showPasswordIcon : hidePasswordIcon}
                style={{
                  height: "15px",
                  width: "15px",
                  position: "absolute",
                  right: "190px",
                  bottom: "25px",
                  cursor: "pointer",
                }}
                onClick={togglePassword}
                alt="image"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <input
                type={showSecondPassword ? "text" : "password"}
                placeholder="Confirmare parolă*"
                name="repeatPassword"
                value={formValues.repeatPassword}
                onChange={handleChange}
              />
              <Image
                src={showSecondPassword ? showPasswordIcon : hidePasswordIcon}
                style={{
                  height: "15px",
                  width: "15px",
                  position: "absolute",
                  right: "190px",
                  bottom: "25px",
                  cursor: "pointer",
                }}
                onClick={toggleSecondPassword}
                alt="image"
              />
            </div>

            <button
              type="submit"
              id="login-button"
              style={{ marginTop: "50px" }}
            >
              Inregistrează-te
            </button>
            <p className="auth-field">
              <span>
                Ai deja un cont? Autentifică-te{" "}
                <Link
                  className="linkBtn"
                  href="/login"
                  style={{ textDecoration: "underline" }}
                >
                  aici
                </Link>
              </span>
            </p>
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
      <Footer />
    </>
  );
};

export default Register;
