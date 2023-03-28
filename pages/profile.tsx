import { useContext } from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <div
        className="laptops-page h-100"
        style={{ maxWidth: "100rem", marginTop: "50px" }}
      >
        <div className="row justify-content-center">
          <div className="">
            <div className="my-5">
              <h3>Detalii profil</h3>
              <hr />
            </div>

            <form className="mt-0">
              <div className="row mb-5 gx-5 justify-content-center">
                <div className="mb-5 mb-xxl-0">
                  <div className="bg-secondary-soft px-4 py-5 rounded">
                    <div className="row g-3">
                      <h4 className="mb-4 mt-0">Informatii de contact</h4>
                      <div className="d-flex">
                        <label className="form-label">Nume</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="First name"
                          value={user.name}
                        />
                      </div>
                      <div className="d-flex">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          value={user.email}
                        />
                      </div>
                      <div className="d-flex">
                        <label className="form-label">Telefon</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputEmail4"
                          value=""
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
                      <div className="">
                        <label className="form-label">Adresă</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label=""
                          value=""
                        />
                      </div>
                      <div className="">
                        <label className="form-label">Oraș</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          value=""
                        />
                      </div>
                      <div className="">
                        <label className="form-label">Județ</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          value=""
                        />
                      </div>
                      <div className="">
                        <label className="form-label">Țară</label>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          value="Romania"
                        />
                      </div>
                      <div className="">
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
