import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { AppLayout } from "../components/layouts/AppLayout";
import { Provider } from "react-redux";
import { store, persistor } from "../services/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SkeletonTheme } from "react-loading-skeleton";
import CookeConsent from "../components/landing/CookeConsent";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../styles/styles.scss";
import "../styles/custom.scss";
import "../public/fonts/style.css";
import "swiper/css/bundle";
import "react-photo-view/dist/react-photo-view.css";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import * as fbq from "../lib/fpixel";
import * as gtag from '../lib/gtag';
import { GTM_ID, pageview } from '../lib/gtm'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    router.push(window.location.href);
  }, []);

  useEffect(() => {
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />

      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
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
