import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="container-fluid bg-secondary text-dark pt-5 w-100" id="footer-container">
      <div className="row px-xl-5 pt-5" style={{maxWidth: '100rem', margin: '0 auto'}}>
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <Link href="/">
          <Image
              src="/images/logo-example.png"
              alt="logo"
              width={150}
              height={60}
            />
          </Link>
          <p className="mt-2">
            Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no
            sit erat lorem et magna ipsum dolore amet erat.
          </p>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary mr-3"></i>123
            Street, New York, USA
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary mr-3"></i>info@example.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
          </p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
              <div className="d-flex flex-column justify-content-start">
                <Link className="text-dark mb-2" href="/">
                  <i className="fa fa-angle-right mr-2"></i>Home
                </Link>
                <Link className="text-dark mb-2" href="">
                  <i className="fa fa-angle-right mr-2"></i>Our Shop
                </Link>
                <Link className="text-dark mb-2" href="">
                  <i className="fa fa-angle-right mr-2"></i>Shop Detail
                </Link>
                <Link className="text-dark mb-2" href="">
                  <i className="fa fa-angle-right mr-2"></i>Shopping Cart
                </Link>
                <Link className="text-dark mb-2" href="">
                  <i className="fa fa-angle-right mr-2"></i>Checkout
                </Link>
                <Link className="text-dark" href="">
                  <i className="fa fa-angle-right mr-2"></i>Contact Us
                </Link>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control border-0 py-4"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control border-0 py-4"
                    placeholder="Your Email"
                    required
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
            </div>
          </div>
        </div>
        <div className="row border-top border-light mx-xl-5 py-4" style={{maxWidth: '100rem', margin: '0 auto'}}>
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-left text-dark">
            &copy;{" "}
            <a className="text-dark font-weight-semi-bold" href="#">
              PC Bun
            </a>
            . All Rights Reserved. Website created by 
            <a
              className="text-dark font-weight-semi-bold"
              href="#"
            >
              {' '}Zlatina Moga
            </a>
          </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
          <Image className="img-fluid" src="/images/payments.png" alt="" width={300} height={300}/>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Footer;
