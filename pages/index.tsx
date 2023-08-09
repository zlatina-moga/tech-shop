import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Sidebar from "../components/landing/Sidebar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <main style={{ paddingTop: "150px" }}>
          <Sidebar />

          {/*<!-- Featured Start -->*/}
          <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border border-primary mb-4 features-card"
                  style={{ padding: 30, borderRadius: "4px", height: "110px" }}
                >
                  <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                  <h6 className="font-weight-semi-bold m-0">
                    Produse intr-o stare foarte buna
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border border-primary mb-4 features-card"
                  style={{ padding: 30, borderRadius: "4px", height: "110px" }}
                >
                  <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                  <h6 className="font-weight-semi-bold m-0">
                    Transport gratuit*
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border border-primary mb-4 features-card"
                  style={{ padding: 30, borderRadius: "4px", height: "110px" }}
                >
                  <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                  <h6 className="font-weight-semi-bold m-0">
                    Retur în 14 zile
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border mb-4 border-primary features-card"
                  style={{ padding: 30, borderRadius: "4px", height: "110px" }}
                >
                  <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                  <h6 className="font-weight-semi-bold m-0">
                    Relații Clienți <br /> +1234567890
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid bg-secondary my-5 ">
            <div className="row justify-content-md-center py-2 px-xl-5">
              <div className="col-md-6 col-12 py-5">
                <div className="text-center mb-2 pb-2">
                  <h4 className="section-title px-5 mb-3 pb-3">
                    <span className="bg-secondary px-2">
                      Dorești un laptop care nu face parte din oferta?
                    </span>
                  </h4>
                  <p style={{ fontSize: "18px" }}>
                    Ne poți suna și te ajutăm imediat!
                  </p>
                  <a
                    className="mb-2 footer-link font-weight-bold"
                    href="tel:+1234567890"
                  >
                    <i className="fa fa-phone-alt text-primary mr-2"></i>
                    +1234567890
                  </a>
                  <p className="mt-4" style={{ fontSize: "18px" }}>
                    Aducem ORICE echipament IT din lume!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/laptop"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/laptop.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Laptopuri</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/calculatoare"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/computer.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Calculatoare</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/workstation"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/workstation.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Workstations</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/servere"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/server.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Servere</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/monitoare"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/desktop.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Monitoare</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/componente"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/disk.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Componente</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/imprimante"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/printer.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Imprimante</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/sisteme-pos"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/pos.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Sisteme POS</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/ups"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/ups.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">UPS</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/accesorii"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/accessory.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Accesorii</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/retelistica"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/router.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Retelistica</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/sisteme-solare-fotovoltaice"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/solar.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">
                    Sisteme Solare Fotovoltaice
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
