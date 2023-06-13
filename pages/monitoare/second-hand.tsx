import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/global/Navbar";
import * as productService from "../../services/productService";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { monitorSHBrcrmbs } from "../../data/breadcrumbs";
import MainSkeleton from "../../components/shared/MainSkeleton";
import Footer from "../../components/global/Footer";
import * as sortingService from "../../services/sortingService";

const MonitoareSecondHand = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("/monitoare/second-hand");
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [screens, setScreens] = useState([]);
  const { screen, brand } = router.query;
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/monitoare/second-hand");
  const [screensLink, setScreensLink] = useState(
    "/monitoare/second-hand?screen="
  );

  useEffect(() => {
    sortingService.getBrands(20).then((result) => {
      setBrands(result);
    });
    sortingService.getHighestPrice(20).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getScreenSizes(20).then((res) => {
      setScreens(res);
    });
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (screen && brand) {
      setShow(false);
      productService
        .getSHMonitorScreensAndBrand(screen, currentPage, brand)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/monitoare/second-hand?screen=${screen}&brand=${brand}`);
        });
      sortingService
        .getHighestPriceByScreenAndBrand(20, screen, brand)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (screen) {
      setShow(false);
      productService.getSHMonitorScreens(screen, currentPage).then((result) => {
        setLoading(false);
        setLaptopsData(result);
        setTotalPages(result[0].totalPages);
        setShow(true);
        setMultupleSelected(true);
        setBaseLink(`/monitoare/second-hand?screen=${screen}`);
      });
      sortingService.getHighestPriceByScreen(20, screen).then((response) => {
        setHighestPrice(response[1]);
      });
    } else if (brand) {
      setShow(false);
      productService.getSHMonitorBrands(brand, currentPage).then((result) => {
        setLoading(false);
        setLaptopsData(result);
        setTotalPages(result[0].totalPages);
        setShow(true);
        setMultupleSelected(true);
        setBaseLink(`/monitoare/second-hand?brand=${brand}`);
      });
      sortingService.getHighestPriceByBrand(20, brand).then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getScreenSizesByBrand(20, brand).then((res) => {
        setScreens(res);
      });
      setScreensLink(`/monitoare/second-hand?brand=${brand}&screen=`);
    } else {
      setShow(false);
      productService
        .geAllSecondHandMonitors(currentPage)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/monitoare/second-hand`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.isReady, currentPage, brand, screen]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if ( priceRange != '' && screen && brand &&  selectedSort != "/monitoare/second-hand" ) {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedSHMonitorsScreensBrandPrice(
          screen,
          priceRange,
          currentPage,
          sort,
          brand
        )
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ( priceRange != '' && screen && selectedSort != "/monitoare/second-hand" ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSHMonitorsScreensPrice(screen, priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ( priceRange != '' && brand && selectedSort != "/monitoare/second-hand" ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSHMonitorsBrandPrice(brand, priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (screen && brand && selectedSort != "/monitoare/second-hand") {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedSHMonitorsBrandScreen(brand, screen, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && !brand && !screen && selectedSort != "/monitoare/second-hand") {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .geSortedSecondHandMonitorsPrice(priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (screen && selectedSort != "/monitoare/second-hand") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSHMonitorScreens(screen, sort, currentPage)
        .then((result) => {
          setShow(true);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (brand && selectedSort != "/monitoare/second-hand") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSHMonitorBrands(brand, sort, currentPage)
        .then((result) => {
          setShow(true);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != "/monitoare/second-hand") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .geSortedSecondHandMonitors(currentPage, sort)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSort, currentPage, priceRange]);

  const onRangeSelect = (range) => {
    setPriceRange(range);
  };

  useEffect(() => {
    if (priceRange != ''  && screen && brand) {
      setShow(false);
      productService
        .getSHMonitorsScreensBrandByPrice(
          screen,
          priceRange,
          currentPage,
          brand
        )
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != ''  && screen) {
      setShow(false);
      productService
        .getSHMonitorsScreensByPrice(screen, priceRange, currentPage)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && brand) {
      setShow(false);
      productService
        .getSHMonitorsBrandsByPrice(brand, priceRange, currentPage)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '') {
      setShow(false);
      productService
        .geAllSecondHandMonitorsPrice(priceRange, currentPage)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [priceRange, currentPage, priceRange]);

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalPages,
    siblingCount: 1,
  });

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let pageTitle = "";
  if (screen != undefined) {
    let slugToStr = screen as string;
    pageTitle = slugToStr.split("-").slice(0, -1).join(" ");
  } else if (brand != undefined) {
    let slugToStr = brand as string;
    pageTitle = slugToStr.split("-").slice(0, -1).join(" ");
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <>
          <LaptopsPage
            title={`Monitoare Second Hand ${pageTitle}`}
            laptopsData={laptopsData}
            breadcrumbs={monitorSHBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/monitoare/second-hand?brand="}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            categoryLink={"/monitoare/second-hand/"}
            screens={screens}
            screensLink={screensLink}
            multipleQueries={multipleSelected}
          />
          {currentPage === 0 || totalPages < 2 ? null : (
            <nav>
              <ul className="pagination justify-content-center flex-wrap">
                <>
                  <li className="page-item" style={{ cursor: "pointer" }}>
                    <a className="page-link" onClick={prevPage}>
                      <i id='arrow' className="fas fa-arrow-left text-primary mr-1"></i>
                    </a>
                  </li>
                  {paginationRange &&
                    paginationRange.map((page) => (
                      <li
                        className={`page-item ${
                          currentPage == page ? "active" : ""
                        } ${page == DOTS ? "dots" : ""}`}
                        key={page}
                        style={{ cursor: "pointer" }}
                      >
                        <a
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                  <li
                    className={`page-item ${
                      currentPage == totalPages ? "user-select-none" : ""
                    } `}
                    style={{ cursor: "pointer" }}
                  >
                    <a className="page-link" onClick={nextPage}>
                      <i id='arrow' className="fas fa-arrow-right text-primary mr-1"></i>
                    </a>
                  </li>
                </>
              </ul>
            </nav>
          )}
        </>
      )}
      <Footer />
    </>
  );
};

export default MonitoareSecondHand;
