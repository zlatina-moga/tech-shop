import { useSelector } from "react-redux";
import Link from "next/link";
import Navbar from "../components/global/Navbar";
import CartItem from "../components/shared/CartItem";
import Footer from "../components/global/Footer";

const MyCard = () => {
  const cart = useSelector((state) => state.cart);

  const deliveryCost = cart.products.map

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-secondary mb-3">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "250px" }}
        >
          <h1
            className="font-weight-semi-bold text-uppercase text-primary"
            style={{ marginTop: "100px" }}
          >
            Cosul meu
          </h1>
        </div>
      </div>
      <div
        className="container-fluid pt-5"
        style={{ maxWidth: "100rem", margin: "0 auto" }}
        id="shopping-cart"
      >
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-bordered text-center mb-0">
              <thead className="bg-secondary text-dark">
                <tr>
                  <th>Produse</th>
                  <th>Preț</th>
                  <th>Garantie</th>
                  <th>Cantitate</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cart.products.map((p) => (
                  <CartItem
                    key={p.itemData[0].id}
                    id={p.itemData[0].id}
                    imgLink={p.itemData[0].imgLink}
                    img1={p.itemData[0].img1}
                    title={p.itemData[0].title}
                    priceNum={p.itemData[0].priceNum}
                    warranty={p.warranty}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            {/*<form className="mb-3" action="" style={{ marginTop: "-20px" }}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Points"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Use points</button>
                </div>
              </div>
                </form>*/}
            <div className="card border-secondary mb-4">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Sumar Comanda</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Cost produse</h6>
                  <h6 className="font-weight-medium">
                    {cart.total.toFixed(2)} Lei
                  </h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Cost livrare</h6>
                  <h6 className="font-weight-medium">0</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Reducere</h6>
                  <h6 className="font-weight-medium">0</h6>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">
                    {cart.total.toFixed(2)} Lei
                  </h5>
                </div>
                <Link className="btn btn-block btn-primary my-3 py-3" href='/checkout'>
                  Proceed To Checkout
                </Link>
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
