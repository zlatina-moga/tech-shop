import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/global/Navbar";
import Image from "next/image";
import showPasswordIcon from "../public/svg/password-show.svg";
import hidePasswordIcon from "../public/svg/password-hide.svg";
import toast, { Toaster } from "react-hot-toast";

interface IFillTheForm {
  name: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: IFillTheForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const baseUrl = "http://localhost:5500";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);
  const [formState, setFormState] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<IFillTheForm>(initialValues);
  const router = useRouter();

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
      setFormState(false);
      toast.error("Please enter name", {
        style: { marginTop: "100px" },
      });
    }
    if (!formValues.username) {
      setFormState(false);
      toast.error("Please enter username", {
        style: { marginTop: "100px" },
      });
    }
    if (!formValues.email) {
      setFormState(false);
      toast.error("Please enter email", {
        style: { marginTop: "100px" },
      });
    }
    if (!formValues.password) {
      setFormState(false);
      toast.error("Please enter password", {
        style: { marginTop: "100px" },
      });
    }
    if (formValues.password != formValues.repeatPassword) {
      setFormState(false);
      toast.error("Passwords don't match", {
        style: { marginTop: "100px" },
      });
    }

    await register();
  }

  async function register() {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      toast.success("Thank you for registering!", {
        style: { marginTop: "100px" },
      });
      setFormValues(initialValues);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      toast.error(response.statusText, { //adjust here
        style: { marginTop: "100px" },
      })
    }
    return response.json();
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
          <h1>Register</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
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
                placeholder="Password"
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
                placeholder="Repeat Password"
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
              Register
            </button>
          </form>
          <Toaster position="top-center" />
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
