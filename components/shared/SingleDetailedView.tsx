import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import Meta from "../../components/layouts/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import qualityIcon from "../../public/svg/quality.svg";
import transportIcon from "../../public/svg/transport.svg";
import payImg from "../../public/images/stripe.png";
import truckIcon from "../../public/svg/truck.svg";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { addProduct } from "../../services/redux/cartRedux";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";

const SingleDetailedView = ({ itemData, breadcrumbs }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  let [warranty, setWarranty] = useState(0);
  let [warrantyType, setWarrantyType] = useState('');

  const id = itemData.map((element => element.id)).toString()

  const handleAddToCart = () => {
    dispatch(addProduct({ itemData, quantity: 1, warranty: warranty }));
    setClicked(true);
    toast.success("Product added to cart", {
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
      .then((res) => {
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
        {itemData.map((item, idx) => (
          <div key={idx}>
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
              title={item.title}
              keywords={item.title}
              description={item.title}
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
                    {item.techSpecs && item.upgradeOptions && (
                      <div className="features-list">
                        <div className="features-key">
                          {item.upgradeOptions.map((f, idx) => (
                            <p className="text-primary" key={idx}>
                              {f.name}:
                            </p>
                          ))}
                          {item.warrantyOptions && (
                            <p className="text-primary">
                              Adauga extra garantie:
                            </p>
                          )}
                        </div>
                        <div className="features-value">
                          {item.upgradeOptions.map((option, i) => (
                            <div
                              key={i}
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
                                {option.current_name}
                              </button>
                              <ul className="dropdown-menu" id="upgrade-links">
                                {option.components.map((extra, index) => (
                                  <li key={index}>
                                    <Link
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
                          {item.warrantyOptions && (
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
                                {warranty === 0 ? "Alege garantia" : warrantyType}
                              </button>
                              <ul className="dropdown-menu" id="upgrade-links">
                                {item.warrantyOptions.map((w, i) => (
                                  <li key={i}>
                                    <button
                                      className="dropdown-item"
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        color: "black",
                                      }}
                                      onClick={() =>{
                                        handleWarranty(w.value_with_vat)
                                        setWarrantyType(w.name)}
                                      }
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
                    {item.price ? (
                      <>
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
                            defaultValue={`Sunt interesat de produsul cu ${
                              item.productDetailsTitle.split(",")[1]
                            }`}
                            placeholder={`Sunt interesat de produsul cu ${
                              item.productDetailsTitle.split(",")[1]
                            }`}
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

                    {item.price ? (
                      <div className="price-container">
                        <h3 className="mb-3 price">
                          {item.price} (TVA inclus)
                        </h3>
                        <div className="delivery mb-3">
                          <Image src={truckIcon} alt="delivery" />
                          <p>
                            Livrare in <b>1-2 zile</b>
                          </p>
                        </div>

                        <p className="in-stock">{item.inStock}</p>
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
                          Adauga in cos
                        </button>
                        <div className="d-flex align-items-center mb-2 pt-2">
                          <Image
                            src={payImg}
                            alt="payments"
                            style={{ maxHeight: "60px" }}
                          />
                        </div>
                        <div className="contact">
                          <span>Comanda telefonica:</span>
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
                    ) : (
                      <div className="price-container">
                        <h3 className="mb-3 price">
                          Contacteaza telefonic agentul pentru a comanda
                          produsul. Suna acum.
                        </h3>
                        <div className="contact">
                          <span>Comanda telefonica:</span>
                          <div>
                            <b>Nume Prenume</b>
                            <p>
                              <b>Email: </b>email@gmail.com
                            </p>
                            <p>
                              <b>Telefon: </b>+40123456789
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
                  {item.productDetailsTitle}
                </h3>
                <p>{item.productDetails}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <img src={item.techImage} />
                </div>
              </div>
              <div>
                {item.techSpecs && (
                  <h4 style={{ fontWeight: "600", marginTop: "50px" }}>
                    {item.techSpecsTitle}
                  </h4>
                )}
                <div className="description-container">
                  {item.techSpecs &&
                    item.techSpecs.map((item, idx) => (
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
        ))}
      </PhotoProvider>
    </div>
  );
};

export default SingleDetailedView;
