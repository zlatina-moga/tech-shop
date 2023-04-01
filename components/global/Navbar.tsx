import { useRouter } from "next/router";
import { useSelector } from "react-redux";
//import { AuthContext } from "../../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  //const { user } = useContext(AuthContext);
  //@ts-ignore
  const quantity = useSelector((state) => state.cart.quantity);
  //@ts-ignore
  const user = useSelector((state) => state.user.currentUser);
  const router = useRouter();

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
      {user && (
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
                <Link
                  className="dropdown-item"
                  href={`/auth/profile/${user._id}`}
                >
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
      )}
    </>
  );

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
              <input
                type="text"
                name="searchItem"
                id="searchItem"
                className="form-control"
                placeholder="Caută produse"
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
          {user !== null ? userNav : guestNav}
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

export default Navbar;
