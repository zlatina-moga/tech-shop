import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

const RefurbishedLaptopDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getRefurnishedLaptop(id)
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
                        <div className="features-list">
                          <div className="features-key">
                            {features.map((f, idx) => (
                              <p key={idx}>{f}:</p>
                            ))}
                          </div>
                          <div className="features-value">
                            <div
                              className="dropend"
                              style={{
                                borderRadius: "4px",
                                marginBottom: "1rem",
                              }}
                            >
                              <button
                                className="btn border dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {item.defaultRam}
                              </button>
                              <ul className="dropdown-menu">
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
                            <div
                              className="dropend"
                              style={{
                                borderRadius: "4px",
                                marginBottom: "1rem",
                              }}
                            >
                              <button
                                className="btn border dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {item.defaultHardDisk}
                              </button>
                              <ul className="dropdown-menu">
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
                            <div
                              className="dropend"
                              style={{
                                borderRadius: "4px",
                                marginBottom: "1rem",
                              }}
                            >
                              <button
                                className="btn border dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {item.defaultOS}
                              </button>
                              <ul className="dropdown-menu">
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
                        </div>

                        <p className="mb-4 details">
                          Toate fotografiile produselor prezentate au caracter
                          informativ, pot diferi fata de produsul vandut si pot
                          arata accesorii ce nu sunt incluse in pachetul
                          standard al produsului
                        </p>
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
                      </div>
                      <div className="second-container">
                        <div className="price-container">
                          <h3 className="mb-3 price">{item.price}</h3>
                          <div className="delivery mb-3">
                            <Image src={truckIcon} alt="delivery" />
                            <p>
                              Livrare in <b>1-2 zile</b>
                            </p>
                          </div>
                          {item.inStock !== undefined ?  <p className="in-stock">Disponibil in stoc</p> :  <p className="not-in-stock">Indisponibil</p>}
                         
                          <p className="eco-tax">
                            Pretul include Eco-Taxa de 6.00 lei
                          </p>
                          <button className="btn btn-primary add-to-cart">
                          Adauga in cos
                        </button>
                        <div className="d-flex align-items-center mb-2 pt-2">
                          <Image
                            src={payImg}
                            alt="payments"
                            style={{ maxHeight: "120px" }}
                          />
                        </div>
                        <div className="contact">
                          <span >Comanda telefonica:</span>
                          <div>
                            <b>Nume Prenume</b>
                            <p>
                              <b>Email: </b>email@gmail.com
                            </p>
                            <p>
                              <b>Telefon: </b>+40123456789
                            </p>
                            <p>
                              <b>ID Produs: </b>
                             {item.idCode}
                            </p>
                          </div>
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

export default RefurbishedLaptopDetails;
