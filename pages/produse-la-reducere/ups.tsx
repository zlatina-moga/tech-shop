import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/global/Navbar";
import * as productService from "../../services/productService";
import * as sortingService from "../../services/sortingService";
import Footer from "../../components/global/Footer";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { discountCategories } from "../../data/categories";
import { discountedUPSBrcrmbs } from "../../data/breadcrumbs";
import MainSkeleton from "../../components/shared/MainSkeleton";
import classNames from "classnames";

const DiscountedUPS = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("/produse-la-reducere/ups");
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const { brand } = router.query;
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/produse-la-reducere/ups");

  useEffect(() => {
    sortingService.getDiscountedItemsBrands(40).then((result) => {
      setBrands(result);
    });
    sortingService.getDiscountedItemsHighestPrice(40).then((response) => {
      setHighestPrice(response[1]);
    });
  }, []);

  useEffect(() => {
    if (brand) {
      setShow(false);
      productService
        .getAllDiscountedUPSByBrand(currentPage, brand)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/produse-la-reducere/ups?brand=${brand}`);
        });
      sortingService
        .getDiscountedItemsHighestPriceBrand(40, brand)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else {
      setShow(false);
      productService
      .getDiscountedUPS(currentPage)
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
        setShow(true);
        setTotalPages(result[0].totalPages);
        setBaseLink(`/produse-la-reducere/ups`);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }, [currentPage, brand]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange != '' && brand && selectedSort != "/produse-la-reducere/ups" ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedDiscountedUPSPriceAndBrand(
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
    } else if (brand && selectedSort != "/produse-la-reducere/ups") {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedDiscountedUPSBrand(currentPage, sort, brand)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && !brand  && selectedSort != "/produse-la-reducere/ups") {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedDiscountedUPSPrice(priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != "/produse-la-reducere/ups") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedDiscountedAccessories(currentPage, sort)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
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
    if (brand && priceRange != '') {
      setShow(false);
      productService
        .getDiscountedUPSPriceAndBrand(priceRange, currentPage, brand)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if(priceRange != '') {
      setShow(false);
      productService
        .getAllDiscountedUPSPrice(priceRange, currentPage)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [priceRange, currentPage]);

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
  if (brand != undefined) {
    let slugToStr = brand as string;
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
            title={`UPS la reducere ${pageTitle}`}
            laptopsData={laptopsData}
            categories2={discountCategories}
            breadcrumbs={discountedUPSBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/produse-la-reducere/ups?brand="}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={classNames( show ? "" : "opacity-50")}
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

export default DiscountedUPS;
