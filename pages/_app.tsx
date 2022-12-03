import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { theme } from "../theme/index";
import { ChakraProvider } from "@chakra-ui/react";
import { AppLayout } from "../components/layouts/AppLayout";
import "../styles/globals.css";
import '../styles/styles.scss'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ThemeEditorProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ThemeEditorProvider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
