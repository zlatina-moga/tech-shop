import Link from "next/link";
import { useRouter } from "next/router";
import RangeSlider from "react-bootstrap-range-slider";
import { useState } from "react";
import toast from "react-hot-toast";

const SideFilter = ({
  categories,
  breadcrumbs,
  brands,
  brandLink,
  processors,
  processorsLink,
  maxPrice,
  range,
}) => {
  const router = useRouter();
  const [value, setValue] = useState(1);

  const onPriceChange = (changeEvent) => {
    setValue(changeEvent.target.value);
  };

  const onPriceSet = () => {
    range(value);
    setTimeout(() => {
      toast.success("Resetarea prețului cu succes", {
        style: { marginTop: "100px" },
      });
    }, 2500);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "18rem",
        marginBottom: "30px",
      }}
    >
      <div className="row pr-5">
        <nav aria-label="breadcrumb " className="second ">
          <ol className="breadcrumb indigo lighten-6 first px-md-4">
            {breadcrumbs &&
              breadcrumbs.map((br, idx) => (
                <li className="breadcrumb-item align-items-center" key={idx}>
                  <Link className="black-text" href={br.link}>
                    <span className="mr-md-3 mr-2">{br.name}</span>
                  </Link>
                  <i className={br.linkIcon} aria-hidden="true"></i>
                </li>
              ))}
          </ol>
        </nav>
      </div>
      {maxPrice && (
        <div className="mb-5">
          <h5 className="">Preț</h5>
          <RangeSlider
            value={value}
            onChange={onPriceChange}
            onAfterChange={onPriceSet}
            min={1}
            max={maxPrice}
            tooltip="on"
          />
          <div className="d-flex justify-content-between">
            <span>1</span>
            <span>{maxPrice} Lei</span>
          </div>
        </div>
      )}

      <button
        className="btn btn-block btn-primary my-3 py-3 d-none"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Filtrați rezultatele
      </button>

      {categories && (
        <div
          className="sidebar-container"
          style={{ display: "block", maxWidth: "260px" }}
        >
          <div className="row">
            <div className="">
              <nav
                className="collapse show navbar-vertical navbar-light p-0"
                id="navbar-vertical-2"
                style={{
                  borderBottomLeftRadius: "4px",
                  borderBottomRightRadius: "4px",
                }}
              >
                <div
                  className="navbar-nav overflow-hidden relative"
                  style={{
                    borderRadius: "4px",
                  }}
                >
                  <h4 className="py-2 mb-0 pl-4 bg-primary text-white">Tip</h4>
                  {categories.map((c, idx) => (
                    <Link
                      href={c.link}
                      className={`sidebar-link nav-item nav-link py-3 ${
                        router.pathname == c.link ? "active" : ""
                      }`}
                      key={idx}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
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
      )}
      {brands && (
        <div
          className="sidebar-container mt-4"
          style={{ display: "block", maxWidth: "260px" }}
        >
          <div className="row">
            <div className="">
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
                    borderRadius: "4px",
                  }}
                >
                  <h4 className="py-2 mb-0 pl-4 bg-primary text-white">
                    Brand
                  </h4>
                  {brands.map((c, idx) => (
                    <Link
                      href={`${brandLink}${c.slug}-${c.id}`}
                      className={`nav-item nav-link py-3 sidebar-link ${
                        router.pathname == `${brandLink}${c.slug}-${c.id}`
                          ? "active"
                          : ""
                      }`}
                      key={idx}
                    >
                      {c.name}
                    </Link>
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
      )}
      {processors && (
        <div
          className="sidebar-container mt-4"
          style={{ display: "block", maxWidth: "260px" }}
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
                    borderRadius: "4px",
                  }}
                >
                  <h4 className="py-2 mb-0 pl-4 bg-primary text-white">
                    Procesor
                  </h4>
                  {processors.map((c, idx) => (
                    <Link
                      href={`${processorsLink}${c.slug}-${c.id}`}
                      className="nav-item nav-link py-3 sidebar-link"
                      key={idx}
                    >
                      {c.name}
                    </Link>
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
      )}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
