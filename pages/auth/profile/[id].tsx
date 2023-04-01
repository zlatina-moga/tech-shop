import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/global/Navbar";
import Footer from "../../../components/global/Footer";
import * as userService from "../../../services/userService";
import { Country, State, City } from "country-state-city";
import toast from "react-hot-toast";

interface IUser {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  county?: string;
  country?: string;
  zip?: string;
}

const initialValues: IUser = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  county: "",
  country: "",
  zip: "",
};

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState<IUser>(initialValues);
  let [selectedState, setSelectedState] = useState("");
  //@ts-ignore
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    userService
      .getOne(id)
      .then((result) => {
        setUserData(result);
      })
      .catch((err) => {
        toast.error(err, {
          style: { marginTop: "100px" },
        });
      });
  }, [id]);

  const countries = Country.getAllCountries().filter(
    (c) => c.name === "Romania"
  );
  const states = State.getStatesOfCountry("RO");
  const cities = City.getCitiesOfCountry("RO");

  const handleChange = (e) => {
    setSelectedState(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("cf-name");
    const email = formData.get("cf-email");
    const phone = formData.get("cf-phone");

    userService
      .update(id, { name, email, phone }, user.accessToken)
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
        <div className="row justify-content-center">
          <div className="">
            <div className="my-5">
              <h3>Detalii profil</h3>
              <hr />
            </div>

            <form className="mt-0 px-5" onSubmit={onSubmit}>
              <div className="row mb-5 gx-5 justify-content-center">
                <div className="mb-5 mb-xxl-0">
                  <div className="bg-secondary-soft px-4 py-5 rounded">
                    <div className="row g-3">
                      <h4 className="mb-4 mt-0">Informatii de contact</h4>
                      <div className="d-flex align-items-center ">
                        <label className="form-label">Nume</label>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="First name"
                          defaultValue={userData.name}
                          name="cf-name"
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          defaultValue={userData.email}
                          name="cf-email"
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <label className="form-label">Telefon</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={userData.phone}
                          name="cf-phone"
                        />
                      </div>
                    </div>
                    <div className="row g-3">
                      <h4 className="mb-4 mt-5">Adresa de livrare</h4>
                      <div className="d-flex align-items-center">
                        <label
                          className="form-label"
                          style={{ marginRight: "250px" }}
                        >
                          Țară
                        </label>
                        <select className="form-control ">
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

                      <div className="d-flex align-items-center">
                        <label
                          className="form-label"
                          style={{ marginRight: "250px" }}
                        >
                          Județ
                        </label>
                        <select
                          className="form-control"
                          onChange={handleChange}
                          value={selectedState}
                        >
                          {states.map((c) => (
                            <option
                              key={c.isoCode}
                              value={c.isoCode}
                              className="form-control"
                            >
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="d-flex align-items-center">
                        <label
                          className="form-label"
                          style={{ marginRight: "250px" }}
                        >
                          Oraș
                        </label>
                        <select className="form-control">
                          {cities
                            .filter((c) => c.stateCode === selectedState)
                            .map((c) => (
                              <option
                                key={c.name}
                                value={c.name}
                                className="form-control"
                              >
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="d-flex align-items-center">
                        <label className="form-label">Adresă</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label=""
                          value=""
                        />
                      </div>

                      <div className="d-flex align-items-center">
                        <label className="form-label">Zip/Cod poștal</label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputEmail4"
                          value="example@homerealty.com"
                        />
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-lg ml-4"
                          onClick={deleteHandler}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
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
