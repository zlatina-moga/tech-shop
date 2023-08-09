import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Link from "next/link";

const Fail = () => {
  return (
    <>
      <Navbar />
      <div className="vh-100 d-flex justify-content-center align-items-center success-page">
        <div className="">
          <div className="border border-3 border-danger"></div>
          <div className="card  bg-white shadow p-5">
            <div className="mb-4 text-center">
              <svg
                fill="#dc3545"
                width="75"
                height="75"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
              >
                <path
                  d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M64,256c0-106.1,86-192,192-192
	c42.1,0,81,13.7,112.6,36.7L100.7,368.6C77.7,337,64,298.1,64,256z M256,448c-42.1,0-81-13.7-112.6-36.7l267.9-267.9
	c23,31.7,36.7,70.5,36.7,112.6C448,362.1,362,448,256,448z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h1>Plata eșuata.</h1>

              <p className="mt-2">Vă rugăm să încercați din nou. </p>
              <p className="mt-2">
                Pentru orice fel de informații suplimentare, nu ezitați sa ne
                contactați <br />{" "}
                <a
                  className="mb-2 footer-link font-weight-bold mt-2"
                  href="tel:+1234567890"
                >
                  <i className="fa fa-phone-alt text-primary mt-2"></i>
                  +1234567890
                </a>
              </p>
              <button className="btn btn-outline-primary rounded-1">
                <Link href={"/checkout"} className="footer-link">
                  Înapoi
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

export default Fail;
