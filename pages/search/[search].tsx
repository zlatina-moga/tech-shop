import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import * as productService from "../../services/productService";
import Navbar from "../../components/global/Navbar";
import MainSkeleton from "../../components/shared/MainSkeleton";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";
import Footer from "../../components/global/Footer";

const ProcDetail = () => {
  const router = useRouter();
  const { search } = router.query;
  const [itemData, setItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  let searchStr = "";
  if (search != undefined) {
    let searchToStr = search as string;
    searchStr = searchToStr.split("=")[1];
  }

  useEffect(() => {
    productService
      .getSearchedItems(search)
      .then((result) => {
        setLoading(false);
        setItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  const notFound = itemData.find((element) => element.is_error);

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

  const NotFoundPage = () => {
    return (
      <div
        className={classNames("container-fluid pt-10", "laptops-page")}
        style={{
          maxWidth: "80rem",
          display: "flex",
          marginBottom: "5rem",
        }}
      >
        <section className="nf-img-section "></section>
        <section className="nf-form-section w-xl-50 ml-4 mt-2">
          <Image
            src="/images/logo-example.png"
            alt="logo"
            width={150}
            height={60}
            className="rounded-1"
          />
          <h3 className="mb-4 mt-4 price font-weight-bold ">
            ADUCEM ORICE DE PE PLANETA
          </h3>
          <p>
            Orice produs din lume poate fi la dispoziția ta. Tot ce trebuie să
            faci este să ți-l dorești și să ne scrii. Trimite formularul si de
            restul ne ocupam noi.
          </p>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="form-control text-left w-100 border-primary rounded-1"
              name="cf-name"
              placeholder="Nume"
            />
            <input
              type="email"
              className="form-control text-left w-100 border-primary rounded-1"
              name="cf-email"
              placeholder="Adresa email"
            />
            <input
              type="tel"
              className="form-control text-left w-100 border-primary rounded-1"
              name="cf-phone"
              placeholder="Numar telefon"
            />
            <textarea
              className="form-control border-primary w-100 rounded-1"
              name="cf-message"
              placeholder="Produse dorite"
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
        </section>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <main>
          {notFound ? (
            <NotFoundPage />
          ) : (
            <div
              className={classNames("container-fluid pt-5", "laptops-page")}
              style={{
                maxWidth: "80rem",
                display: "flex",
              }}
            >
              <div>
                <div className="text-center mb-4">
                  <h1 className="px-5">
                    Rezultatele cautarii pentru: {searchStr}
                  </h1>
                </div>
                <div
                  className="row pb-3 justify-content-center"
                  style={{ maxWidth: "98rem" }}
                >
                  {itemData.map((l, idx) => (
                    <div
                      className={classNames(`pb-1`, "laptop-card")}
                      key={idx}
                      style={{ maxWidth: "270px" }}
                    >
                      <div
                        className={classNames(
                          "card product-item border border-gray rounded mb-4",
                          "inner-container"
                        )}
                        style={{
                          alignItems: "stretch",
                          height: "450px",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          className={classNames(
                            "card-header product-img position-relative overflow-hidden bg-transparent",
                            "img-wrapper"
                          )}
                          onClick={() =>
                            router.push(`/${l.permalink}`, undefined, {
                              shallow: true,
                            })
                          }
                        >
                          <img
                            className="img-fluid w-100"
                            src={l.featured_image.src}
                            alt=""
                            //style={{maxWidth: '200px'}}
                          />
                        </div>

                        <div className="card-body text-center p-3 pt-4 relative">
                          <h6
                            className="mb-3"
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxHeight: "95px",
                            }}
                          >
                            {l.name}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <Toaster position="top-right" />
        </main>
      )}
      <Footer />
    </>
  );
};

export default ProcDetail;
