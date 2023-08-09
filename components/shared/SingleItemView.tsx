import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Meta from "../layouts/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import qualityIcon from "../../public/svg/quality.svg";
import transportIcon from "../../public/svg/transport.svg";
import payImg from "../../public/images/secure.png";
import truckIcon from "../../public/svg/truck.svg";
import "react-photo-view/dist/react-photo-view.css";
import "swiper/css";
import "swiper/css/navigation";
import { addProduct, empty } from "../../services/redux/cartRedux";
import classNames from "classnames";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as ga from "../../lib/gtag";

const SingleItemView = ({ itemData, breadcrumbs, techSpecs, images, data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const isTablet = useMediaQuery("(max-width:601px)");

  //dispatch(empty());

  const handleAddToCart = () => {
    dispatch(addProduct({ itemData, quantity: 1, warranty: 0 }));
    setClicked(true);
    
    ga.event({
      action: "add_to_cart",
      params: {
        currency: "RON",
        value: (itemData[35] ? itemData[35] : itemData[0].priceNum),
        items: [
          {
            item_id: ( itemData[0] ? itemData[0] : itemData[0].id),
            item_name: (itemData[3] ? itemData[3] : itemData[0].title),
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

  return (
    <div className="page-details">
      <PhotoProvider>
        <div>
          <div className="row px-5">
            <nav aria-label="breadcrumb " className="second ">
              <ol className="breadcrumb indigo lighten-6 first px-md-4">
                {breadcrumbs.map((br, idx) => (
                  <li className="breadcrumb-item align-items-center" key={idx}>
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
            <h1 style={{ textAlign: "center", paddingBottom: "30px" }}>
              {itemData[10]}
            </h1>
            <div className="row px-xl-5 main-container">
              <div className="col-lg-5 pb-5">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {images &&
                    images.map((img, idx) => (
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
                {itemData[34] != "" ? (
                  <div className="first-container">
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
                      vizibile (in cazul produselor Second hand sau Refurbished)
                    </p>
                  </div>
                ) : (
                  <div className="first-container">
                    <h3 className="mb-4 price">
                      Te intereseaza sa cumperi acum acest produs? Completeaza
                      formularul
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
                  </div>
                )}
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
                          <del style={{ fontWeight: "bold" }}>
                            {itemData[31]} Lei + TVA
                          </del>
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
                        Prețul include Eco-Taxa de 6.00 lei
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
                          <b>Representative</b>
                          <p>
                            <b>Email: </b>email@email.com
                          </p>
                          <p>
                            <b>Telefon: </b>+1234567890
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
                        Contacteaza telefonic agentul pentru a comanda produsul.
                        Suna acum.
                      </h3>
                      <div className="contact">
                        <span>Comanda telefonica:</span>
                        <div>
                          <b>Representative</b>
                          <p>
                            <b>Email: </b>email@email.com
                          </p>
                          <p>
                            <b>Telefon: </b>+1234567890
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
              <section style={{maxWidth: '80rem'}} dangerouslySetInnerHTML={{__html: itemData[11]}}></section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              ></div>
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
          </div>
          { data[3] && data[3].length > 0  && <div className="container-fluid py-5">
            <h3 className="font-weight-bold">Vă mai recomandăm și</h3>
            <div
              className="row pb-3 justify-content-center, ml-xl-5"
              style={{ maxWidth: "80rem", justifyContent: "center" }}
            >
              {data[3] && data[3].map((item, idx) => (
                <div
                  className={classNames(`pb-1`, "laptop-card")}
                  key={idx}
                  style={{ maxWidth: "320px" }}
                >
                  <div
                    className={classNames(
                      "card product-item border border-gray rounded mb-4",
                      "inner-container"
                    )}
                    style={{ alignItems: "stretch", height: "580px" }}
                    onClick={() => router.push(`/${item.permalink}`, undefined, {
                      shallow: true, scroll: true}
                    )}
                  >
                      <div
                        className={classNames(
                          "card-header product-img position-relative overflow-hidden bg-transparent",
                          "img-wrapper"
                        )}
                      >
                        {item.has_discount && (
                          <div className="discount-container">
                            <div>
                              <p>{item.discount_percent}</p>
                            </div>
                          </div>
                        )}

                        <img
                          className="img-fluid w-100"
                          src={item.featured_image.src}
                          alt=""
                          //style={{maxWidth: '200px'}}
                        />
                      </div>
                    <div className="card-body text-center p-3 pt-4 relative">
                      <h6
                        className=""
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxHeight: "55px",
                          fontWeight: '600'
                        }}
                      >
                        {item.name}
                      </h6>
                      {item.has_discount && (
                        <div className="d-flex justify-content-center">
                          <del>
                            {item.initial_price}
                            Lei + TVA
                          </del>
                        </div>
                      )}

                      <div className="d-flex justify-content-center">
                        {item.has_discount ? (
                          <p style={{
                            color: '#004f67',
                            fontSize: '18px',
                            fontWeight: '700',
                            position: 'absolute',
                            bottom: '10%',

                          }}>{item.final_price} Lei + TVA</p>
                        ) : (
                          <h6 style={{
                            color: '#90bd40',
                            fontSize: '18px',
                            fontWeight: '700',
                            position: 'absolute',
                            bottom: '10%',
                          }}>{item.final_price} Lei + TVA</h6>
                        )}
                      </div>
                    </div>
                    <div className="card-footer w-100 bg-light" >
                      <button
                        onClick={() => router.push(`/${item.permalink}`, undefined, {
                          shallow: true, scroll: true}
                        )}
                        className="btn btn-primary add-to-cart"
                        id='recommendation-card'
                      >
                        Vezi detalii
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}
        </div>
      </PhotoProvider>
    </div>
  );
};

export default SingleItemView;
