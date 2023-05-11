import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";

const Verify = () => {
  return (
    <>
      <Navbar />
      <div
        className="laptops-page profil-page bg-secondary-soft min-vh-100"
        style={{ marginTop: "50px" }}
      >
        <div className="welcome-page">
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {" "}
            <h1 style={{fontSize: '56px'}}>Bine ați venit!</h1>
            <img
              src=" https://img.icons8.com/clouds/100/000000/handshake.png"
              width="125"
              height="120"
            />
            <p style={{fontSize: '24px', textAlign: 'center', marginTop: '20px'}}>
            Suntem încântați să vă alăturați nouă. În primul rând, trebuie să vă confirmați contul. Vă rugăm să accesați adresa dvs. de e-mail.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Verify;
