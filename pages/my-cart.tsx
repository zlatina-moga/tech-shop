import { useSelector } from "react-redux";
import Link from "next/link";
import Navbar from "../components/global/Navbar";
import CartItem from "../components/shared/CartItem";
import Footer from "../components/global/Footer";
import useMediaQuery from "@mui/material/useMediaQuery";
import ResponsiveCart from "../components/shared/ResponsiveCartItem";
import * as ga from "../lib/gtag";

const MyCard = () => {
  //@ts-ignore
  const cart = useSelector((state) => state.cart);
  const isTablet = useMediaQuery("(max-width:500px)");

  let gaItems = cart.products.map((p) => ({
    item_id:( p.itemData[0] ? p.itemData[0] : p.itemData[0].id),
    item_name: (p.itemData[3] ? p.itemData[3] : p.itemData[0].title),
  }));

  const handleEvent = () => {
    ga.event({
      action: "begin_checkout",
      params: {
        currency: "RON",
        value: cart.total.toFixed(2),
        items: gaItems,
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-secondary mb-3 my-cart">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "250px" }}
        >
          <h1
            className="font-weight-semi-bold text-uppercase text-primary"
            style={{ marginTop: "100px" }}
          >
            Coșul meu
          </h1>
        </div>
      </div>
      <div
        className="container-fluid pt-5"
        style={{ maxWidth: "80rem", margin: "0 auto" }}
        id="shopping-cart"
      >
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            {isTablet ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {cart.products.map((p) => (
                  <ResponsiveCart
                    key={p.itemData[0] ? p.itemData[0] : p.itemData[0].id}
                    id={
                      p.itemData[8]
                        ? p.itemData[8].replace("citgrup", "fancy-selkie-5f6e47.netlify.app")
                        : "https://fancy-selkie-5f6e47.netlify.app" + p.itemData[0].id
                    }
                    imgLink={
                      p.itemData[16]
                        ? p.itemData[16][0].src
                        : p.itemData[0].img1
                    }
                    img1={""}
                    title={p.itemData[3] ? p.itemData[3] : p.itemData[0].title}
                    priceNum={
                      p.itemData[35] ? p.itemData[35] : p.itemData[0].priceNum
                    }
                    warranty={p.warranty}
                    profile={false}
                  />
                ))}
              </div>
            ) : (
              <table className="table table-bordered text-center mb-0">
                <thead className="bg-secondary text-dark">
                  <tr>
                    <th>Produse</th>
                    <th>Preț</th>
                    <th>Garanție</th>
                    <th>Cantitate</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {cart.products.map((p) => (
                    <CartItem
                      key={p.itemData[0] ? p.itemData[0] : p.itemData[0].id}
                      id={p.itemData[8] ? p.itemData[8].replace("citgrup", "fancy-selkie-5f6e47.netlify.app") : "https://fancy-selkie-5f6e47.netlify.app" + p.itemData[0].id }
                      imgLink={p.itemData[16] ? p.itemData[16][0].src : p.itemData[0].img1}
                      img1={""}
                      title={p.itemData[3] ? p.itemData[3] : p.itemData[0].title}
                      priceNum={p.itemData[35] ? p.itemData[35] : p.itemData[0].priceNum }
                      warranty={p.warranty}
                      profile={false}
                      createdAt
                      orderNum
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-lg-4">
            <form className="mb-3" action="" style={{ marginTop: "-20px" }}>
              <div className="input-group " id="bonus-points-container">
                <input
                  type="text"
                  className="form-control p-4 border border-primary mr-2 rounded-1"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">
                    Cod voucher/discount:
                  </button>
                </div>
              </div>
            </form>
            <div className="card border-secondary mb-4">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Sumar Comanda</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Cost produse</h6>
                  <h6 className="font-weight-medium">
                    {cart.total && cart.total.toFixed(2)} Lei
                  </h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Cost livrare</h6>
                  {cart.total >= 250 ? (
                    <h6 className="font-weight-medium text-primary">
                      {" "}
                      GRATUIT
                    </h6>
                  ) : cart.isSoftware ? (
                    <h6>-</h6>
                  ) : (
                    <h6 className="font-weight-medium">20 lei</h6>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Reducere</h6>
                  <h6 className="font-weight-medium">0</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Taxa verde</h6>
                  {cart.products.length == 0 ? (
                    <h6 className="font-weight-medium text-primary"></h6>
                  ) : (
                    <h6 className="font-weight-medium text-primary">Inclus</h6>
                  )}
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  {cart.products.length == 0 ? (
                    <h5 className="font-weight-bold">0</h5>
                  ) : cart.total >= 250 ? (
                    <h5 className="font-weight-bold">
                      {cart.total && cart.total.toFixed(2)} Lei
                    </h5>
                  ) : cart.isSoftware ? (
                    <h5 className="font-weight-bold">
                      {cart.total && cart.total.toFixed(2)} Lei
                    </h5>
                  ) : (
                    <h5 className="font-weight-bold">
                      {cart.total &&
                        (Number(cart.total.toFixed(2)) + 20).toFixed(2)}{" "}
                      Lei
                    </h5>
                  )}
                </div>
                {cart.total != 0 ? (
                  <button
                    className="btn btn-block btn-primary my-3"
                    onClick={handleEvent}
                  >
                    {" "}
                    <Link
                      id="my-cart-button"
                      className="text-white btn btn-block w-100 py-3 font-weight-bold text-uppercase"
                      href="/checkout"
                    >
                      Urmatorul pas
                    </Link>
                  </button>
                ) : (
                  <Link
                    className="btn btn-block btn-primary my-3 py-3"
                    href="/"
                  >
                    Înapoi la produse
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCard;
