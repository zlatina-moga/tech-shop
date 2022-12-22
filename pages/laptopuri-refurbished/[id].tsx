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
import truckIcon from "../../public/svg/truck.svg";
import walletIcon from "../../public/svg/money.svg";
import cartIcon from "../../public/svg/cart.svg";
import externalIcon from "../../public/svg/external.svg";
import { PhotoProvider, PhotoView } from "react-photo-view";
import classNames from "classnames";
import Link from "next/link";

const features = ["Producator", "Model", "Garantie", "Stare produs"];

const RefurbishedLaptopDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="page-details">
      <PhotoProvider>
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
                          <PhotoView key={idx} src={img.src}>
                            <Image src={img} alt="image" />
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
                        <div className="features-value">
                          <p>{l.producerDetails.model}</p>
                          <p>{l.model}</p>
                          <p>{l.producerDetails.warranty}</p>
                          <p>{l.others}</p>
                        </div>
                      </div>

                      <p className="mb-4 details">{l.details}</p>
                      <div className="d-flex align-items-center mb-2 pt-2 img-container">
                        <Image src={qualityIcon} alt="quality" />
                        <p>Garantie la toate produsele comandate</p>
                      </div>
                      <div className="d-flex align-items-center mb-2 pt-2 img-container">
                        <Image src={transportIcon} alt="quality" />
                        <p>Livrare gratuita la comanda de peste 250 lei</p>
                      </div>
                      <div className="d-flex align-items-center mb-2 pt-2 img-container">
                        <Image src={walletIcon} alt="payment" />
                        <p>Modalitati de plata</p>
                      </div>
                      <div className="d-flex align-items-center mb-2 pt-2 img-container">
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
                    <div className="second-container">
                      <div className="discount-container">
                        <div>
                          <p>-20%</p>
                        </div>
                      </div>
                      <div className="price-container">
                        <div className="old-price">
                          <h6>
                            <del>
                              {l.oldPrice} {l.currency}
                            </del>
                          </h6>
                          <h6 className="text-muted">
                            {"(-"}
                            {l.discount} {l.currency}
                            {" )"}
                          </h6>
                        </div>
                      </div>
                      <h3 className="mb-3 price">
                        {l.price} {l.currency}
                      </h3>
                      <div className="delivery mb-3">
                        <Image src={truckIcon} alt="delivery" />
                        <p>
                          Livrare in <b>1-2 zile</b>
                        </p>
                      </div>
                      {l.inStock ? (
                        <p className="in-stock">Disponibil in stoc</p>
                      ) : null}
                      <p className="eco-tax">
                        Pretul include Eco-Taxa de 6.00 lei
                      </p>

                      <button className="btn btn-primary add-to-cart">
                        {/*<span><i className="fa fa-shopping-cart mr-1"></i> </span>*/}
                        Adauga in cos
                      </button>
                      <div className="d-flex align-items-center mb-2 pt-2">
                        <Image src={payImg} alt="payments" />
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="description-container">
                  {l.batteryType ? (
                    <div className="description-feature">
                      <h4>Baterie laptop</h4>
                      <div>
                        <p>Tip baterie:</p>
                        <p>{l.batteryType}</p>
                      </div>
                    </div>
                  ) : null}
                  <div className="description-feature">
                    <h4>Producator</h4>
                    <div>
                      <p>Nume:</p>
                      <p>{l.producerDetails.model}</p>
                    </div>
                    <div>
                      <p>Model:</p>
                      <p>{l.model}</p>
                    </div>
                    <div>
                      <p>Garantie:</p>
                      <p>{l.producerDetails.warranty}</p>
                    </div>
                  </div>
                  {l.producerDetails.layout ? (
                    <div className="description-feature">
                      <h4>Tastatura</h4>
                      <div>
                        <p>Layout:</p>
                        <p>{l.producerDetails.layout}</p>
                      </div>
                    </div>
                  ) : null}

                  <div className="description-feature">
                    <h4>Procesor</h4>
                    {l.processorDetails.processorModel ? (
                      <div>
                        <p>Model procesor:</p>
                        <p>{l.processorDetails.processorModel}</p>
                      </div>
                    ) : null}

                    <div>
                      <p>Numar nuclee:</p>
                      <p>{l.processorDetails.nuclearNumber}</p>
                    </div>
                    {l.processorDetails.producer ? (
                      <div>
                        <p>Producator procesor:</p>
                        <p>{l.processorDetails.producer}</p>
                      </div>
                    ) : null}
                    {l.processorDetails.processorNumber ? (
                      <div>
                        <p>Procesoare incluse:</p>
                        <p>{l.processorDetails.processorNumber}</p>
                      </div>
                    ) : null}
                    <div>
                      <p>Tip procesor:</p>
                      <p>{l.processorDetails.processorType}</p>
                    </div>
                    <div>
                      <p>Cache CPU (MB):</p>
                      <p>{l.processorDetails.cpuCache}</p>
                    </div>
                    <div>
                      <p>Frecventa CPU (MHz):</p>
                      <p>{l.processorDetails.frequencyCPU}</p>
                    </div>
                    {l.processorDetails.frequencyTurbo ? (
                      <div>
                        <p>Frecventa turbo (MHz):</p>
                        <p>{l.processorDetails.frequencyTurbo}</p>
                      </div>
                    ) : null}

                    <div>
                      <p>Procesor grafic integrat:</p>
                      <p>{l.processorDetails.graphicProcessor}</p>
                    </div>
                    <div>
                      <p>Socket:</p>
                      <p>{l.processorDetails.socket}</p>
                    </div>
                  </div>
                  <div className="description-feature">
                    <h4>Memorie</h4>
                    <div>
                      <p>Capacitate memorie RAM (GB):</p>
                      <p>{l.memoryCapacity}</p>
                    </div>
                    <div>
                      <p>Tip memorie:</p>
                      <p>{l.memoryType}</p>
                    </div>
                  </div>
                  <div className="description-feature">
                    <h4>Hard Disk</h4>
                    <div>
                      <p>Capacitate hard disk (GB):</p>
                      <p>{l.hardDiskDetails.capacity}</p>
                    </div>
                    {l.hardDiskDetails.format ? (
                      <div>
                        <p>Format:</p>
                        <p>{l.hardDiskDetails.format}</p>
                      </div>
                    ) : null}
                    {l.hardDiskDetails.interface ? (
                      <div>
                        <p>Interfata:</p>
                        <p>{l.hardDiskDetails.interface}</p>
                      </div>
                    ) : null}

                    {l.hardDiskDetails.numberIncluded ? (
                      <div>
                        <p>Numar hard disk incluse:</p>
                        <p>{l.hardDiskDetails.numberIncluded}</p>
                      </div>
                    ) : null}
                    {l.hardDiskDetails.rotation ? (
                      <div>
                        <p>Viteza de rotatie (rpm):</p>
                        <p>{l.hardDiskDetails.rotation}</p>
                      </div>
                    ) : null}

                    <div>
                      <p>Tip:</p>
                      <p>{l.hardDiskDetails.type}</p>
                    </div>
                  </div>
                  <div className="description-feature">
                    <h4>Placa de baza</h4>
                    <div>
                      <p>Tip memorie:</p>
                      <p>{l.motherBoard.typeMemory}</p>
                    </div>
                    <div>
                      <p>Capacitate maxima memorie RAM (GB):</p>
                      <p>{l.motherBoard.RAMcapacity}</p>
                    </div>
                    {l.motherBoard.chipset ? (
                      <div>
                        <p>Chipset MB:</p>
                        <p>{l.motherBoard.chipset}</p>
                      </div>
                    ) : null}
                    {l.motherBoard.cpuSocket ? (
                      <div>
                        <p>CPU Socket:</p>
                        <p>{l.motherBoard.cpuSocket}</p>
                      </div>
                    ) : null}
                    {l.motherBoard.producer ? (
                      <div>
                        <p>Producator pl baza:</p>
                        <p>{l.motherBoard.producer}</p>
                      </div>
                    ) : null}
                    <div>
                      <p>Sloturi memorie:</p>
                      <p>{l.motherBoard.memorySlots}</p>
                    </div>
                  </div>
                  <div className="description-feature">
                    <h4>Sistem operare</h4>
                    <div>
                      <p>Denumire:</p>
                      <p>
                        {l.operationSystem}{" "}
                        {l.hasNoOS ? (
                          <a
                            target="_blank"
                            href="https://ialicenta.ro/"
                            rel="noreferrer"
                          >
                            <Image src={externalIcon} alt="external-link" />
                            Adauga
                          </a>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <div className="description-feature">
                    <h4>Altele</h4>
                    <div>
                      <p>Stare produs:</p>
                      <p>{l.others}</p>
                    </div>
                  </div>
                  <div className="description-feature">
                    <h4>Display</h4>
                    {l.display.aspectRatio ? (
                      <div>
                        <p>Aspect imagine:</p>
                        <p>{l.display.aspectRatio}</p>
                      </div>
                    ) : null}
                    <div>
                      <p>Diagonala display:</p>
                      <p>{l.display.diagonal}</p>
                    </div>
                    <div>
                      <p>Rezolutie:</p>
                      <p>{l.display.rezolution}</p>
                    </div>
                    <div>
                      <p>Tehnologie:</p>
                      <p>{l.display.technology}</p>
                    </div>
                  </div>
                  <div className="description-feature">
                    <h4>Placa video</h4>
                    {l.videoCard.busMemory ? (
                      <div>
                        <p>BUS memorie (biti):</p>
                        <p>{l.videoCard.busMemory}</p>
                      </div>
                    ) : null}
                    {l.videoCard.capacity ? (
                      <div>
                        <p>Capacitate memorie placa video (MB):</p>
                        <p>{l.videoCard.capacity}</p>
                      </div>
                    ) : null}
                    <div>
                      <p>Chipset:</p>
                      <p>{l.videoCard.chip}</p>
                    </div>
                    <div>
                      <p>Frecventa memorie (MHz):</p>
                      <p>{l.videoCard.memoryFrequency}</p>
                    </div>
                    {l.videoCard.supportDirectX ? (
                      <div>
                        <p>Suport DirectX:</p>
                        <p>{l.videoCard.supportDirectX}</p>
                      </div>
                    ) : null}
                    {l.videoCard.supportOpenGL ? (
                      <div>
                        <p>Suport OpenGL:</p>
                        <p>{l.videoCard.supportOpenGL}</p>
                      </div>
                    ) : null}
                    <div>
                      <p>Tip memorie video:</p>
                      <p>{l.videoCard.tip}</p>
                    </div>
                    {l.videoCard.slotType ? (
                      <div>
                        <p>Tip slot:</p>
                        <p>{l.videoCard.slotType}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="description-feature">
                    <h4>Porturi / Conexiuni</h4>
                    {l.ports.audio ? (
                      <div>
                        <p>Audio:</p>
                        <p>{l.ports.audio}</p>
                      </div>
                    ) : null}

                    {l.ports.firewire ? (
                      <div>
                        <p>Firewire:</p>
                        <p>{l.ports.firewire}</p>
                      </div>
                    ) : null}

                    {l.ports.network ? (
                      <div>
                        <p>Retea (RJ45):</p>
                        <p>{l.ports.network}</p>
                      </div>
                    ) : null}
                    {l.ports.usb_2 ? (
                      <div>
                        <p>USB 2.0:</p>
                        <p>{l.ports.usb_2}</p>
                      </div>
                    ) : null}
                    {l.ports.usb_3 ? (
                      <div>
                        <p>USB 3.0:</p>
                        <p>{l.ports.usb_3}</p>
                      </div>
                    ) : null}
                    {l.ports.wi_fi ? (
                      <div>
                        <p>Wi-Fi:</p>
                        <p>{l.ports.wi_fi}</p>
                      </div>
                    ) : null}
                    {l.ports.hdmi ? (
                      <div>
                        <p>HDMI:</p>
                        <p>{l.ports.hdmi}</p>
                      </div>
                    ) : null}
                    {l.ports.docking ? (
                      <div>
                        <p>Docking:</p>
                        <p>{l.ports.docking}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="container-fluid py-5 recommendations">
                <div className="text-center mb-4">
                  <h2 className="section-title px-5">
                    <span className="px-2">You May Also Like</span>
                  </h2>
                </div>
                <div className="row px-xl-5 justify-content-center">
                  {laptopsData
                    .filter((laptop) => laptop.category == l.category)
                    .filter((laptop) => laptop.price > l.price)
                    .map((l, idx) => (
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
          ))}
      </PhotoProvider>
    </div>
  );
};

export default RefurbishedLaptopDetails;
