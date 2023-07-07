import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import classNames from "classnames";
import { IUser, initialValues } from "./auth/profile/[id]";
import * as userService from "../services/userService";
import toast from "react-hot-toast";
import { Country, State, City } from "country-state-city";
import * as orderService from "../services/orderService";
import { empty, addOrderNum } from "../services/redux/cartRedux";
import * as ga from "../lib/gtag";

const Checkout = () => {
  const [userData, setUserData] = useState<IUser>(initialValues);
  const [checked, setChecked] = useState<boolean>(false);
  const [payment, setPayment] = useState("card");
  let [selectedState, setSelectedState] = useState("");
  let [selectedCity, setSelectedCity] = useState("");
  let [selectedFirm, setSelectedFirm] = useState<boolean>(false);
  let [selectedPersonal, setSelectedPersonal] = useState<boolean>(true);
  const [paymentData, setPaymentData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  //@ts-ignore
  const user = useSelector((state) => state.user.currentUser);
  //@ts-ignore
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (user != null) {
      userService
        .getOne(user._id)
        .then((result) => {
          setUserData(result);
        })
        .catch((err) => {
          toast.error(err, {
            style: { marginTop: "100px" },
          });
        });
    }
  }, [user]);

  const countries = Country.getAllCountries().filter(
    (c) => c.name === "Romania"
  );

  const states = State.getStatesOfCountry("RO");
  const cities = City.getCitiesOfCountry("RO");

  const handleChange = (e) => {
    setSelectedState(e.target.value);
  };

  let amountToPay = 0;
  if (cart.total < 250 && !cart.isSoftware) {
    amountToPay = (cart.total + 20).toFixed(2);
  } else {
    amountToPay = cart.total.toFixed(2);
  }

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("cf-name");
    const email = formData.get("cf-email");
    const phone = formData.get("cf-phone");
    const city = formData.get("cf-city");
    const county = formData.get("cf-county");
    const address = formData.get("cf-address");
    const zip = formData.get("cf-zip");
    const firm = formData.get("cf-firm");
    const firmCif = formData.get("cf-cif");
    const firmReg = formData.get("cf-reg");

    const name2 = formData.get("cf-name-2");
    const email2 = formData.get("cf-email-2");
    const phone2 = formData.get("cf-phone-2");
    const address2 = formData.get("cf-address-2");
    const zip2 = formData.get("cf-zip-2");

    if (payment == "") {
      toast.error("Vă rugăm să selectați metoda de plată", {
        style: { marginTop: "100px" },
      });
    }

    if (
      name &&
      email &&
      phone &&
      (city || selectedCity) &&
      (county || selectedState) &&
      address &&
      zip &&
      !checked
    ) {
      let cartItems = cart.products.map((p) => ({
        productId:(p.itemData[0] ? p.itemData[0] : p.itemData[0].id),
        quantity: p.quantity,
        price: (p.itemData[35] ? p.itemData[35] : p.itemData[0].priceNum),
        warranty: p.warranty,
        title: (p.itemData[3] ? p.itemData[3] : p.itemData[0].title),
        img1: (p.itemData[16] ? p.itemData[16][0].src : p.itemData[0].img1),
        imgLink: (p.itemData[16] ? p.itemData[16][0].src : p.itemData[0].img1),
        idLink: (p.itemData[8] ? p.itemData[8].replace("citgrup", "pcbun") : "https://pcbun.ro" + p.itemData[0].id),
      }));

      let gaItems = cartItems.map((p) => ({
        item_id: p.productId,
        item_name: p.title,
      }));

      if (user) {
        orderService
          .create({
            userId: user._id,
            products: cartItems,
            userName: name,
            userEmail: email,
            userPhone: phone,
            country: "Romania",
            county: county || selectedState,
            city: city || selectedCity,
            address: address,
            zip: zip,
            amount: amountToPay,
            payment: payment,
            firmName: firm,
            firmCif: firmCif,
            firmReg: firmReg,
          })
          .then((res) => {
            setPaymentData(res);
            let orderNum = res._doc._id;
            let orderTotal = res._doc.amount;
            if (payment === "card") {
              router.push(`${res.paymentResult.url}`);
              //orderService.checkOrderStatus().then((response) => console.log(response))
              //dispatch(empty());
              //router.push("/success");
            } else if (payment === "directcheck") {
              dispatch(
                addOrderNum({ orderNumber: orderNum, orderTotal: orderTotal })
              );
              dispatch(empty());
              router.push("/order-success");
            } else {
              dispatch(empty());
              router.push("/success");
            }
            ga.event({
              action: "purchase",
              params: {
                currency: "RON",
                transaction_id: orderNum,
                value: orderTotal,
                items: gaItems
              },
            });
          })
          .catch((err) => {
            toast.error(err, {
              style: { marginTop: "100px" },
            });
          });
        userService.update(
          user._id,
          {
            name,
            email,
            phone,
            country: "Romania",
            county: county || selectedState,
            city: city || selectedCity,
            address,
            zip,
          },
          user.accessToken
        );
      } else {
        orderService
          .create({
            products: cartItems,
            userName: name,
            userEmail: email,
            userPhone: phone,
            country: "Romania",
            county: county || selectedState,
            city: city || selectedCity,
            address: address,
            zip: zip,
            amount: amountToPay,
            payment: payment,
            firmName: firm,
            firmCif: firmCif,
            firmReg: firmReg,
          })
          .then((res) => {
            setPaymentData(res);
            let orderNum = res._doc._id;
            let orderTotal = res._doc.amount;
            if (payment === "card") {
              router.push(`${res.paymentResult.url}`);
              //orderService.checkOrderStatus().then((response) => console.log(response))
              //dispatch(empty());
              //router.push("/success");
            } else if (payment == "directcheck") {
              dispatch(
                addOrderNum({ orderNumber: orderNum, orderTotal: orderTotal })
              );
              //dispatch(empty());
              router.push("/order-success");
            } else {
              dispatch(empty());
              router.push("/success");
            }
            ga.event({
              action: "purchase",
              params: {
                currency: "RON",
                transaction_id: orderNum,
                value: orderTotal,
                items: gaItems
              },
            });
          })
          .catch((err) => {
            toast.error(err, {
              style: { marginTop: "100px" },
            });
          });
      }
    } else if (
      checked &&
      name2 &&
      email2 &&
      phone &&
      selectedCity &&
      selectedState &&
      address2 &&
      zip2
    ) {
      let cartItems = cart.products.map((p) => ({
        productId:(p.itemData[0] ? p.itemData[0] : p.itemData[0].id),
        quantity: p.quantity,
        price: (p.itemData[35] ? p.itemData[35] : p.itemData[0].priceNum),
        warranty: p.warranty,
        title: (p.itemData[3] ? p.itemData[3] : p.itemData[0].title),
        img1: (p.itemData[16] ? p.itemData[16][0].src : p.itemData[0].img1),
        imgLink: (p.itemData[16] ? p.itemData[16][0].src : p.itemData[0].img1),
        idLink: (p.itemData[8] ? p.itemData[8].replace("citgrup", "pcbun") : "https://pcbun.ro" + p.itemData[0].id),
      }));

      let gaItems = cartItems.map((p) => ({
        item_id: p.productId,
        item_name: p.title,
      }));

      if (user) {
        orderService
          .create({
            userId: user._id,
            products: cartItems,
            userName: name2,
            userEmail: email2,
            userPhone: phone2,
            country: "Romania",
            county: selectedState,
            city: selectedCity,
            address: address2,
            zip: zip2,
            amount: amountToPay,
            payment: payment,
            firmName: firm,
            firmCif: firmCif,
            firmReg: firmReg,
          })
          .then((res) => {
            setPaymentData(res);
            let orderNum = res._doc._id;
            let orderTotal = res._doc.amount;
            if (payment === "card") {
              router.push(`${res.paymentResult.url}`);
              //orderService.checkOrderStatus().then((response) => console.log(response))
              //dispatch(empty());
              //router.push("/success");
            } else if (payment == "directcheck") {
              dispatch(
                addOrderNum({ orderNumber: orderNum, orderTotal: orderTotal })
              );
              dispatch(empty());
              router.push("/order-success");
            } else {
              dispatch(empty());
              router.push("/success");
            }
            ga.event({
              action: "purchase",
              params: {
                currency: "RON",
                transaction_id: orderNum,
                value: orderTotal,
                items: gaItems
              },
            });
          })
          .catch((err) => {
            toast.error(err, {
              style: { marginTop: "100px" },
            });
          });
      } else {
        orderService
          .create({
            products: cartItems,
            userName: name2,
            userEmail: email2,
            userPhone: phone2,
            country: "Romania",
            county: selectedState,
            city: selectedCity,
            address: address2,
            zip: zip2,
            amount: amountToPay,
            payment: payment,
            firmName: firm,
            firmCif: firmCif,
            firmReg: firmReg,
          })
          .then((res) => {
            setPaymentData(res);
            let orderNum = res._doc._id;
            let orderTotal = res._doc.amount;
            if (payment === "card") {
              router.push(`${res.paymentResult.url}`);
              //orderService.checkOrderStatus().then((response) => console.log(response))
              //dispatch(empty());
              //router.push("/success");
            } else if (payment == "directcheck") {
              dispatch(
                addOrderNum({ orderNumber: orderNum, orderTotal: orderTotal })
              );
              dispatch(empty());
              router.push("/order-success");
            } else {
              dispatch(empty());
              router.push("/success");
            }
            ga.event({
              action: "purchase",
              params: {
                currency: "RON",
                transaction_id: orderNum,
                value: orderTotal,
                items: gaItems
              },
            });
          })
          .catch((err) => {
            toast.error(err, {
              style: { marginTop: "100px" },
            });
          });
      }
    } else {
      toast.error("Vă rugăm să completați toate câmpurile", {
        style: { marginTop: "100px" },
      });
    }
  };

  const handlePersonal = (e) => {
    e.preventDefault();
    setSelectedPersonal(true);
    setSelectedFirm(false);
  };

  const handleFirm = (e) => {
    e.preventDefault();
    setSelectedPersonal(false);
    setSelectedFirm(true);
  };

  return (
    <>
      <Navbar />
      <div
        className={classNames("container-fluid pt-5", "laptops-page")}
        style={{ maxWidth: "80rem", marginTop: "50px" }}
      >
        <form onSubmit={onSubmit}>
          <div className="row px-xl-5">
            <div className="col-lg-8">
              <div className="mb-4">
                <h4 className="font-weight-semi-bold mb-4">
                  Informații facturare
                </h4>
                <div className="d-flex justify-content-center pb-5">
                  <button
                    className={classNames(
                      "rounded-1 border mr-4 custom-btn",
                      selectedPersonal
                        ? "border-primary font-weight-bold"
                        : "border-secondary"
                    )}
                    style={{ boxShadow: "none" }}
                    onClick={handlePersonal}
                  >
                    Persoana Fizica
                  </button>
                  <button
                    className={classNames(
                      "rounded-1 border custom-btn",
                      selectedFirm
                        ? "border-primary font-weight-bold"
                        : "border-secondary"
                    )}
                    style={{ boxShadow: "none" }}
                    onClick={handleFirm}
                  >
                    Persoana Juridica
                  </button>
                </div>
                {selectedPersonal && (
                  <div className="row">
                    <div className="col-md-6 form-group ">
                      <label>Numele</label>
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
                      <label>Țară</label>
                      <select className="form-control text-start border border-primary w-100 rounded-1">
                        {countries.map((c) => (
                          <option
                            key={c.isoCode}
                            value={c.name}
                            className="form-control"
                          >
                            {c.name} {c.flag}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 form-group">
                      <label> Județ</label>
                      {userData.county != "" ? (
                        <input
                          type="text"
                          className="form-control border border-primary rounded-1 text-start w-100"
                          defaultValue={userData.county}
                          name="cf-county"
                        />
                      ) : (
                        <select
                          className="form-control text-start border border-primary w-100 rounded-1"
                          onChange={handleChange}
                          value={selectedState}
                        >
                          <option>-Selectați stat-</option>
                          {states.map((c, idx) => (
                            <option
                              key={idx}
                              value={c.isoCode}
                              className="form-control"
                            >
                              {c.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Oraș</label>
                      {userData.city != "" ? (
                        <input
                          type="text"
                          className="form-control border border-primary rounded-1 text-start w-100"
                          defaultValue={userData.city}
                          name="cf-city"
                        />
                      ) : (
                        <select
                          className="form-control text-start border border-primary w-100 rounded-1"
                          onChange={handleCityChange}
                          value={selectedCity}
                        >
                          <option>-Selectați o localitate-</option>
                          {cities
                            .filter(
                              (c) =>
                                c.stateCode === selectedState || userData.county
                            )
                            .map((c, idx) => (
                              <option
                                key={idx}
                                value={c.name}
                                className="form-control"
                              >
                                {c.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Adresa de livrare</label>
                      <input
                        className="form-control border border-primary rounded-1 text-start"
                        type="text"
                        defaultValue={userData.address}
                        name="cf-address"
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label>Zip/Cod poștal</label>
                      <input
                        className="form-control border border-primary rounded-1 text-start"
                        type="text"
                        defaultValue={userData.zip}
                        name="cf-zip"
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input "
                          checked
                        />
                        <label className="custom-control-label">
                          Sunt de acord cu termenii și condițiile
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input "
                          id="shipto"
                          onChange={() => setChecked(!checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="shipto"
                        >
                          Livrare catre adrese diferite
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {selectedFirm && (
                  <div className="row">
                    <div className=" form-group w-100">
                      <label>Denumire Firma</label>
                      <input
                        className="form-control text-start border border-primary rounded-1"
                        type="text"
                        name="cf-firm"
                      />
                    </div>
                    <div className="col-md-6 form-group ">
                      <label>CIF/CUI/RO</label>
                      <input
                        className="form-control text-start border border-primary rounded-1"
                        type="text"
                        name="cf-cif"
                      />
                    </div>
                    <div className="col-md-6 form-group ">
                      <label>Reg. Com.</label>
                      <input
                        className="form-control text-start border border-primary rounded-1"
                        type="text"
                        name="cf-reg"
                      />
                    </div>
                    <div className="col-md-6 form-group ">
                      <label>Numele</label>
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
                      <label>Țară</label>
                      <select className="form-control text-start border border-primary w-100 rounded-1">
                        {countries.map((c) => (
                          <option
                            key={c.isoCode}
                            value={c.name}
                            className="form-control"
                          >
                            {c.name} {c.flag}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 form-group">
                      <label> Județ</label>
                      {userData.county != "" ? (
                        <input
                          type="text"
                          className="form-control border border-primary rounded-1 text-start w-100"
                          defaultValue={userData.county}
                          name="cf-county"
                        />
                      ) : (
                        <select
                          className="form-control text-start border border-primary w-100 rounded-1"
                          onChange={handleChange}
                          value={selectedState}
                        >
                          <option>-Selectați stat-</option>
                          {states.map((c, idx) => (
                            <option
                              key={idx}
                              value={c.isoCode}
                              className="form-control"
                            >
                              {c.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Oraș</label>
                      {userData.city != "" ? (
                        <input
                          type="text"
                          className="form-control border border-primary rounded-1 text-start w-100"
                          defaultValue={userData.city}
                          name="cf-city"
                        />
                      ) : (
                        <select
                          className="form-control text-start border border-primary w-100 rounded-1"
                          onChange={handleCityChange}
                          value={selectedCity}
                        >
                          <option>-Selectați o localitate-</option>
                          {cities
                            .filter(
                              (c) =>
                                c.stateCode === selectedState || userData.county
                            )
                            .map((c, idx) => (
                              <option
                                key={idx}
                                value={c.name}
                                className="form-control"
                              >
                                {c.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Adresa de livrare</label>
                      <input
                        className="form-control border border-primary rounded-1 text-start"
                        type="text"
                        defaultValue={userData.address}
                        name="cf-address"
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label>Zip/Cod poștal</label>
                      <input
                        className="form-control border border-primary rounded-1 text-start"
                        type="text"
                        defaultValue={userData.zip}
                        name="cf-zip"
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input "
                          checked
                        />
                        <label className="custom-control-label">
                          Sunt de acord cu termenii și condițiile
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input "
                          id="shipto"
                          onChange={() => setChecked(!checked)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="shipto"
                        >
                          Livrare catre adrese diferite
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={classNames("mb-4", checked ? "d-block" : "d-none")}
              >
                <h4 className="font-weight-semi-bold mb-4">
                  Adresa de expediere
                </h4>
                <div className="row">
                  <div className="col-md-6 form-group ">
                    <label>Numele</label>
                    <input
                      className="form-control text-start border border-primary rounded-1"
                      type="text"
                      name="cf-name-2"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Email</label>
                    <input
                      className="form-control text-start border border-primary rounded-1"
                      type="text"
                      name="cf-email-2"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Telefon</label>
                    <input
                      className="form-control text-start border border-primary rounded-1"
                      type="text"
                      name="cf-phone-2"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Țară</label>
                    <select className="form-control text-start border border-primary w-100 rounded-1">
                      {countries.map((c) => (
                        <option
                          key={c.isoCode}
                          value={c.name}
                          className="form-control"
                        >
                          {c.name} {c.flag}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 form-group">
                    <label> Județ</label>
                    <select
                      className="form-control text-start border border-primary w-100 rounded-1"
                      onChange={handleChange}
                      value={selectedState}
                    >
                      {states.map((c, idx) => (
                        <option
                          key={idx}
                          value={c.isoCode}
                          className="form-control"
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 form-group ">
                    <label>Oraș</label>
                    <select
                      className="form-control text-start border border-primary w-100 rounded-1"
                      onChange={handleCityChange}
                      value={selectedCity}
                    >
                      {cities
                        .filter((c) => c.stateCode === selectedState)
                        .map((c, idx) => (
                          <option
                            key={idx}
                            value={c.name}
                            className="form-control"
                          >
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Adresa de livrare</label>
                    <input
                      className="form-control border border-primary rounded-1"
                      type="text"
                      name="cf-address-2"
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label>Zip/Cod poștal</label>
                    <input
                      className="form-control border border-primary rounded-1"
                      type="text"
                      name="cf-zip-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-primary mb-5">
                <div className="card-header bg-primary border-0">
                  <h4 className="font-weight-semi-bold m-0 text-white">
                    Sumar Comanda
                  </h4>
                </div>
                <div className="card-body">
                  <h5 className="font-weight-semi-bold mb-3">Produse</h5>
                  {cart.products.map((p) => (
                    <div
                      className="d-flex justify-content-between"
                      key={p.itemData[0]}
                    >
                      <p className="mw-50 mr-5">{p.itemData[3] ? p.itemData[3] : p.itemData[0].title}</p>
                      <p>{ p.itemData[35] ? p.itemData[35] : p.itemData[0].priceNum} Lei</p>
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
                        {(Number(cart.total.toFixed(2)) + 20).toFixed(2)} Lei
                      </h5>
                    )}
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
                        id="delivery"
                        //defaultChecked
                        onChange={() => setPayment("delivery")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="delivery"
                      >
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
                        onChange={() => setPayment("directcheck")}
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
                        id="card"
                        onChange={() => setPayment("card")}
                        defaultChecked
                        //disabled
                      />
                      <label className="custom-control-label" htmlFor="card">
                        Plata cu cardul online
                      </label>
                    </div>
                  </div>
                </div>
                <div className="card-footer border-secondary bg-transparent">
                  <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3 rounded-1">
                    Plasați comanda
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
