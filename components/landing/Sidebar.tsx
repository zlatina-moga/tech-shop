import Image from "next/image";
import Link from "next/link";
import listIcon from "../../public/svg/list.svg";
import laptopIcon from "../../public/svg/laptop.svg";
import computerIcon from "../../public/svg/computer.svg";
import workstationIcons from "../../public/svg/workstations.svg";
import serverIcon from "../../public/svg/server.svg";
import monitorIcon from "../../public/svg/monitor.svg";
import componentIcon from "../../public/svg/component.svg";
import softwareIcon from "../../public/svg/software.svg";

const Sidebar = () => {
  return (
    <div className="container-fluid mb-5 sidebar-container">
      <div className="row px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <div
            className="btn d-flex align-items-center bg-primary text-white w-100"
            data-toggle="collapse"
            style={{
              height: 65,
              marginTop: -1,
              paddingBottom: 30,
              paddingTop: 30,
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          >
            <Image src={listIcon} alt="list" style={{ height: "15px" }} />
            <h6 className="m-0 ml-2">Catalog Produse</h6>
          </div>
          <nav
            className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0"
            id="navbar-vertical"
            style={{
              borderBottomLeftRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
          >
            <ul
              className="navbar-nav w-100 overflow-hidden relative"
              style={{
                height: 410,
              }}
            >
              <li className="nav-item nav-link py-3 sidebar-link dropdown dropdown-toggle">
                <Link
                  href="/laptop"
                  className="sidebar-link"
                  data-target="/laptop"
                >
                  <img
                    src={laptopIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Laptopuri
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/laptop/refurbished-1"
                      data-target="/laptop/refurbished-1"
                    >
                      <img
                        src={laptopIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Refurbished
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/laptop/noi-1"
                      data-target="/laptop/noi-1"
                    >
                      <img
                        src={laptopIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      New
                    </Link>
                  </li>
                  <li className="dropdown-submenu">
                    <Link
                      className="dropdown-item"
                      href="/laptop/second-hand-1"
                      data-target="/laptop/second-hand-1"
                    >
                      <img
                        src={laptopIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Second Hand
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item nav-link py-3 sidebar-link  dropdown dropdown-toggle">
                <Link
                  href="/calculatoare"
                  className="sidebar-link"
                  data-target="/calculatoare"
                >
                  <img
                    src={computerIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Calculatoare
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/calculatoare/refurbished"
                      data-target="/calculatoare/refurbished"
                    >
                      <img
                        src={computerIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Refurbished
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/calculatoare/noi"
                      data-target="/calculatoare/noi"
                    >
                      <img
                        src={computerIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      New
                    </Link>
                  </li>
                  <li className="dropdown-submenu">
                    <Link
                      className="dropdown-item"
                      href="/calculatoare/second-hand"
                      data-target="/calculatoare/second-hand"
                    >
                      <img
                        src={computerIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Second Hand
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item nav-link py-3 sidebar-link dropdown dropdown-toggle">
                <Link
                  href="/workstation"
                  className="sidebar-link"
                  data-target="/workstation"
                >
                  <img
                    src={workstationIcons.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Workstations
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/workstation/refurbished-3"
                      data-target="/workstation/refurbished-3"
                      passHref
                    >
                      <img
                        src={workstationIcons.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Refurbished
                    </Link>
                  </li>
                  <li className="dropdown-submenu">
                    <Link
                      className="dropdown-item"
                      href="/workstation/second-hand-3"
                      passHref
                      data-target="/workstation/second-hand-3"
                    >
                      <img
                        src={workstationIcons.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Second Hand
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item nav-link py-3 sidebar-link dropdown dropdown-toggle">
                <Link
                  href="/servere"
                  className="sidebar-link"
                  data-target="/servere"
                >
                  <img
                    src={serverIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Servere
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/servere/refurbished-2"
                      passHref
                      data-target="/servere/refurbished-2"
                    >
                      <img
                        src={serverIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Refurbished
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/servere/noi-6"
                      passHref
                      data-target="/servere/noi-6"
                    >
                      <img
                        src={serverIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      New
                    </Link>
                  </li>
                  <li className="dropdown-submenu">
                    <Link
                      className="dropdown-item"
                      href="/servere/second-hand-2"
                      passHref
                      data-target="/servere/second-hand-2"
                    >
                      <img
                        src={serverIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Second Hand
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item nav-link py-3 sidebar-link dropdown dropdown-toggle">
                <Link
                  href="/monitoare"
                  className="sidebar-link"
                  data-target="/monitoare"
                >
                  <img
                    src={monitorIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Monitoare
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/monitoare/refurbished-4"
                      passHref
                      data-target="/monitoare/refurbished-4"
                    >
                      <img
                        src={monitorIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Refurbished
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/monitoare/noi-4"
                      passHref
                      data-target="/monitoare/noi-4"
                    >
                      <img
                        src={monitorIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      New
                    </Link>
                  </li>
                  <li className="dropdown-submenu">
                    <Link
                      className="dropdown-item"
                      href="/monitoare/second-hand-4"
                      passHref
                      data-target="/monitoare/second-hand-4"
                    >
                      <img
                        src={monitorIcon.src}
                        alt="list"
                        style={{ height: "18px", marginRight: "10px" }}
                      />
                      Second Hand
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href="/componente"
                  className="nav-item nav-link py-3 sidebar-link"
                >
                  <img
                    src={componentIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Componente
                </Link>
              </li>
              <li>
                <Link
                  href="/licenta-software"
                  className="nav-item nav-link py-3 sidebar-link"
                  style={{ borderBottom: "none" }}
                >
                  <img
                    src={softwareIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Software
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <a href="" className="text-decoration-none d-block d-lg-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  PC
                </span>
                BUN
              </h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              style={{ borderRadius: "4px" }}
            >
              <div className="navbar-nav mr-auto py-0">
                <Link href="/imprimante" className="nav-item nav-link">
                  Imprimante
                </Link>
                <Link href="/sisteme-pos" className="nav-item nav-link">
                  Sisteme POS
                </Link>
                <Link href="/ups" className="nav-item nav-link">
                  UPS
                </Link>
                <Link href="/accesorii" className="nav-item nav-link">
                  Accesorii
                </Link>
                <Link href="/retelistica" className="nav-item nav-link">
                  Retelistica
                </Link>
                <Link
                  href="/sisteme-solare-fotovoltaice"
                  className="nav-item nav-link"
                >
                  Sisteme solare fotovoltaice
                </Link>
              </div>
            </div>
          </nav>
          <div className="carousel slide" data-ride="carousel">
            <div className="carousel-item active" style={{ height: 410 }}>
              <div>
                <Image
                  className="img-fluid"
                  src="/images/banner-11.jpg"
                  alt=""
                  layout="fill"
                  objectFit="contain"
                  style={{
                    objectFit: "contain",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
