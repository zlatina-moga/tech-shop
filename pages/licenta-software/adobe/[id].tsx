import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import { licenseData } from "../../../data/licenseData";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Meta from "../../../components/layouts/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import payImg from "../../../public/images/stripe.png";

const AdobeDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return (
    <>
      <Navbar />
      <div className="page-details">
        <PhotoProvider>
          {licenseData
            .filter((el) => el.item == id)
            .map((item, idx) => (
              <div key={idx}>
                <Meta title={item.title} keywords={item.title} />
                <div className="container-fluid py-5">
                  <h1 style={{ textAlign: "center", paddingBottom: "30px" }}>
                    {item.title}
                  </h1>
                  <div className="row px-xl-5" style={{alignItems: 'center'}}>
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
                        <div
                          className="price-container"
                          style={{ marginTop: "0" }}
                        >
                          <h3 className="mb-3 price">{item.price} + TVA</h3>

                          <button className="btn btn-primary add-to-cart">
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
                </div>
              </div>
            ))}
        </PhotoProvider>
      </div>
    </>
  );
};

export default AdobeDetails;
