import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import classNames from "classnames";
import { IUser, initialValues } from "./auth/profile/[id]";
import * as userService from "../services/userService";
import toast from "react-hot-toast";

const Checkout = () => {
  const [userData, setUserData] = useState<IUser>(initialValues);

  //@ts-ignore
  const user = useSelector((state) => state.user.currentUser);
  //@ts-ignore
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    userService
      .getOne(user._id)
      .then((result) => {
        console.log(userData);
        setUserData(result);
      })
      .catch((err) => {
        toast.error(err, {
          style: { marginTop: "100px" },
        });
      });
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={classNames("container-fluid pt-5", "laptops-page")}
        style={{ maxWidth: "100rem", marginTop: "50px" }}
      >
        <form>
          <div className="row px-xl-5">
            <div className="col-lg-8">
              <div className="mb-4">
                <h4 className="font-weight-semi-bold mb-4">
                  Informatii facturare
                </h4>
                <div className="row">
                  <div className="col-md-6 form-group ">
                    <label>Nume</label>
                    <input
                      className="form-control text-start border border-primary rounded-1"
                      type="text"
                      defaultValue={userData.name}
                      name="cf-name"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Email</label>
                    <input
                      className="form-control text-start border border-primary rounded-1"
                      type="text"
                      defaultValue={userData.email}
                      name="cf-email"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Telefon</label>
                    <input
                      className="form-control text-start border border-primary rounded-1"
                      type="text"
                      defaultValue={userData.phone}
                      name="cf-phone"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Adresa de livrare</label>
                    <input className="form-control border border-primary rounded-1" type="text" />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Țară</label>
                    <input
                      type="text"
                      className="form-control border border-primary rounded-1"
                      //aria-label="First name"
                      //defaultValue={}
                      //name="cf-name"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label> Județ</label>
                    <input
                      type="text"
                      className="form-control border border-primary rounded-1"
                      //aria-label="First name"
                      //defaultValue={}
                      //name="cf-name"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Oraș</label>
                    <input
                      type="text"
                      className="form-control border border-primary rounded-1"
                      //aria-label="First name"
                      //defaultValue={}
                      //name="cf-name"
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label>Zip/Cod poștal</label>
                    <input className="form-control border border-primary rounded-1" type="text" />
                  </div>
                  <div className="col-md-12 form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="newaccount"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="newaccount"
                      >
                        Create an account
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12 form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input "
                        id="shipto"
                      />
                      <label
                        className="custom-control-label"
                        data-toggle="collapse"
                        data-target="#shipping-address"
                        htmlFor="shipto"
                      >
                        Ship to different address
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse mb-4" id="shipping-address">
                <h4 className="font-weight-semi-bold mb-4">Shipping Address</h4>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="John"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>E-mail</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Mobile No</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="+123 456 789"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Address Line 1</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="123 Street"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Address Line 2</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="123 Street"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Country</label>
                    <select className="custom-select">
                      <option selected>United States</option>
                      <option>Afghanistan</option>
                      <option>Albania</option>
                      <option>Algeria</option>
                    </select>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>City</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="New York"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>State</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="New York"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>ZIP Code</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-primary mb-5">
                <div className="card-header bg-primary border-0">
                  <h4 className="font-weight-semi-bold m-0 text-white">Sumar Comanda</h4>
                </div>
                <div className="card-body">
                  <h5 className="font-weight-semi-bold mb-3">Produse</h5>
                  {cart.products.map((p) => (
                    <div
                      className="d-flex justify-content-between"
                      key={p.itemData[0].id}
                    >
                      <p className="mw-50 mr-5">{p.itemData[0].title}</p>
                      <p>{p.itemData[0].priceNum} Lei</p>
                    </div>
                  ))}

                  <hr className="mt-0" />
                  <div className="d-flex justify-content-between mb-3 pt-1">
                    <h6 className="font-weight-medium">Cost produse</h6>
                    <h6 className="font-weight-medium">
                      {cart.total && cart.total.toFixed(2)} Lei
                    </h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Cost livrare</h6>
                    {cart.total >= 250 ? (
                      <h6 className="font-weight-medium text-primary"> GRATUIT</h6>
                    ) : (
                      <h6 className="font-weight-medium">?????</h6>
                    )}
                  </div>
                </div>
                <div className="card-footer border-secondary bg-transparent">
                  <div className="d-flex justify-content-between mt-2">
                    <h5 className="font-weight-bold">Total</h5>
                    <h5 className="font-weight-bold">
                      {cart.total && cart.total.toFixed(2)} Lei
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card border-primary mb-5">
                <div className="card-header bg-primary border-0">
                  <h4 className="font-weight-semi-bold m-0 text-white">
                    Modalitatea de plata
                  </h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="payment"
                        id="paypal"
                      />
                      <label className="custom-control-label" htmlFor="paypal">
                        Plata ramburs
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="payment"
                        id="directcheck"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="directcheck"
                      >
                        Ordin de plata
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="payment"
                        id="banktransfer"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="banktransfer"
                      >
                        Plata cu cardul online
                      </label>
                    </div>
                  </div>
                </div>
                <div className="card-footer border-secondary bg-transparent">
                  <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3 rounded-1">
                    Plasati comanda
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

const oldCheckoutPage = () => {
  /*
  return (
    <div
      className={classnames("container-fluid pt-5", "laptops-page")}
      style={{
        maxWidth: "100rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div classNam="row">
        <div classNameName="text-center mb-4">
          <h1 classNameName="px-5">Checkout</h1>
        </div>
        <div classNameName="order-md-1">
          <h4 classNameName="mb-3">Billing address</h4>
          <form classNameName="needs-validation">
            <div classNameName="row">
              <div classNameName="mb-3">
                <label>First name</label>
                <input
                  type="text"
                  classNameName="form-control"
                  id="firstName"
                  placeholder=""
                  value=""
                  required
                />
                <div classNameName="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div classNameName="mb-3">
                <label>Last name</label>
                <input
                  type="text"
                  classNameName="form-control"
                  id="lastName"
                  placeholder=""
                  value=""
                  required
                />
                <div classNameName="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div classNameName="mb-3">
              <label>
                Email <span classNameName="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                classNameName="form-control"
                id="email"
                placeholder="you@example.com"
              />
              <div classNameName="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div classNameName="mb-3">
              <label>Address</label>
              <input
                type="text"
                classNameName="form-control"
                id="address"
                placeholder="1234 Main St"
                required
              />
              <div classNameName="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div classNameName="mb-3">
              <label>
                Address 2 <span classNameName="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                classNameName="form-control"
                id="address2"
                placeholder="Apartment or suite"
              />
            </div>

            <div classNameName="row">
              <div classNameName="mb-3">
                <label>Country</label>
                <select
                  classNameName="custom-select d-block w-100"
                  id="country"
                  required
                >
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div classNameName="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div classNameName="mb-3">
                <label>State</label>
                <select
                  classNameName="custom-select d-block w-100"
                  id="state"
                  required
                >
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div classNameName="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div classNameName="mb-3">
                <label>Zip</label>
                <input
                  type="text"
                  classNameName="form-control"
                  id="zip"
                  placeholder=""
                  required
                />
                <div classNameName="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr classNameName="mb-4" />
            <div classNameName="custom-control custom-checkbox">
              <input
                type="checkbox"
                classNameName="custom-control-input"
                id="same-address"
              />
              <label classNameName="custom-control-label">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div classNameName="custom-control custom-checkbox">
              <input
                type="checkbox"
                classNameName="custom-control-input"
                id="save-info"
              />
              <label classNameName="custom-control-label">
                Save this information for next time
              </label>
            </div>
            <hr classNameName="mb-4" />

            <h4 classNameName="mb-3">Payment</h4>

            <div classNameName="d-block my-3">
              <div classNameName="custom-control custom-radio">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  classNameName="custom-control-input"
                  checked
                  required
                />
                <label classNameName="custom-control-label">Credit card</label>
              </div>
              <div classNameName="custom-control custom-radio">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  classNameName="custom-control-input"
                  required
                />
                <label classNameName="custom-control-label">Debit card</label>
              </div>
              <div classNameName="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  classNameName="custom-control-input"
                  required
                />
                <label classNameName="custom-control-label">Paypal</label>
              </div>
            </div>
            <div classNameName="row">
              <div classNameName="col-md-6 mb-3">
                <label>Name on card</label>
                <input
                  type="text"
                  classNameName="form-control"
                  id="cc-name"
                  placeholder=""
                  required
                />
                <small classNameName="text-muted">
                  Full name as displayed on card
                </small>
                <div classNameName="invalid-feedback">Name on card is required</div>
              </div>
              <div classNameName="col-md-6 mb-3">
                <label>Credit card number</label>
                <input
                  type="text"
                  classNameName="form-control"
                  id="cc-number"
                  placeholder=""
                  required
                />
                <div classNameName="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div classNameName="row">
              <div classNameName="col-md-3 mb-3">
                <label>Expiration</label>
                <input
                  type="text"
                  classNameName="form-control"
                  id="cc-expiration"
                  placeholder=""
                  required
                />
                <div classNameName="invalid-feedback">Expiration date required</div>
              </div>
              <div classNameName="col-md-3 mb-3">
                <label>CVV</label>
                <input
                  type="text"
                  classNameName="form-control"
                  id="cc-cvv"
                  placeholder=""
                  required
                />
                <div classNameName="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr classNameName="mb-4" />
            <button classNameName="btn btn-primary btn-lg btn-block" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
    */
};
