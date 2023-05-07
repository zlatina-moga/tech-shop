import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/global/Navbar";
import * as productService from "../../services/productService";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { posCategories } from "../../data/categories";
import { posSHBrcrmbs } from "../../data/breadcrumbs";
import MainSkeleton from "../../components/shared/MainSkeleton";
import Footer from "../../components/global/Footer";
import * as sortingService from "../../services/sortingService";

const SecondHandPOS = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState(
    "/sisteme-pos/second-hand"
  );
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const { procesor, brand } = router.query;
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/sisteme-pos/second-hand");
  const [processorsLink, setProcessorsLink] = useState(
    "/sisteme-pos/second-hand?procesor="
  );

  useEffect(() => {
    sortingService.getBrands(36).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(36).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPrice(36).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getTypes(36).then((r) => {
      setCategories(r);
    });
  }, []);

  useEffect(() => {
    if (procesor && brand) {
      setShow(false);
      productService
        .getSecondHandPOSScreensAndBrand(procesor, currentPage, brand)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(
            `/sisteme-pos/second-hand?procesor=${procesor}&brand=${brand}`
          );
        });
      sortingService
        .getHighestPriceByBrandAndProcessor(36, brand, procesor)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (procesor) {
      setShow(false);
      productService
        .getSecondHandPOSProcessors(procesor, currentPage)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/sisteme-pos/second-hand?procesor=${procesor}`);
        });
      sortingService
        .getHighestPriceByProcessor(36, procesor)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (brand) {
      setShow(false);
      productService.getSecondHandPOSBrands(brand, currentPage).then((result) => {
        setLoading(false);
        setLaptopsData(result);
        setTotalPages(result[0].totalPages);
        setShow(true);
        setMultupleSelected(true);
        setBaseLink(`/sisteme-pos/second-hand?brand=${brand}`);
      });
      sortingService.getHighestPriceByBrand(36, brand).then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getProcessorsByBrand(36, brand).then((res) => {
        setProcessors(res);
      });
      setProcessorsLink(`/sisteme-pos/second-hand?brand=${brand}&procesor=`);
    } else {
      setShow(false);
      productService
      .getAllSecondHandPOS(currentPage)
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
        setShow(true);
        setTotalPages(result[0].totalPages);
        setBaseLink(`/sisteme-pos/second-hand`);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }, [currentPage, brand, procesor]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange && procesor && brand && selectedSort != "/sisteme-pos/second-hand") {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSecondHandPOSProcesorBrandPrice(
          procesor,
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
    } else if (priceRange && procesor && selectedSort != "/sisteme-pos/second-hand") {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSecondHandPOSProcesorPrice(procesor, priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange && brand && selectedSort != "/sisteme-pos/second-hand") {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSecondHandPOSBrandPrice(brand, priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (procesor && brand && selectedSort != "/sisteme-pos/second-hand") {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedSecondHandPOSBrandProcesor(brand, procesor, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (procesor && selectedSort != "/sisteme-pos/second-hand") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSecondHandPOSProcesor(procesor, sort, currentPage)
        .then((result) => {
          setShow(true);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (brand && selectedSort != "/sisteme-pos/second-hand") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSecondHandPOSBrands(brand, sort, currentPage)
        .then((result) => {
          setShow(true);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange && !brand && !procesor) {
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedSecondHandPOSPrice(priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != "/sisteme-pos/second-hand") {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedSecondHandPOS(currentPage, sort)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
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
    if (priceRange && procesor && brand) {
      setShow(false);
      productService
        .getSecondHandPOSProcesorsBrandByPrice(
          procesor,
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
    } else if (priceRange && procesor) {
      setShow(false);
      productService
        .getSecondHandPOSProcesorByPrice(procesor, priceRange, currentPage)
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
        .getSecondHanddPOSBrandsByPrice(brand, priceRange, currentPage)
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
        .getAllSecondHandPOSPrice(priceRange, currentPage)
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
  if (procesor != undefined) {
    let slugToStr = procesor as string;
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
            title={`Sisteme POS Second Hand ${pageTitle}`}
            laptopsData={laptopsData}
            categories={categories}
            breadcrumbs={posSHBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/sisteme-pos/second-hand?brand="}
            processors={processors}
            processorsLink={processorsLink}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            categoryLink={'/sisteme-pos/second-hand/'}
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

export default SecondHandPOS;
