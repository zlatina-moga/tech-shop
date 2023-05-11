import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import toast from "react-hot-toast";
import * as userService from "../../services/userService";
import Image from "next/image";
import showPasswordIcon from "../../public/svg/password-show.svg";
import hidePasswordIcon from "../../public/svg/password-hide.svg";


interface IFillTheForm {
  password: string;
  repeatPassword: string;
}

const initialValues: IFillTheForm = {
  password: "",
  repeatPassword: "",
};

const Reset = () => {
  const [formValues, setFormValues] = useState<IFillTheForm>(initialValues);
  const router = useRouter();
  const dispatch = useDispatch();
  //@ts-ignore
  const { isFetching } = useSelector((state) => state.user);
  const { token, id } = router.query;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);

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
      formValues.password &&
      formValues.password == formValues.repeatPassword
    ) {
      toast.loading("Vă rugăm asteptați", {
        style: { marginTop: "100px" },
        duration: 1500,
      });
      await reset();
    }
  }

  async function reset() {
    userService
      .passwordUpdate(id, token, formValues.password)
      .then(() => {
        setFormValues(initialValues);
        toast.success("Parolă actualizată", {
          style: { marginTop: "100px" },
          duration: 2500,
        });
        setTimeout(() => {
            router.push('/login')
        }, 2500);
      })
      .catch((err) => {
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
      <div className="wrapper login">
        <div className="container">
          <h1 className="text-white">Resetare parola</h1>
          <p className="text-white">Vă rugăm să introduceți noua parolă</p>
          <form className="form" onSubmit={handleSubmit}>
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
                id="toggle-password"
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
                onClick={toggleSecondPassword}
                alt="image"
                id='toggle-password'
              />
            </div>

            <button
              type="submit"
              id="login-button"
              style={{ marginTop: "50px" }}
            >
              Actualizați parola
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
