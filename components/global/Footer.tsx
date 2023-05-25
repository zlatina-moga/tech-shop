import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import topIcon from "../../public/svg/top.svg";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";

const Footer = () => {
  const router = useRouter();

  function getToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("cf-name");
    const email = formData.get("cf-email");

    sendItemRequest(process.env.TEMPLATE_ID, {
      message: `${name} just subscribed to PC Bun newsletter`,
      email: email,
      from_name: name,
      reply_to: email,
    });
  };

  const sendItemRequest = (templateId, variables) => {
    emailjs
      .send(process.env.SERVICE_ID, templateId, variables, process.env.USER_ID)
      .then(() => {
        toast.success("Mulțumim! V-ați abonat cu succes", {
          style: { marginTop: "100px" },
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      });
  };

  return (
    <div
      className="container-fluid bg-secondary text-dark pt-5 w-100"
      id="footer-container"
    >
      <div
        className="row px-xl-5 pt-5"
        style={{ maxWidth: "100rem", margin: "0 auto", position: "relative" }}
      >
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-5 pr-xl-5">
            <Link href="/">
              <Image
                src="/images/logo-example.png"
                className="rounded-1"
                alt="logo"
                width={150}
                height={60}
              />
            </Link>
            <p className="mb-2 mt-4">
              <i className="fa fa-map-marker-alt text-primary mr-3"></i>Str.
              Galaxiei nr.29, Sanpetru, Brașov
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3"></i>salut@pcbun.ro
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt text-primary mr-3"></i>+40 (721) 909
              049
            </p>
            <b className="mb-2">Exclusive Key Licenses SRL</b>
            <p className="mb-2">CUI 46848581</p>
            <p className="mb-2">RO70BTRLRONCRT0659572401</p>
            <Image
              className="img-fluid"
              src="/images/payu.gif"
              alt=""
              width={300}
              height={300}
            />
          </div>
          <div
            className="col-lg-8 col-md-12 main-container"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="mb-5">
              <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
              <div className="d-flex flex-column justify-content-start">
                <Link className="mb-2 footer-link" href="/laptop">
                  <i className="fa fa-angle-right mr-2"></i>Laptopuri
                </Link>
                <Link className="footer-link mb-2 " href="/calculatoare">
                  <i className="fa fa-angle-right mr-2"></i>Calculatoare
                </Link>
                <Link className="footer-link mb-2" href="/servere">
                  <i className="fa fa-angle-right mr-2"></i>Servere
                </Link>
                <Link className="footer-link mb-2" href="/workstation">
                  <i className="fa fa-angle-right mr-2"></i>Workstation
                </Link>
                <Link className="footer-link mb-2" href="/licenta-software">
                  <i className="fa fa-angle-right mr-2"></i>Software
                </Link>
                <Link className=" footer-link mb-2" href="/my-cart">
                  <i className="fa fa-angle-right mr-2"></i>Coș de cumpărături
                </Link>
              </div>
            </div>
            <div className="col-md-4 mb-5 mt-5">
              <div className="d-flex flex-column justify-content-start">
                <Link className="mb-2 footer-link" href="/politica-cookie">
                  <i className="fa fa-angle-right mr-2"></i>Politica cookie
                </Link>
                <Link
                  className="footer-link mb-2 "
                  href="/politica-confidentialitate"
                >
                  <i className="fa fa-angle-right mr-2"></i>Politica de
                  confidentialitate
                </Link>
                <Link className="footer-link mb-2" href="/termeni">
                  <i className="fa fa-angle-right mr-2"></i>Termeni si conditii
                </Link>
                <Link className="footer-link mb-2" href="/prelucrarea-datelor">
                  <i className="fa fa-angle-right mr-2"></i>Prelucrarea datelor
                </Link>
                <Link className=" footer-link mb-2" href="/cum-cumpar">
                  <i className="fa fa-angle-right mr-2"></i>Cum cumpar?
                </Link>
                <Link className=" footer-link mb-2" href="/transport">
                  <i className="fa fa-angle-right mr-2"></i>Transport și retur
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <h5 className="font-weight-bold text-dark">Newsletter</h5>
              <form onSubmit={onSubmit} style={{ paddingTop: "0px" }}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control border border-primary py-4 rounded-1"
                    name="cf-name"
                    placeholder="Nume"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control border border-primary py-4 rounded-1"
                    name="cf-email"
                    placeholder="Adresa email"
                  />
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-block border-0 py-3"
                    type="submit"
                  >
                    Subscribe Now
                  </button>
                </div>
              </form>
              <div className="d-flex flex-column align-items-center">
                {" "}
                <Image
                  className="img-fluid mb-2"
                  src="/images/anpc.jpg"
                  alt=""
                  width={100}
                  height={25}
                />
                <Image
                  className="img-fluid"
                  src="/images/anpc-2.jpg"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="row border-top border-light py-4"
          style={{ maxWidth: "100rem", margin: "0 auto" }}
        >
          <div className="col-md-6 px-xl-0">
            <p className="mb-md-0 text-center text-md-left text-dark">
              &copy;{" "}
              <a className="text-dark font-weight-semi-bold" href="#">
                PC Bun{" "}
              </a>
              <a
                className="text-dark font-weight-semi-bold"
                href="https://www.linkedin.com/in/zlatina-moga-7094871a9/"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline" }}
              >
                Website
              </a>
            </p>
          </div>
        </div>
        <button
          style={{
            borderRadius: "50%",
            backgroundColor: "#F1C705",
            height: 50,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: 30,
            top: -70,
          }}
          onClick={() => getToTop()}
        >
          <Image src={topIcon} alt="" height={30} width={30} />
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Footer;
