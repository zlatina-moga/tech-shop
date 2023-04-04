import { useEffect } from "react";
import { AppLayout } from "../components/layouts/AppLayout";
import { Provider} from "react-redux";
import { store, persistor } from "../services/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SkeletonTheme } from "react-loading-skeleton";
import CookeConsent from "../components/landing/CookeConsent";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../styles/styles.scss";
import "../styles/custom.scss";
import "../public/fonts/style.css"
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
        <PersistGate loading={null} persistor={persistor}>
        <AppLayout>
          <SkeletonTheme baseColor="#F0F0F0" highlightColor="#E8E3DF">
            <Component {...pageProps} />
          </SkeletonTheme>
          <CookeConsent />
        </AppLayout>
        </PersistGate>
      </Provider>
    </>
  );
};

export default MyApp;
