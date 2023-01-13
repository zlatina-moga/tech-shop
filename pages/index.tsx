import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { laptopsData } from "../data";
import { computersData } from "../data";
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
                  <p className="text-right">{laptopsData.length} Products</p>
                  <Link
                    href="/laptops"
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
                  <h5 className="font-weight-semi-bold m-0">Laptops</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <p className="text-right">{computersData.length} Products</p>
                  <Link
                    href="/computers"
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
                  <h5 className="font-weight-semi-bold m-0">Computers</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <p className="text-right">54 Products</p>
                  <a
                    href=""
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/workstation.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </a>
                  <h5 className="font-weight-semi-bold m-0">Workstations</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <p className="text-right">15 Products</p>
                  <a
                    href=""
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/server.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </a>
                  <h5 className="font-weight-semi-bold m-0">Servers</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <p className="text-right">8 Products</p>
                  <a
                    href=""
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/apple.jpg.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </a>
                  <h5 className="font-weight-semi-bold m-0">Apple</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <p className="text-right">15 Products</p>
                  <a
                    href=""
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/hard-disk.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </a>
                  <h5 className="font-weight-semi-bold m-0">Components</h5>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- Categories end -->*/}

          {/*<!-- Offer Start -->*/}
          <div className="container-fluid offer pt-5">
            <div className="row px-xl-5">
              <div className="position-relative bg-secondary text-center text-white mb-2 py-5 px-5">
                <img
                  src="images/black-desktop.png"
                  alt=""
                  style={{ paddingLeft: "16rem" }}
                />
                <div className="position-relative" style={{ zIndex: "1" }}>
                  <h5
                    className="text-uppercase text-primary mb-3"
                    style={{ fontWeight: "700" }}
                  >
                    Bonus points on each order
                  </h5>
                  <h1 className="mb-4 font-weight-semi-bold">-Get Offer-</h1>
                  <Link
                    href="/computers"
                    className="btn btn-outline-primary py-md-2 px-md-3"
                    style={{ borderRadius: "4px" }}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- Offer end -->*/}

          {/*<!-- Products Start -->*/}
          <div className="container-fluid pt-5">
            <div className="text-center mb-4">
              <h2 className="section-title px-5">
                <span className="px-2">Trendy Products</span>
              </h2>
            </div>
            <div className="row px-xl-5 pb-3">
              <div className="row px-xl-5 justify-content-center">
                {laptopsData.map((l, idx) => (
                  <div
                    className={classNames(
                      `col-lg-3 col-md-6 col-sm-12 pb-1`,
                      "laptop-card"
                    )}
                    key={idx}
                  >
                    <div
                      className={classNames(
                        "card product-item border border-gray rounded mb-4",
                        "inner-container"
                      )}
                    >
                      <Link href={"/" + l.category + "/" + l.id}>
                        <div
                          className={classNames(
                            "card-header product-img position-relative overflow-hidden bg-transparent",
                            "img-wrapper"
                          )}
                        >
                          <div className="discount-container">
                            <div>
                              <p>-20%</p>
                            </div>
                          </div>
                          <Image
                            className="img-fluid w-100"
                            src={l.images[0]}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="card-body text-center p-3 pt-4">
                        <h6 className="mb-3">{l.title}</h6>
                        <div className="d-flex justify-content-center">
                          <h6 className="text-muted pb-2">
                            <del>
                              {l.oldPrice} {l.currency}
                            </del>
                          </h6>
                        </div>
                        <div className="d-flex justify-content-center">
                          <h6 className="price">
                            {l.price} {l.currency}
                          </h6>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between bg-light">
                        <Link
                          href={"/" + l.category + "/" + l.id}
                          className="btn btn-sm text-dark p-0"
                        >
                          <i className="fas fa-eye text-primary mr-1"></i>
                          View Detail
                        </Link>
                        <a href="" className="btn btn-sm text-dark p-0">
                          <i className="fas fa-shopping-cart text-primary mr-1"></i>
                          Add To Cart
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/*<!-- Products end -->*/}

          {/*<!-- Subscribe Start -->*/}
          <div className="container-fluid bg-secondary my-5">
            <div className="row justify-content-md-center py-5 px-xl-5">
              <div className="col-md-6 col-12 py-5">
                <div className="text-center mb-2 pb-2">
                  <h2 className="section-title px-5 mb-3">
                    <span className="bg-secondary px-2">Stay Updated</span>
                  </h2>
                  <p>
                    Amet lorem at rebum amet dolores. Elitr lorem dolor sed amet
                    diam labore at justo ipsum eirmod duo labore labore.
                  </p>
                </div>
                <form action="">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-white p-4"
                      placeholder="Email Goes Here"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary px-4">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/*<!-- Subscribe End -->*/}

          {/*<!-- Products Start -->*/}
          <div className="container-fluid pt-5">
            <div className="text-center mb-4">
              <h2 className="section-title px-5">
                <span className="px-2">Just Arrived</span>
              </h2>
            </div>
            <div className="row px-xl-5 justify-content-center">
              {computersData.map((l, idx) => (
                <div
                  className={classNames(
                    `col-lg-3 col-md-6 col-sm-12 pb-1`,
                    "laptop-card"
                  )}
                  key={idx}
                >
                  <div
                    className={classNames(
                      "card product-item border border-gray rounded mb-4",
                      "inner-container"
                    )}
                  >
                    <Link href={"/" + l.category + "/" + l.id}>
                      <div
                        className={classNames(
                          "card-header product-img position-relative overflow-hidden bg-transparent",
                          "img-wrapper"
                        )}
                      >
                        <div className="discount-container">
                          <div>
                            <p>-20%</p>
                          </div>
                        </div>
                        <Image
                          className="img-fluid w-100"
                          src={l.images[0]}
                          alt=""
                        />
                      </div>
                    </Link>
                    <div className="card-body text-center p-3 pt-4">
                      <h6 className="mb-3">{l.title}</h6>
                      <div className="d-flex justify-content-center">
                        <h6 className="text-muted pb-2">
                          <del>
                            {l.oldPrice} {l.currency}
                          </del>
                        </h6>
                      </div>
                      <div className="d-flex justify-content-center">
                        <h6 className="price">
                          {l.price} {l.currency}
                        </h6>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light">
                      <Link
                        href={"/" + l.category + "/" + l.id}
                        className="btn btn-sm text-dark p-0"
                      >
                        <i className="fas fa-eye text-primary mr-1"></i>
                        View Detail
                      </Link>
                      <a href="" className="btn btn-sm text-dark p-0">
                        <i className="fas fa-shopping-cart text-primary mr-1"></i>
                        Add To Cart
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*<!-- Products end -->*/}
        </main>
      </div>
    </>
  );
}
