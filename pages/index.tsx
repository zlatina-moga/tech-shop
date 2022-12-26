import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { laptopsData } from "../data";
import { computersData } from "../data";
import Navbar from "../components/global/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "100rem", margin: "0 auto" }}>
        <main style={{ paddingTop: "150px" }}>
          {/*<!-- SideBar Start -->*/}
          <div className="container-fluid mb-5">
            <div className="row px-xl-5">
              <div className="col-lg-3 d-none d-lg-block">
                <a
                  className="btn d-flex align-items-center justify-content-between bg-primary text-white w-100"
                  data-toggle="collapse"
                  href="#navbar-vertical"
                  style={{
                    height: 65,
                    marginTop: -1,
                    paddingBottom: 30,
                    paddingTop: 30,
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                  }}
                >
                  <h6 className="m-0">Products</h6>
                  <i className="fa fa-angle-down text-dark"></i>
                </a>
                <nav
                  className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                  id="navbar-vertical"
                >
                  <div
                    className="navbar-nav w-100 overflow-hidden"
                    style={{
                      height: 410,
                      borderBottomLeftRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    <Link href="/laptops" className="nav-item nav-link py-3">
                      Laptops
                    </Link>
                    <Link href="/computers" className="nav-item nav-link py-3">
                      Computers
                    </Link>
                    <a href="" className="nav-item nav-link py-3">
                      Workstations
                    </a>
                    <a href="" className="nav-item nav-link py-3">
                      Servers
                    </a>
                    <a href="" className="nav-item nav-link py-3">
                      Monitors
                    </a>
                    <a href="" className="nav-item nav-link py-3">
                      Apple
                    </a>
                    <a
                      href=""
                      className="nav-item nav-link py-3"
                      style={{ borderBottom: "none" }}
                    >
                      Components
                    </a>
                  </div>
                </nav>
              </div>
              <div className="col-lg-9">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                  <a href="" className="text-decoration-none d-block d-lg-none">
                    <h1 className="m-0 display-5 font-weight-semi-bold">
                      <span className="text-primary font-weight-bold border px-3 mr-1">
                        Tech
                      </span>
                      Shop
                    </h1>
                  </a>
                  <button
                    type="button"
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse justify-content-between"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="navbar-nav mr-auto py-0">
                      <a href="" className="nav-item nav-link active">
                        Promotions
                      </a>
                      <a href="" className="nav-item nav-link">
                        High-end systems
                      </a>
                      <a href="" className="nav-item nav-link">
                        Gaming
                      </a>
                      <a href="" className="nav-item nav-link">
                        All-in-one
                      </a>
                      <a href="" className="nav-item nav-link">
                        Tablets
                      </a>
                      {/*<div className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Pages
                      </a>
                      <div className="dropdown-menu rounded-0 m-0">
                        <a href="cart.html" className="dropdown-item">
                          Shopping Cart
                        </a>
                        <a href="checkout.html" className="dropdown-item">
                          Checkout
                        </a>
                      </div>
              </div>*/}
                      <a href="" className="nav-item nav-link">
                        Contact
                      </a>
                    </div>
                  </div>
                </nav>
                <div className="carousel slide" data-ride="carousel">
                  <div className="carousel-item active" style={{ height: 410 }}>
                    <div>
                      <Image
                        className="img-fluid"
                        src="/images/banner_site-03.png"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        style={{
                          borderBottomLeftRadius: "4px",
                          borderBottomRightRadius: "4px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- SideBar end -->*/}

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
              <div className="col-md-6 pb-4">
                <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
                  <img src="img/offer-1.png" alt="" />
                  <div className="position-relative" style={{ zIndex: "1" }}>
                    <h5 className="text-uppercase text-primary mb-3">
                      20% off the all order
                    </h5>
                    <h1 className="mb-4 font-weight-semi-bold">
                      Spring Collection
                    </h1>
                    <a
                      href=""
                      className="btn btn-outline-primary py-md-2 px-md-3"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pb-4">
                <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
                  <img src="/img/offer-2.png" alt="" />
                  <div className="position-relative" style={{ zIndex: "1" }}>
                    <h5 className="text-uppercase text-primary mb-3">
                      20% off the all order
                    </h5>
                    <h1 className="mb-4 font-weight-semi-bold">
                      Winter Collection
                    </h1>
                    <a
                      href=""
                      className="btn btn-outline-primary py-md-2 px-md-3"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- Offer end -->*/}

          {/*<!-- Products Start -->*/}
          <div className="container-fluid pt-5">
            <div className="text-center mb-4">
              <h2 className="section-title px-5">
                <span className="px-2">Trandy Products</span>
              </h2>
            </div>
            <div className="row px-xl-5 pb-3">
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-4.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-5.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-6.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-7.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-8.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
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
            <div className="row px-xl-5 pb-3">
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-4.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-5.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-6.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-7.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/product-8.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- Products end -->*/}
        </main>
      </div>
    </>
  );
}
