import { useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

const categories = [
  {
    name: "Laptopuri",
    link: "/laptop",
  },
  {
    name: "Calculatoare",
    link: "/calculatoare",
  },
  {
    name: "Workstation",
    link: "/workstation",
  },
  {
    name: "Servere",
    link: "/servere",
  },
  {
    name: "Monitoare",
    link: "/monitoare",
  },
  {
    name: "Componente",
    link: "/componente",
  },
  {
    name: "Software",
    link: "/licenta-software",
  },
  {
    name: "Imprimante",
    link: "/imprimante",
  },
  {
    name: "Sisteme POS",
    link: "/sisteme-pos",
  },
  {
    name: "UPS",
    link: "/ups",
  },
  {
    name: "Accesorii",
    link: "/accesorii",
  },
  {
    name: "Retelistica",
    link: "/retelistica",
  },
  {
    name: "Sisteme solare",
    link: "/sisteme-solare-fotovoltaice",
  },
];

const Navbar = () => {
  const { user } = useContext(AuthContext);
  { /*@ts-ignore */ }
  const quantity = useSelector((state) => state.cart.quantity);
  const ref = useRef();
  const router = useRouter();

  const onSearch = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let item = formData.get("searchItem");
    router.push(`/search/search=${item}`);
  };

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
          <form onSubmit={onSearch}>
            <div className="input-group">
              {/*<select
                className="form-select"
                style={{ maxWidth: "180px" }}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option selected>Categoriile</option>
                {categories.map((cat, idx) => (
                  <option className="dropdown-item" key={idx} value={cat.link}>
                    {cat.name}
                  </option>
                ))}
                </select>*/}
              <input
                type="text"
                name="searchItem"
                id="searchItem"
                ref={ref}
                className="form-control"
                placeholder="Cauta produse"
                style={{ borderRadius: "4px", textAlign: "left" }}
              />
              <div className="input-group-append">
                <button
                  className="input-group-text bg-transparent text-primary"
                  type="submit"
                  style={{
                    marginLeft: "5px",
                    borderRadius: "4px",
                    width: "40px",
                    boxShadow: "none",
                  }}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-6 text-right">
          {user.email ? userNav : guestNav}
          <Link
            href="/my-cart"
            className="btn border"
            style={{ borderRadius: "4px" }}
          >
            <i className="fas fa-shopping-cart text-primary mr-1"></i>
            <span className="badge" style={{ color: "black" }}>
              {quantity}
            </span>
            Coș
          </Link>
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
  </>
);

const userNav = (
  <>
    <span className="nav-item dropdown">
      <div
        className="btn border dropdown-toggle"
        style={{ marginRight: "5px", borderRadius: "4px" }}
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
  </>
);

export default Navbar;
