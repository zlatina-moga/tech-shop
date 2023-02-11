import { useEffect } from "react";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { theme } from "../theme/index";
import { ChakraProvider } from "@chakra-ui/react";
import { AppLayout } from "../components/layouts/AppLayout";
import { AuthProvider } from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../styles/styles.scss";
import "../styles/custom.scss";
import "swiper/css/bundle";
import "react-photo-view/dist/react-photo-view.css";

const MyApp = ({ Component, pageProps }) => {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
},[])
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
