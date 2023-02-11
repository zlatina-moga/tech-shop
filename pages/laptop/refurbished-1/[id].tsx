import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { laptopsData } from "../../../data";
import Meta from "../../../components/layouts/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import qualityIcon from "../../../public/svg/quality.svg";
import transportIcon from "../../../public/svg/transport.svg";
import payImg from "../../../public/images/stripe.png";
import truckIcon from "../../../public/svg/truck.svg";
import walletIcon from "../../../public/svg/money.svg";
import cartIcon from "../../../public/svg/cart.svg";
import externalIcon from "../../../public/svg/external.svg";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import classNames from "classnames";
import Link from "next/link";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import Loader from "../../../components/global/Loader/Loader";

const features = ["RAM", "Hard Disk", "Sistem de operare"];

const SecondHandLaptopDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getSingleItem(id)
      .then((result) => {
        setLoading(false);
        seItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="page-details">
          <PhotoProvider>
            {itemData.map((item, idx) => (
              <div key={idx}>
                <Meta title={item.title} keywords={item.title} />
                <div className="container-fluid py-5">
                  <h1 style={{ textAlign: "center", paddingBottom: "30px" }}>
                    {item.title}
                  </h1>
                  <div className="row px-xl-5">
                    <div className="col-lg-5 pb-5">
                      <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                      >
                        {item.images.map((img, idx) => (
                          <SwiperSlide key={idx}>
                            <PhotoView src={img}>
                              <img
                                src={img}
                                alt="image"
                                style={{ cursor: "pointer" }}
                              />
                            </PhotoView>
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
                          <div className="dropend">
                            <button
                              className="btn border dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {item.defaultRam}
                            </button>
                            <ul
                              className="dropdown-menu"
                            >
                              <li>
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <p className="mb-4 details">{}</p>
                        <div className="d-flex align-items-center img-container">
                          <Image src={qualityIcon} alt="quality" />
                          <p>Garantie la toate produsele comandate</p>
                        </div>
                        <div className="d-flex align-items-center img-container">
                          <Image src={transportIcon} alt="quality" />
                          <p>Livrare gratuita la comanda de peste 250 lei</p>
                        </div>
                        <div className="d-flex align-items-center img-container">
                          <Image src={walletIcon} alt="payment" />
                          <p>Modalitati de plata</p>
                        </div>
                        <div className="d-flex align-items-center img-container">
                          <Image src={cartIcon} alt="cart" />
                          <p>Politica de retur</p>
                        </div>
                        <div className="d-flex pt-4 icons-container">
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </PhotoProvider>
        </div>
      )}
    </>
  );
};

export default SecondHandLaptopDetails;
