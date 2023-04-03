import CookieConsent from "react-cookie-consent";

const CookeConsent = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="OK"
      cookieName="myAwesomeCookieName2"
      style={{ background: "#62A043"}}
      buttonStyle={{ color: "#4e503b", fontSize: "13px", borderRadius:'4px' }}
      expires={150}
      containerClasses={'px-5'}
    >
      Acest site web folosește cookie-uri pentru a îmbunătăți experiența utilizatorului.{" "}
    </CookieConsent>
  );
};

export default CookeConsent;