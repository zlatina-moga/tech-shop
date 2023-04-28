import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../services/redux/userRedux";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import toast from "react-hot-toast";
import localFont from "@next/font/local";

const veneer = localFont({
    src: [
      {
        path: "../public/fonts/Veneer-Three.ttf",
        weight: "400",
      },
    ],
    variable: "--font-verneer",
  });

interface IFillTheForm {
  email: string;
}

const initialValues: IFillTheForm = {
  email: "",
};

const Reset = () => {
  const [formValues, setFormValues] = useState<IFillTheForm>(initialValues);
  const router = useRouter();
  const dispatch = useDispatch();
  //@ts-ignore
  const { isFetching } = useSelector((state) => state.user);

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
    
      if (isFetching) {
        toast.loading("Vă rugăm asteptați", {
          style: { marginTop: "100px" },
        });
      await reset();
    }
  }

  async function reset() {
    dispatch(loginStart());

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
          <h1 className={`font-${veneer.variable} font-sans`} style={{ color: "#f1c606" }}>Autentificare</h1>
          <p className="text-white">Vă rugăm să introduceți adresa dvs. de e-mail de utilizator</p>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email*"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />

            <button
              type="submit"
              id="login-button"
              style={{ marginTop: "50px" }}
            >
              Reseteaza parola
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
      <Footer />
    </>
  );
};

export default Reset;
