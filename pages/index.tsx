import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/global/Navbar";
import Sidebar from "../components/landing/Sidebar";
import classNames from "classnames";

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "100rem", margin: "0 auto" }}>
        <main style={{ paddingTop: "150px" }}>
          <Sidebar />

          {/*<!-- Featured Start -->*/}
          <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border mb-4"
                  style={{ padding: 30, borderRadius: "4px" }}
                >
                  <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                  <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border mb-4"
                  style={{ padding: 30, borderRadius: "4px" }}
                >
                  <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                  <h5 className="font-weight-semi-bold m-0">Free Shipping?</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border mb-4"
                  style={{ padding: 30, borderRadius: "4px" }}
                >
                  <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                  <h5 className="font-weight-semi-bold m-0">14-Day Return?</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border mb-4"
                  style={{ padding: 30, borderRadius: "4px" }}
                >
                  <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                  <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- Featured End -->*/}

          {/*<!-- Categories Start -->*/}
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
                    href="/workstations"
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
                      src="/images/hard-disk.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Componente</h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
