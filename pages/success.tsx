import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Link from "next/link";
import { useSelector } from "react-redux";

const Success = () => {
  //@ts-ignore
  const cart = useSelector((state) => state.cart);
  //@ts-ignore
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Navbar />
      <div className="vh-100 d-flex justify-content-center align-items-center success-page">
        <div className="">
          <div className="border border-3 border-primary"></div>
          <div className="card  bg-white shadow p-5">
            <div className="mb-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                fill="#609E3F"
                className="bi bi-check-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
              </svg>
            </div>
            <div className="text-center">
              <h1>Mulțumim pentru comanda</h1>

              <h3>
                cu număr{" "}
                <strong style={{ color: "gray" }}>{cart.orderNumber}</strong>
              </h3>
              <p className="mt-2">
                Aceasta va intra în procesare și va fi livrata cât mai repede
                posibil.{" "}
              </p>
              {user && (
                <p>
                  Puteți vedea comenzile dvs. la pagina
                  <Link
                    href={`/auth/profile/${user._id}`}
                    className="footer-link ml-2 fw-bold"
                  >
                    Profil
                  </Link>
                </p>
              )}
              <p>
                Pentru orice fel de informații suplimentare, nu ezitați sa ne
                contactați <br />{" "}
                <a
                  className="mb-2 footer-link font-weight-bold mt-2"
                  href="tel:+40(721) 909 049"
                >
                  <i className="fa fa-phone-alt text-primary mr-2"></i>
                  +40(721) 909 049
                </a>
              </p>
              <button className="btn btn-outline-primary rounded-1">
                <Link href={"/"} className="footer-link">
                  Înapoi la produse
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Success;
