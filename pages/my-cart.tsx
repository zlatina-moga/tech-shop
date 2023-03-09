import { useSelector } from "react-redux";
import Link from "next/link";
import Navbar from "../components/global/Navbar";

const MyCard = () => {
  const cart = useSelector((state) => state.cart);
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
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cart.products.map((p) => (
                  <tr key={p.itemData[0].id}>
                    <td className="align-middle product-item">
                      <img
                        src={p.itemData[0].imgLink ? p.itemData[0].imgLink : p.itemData[0].img1 }
                        alt=""
                        style={{ width: "50px", marginRight: "10px" }}
                      />{" "}
                      <Link href={p.itemData[0].id} id='product-link'>{p.itemData[0].title}</Link>
                    </td>
                    <td className="align-middle">
                      {p.itemData[0].priceNum * p.quantity} Lei
                    </td>
                    <td className="align-middle">
                      <div
                        className="input-group quantity mx-auto"
                        style={{ width: "100px" }}
                      >
                        <div className="input-group-btn">
                          <button className="btn btn-sm btn-primary btn-minus">
                            <i className="fa fa-minus"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm bg-secondary text-center"
                          value="1"
                        />
                        <div className="input-group-btn">
                          <button className="btn btn-sm btn-primary btn-plus">
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <form className="mb-3" action="" style={{ marginTop: "-20px" }}>
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
            </form>
            <div className="card border-secondary mb-4">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Subtotal</h6>
                  <h6 className="font-weight-medium">{cart.total.toFixed(2)} Lei</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping?</h6>
                  <h6 className="font-weight-medium">0</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Discount</h6>
                  <h6 className="font-weight-medium">0</h6>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">{cart.total.toFixed(2)} Lei</h5>
                </div>
                <button className="btn btn-block btn-primary my-3 py-3">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCard;
