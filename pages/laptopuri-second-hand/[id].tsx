import { useRouter } from "next/router";
import { laptopsData } from "../../data";
import Meta from "../../components/layouts/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import qualityIcon from "../../public/svg/quality.svg";
import transportIcon from "../../public/svg/transport.svg";
import payImg from "../../public/images/stripe.png";

const features = ["Producator", "Model", "Garantie", "Stare produs"];

const SecondHandLaptopDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="page-details">
      {laptopsData
        .filter((laptop) => laptop.id == id)
        .map((l, idx) => (
          <div key={idx}>
            <Meta title={l.title} />
            <div className="container-fluid py-5">
              <h1 style={{ textAlign: "center", paddingBottom: "30px" }}>
                {l.title}
              </h1>
              <div className="row px-xl-5">
                <div className="col-lg-5 pb-5">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {l.images.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <Image src={img} alt="image" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="col-lg-7 pb-5 parent-container">
                  <div className="first-container">
                    {/*<div className="d-flex mb-3">
                    <div className="text-primary mr-2">
                      <small className="fas fa-star"></small>
                      <small className="fas fa-star"></small>
                      <small className="fas fa-star"></small>
                      <small className="fas fa-star-half-alt"></small>
                      <small className="far fa-star"></small>
                    </div>
                    <small className="pt-1">(50 Reviews)</small>
                    </div>*/}

                    <div className="features-list">
                      <div className="features-key">
                        {features.map((f, idx) => (
                          <p key={idx}>{f}:</p>
                        ))}
                      </div>
                      <div className="features-value">
                        <p>{l.producerDetails.model}</p>
                        <p>{l.model}</p>
                        <p>{l.producerDetails.warranty}</p>
                        <p>{l.others}</p>
                      </div>
                    </div>

                    <p className="mb-4">{l.details}</p>
                    <div className="d-flex align-items-center mb-2 pt-2 img-container">
                      <Image src={qualityIcon} alt="quality" />
                      <p>Garantie la toate produsele comandate</p>
                    </div>
                    <div className="d-flex align-items-center mb-2 pt-2 img-container">
                      <Image src={transportIcon} alt="quality" />
                      <p>Livrare gratuita la orice comanda de peste 250 lei</p>
                    </div>
                    <div className="d-flex pt-3 icons-container">
                      <p className="text-dark font-weight-medium mb-0 mr-2">
                        Share on:
                      </p>
                      <div className="d-inline-flex">
                        <a
                          className="text-dark px-2"
                          target="_blank"
                          href="https://www.facebook.com"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                          className="text-dark px-2"
                          target="_blank"
                          href="https://twitter.com"
                          rel="noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a
                          className="text-dark px-2"
                          target="_blank"
                          href="https://www.linkedin.com"
                          rel="noreferrer"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a
                          className="text-dark px-2"
                          target="_blank"
                          href="https://www.pinterest.com"
                          rel="noreferrer"
                        >
                          <i className="fab fa-pinterest"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="second-container">
                    {/*<div className="d-flex mb-3">
                    <div className="text-primary mr-2">
                      <small className="fas fa-star"></small>
                      <small className="fas fa-star"></small>
                      <small className="fas fa-star"></small>
                      <small className="fas fa-star-half-alt"></small>
                      <small className="far fa-star"></small>
                    </div>
                    <small className="pt-1">(50 Reviews)</small>
                    </div>*/}

                    <h3 className="font-weight-semi-bold mb-4">
                      {l.price} {l.currency}
                    </h3>

                    <button className="btn btn-primary px-3">
                      <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                    </button>
                    <div className="d-flex align-items-center mb-2 pt-2">
                      <Image src={payImg} alt="payments" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row px-xl-5">
                <div className="col">
                  <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                    <a
                      className="nav-item nav-link active"
                      data-toggle="tab"
                      href="#tab-pane-1"
                    >
                      Description
                    </a>
                    <a
                      className="nav-item nav-link"
                      data-toggle="tab"
                      href="#tab-pane-2"
                    >
                      Information
                    </a>
                    <a
                      className="nav-item nav-link"
                      data-toggle="tab"
                      href="#tab-pane-3"
                    >
                      Reviews (0)
                    </a>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="tab-pane-1">
                      <h4 className="mb-3">Product Description</h4>
                      <p>
                        Eos no lorem eirmod diam diam, eos elitr et gubergren
                        diam sea. Consetetur vero aliquyam invidunt duo dolores
                        et duo sit. Vero diam ea vero et dolore rebum, dolor
                        rebum eirmod consetetur invidunt sed sed et, lorem duo
                        et eos elitr, sadipscing kasd ipsum rebum diam. Dolore
                        diam stet rebum sed tempor kasd eirmod. Takimata kasd
                        ipsum accusam sadipscing, eos dolores sit no ut diam
                        consetetur duo justo est, sit sanctus diam tempor
                        aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd
                        eos consetetur at sit rebum, diam kasd invidunt tempor
                        lorem, ipsum lorem elitr sanctus eirmod takimata dolor
                        ea invidunt.
                      </p>
                      <p>
                        Dolore magna est eirmod sanctus dolor, amet diam et
                        eirmod et ipsum. Amet dolore tempor consetetur sed lorem
                        dolor sit lorem tempor. Gubergren amet amet labore
                        sadipscing clita clita diam clita. Sea amet et sed ipsum
                        lorem elitr et, amet et labore voluptua sit rebum. Ea
                        erat sed et diam takimata sed justo. Magna takimata
                        justo et amet magna et.
                      </p>
                    </div>
                    <div className="tab-pane fade" id="tab-pane-2">
                      <h4 className="mb-3">Additional Information</h4>
                      <p>
                        Eos no lorem eirmod diam diam, eos elitr et gubergren
                        diam sea. Consetetur vero aliquyam invidunt duo dolores
                        et duo sit. Vero diam ea vero et dolore rebum, dolor
                        rebum eirmod consetetur invidunt sed sed et, lorem duo
                        et eos elitr, sadipscing kasd ipsum rebum diam. Dolore
                        diam stet rebum sed tempor kasd eirmod. Takimata kasd
                        ipsum accusam sadipscing, eos dolores sit no ut diam
                        consetetur duo justo est, sit sanctus diam tempor
                        aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd
                        eos consetetur at sit rebum, diam kasd invidunt tempor
                        lorem, ipsum lorem elitr sanctus eirmod takimata dolor
                        ea invidunt.
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0">
                              Sit erat duo lorem duo ea consetetur, et eirmod
                              takimata.
                            </li>
                            <li className="list-group-item px-0">
                              Amet kasd gubergren sit sanctus et lorem eos
                              sadipscing at.
                            </li>
                            <li className="list-group-item px-0">
                              Duo amet accusam eirmod nonumy stet et et stet
                              eirmod.
                            </li>
                            <li className="list-group-item px-0">
                              Takimata ea clita labore amet ipsum erat justo
                              voluptua. Nonumy.
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0">
                              Sit erat duo lorem duo ea consetetur, et eirmod
                              takimata.
                            </li>
                            <li className="list-group-item px-0">
                              Amet kasd gubergren sit sanctus et lorem eos
                              sadipscing at.
                            </li>
                            <li className="list-group-item px-0">
                              Duo amet accusam eirmod nonumy stet et et stet
                              eirmod.
                            </li>
                            <li className="list-group-item px-0">
                              Takimata ea clita labore amet ipsum erat justo
                              voluptua. Nonumy.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="tab-pane-3">
                      <div className="row">
                        <div className="col-md-6">
                          <h4 className="mb-4">
                            1 review for Colorful Stylish Shirt
                          </h4>
                          <div className="media mb-4">
                            <img
                              src="img/user.jpg"
                              alt="Image"
                              className="img-fluid mr-3 mt-1"
                              style={{ width: "45px" }}
                            />
                            <div className="media-body">
                              <h6>
                                John Doe
                                <small>
                                  {" "}
                                  - <i>01 Jan 2045</i>
                                </small>
                              </h6>
                              <div className="text-primary mb-2">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                                <i className="far fa-star"></i>
                              </div>
                              <p>
                                Diam amet duo labore stet elitr ea clita ipsum,
                                tempor labore accusam ipsum et no at. Kasd diam
                                tempor rebum magna dolores sed sed eirmod ipsum.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h4 className="mb-4">Leave a review</h4>
                          <small>
                            Your email address will not be published. Required
                            fields are marked *
                          </small>
                          <div className="d-flex my-3">
                            <p className="mb-0 mr-2">Your Rating * :</p>
                            <div className="text-primary">
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                            </div>
                          </div>
                          <form>
                            <div className="form-group">
                              <label>Your Review *</label>
                              <textarea
                                id="message"
                                className="form-control"
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label>Your Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                              />
                            </div>
                            <div className="form-group">
                              <label>Your Email *</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                              />
                            </div>
                            <div className="form-group mb-0">
                              <input
                                type="submit"
                                value="Leave Your Review"
                                className="btn btn-primary px-3"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid py-5">
              <div className="text-center mb-4">
                <h2 className="section-title px-5">
                  <span className="px-2">You May Also Like</span>
                </h2>
              </div>
              <div className="row px-xl-5">
                <div className="col">
                  <div className="owl-carousel related-carousel">
                    <div className="card product-item border-0">
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
                    <div className="card product-item border-0">
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
                    <div className="card product-item border-0">
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
                    <div className="card product-item border-0">
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
                    <div className="card product-item border-0">
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
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SecondHandLaptopDetails;
