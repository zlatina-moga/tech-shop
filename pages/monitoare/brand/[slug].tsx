import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../services/productService";
import LaptopsPage from "../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import Navbar from "../../../components/global/Navbar";
import MainSkeleton from "../../../components/shared/MainSkeleton";
import { monitorBrandBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as sortingService from "../../../services/sortingService";

const BrandDetail = () => {
  const router = useRouter();
  const { slug, screen } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(`/monitoare/brand/${slug}`);
  const [brands, setBrands] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/monitoare/brand/${slug}`);
  const [screens, setScreens] = useState([]);

  useEffect(() => {
    sortingService.getBrands(18).then((result) => {
      setBrands(result);
    });
    sortingService.getHighestPriceByBrand(18, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getScreenSizesByBrand(18, slug).then((res) => {
      setScreens(res);
    });
  }, [slug, screen]);

  useEffect(() => {
    if (screen) {
      setShow(false);
      productService
        .getMonitorScreensByBrand(screen, slug, currentPage)
        .then((result) => {
          setLoading(false);
          seItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/monitoare/brand/${slug}?screen=${screen}`);
        });
      sortingService
        .getHighestPriceByScreenAndBrand(18, screen, slug)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else {
      setShow(false);
      productService
        .geAllBrandMonitors(currentPage, slug)
        .then((result) => {
          setLoading(false);
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/monitoare/brand/${slug}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, slug, screen]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange != '' && screen && selectedSort != `/monitoare/brand/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedMonitorsScreensBrandPrice(
          screen,
          priceRange,
          currentPage,
          sort,
          slug
        )
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (screen && selectedSort != `/monitoare/brand/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedBrandMonitorsScreens(currentPage, slug, sort, screen)
        .then((result) => {
          setShow(true);
          seItemsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && !screen && selectedSort != `/monitoare/brand/${slug}`) {
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedBrandMonitorsPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          seItemsData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != `/monitoare/brand/${slug}`) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedBrandMonitors(currentPage, slug, sort)
        .then((result) => {
          setLoading(false);
          seItemsData(result);
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
    if (priceRange != '' && screen) {
      setShow(false);
      productService
        .getMonitorsScreensBrandByPrice(screen, priceRange, currentPage, slug)
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != ''){
      setShow(false);
      productService
        .geAllBrandMonitorsPrice(currentPage, slug, priceRange)
        .then((result) => {
          seItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [priceRange, currentPage, slug]);

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
  if (slug != undefined) {
    let slugToStr = slug as string;
    pageTitle = slugToStr.split("-")[0].toUpperCase();
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <>
          <LaptopsPage
            title={`Monitoare ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={monitorBrandBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/monitoare/brand/"}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            screens={screens}
            screensLink={`/monitoare/brand/${slug}?screen=`}
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

export default BrandDetail;
