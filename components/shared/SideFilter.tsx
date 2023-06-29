import Link from "next/link";
import { useRouter } from "next/router";
import RangeSlider from "react-bootstrap-range-slider";
import { useState } from "react";
import toast from "react-hot-toast";

const SideFilter = ({
  categories,
  breadcrumbs,
  brands,
  processors,
  maxPrice,
  range,
  processorsGeneration,
  categories2,
  screens,
  secTitle,
  selectCategory,
  selectBrand,
  selectScreen,
  selectProcessor,
  selectGeneration,
  countShow,
  videoCards,
  selectVideo,
  processorsFrequency,
  selectFrequency,
  resetClicked
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
        maxWidth: "15rem",
        marginBottom: "30px",
        width: "20%",
      }}
      id="sidebar-wrapper"
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
        className="btn btn-block py-3 my-4"
        style={{ 
          border: "1px solid #619F42",
          color: '#619F42',
          borderRadius: '4px'
       }}
       onClick={() => resetClicked(true)}
      >
        Resetați filtrele
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
                  <h5 className="py-2 mb-0 pl-4 bg-primary text-white">Tip</h5>
                  {categories.map((c, idx) => (
                    <button
                      onClick={() => selectCategory(c.slug)}
                      className={`nav-item nav-link py-3 sidebar-link  d-flex justify-content-between ${
                        router.asPath.includes(c.slug) ? "active" : ""
                      }`}
                      key={idx}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #EDF1FF",
                        fontSize: "14px",
                      }}
                    >
                      {router.asPath.includes(c.slug) ? (
                        <i
                          className="fas fa-check"
                          style={{
                            color: "#57A046",
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
                      {c.name}
                      {countShow && (
                        <span className="inner-count">({c.count})</span>
                      )}
                    </button>
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
      {categories2 && (
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
                  <h5 className="py-2 mb-0 pl-4 bg-primary text-white">Tip</h5>
                  {categories2.map((c, idx) => (
                    <button
                      onClick={() => selectCategory(c.slug)}
                      className={`nav-item nav-link py-3 sidebar-link  d-flex justify-content-between ${
                        router.asPath.includes(c.slug) ? "active" : ""
                      }`}
                      key={idx}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #EDF1FF",
                        fontSize: "14px",
                      }}
                    >
                      {router.asPath.includes(c.slug) ? (
                        <i
                          className="fas fa-check"
                          style={{
                            color: "#57A046",
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
                      {c.name}
                      {countShow && (
                        <span className="inner-count">({c.count})</span>
                      )}
                    </button>
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
                  <h5 className="py-2 mb-0 pl-4 bg-primary text-white">
                    Brand
                  </h5>
                  {brands.map((c) => (
                    <button
                      className={`nav-item nav-link py-3 sidebar-link  d-flex justify-content-between ${
                        router.asPath.includes(c.slug) ? "active" : ""
                      }`}
                      key={c.id}
                      onClick={() => selectBrand(c.slug)}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #EDF1FF",
                        fontSize: "14px",
                      }}
                    >
                      {router.asPath.includes(c.slug) ? (
                        <i
                          className="fas fa-check"
                          style={{
                            color: "#57A046",
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
                      {c.name}
                      <span className="inner-count">({c.count})</span>
                    </button>
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
                  <h5 className="py-2 mb-0 pl-4 bg-primary text-white">
                    {secTitle ? secTitle : "Procesor"}
                  </h5>
                  {processors.map((c, idx) => (
                    <button
                      onClick={() => selectProcessor(c.slug)}
                      className={`nav-item nav-link py-3 sidebar-link  d-flex justify-content-between ${
                        router.asPath.includes(c.slug) ? "active" : ""
                      }`}
                      key={idx}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #EDF1FF",
                        fontSize: "14px",
                      }}
                    >
                      {router.asPath.includes(c.slug) ? (
                        <i
                          className="fas fa-check"
                          style={{
                            color: "#57A046",
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
                      {c.name}
                      {countShow && (
                        <span className="inner-count">({c.count})</span>
                      )}
                    </button>
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
      {processorsGeneration && (
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
                  <h5 className="py-2 mb-0 pl-3 bg-primary text-white">
                    Generatie Procesor
                  </h5>
                  {processorsGeneration.map((c, idx) => (
                    <button
                      onClick={() => selectGeneration(c.slug)}
                      className={`nav-item nav-link py-3 sidebar-link  d-flex justify-content-between ${
                        router.asPath.includes(c.slug) ? "active" : ""
                      }`}
                      key={idx}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #EDF1FF",
                        fontSize: "14px",
                      }}
                    >
                      {router.asPath.includes(c.slug) ? (
                        <i
                          className="fas fa-check"
                          style={{
                            color: "#57A046",
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
                      {c.name}
                      {countShow && (
                        <span className="inner-count">({c.count})</span>
                      )}
                    </button>
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
      {processorsFrequency && (
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
                  <h5 className="py-2 mb-0 pl-3 bg-primary text-white">
                    Frecventa procesor
                  </h5>
                  {processorsFrequency.map((c, idx) => (
                    <button
                      onClick={() => selectFrequency(c.slug)}
                      className={`nav-item nav-link py-3 sidebar-link  d-flex justify-content-between ${
                        router.asPath.includes(c.slug) ? "active" : ""
                      }`}
                      key={idx}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #EDF1FF",
                        fontSize: "14px",
                      }}
                    >
                      {router.asPath.includes(c.slug) ? (
                        <i
                          className="fas fa-check"
                          style={{
                            color: "#57A046",
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
                      {c.name}
                      {countShow && (
                        <span className="inner-count">({c.count})</span>
                      )}
                    </button>
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
      {screens && (
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
                  <h5 className="py-2 mb-0 pl-3 bg-primary text-white">
                    Diagonala
                  </h5>
                  {screens.map((c, idx) => (
                    <button
                      onClick={() => selectScreen(c.slug)}
                      className={`nav-item nav-link py-3 sidebar-link  d-flex justify-content-between ${
                        router.asPath.includes(c.slug) ? "active" : ""
                      }`}
                      key={idx}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #EDF1FF",
                      }}
                    >
                      {router.asPath.includes(c.slug) ? (
                        <i
                          className="fas fa-check"
                          style={{
                            color: "#57A046",
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
                      {c.name}
                      {countShow && (
                        <span className="inner-count">({c.count})</span>
                      )}
                    </button>
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
      {videoCards && (
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
                  <h5 className="py-2 mb-0 pl-3 bg-primary text-white">
                    Model Placa Video
                  </h5>
                  {videoCards.map((c, idx) => (
                    <button
                      onClick={() => selectVideo(c.slug)}
                      className={`nav-item nav-link py-3 sidebar-link  d-flex justify-content-between ${
                        router.asPath.includes(c.slug) ? "active" : ""
                      }`}
                      key={idx}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #EDF1FF",
                        fontSize: "14px",
                      }}
                    >
                      {router.asPath.includes(c.slug) ? (
                        <i
                          className="fas fa-check"
                          style={{
                            color: "#57A046",
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
                      {c.name}
                      {countShow && (
                        <span className="inner-count">({c.count})</span>
                      )}
                    </button>
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
    </div>
  );
};

export default SideFilter;
