import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Sidebar from "../components/landing/Sidebar";
import * as productService from "../services/productService";

export default function Home() {
  const [productsCount, setProductsCount] = useState([]);

  useEffect(() => {
    productService
      .getAllProdictsCount()
      .then((res) => {
        setProductsCount(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                  className="d-flex align-items-center border border-primary mb-4"
                  style={{ padding: 30, borderRadius: "4px" }}
                >
                  <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                  <h5 className="font-weight-semi-bold m-0">Produse de calitate</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border border-primary mb-4"
                  style={{ padding: 30, borderRadius: "4px" }}
                >
                  <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                  <h5 className="font-weight-semi-bold m-0">Transport gratuit*</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border border-primary mb-4"
                  style={{ padding: 30, borderRadius: "4px" }}
                >
                  <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                  <h5 className="font-weight-semi-bold m-0">Retur în 14 zile</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border mb-4 border-primary"
                  style={{ padding: 30, borderRadius: "4px" }}
                >
                  <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                  <h5 className="font-weight-semi-bold m-0">Relații Clienți</h5>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- Featured End -->*/}

          {/*<!-- Categories Start -->*/}
          <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.laptopCount} Produse</p>
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
                ))}
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.computerCount} Produse</p>
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
                ))}
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.workStationCount} Produse</p>
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
                ))}
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.serverCount} Produse</p>
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
                ))}
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.monitorCount} Produse</p>
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
                ))}
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.componentCount} Produse</p>
                    <Link
                      href="/componente"
                      className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                    >
                      <Image
                        className="img-fluid"
                        src="/images/hard-disk.webp"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </Link>
                    <h5 className="font-weight-semi-bold m-0">Componente</h5>
                  </div>
                ))}
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.printersCount} Produse</p>
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
                ))}
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.posCount} Produse</p>
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
                ))}
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.upsCount} Produse</p>
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
                ))}
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.accessoriesCount} Produse</p>
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
                ))}
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.networkingCount} Produse</p>
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
                ))}
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                {productsCount.map((pr, i) => (
                  <div
                    className="cat-item d-flex flex-column border mb-4"
                    style={{ padding: "30px", borderRadius: "4px" }}
                    key={i}
                  >
                    <p className="text-right">{pr.solarCount} Produse</p>
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
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
