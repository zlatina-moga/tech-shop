import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Link from "next/link";
import localFont from "@next/font/local";
import classNames from "classnames";

const veneer = localFont({
  src: [
    {
      path: "../public/fonts/Veneer-Three.ttf",
      weight: "400",
    },
  ],
  variable: "--font-verneer",
});

const FourOhFour = () => {
  return (
    <>
      <Navbar />
      <div
        className="container-fluid pt-5, laptops-page"
        style={{ maxWidth: "80rem", marginTop: "40px" }}
      >
        <section className="not-found-page">
          <div className="p-5">
            <div className="col-12 text-center">
              <h1 className={`font-${veneer.variable} font-sans`}>
                Oops! LOOKS LIKE THIS PAGE GOT LOST IN THE MATRIX.
              </h1>
              <p
                className="text-white"
                style={{ width: "70%", margin: "0 auto", fontSize: "18px" }}
              >
                Luați pastila albastră, povestea se termină, ajungeți pe pagina
                noastră de pornire și credeți tot ce doriți să credeți. <br />{" "}
                Luați pastila roșie, rămâneți în țara minunilor și vă arăt cât
                de adânc pot ajunge reducerile noastre.
              </p>
              <p></p>
              <div className="btn-block">
                <Link href="/produse-la-reducere" className={classNames("btn-1",`font-${veneer.variable} font-sans`)}>
                reduceri
                </Link>
                <Link href="/" className={classNames("btn-2",`font-${veneer.variable} font-sans`)}>
                  HOME PAGE
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default FourOhFour;
