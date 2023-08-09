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
import printerIcon from "../../public/svg/printer.svg";
import posIcon from "../../public/svg/pos.svg";
import upsIcon from "../../public/svg/ups.svg";
import accIcon from "../../public/svg/accessory.svg";
import netIcon from "../../public/svg/network.svg";
import solarIcon from "../../public/svg/solar-panel.svg";
import discountIcon from "../../public/svg/discount.svg";

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
                <Link
                  href="/laptop"
                  className="nav-item nav-link py-3 sidebar-link"
                  data-target="/laptop"
                >
                  <img
                    src={laptopIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Laptopuri
                </Link>
            
                <Link
                  href="/calculatoare"
                  className="nav-item nav-link py-3 sidebar-link"
                  data-target="/calculatoare"
                >
                  <img
                    src={computerIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Calculatoare
                </Link>
              <Link
                href="/workstation"
                className="nav-item nav-link py-3 sidebar-link"
                data-target="/workstation"
              >
                <img
                  src={workstationIcons.src}
                  alt="list"
                  style={{ height: "18px" }}
                />
                Workstation
              </Link>
              
                <Link
                  href="/servere"
                  className="nav-item nav-link py-3 sidebar-link"
                  data-target="/servere"
                >
                  <img
                    src={serverIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Servere
                </Link>

              
                <Link
                  href="/monitoare"
                  className="nav-item nav-link py-3 sidebar-link"
                  data-target="/monitoare"
                >
                  <img
                    src={monitorIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  Monitoare
                </Link>

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
            </ul>
          </nav>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <div
              className="collapse navbar-collapse justify-content-between"
              style={{ borderRadius: "4px" }}
            >
              <div className="navbar-nav mr-auto py-0">
                <span
                  style={{ display: "flex", alignItems: "center" }}
                  className="icon-wrapper"
                >
                  <img
                    src={printerIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  <Link
                    href="/imprimante"
                    className="nav-item nav-link font-weight-medium px-1 mr-4"
                    style={{ fontSize: "16px" }}
                  >
                    Imprimante
                  </Link>
                </span>
                <span
                  style={{ display: "flex", alignItems: "center" }}
                  className="icon-wrapper"
                >
                  <img
                    src={posIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  <Link
                    href="/sisteme-pos"
                    className="nav-item nav-link font-weight-medium px-1 mr-4"
                    style={{ fontSize: "16px" }}
                  >
                    Sisteme POS
                  </Link>
                </span>
                <span
                  style={{ display: "flex", alignItems: "center" }}
                  className="icon-wrapper"
                >
                  <img
                    src={upsIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  <Link
                    href="/ups"
                    className="nav-item nav-link font-weight-medium px-1 mr-4"
                    style={{ fontSize: "16px" }}
                  >
                    UPS
                  </Link>
                </span>
                <span
                  style={{ display: "flex", alignItems: "center" }}
                  className="icon-wrapper"
                >
                  <img
                    src={accIcon.src}
                    alt="list"
                    style={{ height: "18px" }}
                  />
                  <Link
                    href="/accesorii"
                    className="nav-item nav-link font-weight-medium px-1 mr-4"
                    style={{ fontSize: "16px" }}
                  >
                    Accesorii
                  </Link>
                </span>
                <span
                  style={{ display: "flex", alignItems: "center" }}
                  className="icon-wrapper"
                >
                  <Link
                    href="/retelistica"
                    className="nav-item nav-link font-weight-medium px-1 mr-4"
                    style={{ fontSize: "16px" }}
                  >
                    <img
                      src={netIcon.src}
                      alt="list"
                      style={{ height: "18px" }}
                    />
                    Retelistica
                  </Link>
                </span>
                <span
                  style={{ display: "flex", alignItems: "center" }}
                  className="icon-wrapper"
                >
                  <Link
                    href="/sisteme-solare-fotovoltaice"
                    className="nav-item nav-link font-weight-medium px-1 mr-4"
                    style={{ fontSize: "16px" }}
                  >
                    <img
                      src={solarIcon.src}
                      alt="list"
                      style={{ height: "18px" }}
                    />
                    Sisteme solare fotovoltaice
                  </Link>
                </span>
              </div>
            </div>
          </nav>
          <div className="carousel slide" data-ride="carousel">
            <div className="carousel-item active landing-img-wrapper">
              <div>
                <Image
                  className="img-fluid"
                  src="/images/banner-1.jpeg"
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
