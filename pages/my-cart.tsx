import Navbar from "../components/global/Navbar";

const MyCard = () => {
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
            Shopping Cart
          </h1>
        </div>
      </div>
      <div
        className="container-fluid pt-5"
        style={{ maxWidth: "100rem", margin: "0 auto" }}
        id='shopping-cart'
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
                <tr>
                  <td className="align-middle product-item">
                    <img
                      src="/images/computer.jpeg"
                      alt=""
                      style={{ width: "50px" }}
                    />{" "}
                    Calculator Dell Optiplex 390 Mini Tower, Intel Core i7-2600
                    3.80 GHz
                  </td>
                  <td className="align-middle">653.75 lei</td>
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
                <tr>
                  <td className="align-middle product-item">
                    <img
                      src="images/Workstation.jpeg"
                      alt=""
                      style={{ width: "50px" }}
                    />{" "}
                    Workstation HP Z220 Intel Core i7-3770 3.90 GHz 4-Cores gen.
                    a 3-a, 8 GB DDR3
                  </td>
                  <td className="align-middle">2152.04 lei</td>
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
                <tr>
                  <td className="align-middle product-item">
                    <img
                      src="images/laptop.jpeg"
                      alt=""
                      style={{ width: "50px" }}
                    />{" "}
                    Laptop HP EliteBook 820 G1 12.5", i7-4600U 3.30 GHz, 8GB
                    DDR3, 256GB SSD, Webcam
                  </td>
                  <td className="align-middle">1015.82 lei</td>
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
                <tr>
                  <td className="align-middle product-item">
                    <img
                      src="images/Server.jpeg"
                      alt=""
                      style={{ width: "50px" }}
                    />{" "}
                    Server Dell PowerEdge R900 4U, 4x Intel Xeon Hexa Core X7460
                    2.66GHz
                  </td>
                  <td className="align-middle">4685.63 lei</td>
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
                <tr>
                  <td className="align-start product-item">
                    <img
                      src="images/hard-disk.jpeg"
                      alt=""
                      style={{ width: "50px" }}
                    />{" "}
                    Hard Disk extern 500GB, USB 2.0, 2.5Inch
                  </td>
                  <td className="align-middle">125.41 lei</td>
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
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <form className="mb-3" action="" style={{marginTop: '-20px'}}>
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
                  <h6 className="font-weight-medium">8632.85 lei</h6>
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
                  <h5 className="font-weight-bold">8632.85 lei</h5>
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
