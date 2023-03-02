import { useEffect } from "react";
import { AppLayout } from "../components/layouts/AppLayout";
import { AuthProvider } from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../styles/styles.scss";
import "../styles/custom.scss";
import "swiper/css/bundle";
import "react-photo-view/dist/react-photo-view.css";
import "swiper/css";
import "swiper/css/navigation";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <AuthProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AuthProvider>
    </>
  );
};

export default MyApp;
