import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

interface ILaptopPage {
  title: string;
  laptopsData: any[];
  categories?: any[];
  breadcrumbs?: any[];
}

const LaptopsPage: React.FC<ILaptopPage> = ({
  title,
  laptopsData,
  categories,
  breadcrumbs,
}) => {
  return (
    <>
      <div
        className={classNames("container-fluid pt-5", "laptops-page")}
        style={{
          maxWidth: "100rem",
          display: "flex",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="row pr-5">
              <nav aria-label="breadcrumb " className="second ">
                <ol className="breadcrumb indigo lighten-6 first px-md-4">
                  {breadcrumbs && breadcrumbs.map((br, idx) => (
                    <li
                      className="breadcrumb-item align-items-center"
                      key={idx}
                    >
                      <Link className="black-text" href={br.link}>
                        <span className="mr-md-3 mr-2">{br.name}</span>
                      </Link>
                      <i className={br.linkIcon} aria-hidden="true"></i>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          {categories ? (
            <div
              className="container-fluid sidebar-container"
              style={{ display: "block", maxWidth: "280px" }}
            >
              <div className="row">
                <div className="d-none d-lg-block">
                  <nav
                    className="collapse show navbar-vertical navbar-light p-0"
                    id="navbar-vertical-2"
                    style={{
                      borderBottomLeftRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    <ul
                      className="navbar-nav overflow-hidden relative"
                      style={{
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                      }}
                    >
                      <h4 className="py-2 mb-0 pl-4 bg-primary text-white">
                        Calitate
                      </h4>
                      {categories.map((c, idx) => (
                        <li
                          className="nav-item nav-link py-3 sidebar-link"
                          key={idx}
                        >
                          <Link href={c.link} className="sidebar-link">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <nav
                    className="collapse show navbar navbar-vertical navbar-light align-items-start p-0"
                    id="navbar-vertical"
                    style={{
                      borderBottomLeftRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  ></nav>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="">
          <div className="text-center mb-4">
            <h1 className="px-5">{title}</h1>
          </div>
          <div
            className="row px-xl-5 pb-3 justify-content-center"
            style={{ maxWidth: "98rem" }}
          >
            {laptopsData.map((l, idx) => (
              <div
                className={classNames(
                  `pb-1`,
                  "laptop-card"
                )}
                key={idx}
                style={{ maxWidth: "320px" }}
              >
                <div
                  className={classNames(
                    "card product-item border border-gray rounded mb-4",
                    "inner-container"
                  )}
                  style={{ alignItems: "stretch", height: "550px" }}
                >
                  {/*<Link href={"/" + l.category + "/" + l.id}>*/}
                  <Link href={"/" + l.id}>
                    <div
                      className={classNames(
                        "card-header product-img position-relative overflow-hidden bg-transparent",
                        "img-wrapper"
                      )}
                    >
                      {/*<div className="discount-container">
                        <div>
                          <p>-20%</p>
                        </div>
                      </div>*/}

                      <img
                        className="img-fluid w-100"
                        src={l.imgLink ? l.imgLink : l.imgLink1}
                        alt=""
                        //style={{maxWidth: '200px'}}
                      />
                    </div>
                  </Link>
                  <div className="card-body text-center p-3 pt-4 relative">
                    <h6
                      className="mb-3"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "150px",
                      }}
                    >
                      {l.title}
                    </h6>
                    {l.oldPrice ? (
                      <div className="d-flex justify-content-center">
                        <h6 className="text-muted pb-2">
                          <del>
                            {l.oldPrice} {l.currency}
                          </del>
                        </h6>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="d-flex justify-content-center">
                      <h6 className="price">{l.price}</h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light">
                    <Link
                      href={"/" + l.id}
                      className="btn btn-sm text-dark p-0"
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LaptopsPage;
