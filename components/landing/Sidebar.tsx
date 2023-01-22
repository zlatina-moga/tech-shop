import Image from "next/image";
import Link from "next/link";
import listIcon from "../../public/svg/list.svg";
import laptopIcon from "../../public/svg/laptop.svg";
import computerIcon from "../../public/svg/computer.svg";
import workstationIcons from "../../public/svg/workstations.svg";
import serverIcon from "../../public/svg/server.svg";
import monitorIcon from "../../public/svg/monitor.svg";
import appleIcon from "../../public/svg/apple.svg";
import componentIcon from "../../public/svg/component.svg";
import softwareIcon from '../../public/svg/software.svg';

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
            <div
              className="navbar-nav w-100 overflow-hidden"
              style={{
                height: 460,
              }}
            >
              <Link
                href="/laptops"
                className="nav-item nav-link py-3 sidebar-link"
              >
                <img
                  src={laptopIcon.src}
                  alt="list"
                  style={{ height: "18px" }}
                />
                Laptopuri
              </Link>
              <Link
                href="/computers"
                className="nav-item nav-link py-3 sidebar-link"
              >
                <img
                  src={computerIcon.src}
                  alt="list"
                  style={{ height: "18px" }}
                />
                Calculatoare
              </Link>
              <Link href="/workstations" className="nav-item nav-link py-3 sidebar-link">
                <img
                  src={workstationIcons.src}
                  alt="list"
                  style={{ height: "18px" }}
                />
                Statii Grafice
              </Link>
              <Link href="/servers" className="nav-item nav-link py-3 sidebar-link">
                <img
                  src={serverIcon.src}
                  alt="list"
                  style={{ height: "18px" }}
                />
                Servere
              </Link>
              <Link href="/monitors" className="nav-item nav-link py-3 sidebar-link">
                <img
                  src={monitorIcon.src}
                  alt="list"
                  style={{ height: "18px" }}
                />
                Monitoare
              </Link>
              <Link href="/apple" className="nav-item nav-link py-3 sidebar-link">
                <img
                  src={appleIcon.src}
                  alt="list"
                  style={{ height: "18px" }}
                />
                Apple Refurbished
              </Link>
              <Link href="/components" className="nav-item nav-link py-3 sidebar-link">
                <img
                  src={componentIcon.src}
                  alt="list"
                  style={{ height: "18px" }}
                />
                Componente
              </Link>
              <Link href="/components" className="nav-item nav-link py-3 sidebar-link" style={{borderBottom: 'none'}}>
                <img
                  src={softwareIcon.src}
                  alt="list"
                  style={{ height: "18px" }}
                />
                Software
              </Link>
            </div>
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
                <a href="" className="nav-item nav-link active">
                  Promotions
                </a>
                <a href="" className="nav-item nav-link">
                  High-end systems
                </a>
                <a href="" className="nav-item nav-link">
                  Gaming
                </a>
                <a href="" className="nav-item nav-link">
                  All-in-one
                </a>
                <a href="" className="nav-item nav-link">
                  Tablets
                </a>
                {/*<div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu rounded-0 m-0">
                    <a href="cart.html" className="dropdown-item">
                      Shopping Cart
                    </a>
                    <a href="checkout.html" className="dropdown-item">
                      Checkout
                    </a>
                  </div>
          </div>*/}
                <a href="" className="nav-item nav-link">
                  Contact
                </a>
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
                    borderRadius: '4px'
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
