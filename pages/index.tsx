import Image from "next/image";
import Link from "next/link";
import { useMemo} from "react";
import { usePapaParse} from "react-papaparse";
import Crontab from "reactjs-crontab";
import "reactjs-crontab/dist/index.css";
import * as feedService from "../services/feedService";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Sidebar from "../components/landing/Sidebar";

function update(obj) {
  for (const url in obj) {
    obj[0][1] = "Category";
    obj[0][2] = "Condition";
    obj[0][3] = "Title";
    obj[0][8] = "Image link";
    obj[0][9] = "Link";
    obj[0][22] = "Description";
    obj[0][17] = "Price";
    obj[0][23] = "Availability";
    obj[url][9] = obj[url][9].replace("citgrup", "pcbun");
  }
  return obj;
}

export default function Home() {
  const { readRemoteFile } = usePapaParse();

  const fetchMonitors = () => {
    console.log('fetching monitors')
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_monitoare", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "monitoare");
          }
        },
      }
    );
  };

  const fetchServers = () => {
    console.log('fetching Servers')
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_servere", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "servere");
          }
        },
      }
    );
  };

  const fetchComponents = () => {
    console.log('fetching Components')
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_componente", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "componente");
          }
        },
      }
    );
  };

  const fetchPrinters = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_imprimante", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "imprimante");
          }
        },
      }
    );
  };

  const fetchPos = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_sisteme-pos", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "sisteme-pos");
          }
        },
      }
    );
  };

  const fetchUps = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_ups", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "ups");
          }
        },
      }
    );
  };

  const fetchAccessories = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_accesorii", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'accesorii')
          }
        },
      }
    );
  };

  const fetchNetwork = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_retelistica", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'retelistica')
          }
        },
      }
    );
  };

  const fetchLaptop = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_laptop", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'laptop')
          }
        },
      }
    );
  };

  const fetchSolar = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_sisteme-solare-fotovoltaice", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'sisteme-solare-fotovoltaice')
          }
        },
      }
    );
  };

  const fetchComputers = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_calculatoare", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'calculatoare')
          }
        },
      }
    );
  };

  const fetchWorkstation = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_workstation", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'workstation')
          }
        },
      }
    );
  };

  const tasks = useMemo(
    () => [
      {
        fn: fetchMonitors,
        config: "0 0 * * *",
      },
      {
        fn: fetchServers,
        config: "0 0 * * *",
      },
      {
        fn: fetchComponents,
        config: "0 0 * * *",
      },
      {
        fn: fetchPrinters,
        config: "0 0 * * *",
      },
      {
        fn: fetchPos,
        config: "0 0 * * *",
      },
      {
        fn: fetchUps,
        config: "0 0 * * *",
      },
      {
        fn: fetchAccessories,
        config: "0 0 * * *",
      },
      {
        fn: fetchNetwork,
        config: "0 0 * * *",
      },
      {
        fn: fetchLaptop,
        config: "0 0 * * *",
      },
      {
        fn: fetchSolar,
        config: "0 0 * * *",
      },
      {
        fn: fetchComputers,
        config: "0 0 * * *",
      },
      {
        fn: fetchWorkstation,
        config: "0 0 * * *",
      },

    ],
    []
  );

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <main style={{ paddingTop: "150px" }}>
          <Sidebar />

          {/*<!-- Featured Start -->*/}
          <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border border-primary mb-4 features-card"
                  style={{ padding: 30, borderRadius: "4px", height: "110px" }}
                >
                  <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                  <h6 className="font-weight-semi-bold m-0">
                    Produse intr-o stare foarte buna
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border border-primary mb-4 features-card"
                  style={{ padding: 30, borderRadius: "4px", height: "110px" }}
                >
                  <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                  <h6 className="font-weight-semi-bold m-0">
                    Transport gratuit*
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border border-primary mb-4 features-card"
                  style={{ padding: 30, borderRadius: "4px", height: "110px" }}
                >
                  <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                  <h6 className="font-weight-semi-bold m-0">
                    Retur în 14 zile
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div
                  className="d-flex align-items-center border mb-4 border-primary features-card"
                  style={{ padding: 30, borderRadius: "4px", height: "110px" }}
                >
                  <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                  <h6 className="font-weight-semi-bold m-0">
                    Relații Clienți <br /> +40(721) 909 049
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid bg-secondary my-5 ">
            <div className="row justify-content-md-center py-2 px-xl-5">
              <div className="col-md-6 col-12 py-5">
                <div className="text-center mb-2 pb-2">
                  <h4 className="section-title px-5 mb-3 pb-3">
                    <span className="bg-secondary px-2">
                      Dorești un laptop care nu face parte din oferta?
                    </span>
                  </h4>
                  <p style={{ fontSize: "18px" }}>
                    Ne poți suna și te ajutăm imediat!
                  </p>
                  <a
                    className="mb-2 footer-link font-weight-bold"
                    href="tel:+40(721) 909 049"
                  >
                    <i className="fa fa-phone-alt text-primary mr-2"></i>
                    +40(721) 909 049
                  </a>
                  <p className="mt-4" style={{ fontSize: "18px" }}>
                    Aducem ORICE echipament IT din lume!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/laptop"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/laptop.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Laptopuri</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/calculatoare"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/computer.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Calculatoare</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/workstation"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/workstation.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Workstations</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/servere"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/server.jpeg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Servere</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/monitoare"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/desktop.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Monitoare</h5>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/componente"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/disk.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Componente</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/imprimante"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/printer.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Imprimante</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/sisteme-pos"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/pos.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Sisteme POS</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/ups"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/ups.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">UPS</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/accesorii"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/accessory.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Accesorii</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/retelistica"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/router.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">Retelistica</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 pb-1">
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: "30px", borderRadius: "4px" }}
                >
                  <Link
                    href="/sisteme-solare-fotovoltaice"
                    className="cat-img position-relative overflow-hidden mb-3 mx-auto"
                  >
                    <Image
                      className="img-fluid"
                      src="/images/solar.webp"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">
                    Sisteme Solare Fotovoltaice
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <Crontab
      tasks={tasks}
      timeZone="local"
      dashboard={{
        hidden: true
      }}
    />
    </>
  );
}
