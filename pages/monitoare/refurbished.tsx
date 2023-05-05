import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/global/Navbar";
import * as productService from "../../services/productService";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { monitorRefBrcrmbs } from "../../data/breadcrumbs";
import MainSkeleton from "../../components/shared/MainSkeleton";
import Footer from "../../components/global/Footer";
import * as sortingService from "../../services/sortingService";

const MonitoareRefurbished = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("/monitoare/refurbished");
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const [screens, setScreens] = useState([]);
  const { screen, brand } = router.query;
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/monitoare/refurbished");
  const [screensLink, setScreensLink] = useState(
    "/monitoare/refurbished?screen="
  );

  useEffect(() => {
    sortingService.getBrands(19).then((result) => {
      setBrands(result);
    });
    sortingService.getHighestPrice(19).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getTypes(19).then((r) => {
      setCategories(r);
    });
    sortingService.getScreenSizes(19).then((res) => {
      setScreens(res);
    });
  }, []);

  useEffect(() => {
    if (screen && brand) {
      setShow(false);
      productService
        .getRefMonitorScreensAndBrand(screen, currentPage, brand)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/monitoare/refurbished?screen=${screen}&brand=${brand}`);
        });
      sortingService
        .getHighestPriceByScreenAndBrand(19, screen, brand)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (screen) {
      setShow(false);
      productService
        .getRefMonitorScreens(screen, currentPage)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/monitoare/refurbished?screen=${screen}`);
        });
      sortingService.getHighestPriceByScreen(19, screen).then((response) => {
        setHighestPrice(response[1]);
      });
    } else if (brand) {
      setShow(false);
      productService.getRefMonitorBrands(brand, currentPage).then((result) => {
        setLoading(false);
        setLaptopsData(result);
        setTotalPages(result[0].totalPages);
        setShow(true);
        setMultupleSelected(true);
        setBaseLink(`/monitoare/refurbished?brand=${brand}`);
      });
      sortingService.getHighestPriceByBrand(19, brand).then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getScreenSizesByBrand(19, brand).then((res) => {
        setScreens(res);
      });
      setScreensLink(`/monitoare/refurbished?brand=${brand}&screen=`);
    } else {
      setShow(false);
      productService
        .geAllRefurbishedMonitors(currentPage)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/monitoare/refurbished`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, brand, screen]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange && screen && brand && selectedSort != "/monitoare/refurbished") {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedRefMonitorsScreensBrandPrice(
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
    } else if (priceRange && screen && selectedSort != "/monitoare/refurbished" ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefMonitorsScreensPrice(screen, priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ( priceRange && brand && selectedSort != "/monitoare/refurbished" ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefMonitorsBrandPrice(brand, priceRange, currentPage, sort)
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
        .getSortedRefMonitorsBrandScreen(brand, screen, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange && !brand && !screen) {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .geSortedRefurbishedMonitorsPrice(priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (screen && selectedSort != "/monitoare/refurbished") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefMonitorScreens(screen, sort, currentPage)
        .then((result) => {
          setShow(true);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (brand && selectedSort != "/monitoare/refurbished") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefMonitorBrands(brand, sort, currentPage)
        .then((result) => {
          setShow(true);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != "/monitoare/refurbished") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .geSortedRefurbishedMonitors(currentPage, sort)
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
    if (priceRange && screen && brand) {
      setShow(false);
      productService
        .getRefMonitorsScreensBrandByPrice(
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
    } else if (priceRange && screen) {
      setShow(false);
      productService
        .getRefMonitorsScreensByPrice(screen, priceRange, currentPage)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange && brand) {
      setShow(false);
      productService
        .getRefMonitorsBrandsByPrice(brand, priceRange, currentPage)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShow(false);
      productService
        .geAllRefurbishedMonitorsPrice(priceRange, currentPage)
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
            title={`Monitoare Refurbished ${pageTitle}`}
            laptopsData={laptopsData}
            categories={categories}
            breadcrumbs={monitorRefBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/monitoare/refurbished?brand="}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            categoryLink={"/monitoare/refurbished/"}
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
                      <i className="fas fa-arrow-left text-primary mr-1"></i>
                    </a>
                  </li>
                  {paginationRange &&
                    paginationRange.map((page) => (
                      <li
                        className={`page-item ${
                          currentPage == page ? "active" : ""
                        }  ${page == DOTS ? "dots" : ""}`}
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
                      <i className="fas fa-arrow-right text-primary mr-1"></i>
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

export default MonitoareRefurbished;
