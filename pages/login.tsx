import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/global/Navbar";
import Image from "next/image";
import { AuthContext } from "../contexts/AuthContext";
import * as userService from '../services/userService';
import showPasswordIcon from "../public/svg/password-show.svg";
import hidePasswordIcon from "../public/svg/password-hide.svg";
import toast, { Toaster } from "react-hot-toast";

interface IFillTheForm {
  email: string;
  password: string;
}

const initialValues: IFillTheForm = {
  email: "",
  password: "",
};

const baseUrl = "http://localhost:5500";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formState, setFormState] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<IFillTheForm>(initialValues);
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateForm(formValues);
  };

  async function validateForm(formValues: IFillTheForm) {
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

    await login();
  }

  async function login() {
    userService.login(formValues.email, formValues.password)
    .then((authData) => {
      loginUser(authData)
      setFormValues(initialValues);
      toast.success("Login successful", {
        style: { marginTop: "100px" },
      });
      setTimeout(() => {
        router.push("/");
      }, 2500);
    })
    .catch(err => {
      toast.error(err.message, {
        style: { marginTop: "100px" },
      });
      setFormValues(initialValues);
    })

    /*const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      console.log(response);
      loginUser(response);
      setFormValues(initialValues);
      toast.success("Login successful", {
        style: { marginTop: "100px" },
      });
      setTimeout(() => {
        router.push("/");
      }, 2500);
    }

    if (response.status == 401) {
      toast.error("Incorrect email or password", {
        style: { marginTop: "100px" },
      });
      setFormValues(initialValues);
    }

    return response.json();*/
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
          <h1 style={{ color: "white" }}>Login</h1>
          <form className="form" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              id="login-button"
              style={{ marginTop: "50px" }}
            >
              Login
            </button>
            <p className="auth-field">
              <span>
                <span>
                  Missing an account? Click{" "}
                  <Link className="linkBtn" href="/register" style={{textDecoration: 'underline'}}>
                    here
                  </Link>
                </span>
              </span>
            </p>
          </form>
        </div>
        <Toaster position="top-center" />
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

export default Login;
