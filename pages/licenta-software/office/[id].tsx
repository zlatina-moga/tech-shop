import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Navbar from "../../../components/global/Navbar";
import { licenseData } from "../../../data/licenseData";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Meta from "../../../components/layouts/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import payImg from "../../../public/images/stripe.png";
import { officeBrcrmbs } from "../../../data/breadcrumbs";
import { addProduct } from "../../../services/redux/cartRedux";
import Footer from "../../../components/global/Footer";

const OfficeDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let itemData = licenseData.filter((el) => el.item == id);
    dispatch(addProduct({ itemData, quantity: 1 }));
  };

  return (
    <>
      <Navbar />
      <div className="page-details">
        <PhotoProvider>
          {licenseData
            .filter((el) => el.item == id)
            .map((item, idx) => (
              <div key={idx}>
                <div className="row px-5">
                  <nav aria-label="breadcrumb " className="second ">
                    <ol className="breadcrumb indigo lighten-6 first px-md-4">
                      {officeBrcrmbs.map((br, idx) => (
                        <li
                          className="breadcrumb-item align-items-center"
                          key={idx}
                        >
                          <Link className="black-text" href={br.link}>
                            <span className="mr-md-3 mr-2">{br.name}</span>
                          </Link>
                          <i className={br.linkIcon} aria-hidden="true"></i>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
                <Meta title={item.title} keywords={item.title} />
                <div className="container-fluid py-5">
                  <h1 style={{ textAlign: "center", paddingBottom: "30px" }}>
                    {item.title}
                  </h1>
                  <div className="row px-xl-5" style={{ alignItems: "center" }}>
                    <div className="col-lg-5 pb-5">
                      <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                      >
                        {item.imgLink.map((img, idx) => (
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
                        <p className="mb-4 details">{item.descrTitle}</p>
                        <ul>
                          {item.description.map((d, idx) => (
                            <li key={idx}>{d}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="second-container">
                        {item.discount && (
                          <div style={{ display: "flex" }}>
                            <div className="discount-container">
                              <div>
                                <p>{item.discount}</p>
                              </div>
                            </div>
                            <div className="old-price">
                              <h6>
                                <del>{item.oldPrice}</del>
                              </h6>
                            </div>
                          </div>
                        )}
                        <div
                          className="price-container"
                          style={{ marginTop: "0" }}
                        >
                          <h3 className="mb-3 price">{item.price} + TVA</h3>

                          <button
                            className="btn btn-primary add-to-cart"
                            onClick={handleAddToCart}
                          >
                            Adauga in cos
                          </button>
                          <div className="d-flex align-items-center mb-2 pt-2">
                            <Image
                              src={payImg}
                              alt="payments"
                              style={{ maxHeight: "60px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-center"
                    style={{
                      width: "40rem",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <h4>{item.activation1}:</h4>
                    <h6>
                      <a
                        href={item.activationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="footer-link font-weight-bold"
                      >
                        Activation Link
                      </a>
                    </h6>
                    <ul style={{ listStyle: "none", textAlign: "left" }}>
                      {item.activationSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                    {item.postDescr?.map((d, idx) => (
                      <p key={idx}>{d}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </PhotoProvider>
      </div>
      <Footer />
    </>
  );
};

export default OfficeDetails;
