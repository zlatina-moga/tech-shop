import { useEffect } from "react";
import { AppLayout } from "../components/layouts/AppLayout";
import { AuthProvider } from "../contexts/AuthContext";
import { Provider } from "react-redux";
import store from "../services/redux/store";
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
      <Provider store={store}>
        <AuthProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </AuthProvider>
      </Provider>
    </>
  );
};

export default MyApp;
