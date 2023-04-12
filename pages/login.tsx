import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../services/redux/userRedux";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Image from "next/image";
import * as userService from "../services/userService";
import showPasswordIcon from "../public/svg/password-show.svg";
import hidePasswordIcon from "../public/svg/password-hide.svg";
import toast from "react-hot-toast";

interface IFillTheForm {
  email: string;
  password: string;
}

const initialValues: IFillTheForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<IFillTheForm>(initialValues);
  const router = useRouter();
  const dispatch = useDispatch();
  //@ts-ignore
  const {isFetching } = useSelector(state => state.user)

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateForm(formValues);
  };

  async function validateForm(formValues: IFillTheForm) {
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

    if (formValues.email && formValues.password) {
      if (isFetching) {
        toast.loading("Vă rugăm asteptați", {
          style: { marginTop: "100px" }
        });
      }

      await login();
    }
  }

  async function login() {
    dispatch(loginStart())
    userService
      .login(formValues.email, formValues.password)
      .then((authData) => {
        dispatch(loginSuccess(authData))
        setFormValues(initialValues);
        toast.success("Bine ai venit!", {
          style: { marginTop: "100px" },
        });
        setTimeout(() => {
          router.push("/");
        }, 2500);
      })
      .catch((err) => {
        dispatch(loginFailure())
        toast.error(err, {
          style: { marginTop: "100px" },
        });
        setFormValues(initialValues);
      });
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <div className="wrapper login">
        <div className="container">
          <h1 style={{ color: "white" }}>Autentificare</h1>
          <form className="form" onSubmit={handleSubmit}>
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
                onClick={togglePassword}
                alt="image"
                id='toggle-password'
              />
            </div>

            <button
              type="submit"
              id="login-button"
              style={{ marginTop: "50px" }}
            >
              Autentificare
            </button>
            <p className="auth-field">
              <span>
                <span>
                  Nu ai un cont? Inregistrează-te{" "}
                  <Link
                    className="linkBtn"
                    href="/register"
                    style={{ textDecoration: "underline" }}
                  >
                    aici
                  </Link>
                </span>
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

export default Login;
