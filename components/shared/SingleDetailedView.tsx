import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import Meta from "../layouts/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import qualityIcon from "../../public/svg/quality.svg";
import transportIcon from "../../public/svg/transport.svg";
import payImg from "../../public/images/secure.png";
import truckIcon from "../../public/svg/truck.svg";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { addProduct } from "../../services/redux/cartRedux";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as ga from "../../lib/gtag";

const SingleDetailedView = ({ itemData, breadcrumbs, techSpecs, upgradeOptions, warrantyOptions, images }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  let [warranty, setWarranty] = useState(0);
  let [warrantyType, setWarrantyType] = useState("");
  const isTablet = useMediaQuery("(max-width:601px)");

  itemData[11] = itemData[11].replaceAll('citgrup.ro', 'pcbun.ro')

  const handleAddToCart = () => {
    dispatch(addProduct({ itemData, quantity: 1, warranty: warranty }));
    setClicked(true);

    ga.event({
      action: "add_to_cart",
      params: {
        currency: "RON",
        value: itemData[35],
        items: [
          {
            item_id: itemData[0],
            item_name: itemData[9],
          },
        ],
      },
    });

    toast.success("Produs adăugat în coș", {
      style: { marginTop: "100px" },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("cf-name");
    const email = formData.get("cf-email");
    const phone = formData.get("cf-phone");
    const message = formData.get("cf-message");

    sendItemRequest(process.env.TEMPLATE_ID, {
      message: message,
      phone: phone,
      email: email,
      from_name: name,
      reply_to: email,
    });
  };

  const sendItemRequest = (templateId, variables) => {
    emailjs
      .send(process.env.SERVICE_ID, templateId, variables, process.env.USER_ID)
      .then(() => {
        toast.success("Mesaj trimis cu succes", {
          style: { marginTop: "100px" },
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      });
  };

  const handleWarranty = (selectedWarranty) => {
    setWarranty(selectedWarranty);
  };

  return (
    <div className="page-details">
      <PhotoProvider>
          <div>
            <div className="row px-5">
              <nav aria-label="breadcrumb " className="second ">
                <ol className="breadcrumb indigo lighten-6 first px-md-4">
                  {breadcrumbs.map((br, idx) => (
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
            <Meta
              title={itemData[3]}
              keywords={itemData[5]}
              description={itemData[4]}
            />
            <div className="container-fluid py-5">
              <h1
                style={{
                  textAlign: "center",
                  paddingBottom: "30px",
                  fontWeight: "600",
                  fontSize: "30px",
                }}
              >
                {itemData[10]}
              </h1>
              <div className="row px-xl-5 main-container">
                <div className="col-lg-5 pb-5">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {images && images.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <PhotoView src={img.src}>
                          <img
                            src={img.src}
                            alt="image"
                            style={{ cursor: "pointer" }}
                          />
                        </PhotoView>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="col-xl-7 pb-5 parent-container">
                  <div className="first-container">
                    {techSpecs && upgradeOptions && (
                      <div className="features-list">
                        <div className="features-key">
                          {upgradeOptions.map((f, idx) => (
                            <p className="text-primary" key={idx}>
                              {f.name}:
                            </p>
                          ))}
                          {warrantyOptions && (
                            <p className="text-primary">
                              Adauga extra garantie:
                            </p>
                          )}
                        </div>
                        <div className="features-value">
                          {upgradeOptions.map((option, i) => (
                            <div
                              key={i}
                              className={isTablet ? "dropdown" : "dropend"}
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
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  maxWidth: "200px",
                                }}
                              >
                                {option.current_name}
                              </button>
                              <ul
                                className="dropdown-menu"
                                id="upgrade-links"
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {option.components.map((extra, index) => (
                                  <li key={index}>
                                    <Link
                                      id="upgrade-link"
                                      className="dropdown-item"
                                      data-target={extra.url}
                                      href={extra.url.split("/").pop()}
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      {extra.name}

                                      {extra.is_current ? (
                                        <i
                                          className="fas fa-check"
                                          style={{
                                            color: "#6AB04C",
                                            marginLeft: "10px",
                                          }}
                                        ></i>
                                      ) : (
                                        <span className="ml-3 font-weight-bold">
                                          {extra.price_variation}
                                          {" Lei"}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {warrantyOptions && (
                            <div
                              className={isTablet ? "dropdown" : "dropend"}
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
                                {warranty === 0
                                  ? "Alege garantia"
                                  : warrantyType}
                              </button>
                              <ul className="dropdown-menu" id="upgrade-links">
                                {warrantyOptions.map((w, i) => (
                                  <li key={i}>
                                    <button
                                      className="dropdown-item"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        color: "black",
                                      }}
                                      onClick={() => {
                                        handleWarranty(w.value_with_vat);
                                        setWarrantyType(w.name);
                                      }}
                                    >
                                      {w.name}
                                      <span className="ml-3 font-weight-bold">
                                        {w.value_with_vat}
                                        {" Lei"}
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {itemData[34] != "" ? (
                      <>
                        <div className="d-flex align-items-center img-container">
                          <Image src={qualityIcon} alt="quality" />
                          <p>Garantie la toate produsele comandate</p>
                        </div>
                        <div className="d-flex align-items-center img-container">
                          <Image src={transportIcon} alt="quality" />
                          <p>Livrare gratuita la comanda de peste 250 lei</p>
                        </div>
                        <p className="mb-4 details">
                          Produsele noastre arată foarte bine, fără zgârieturi
                          vizibile (in cazul produselor Second hand sau
                          Refurbished)
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="mb-4 price">
                          Te intereseaza sa cumperi acum acest produs?
                          Completeaza formularul
                        </h3>
                        <form onSubmit={onSubmit}>
                          <input
                            type="text"
                            className="form-control text-left"
                            name="cf-name"
                            placeholder="Nume"
                          />
                          <input
                            type="email"
                            className="form-control text-left w-100"
                            name="cf-email"
                            placeholder="Adresa email"
                          />
                          <input
                            type="tel"
                            className="form-control text-left"
                            name="cf-phone"
                            placeholder="Numar telefon"
                          />
                          <textarea
                            className="form-control"
                            name="cf-message"
                            defaultValue={`Sunt interesat de produsul cu ${itemData[0]}`}
                            placeholder={`Sunt interesat de produsul cu ${itemData[0]}`}
                          ></textarea>
                          <button
                            type="submit"
                            className="form-control mt-4 btn btn-primary"
                            id="submit-button"
                            name="submit"
                          >
                            Trimite
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                  <div className="second-container">
                    {itemData[36] && (
                      <div style={{ display: "flex" }}>
                        <div className="discount-container">
                          <div>
                            <p>{itemData[37]}</p>
                          </div>
                        </div>
                        <div className="old-price">
                          <h6>
                          <del style={{fontWeight: 'bold'}}>{itemData[31]} Lei + TVA</del>
                          </h6>
                        </div>
                      </div>
                    )}

                    {itemData[35] ? (
                      <div className="price-container">
                        <h3 className="mb-3 price">
                        {itemData[35]} (TVA inclus)
                        </h3>
                        <div className="delivery mb-3">
                          <Image src={truckIcon} alt="delivery" />
                          <p>
                            Livrare in <b>1-2 zile</b>
                          </p>
                        </div>

                        <p className="in-stock">{itemData[13]}</p>
                        <p className="eco-tax">
                          Pretul include Eco-Taxa de 6.00 lei
                        </p>
                        <button
                          className={classNames(
                            "btn btn-primary add-to-cart",
                            clicked ? "disabled" : ""
                          )}
                          onClick={handleAddToCart}
                        >
                          Adauga in coș
                        </button>
                        <div className="d-flex align-items-start mb-4 pt-4">
                          <Image
                            src={payImg}
                            alt="payments"
                            style={{ maxHeight: "100px", height: "auto" }}
                          />
                        </div>
                        <div className="contact">
                          <span>Comanda telefonica:</span>
                          <div>
                            <b>Popescu Vlad</b>
                            <p>
                              <b>Email: </b>salut@pcbun.ro
                            </p>
                            <p>
                              <b>Telefon: </b>+40 (721) 909 049
                            </p>
                            <p>
                              <b>ID Produs: </b>
                              {itemData[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="price-container">
                        <h3 className="mb-3 price">
                          Contacteaza telefonic agentul pentru a comanda
                          produsul. Suna acum.
                        </h3>
                        <div className="contact">
                          <span>Comanda telefonica:</span>
                          <div>
                            <b>Popescu Vlad</b>
                            <p>
                              <b>Email: </b>salut@pcbun.ro
                            </p>
                            <p>
                              <b>Telefon: </b>+40 (721) 909 049
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                  <h3 style={{ fontWeight: "600" }}>
                    Specificatii produs {itemData[28]} {itemData[6]}
                  </h3>
                <section dangerouslySetInnerHTML={{__html: itemData[11]}}></section>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  
                </div>
              </div>
              <div>
                <div className="description-container">
                  {techSpecs &&
                    techSpecs.map((item, idx) => (
                      <div className="description-feature" key={idx}>
                        <h4>{item.name}</h4>
                        {item.items.map((attr, i) => (
                          <div key={i}>
                            <p style={{ fontWeight: "600", fontSize: "16px" }}>
                              {attr.attribute_name}
                            </p>
                            <p style={{ fontSize: "16px" }}>
                              {attr.attribute_value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              <Toaster position="top-right" />
            </div>
          </div>
      </PhotoProvider>
    </div>
  );
};

export default SingleDetailedView;
