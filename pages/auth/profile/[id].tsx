import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/global/Navbar";
import Footer from "../../../components/global/Footer";
import * as userService from "../../../services/userService";
import { Country, State, City } from "country-state-city";
import toast from "react-hot-toast";
import useMediaQuery from "@mui/material/useMediaQuery";
import ResponsiveCart from "../../../components/shared/ResponsiveCartItem";
import CartItem from "../../../components/shared/CartItem";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  county?: string;
  country?: string;
  zip?: string;
  orders?: any;
}

export const initialValues: IUser = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  county: "",
  country: "",
  zip: "",
  orders: [],
};

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState<IUser>(initialValues);
  //@ts-ignore
  const user = useSelector((state) => state.user.currentUser);
  const isTablet = useMediaQuery("(max-width:500px)");

  useEffect(() => {
    if (user != null) {
      userService
        .getOne(id)
        .then((result) => {
          setUserData(result);
        })
        .catch((err) => {
          toast.error(err.message, {
            style: { marginTop: "100px" },
          });
        });
    } else {
      toast.error("Vă rugăm să vă conectați mai întâi în contul dvs", {
        style: { marginTop: "100px" },
      });
      router.push("/login");
    }
  }, [id, user]);

  const countries = Country.getAllCountries().filter(
    (c) => c.name === "Romania"
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("cf-name");
    const email = formData.get("cf-email");
    const phone = formData.get("cf-phone");
    const address = formData.get("cf-address");
    const zip = formData.get("cf-zip");
    const county = formData.get("cf-county");
    const city = formData.get("cf-city");

    userService
      .update(
        id,
        {
          name,
          email,
          phone,
          country: "Romania",
          county,
          city,
          address,
          zip,
        },
        user.accessToken
      )
      .then((result) => {
        //@ts-ignore
        setUserData(result);
        toast.success("Profil actualizat cu succes", {
          style: { marginTop: "100px" },
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          style: { marginTop: "100px" },
        });
      });
  };

  const deleteHandler = () => {
    userService.del(id, user.accessToken).then(() => {
      userService.logout(user.accessToken);
      toast.success("Profilul a fost șters cu succes", {
        style: { marginTop: "100px" },
        duration: 2000,
      });
      router.push("/login");
    });
  };

  return (
    <>
      <Navbar />
      <div
        className="laptops-page h-100 profil-page"
        style={{ maxWidth: "100rem", marginTop: "50px" }}
      >
        <div className="row justify-content-center mt-5">
          <div className="">
            <div className="ml-4">
              <h3 className="font-weight-semi-bold ">Detalii profil</h3>
              <hr />
            </div>

            <form className="mt-0" onSubmit={onSubmit}>
              <div className="row mb-5 gx-5 justify-content-center">
                <div className="mb-5 mb-xxl-0">
                  <div className="bg-secondary-soft px-4 py-5 rounded">
                    <div className="row">
                      <h4 className="mb-4 mt-0">Informații de contact</h4>
                      <div className="col-md-6 form-group d-flex flex-column">
                        <label className="form-label">Numele</label>
                        <input
                          type="text"
                          className="form-control text-start border border-primary w-100"
                          aria-label="First name"
                          defaultValue={userData.name}
                          name="cf-name"
                        />
                      </div>
                      <div className="col-md-6 form-group d-flex flex-column">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control text-start border border-primary w-100"
                          defaultValue={userData.email}
                          name="cf-email"
                        />
                      </div>
                      <div className="col-md-6 form-group d-flex flex-column">
                        <label className="form-label">Telefon</label>
                        <input
                          type="text"
                          className="form-control text-start border border-primary w-100"
                          defaultValue={userData.phone}
                          name="cf-phone"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <h4 className="mb-4 mt-5">Adresa de livrare</h4>
                      <div className="col-md-6 form-group d-flex flex-column">
                        <label className="form-label">Țară</label>
                        <select className="form-control text-start border border-primary w-100">
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

                      <div className="col-md-6 form-group d-flex flex-column">
                        <label className="form-label">Județ</label>
                        <input
                          type="text"
                          className="form-control border border-primary rounded-1 text-start w-100"
                          defaultValue={userData.county}
                          name="cf-county"
                        />
                      </div>
                      <div className="col-md-6 form-group d-flex flex-column">
                        <label className="form-label">Oraș</label>
                        <input
                          type="text"
                          className="form-control border border-primary rounded-1 text-start w-100"
                          defaultValue={userData.city}
                          name="cf-city"
                        />
                      </div>
                      <div className="col-md-6 form-group d-flex flex-column">
                        <label className="form-label">Adresă</label>
                        <input
                          type="text"
                          className="form-control text-start border border-primary w-100"
                          aria-label="Adresa"
                          defaultValue={userData.address}
                          name="cf-address"
                        />
                      </div>

                      <div className="col-md-6 form-group d-flex flex-column">
                        <label className="form-label">Zip/Cod poștal</label>
                        <input
                          type="number"
                          className="form-control text-start border border-primary w-100"
                          defaultValue={userData.zip}
                          name="cf-zip"
                        />
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg rounded-1"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-lg ml-4 d-none"
                          onClick={deleteHandler}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {userData.orders && userData.orders.length != 0 && (
                      <div className="row mt-5">
                         <h4 className="mb-4 mt-4">Istoric comenzi</h4>
                        <div className="table-responsive mb-5">
                          {isTablet ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              {userData.orders.map((p, idx) => (
                                <ResponsiveCart
                                  key={idx}
                                  id={p.idLink}
                                  imgLink={p.imgLink}
                                  img1={p.img1}
                                  title={p.title}
                                  priceNum={p.price}
                                  warranty={p.warranty}
                                />
                              ))}
                            </div>
                          ) : (
                            <table className="table table-bordered text-center mb-0">
                              <thead className="bg-secondary text-dark">
                                <tr>
                                  <th>Comanda ID</th>
                                  <th>Data</th>
                                  <th>Produse</th>
                                  <th>Preț</th>
                                  <th>Garanție</th>
                                  <th>Cantitate</th>
                                </tr>
                              </thead>
                              <tbody className="align-middle">
                                {userData.orders.map((p, idx) => (
                                  <CartItem
                                    key={idx}
                                    id={p.idLink}
                                    imgLink={p.imgLink}
                                    img1={p.img1}
                                    title={p.title}
                                    priceNum={p.price}
                                    warranty={p.warranty}
                                    profile
                                    createdAt={p.createdAt}
                                    orderNum={p._id}
                                  />
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
