import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = () => {
  //@ts-ignore
  const quantity = useSelector((state) => state.cart.quantity);
  //@ts-ignore
  const user = useSelector((state) => state.user.currentUser);
  const router = useRouter();
  let [buttonState, setButtonState] = useState<boolean>(true);
  const isTablet = useMediaQuery("(max-width:769px)");

  const onSearch = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let item = formData.get("searchItem");
    router.push(`/search/search=${item}`);
  };

  const guestNav = (
    <>
      <span className="nav-item dropdown">
        <div
          className="btn border dropdown-toggle d-none d-lg-inline-block"
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
                Autentificare
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/register">
                Inregistrare
              </Link>
            </li>
          </ul>
        </div>
      </span>
    </>
  );

  const userNav = (
    <>
      {user && (
        <span className="nav-item dropdown">
          <div
            className="btn border dropdown-toggle d-none d-lg-inline-block"
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
                <Link
                  className="dropdown-item"
                  href={`/auth/profile/${user._id}`}
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/logout">
                  Deconectare
                </Link>
              </li>
            </ul>
          </div>
        </span>
      )}
    </>
  );

  return (
    <div className="w-100" id="nav-container">
      <nav
        className="row align-items-center px-xl-5 collapse show navbar navbar-vertical"
        style={{ maxWidth: "100rem", margin: "0 auto" }}
      >
        <div className="col-3 container-fluid">
          <Link href="/">
            {isTablet ? (
              <img src="/images/pcbun_icon.png" alt="logo" />
            ) : (
              <img src="/images/logo-example.png" alt="logo" />
            )}
          </Link>
        </div>
        <div className="col-6 text-left">
          <form onSubmit={onSearch}>
            <div className="input-group">
              <input
                type="text"
                name="searchItem"
                id="searchItem"
                className="form-control rounded-1 "
                placeholder="Caută"
                style={{ textAlign: "left" }}
                onChange={() => setButtonState(false)}
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
                  disabled={buttonState}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-3 text-right d-none d-lg-inline-block">
          {user !== null ? userNav : guestNav}
          <Link
            href="/my-cart"
            className="btn border "
            style={{ borderRadius: "4px" }}
          >
            <i className="fas fa-shopping-cart text-primary mr-1"></i>
            <span className="badge" style={{ color: "black" }}>
              {quantity}
            </span>
            Coș
          </Link>
        </div>
        <div className="col-3 text-right navbar-expand-lg bg-light navbar-light d-inline-block d-lg-none" >
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{width: '25px', height: '25px'}}></span>
          </button>
        </div>
      </nav>
      <div className="collapse" id="navbarCollapse" style={{overflowY: 'scroll', maxHeight: '350px'}}>
        <Link href="/my-cart" className="nav-item nav-link text-left">
          <i className="fas fa-shopping-cart text-primary mr-1"></i>
          <span className="badge" style={{ color: "black" }}>
            {quantity}
          </span>
          Coș
        </Link>
        {user ? (
          <Link
            className="nav-item nav-link text-left"
            href={`/auth/profile/${user._id}`}
          >
            <i className="fas fa-user text-primary mr-1"></i>
            Profil
          </Link>
        ) : (
          <Link className="nav-item nav-link text-left" href="/login">
            <i className="fas fa-user text-primary mr-2"></i>
            Autentificare
          </Link>
        )}
        <Link href="/laptop" className="nav-item nav-link text-left">
          Laptopuri
        </Link>
        <Link href="/calculatoare" className="nav-item nav-link text-left">
          Calculatoare
        </Link>
        <Link href="/workstation" className="nav-item nav-link text-left">
          Workstations
        </Link>
        <Link href="/servere" className="nav-item nav-link text-left">
          Servere
        </Link>
        <Link href="/monitoare" className="nav-item nav-link text-left">
          Monitoare
        </Link>
        <Link href="/componente" className="nav-item nav-link text-left">
          Componente
        </Link>
        <Link href="/licenta-software" className="nav-item nav-link text-left">
          Software
        </Link>
        <Link href="/imprimante" className="nav-item nav-link text-left">
          Imprimante
        </Link>
        <Link href="/sisteme-pos" className="nav-item nav-link text-left">
          Sisteme POS
        </Link>
        <Link href="/ups" className="nav-item nav-link text-left">
          UPS
        </Link>
        <Link href="/accesorii" className="nav-item nav-link text-left">
          Accesorii
        </Link>
        <Link href="/retelistica" className="nav-item nav-link text-left">
          Retelistica
        </Link>
        <Link
          href="/sisteme-solare-fotovoltaice"
          className="nav-item nav-link text-left"
        >
          Sisteme solare fotovoltaice
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
