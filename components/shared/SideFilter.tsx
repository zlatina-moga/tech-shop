import Link from "next/link";
import { useRouter } from "next/router";

const SideFilter = ({
  categories,
  breadcrumbs,
  brands,
  brandLink,
  processors,
  processorsLink,
}) => {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
      {categories && (
        <div
          className="sidebar-container"
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
                  <h4 className="py-2 mb-0 pl-4 bg-primary text-white">Tip</h4>
                  {categories.map((c, idx) => (
                    <li
                      className={`nav-item nav-link py-3 sidebar-link ${
                        router.pathname == c.link ? "active" : ""
                      }`}
                      key={idx}
                    >
                      <Link
                        href={c.link}
                        className={`sidebar-link ${
                          router.pathname == c.link ? "active" : ""
                        }`}
                      >
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
      )}
      {brands && (
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
                    Brand
                  </h4>
                  {brands.map((c, idx) => (
                    <li
                      className={`nav-item nav-link py-3 sidebar-link ${
                        router.pathname == `${brandLink}${c.slug}-${c.id}` ? "active" : ""
                      }`}
                      key={idx}
                    >
                      <Link
                        href={`${brandLink}${c.slug}-${c.id}`}
                        className={`sidebar-link ${
                          router.pathname == `${brandLink}${c.slug}-${c.id}` ? "active" : ""
                        }`}
                      >
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
                    <li
                      className="nav-item nav-link py-3 sidebar-link"
                      key={idx}
                    >
                      <Link
                        href={`${processorsLink}${c.slug}-${c.id}`}
                        className="sidebar-link"
                      >
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
      )}
    </div>
  );
};

export default SideFilter;
