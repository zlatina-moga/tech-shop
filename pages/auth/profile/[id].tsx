import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import Footer from "../../../components/global/Footer";
import * as userService from "../../../services/userService";
import { Country, State, City } from "country-state-city";

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

  useEffect(() => {
    userService
      .getOne(id)
      .then((result) => {
        setUserData(result);
      })
      .catch((err) => {
        console.log(err);
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

            <form className="mt-0 px-5">
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
                          //name="cf-name"
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
                          id="inputEmail4"
                          defaultValue={userData.phone}
                          name="cf-phone"
                        />
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary-soft px-4 py-5 rounded mt-4">
                    <div className="row g-3">
                      <h4 className="mb-4 mt-0">Adresa de livrare</h4>
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
                          type="button"
                          className="btn btn-primary btn-lg"
                        >
                          Update
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
