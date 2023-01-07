import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-100" id='nav-container'>
      <nav className="row align-items-center px-xl-5" style={{maxWidth: '100rem', margin: '0 auto'}}>
        <div className="col-lg-3 d-none d-lg-block">
          <Link href="/">
            <Image
              src="/images/logo-example.jpg"
              alt="logo"
              width={150}
              height={60}
            />
          </Link>
        </div>
        <div className="col-lg-6 col-6 text-left">
          <form action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products"
                style={{ borderRadius: "4px" }}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text bg-transparent text-primary"
                  style={{ marginLeft: "5px", borderRadius: "4px" }}
                >
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-6 text-right">
          <Link
            href="/login"
            className="btn border"
            style={{ marginRight: "5px", borderRadius: "4px" }}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="btn border"
            style={{ marginRight: "5px", borderRadius: "4px" }}
          >
            Register
          </Link>
          <Link
            href="/favorites"
            className="btn border"
            style={{ marginRight: "5px", borderRadius: "4px" }}
          >
            <i className="fas fa-heart text-primary"></i>
            <span className="badge"></span>
          </Link>
          <Link
            href="/my-cart"
            className="btn border"
            style={{ borderRadius: "4px" }}
          >
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="badge"></span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

<div className="navbar-nav ml-auto py-0"></div>;
