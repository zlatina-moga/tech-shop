import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-100" id="nav-container">
      <nav
        className="row align-items-center px-xl-5 collapse show navbar navbar-vertical"
        style={{ maxWidth: "100rem", margin: "0 auto" }}
      >
        <div className="col-lg-3 d-none d-lg-block container-fluid">
          <Link href="/">
            <Image
              src="/images/logo-example.png"
              alt="logo"
              width={150}
              height={60}
              style={{ borderRadius: "4px" }}
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
                style={{ borderRadius: "4px", textAlign: "left" }}
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
          {user.email ? userNav : guestNav}
        </div>
      </nav>
    </div>
  );
};

const guestNav = (
  <>
    <span className="nav-item dropdown">
      <div
        className="btn border dropdown-toggle"
        style={{ marginRight: "5px", borderRadius: "4px" }}
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-user text-primary mr-1"></i>
        <span className="badge"></span>
        Cont
        <ul
          className="dropdown-menu mt-4"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <li>
            <Link className="dropdown-item" href="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/register">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </span>
    <Link
      href="/my-cart"
      className="btn border"
      style={{ borderRadius: "4px" }}
    >
      <i className="fas fa-shopping-cart text-primary mr-1"></i>
      <span className="badge"></span>Coș
    </Link>
  </>
);

const userNav = (
  <>
    <span className="nav-item dropdown">
      <div
        className="btn border dropdown-toggle"
        style={{ marginRight: "5px", borderRadius: "4px" }}
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-user text-primary mr-1"></i>
        <span className="badge"></span>
        Cont
        <ul
          className="dropdown-menu mt-4"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <li>
            <Link className="dropdown-item" href="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </span>

    <Link
      href="/my-cart"
      className="btn border"
      style={{ borderRadius: "4px" }}
    >
      <i className="fas fa-shopping-cart text-primary mr-1"></i>
      <span className="badge"></span>Cart
    </Link>
  </>
);

export default Navbar;
