import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/global/Navbar";
import * as productService from "../../services/productService";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { posNewBrcrmbs } from "../../data/breadcrumbs";
import MainSkeleton from "../../components/shared/MainSkeleton";
import Footer from "../../components/global/Footer";
import * as sortingService from "../../services/sortingService";

const NewPOS = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("/sisteme-pos/nou");
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const { procesor, brand } = router.query;
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/sisteme-pos/nou");
  const [processorsLink, setProcessorsLink] = useState(
    "/sisteme-pos/nou?procesor="
  );

  useEffect(() => {
    sortingService.getBrands(58).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(58).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPrice(58).then((response) => {
      setHighestPrice(response[1]);
    });
  }, []);

  useEffect(() => {
    if (procesor && brand) {
      setShow(false);
      productService
        .getNewPOSScreensAndBrand(procesor, currentPage, brand)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/sisteme-pos/nou?procesor=${procesor}&brand=${brand}`);
        });
      sortingService
        .getHighestPriceByBrandAndProcessor(58, brand, procesor)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (procesor) {
      setShow(false);
      productService
        .getNewPOSProcessors(procesor, currentPage)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/sisteme-pos/nou?procesor=${procesor}`);
        });
      sortingService
        .getHighestPriceByProcessor(58, procesor)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (brand) {
      setShow(false);
      productService.getNewPOSBrands(brand, currentPage).then((result) => {
        setLoading(false);
        setLaptopsData(result);
        setTotalPages(result[0].totalPages);
        setShow(true);
        setMultupleSelected(true);
        setBaseLink(`/sisteme-pos/nou?brand=${brand}`);
      });
      sortingService.getHighestPriceByBrand(58, brand).then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getProcessorsByBrand(58, brand).then((res) => {
        setProcessors(res);
      });
      setProcessorsLink(`/sisteme-pos/nou?brand=${brand}&procesor=`);
    } else {
      setShow(false);
      productService
      .getAllNewPOS(currentPage)
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
        setShow(true);
        setTotalPages(result[0].totalPages);
        setBaseLink(`/sisteme-pos/nou`);
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
    if (priceRange != '' && procesor && brand && selectedSort != "/sisteme-pos/nou") {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedNewPOSProcesorBrandPrice(
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
    } else if (priceRange != '' && procesor && selectedSort != "/sisteme-pos/nou") {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedNewPOSProcesorPrice(procesor, priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && brand && selectedSort != "/sisteme-pos/nou") {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedNewPOSBrandPrice(brand, priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (procesor && brand && selectedSort != "/sisteme-pos/nou") {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedNewPOSBrandProcesor(brand, procesor, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (procesor && selectedSort != "/sisteme-pos/nou") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedNewPOSProcesor(procesor, sort, currentPage)
        .then((result) => {
          setShow(true);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (brand && selectedSort != "/sisteme-pos/nou") {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedNewPOSBrands(brand, sort, currentPage)
        .then((result) => {
          setShow(true);
          setLaptopsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != ''  && !brand && !procesor && selectedSort != "/sisteme-pos/nou") {
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedNewPOSPrice(priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != "/sisteme-pos/nou")  {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedNewPOS(currentPage, sort)
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
    if (priceRange != '' && procesor && brand) {
      setShow(false);
      productService
        .getNewPOSProcesorsBrandByPrice(
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
    } else if (priceRange != '' && procesor) {
      setShow(false);
      productService
        .getNewPOSProcesorByPrice(procesor, priceRange, currentPage)
        .then((result) => {
          setLaptopsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != ''&& brand) {
      setShow(false);
      productService
        .getNewPOSBrandsByPrice(brand, priceRange, currentPage)
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
        .getAllNewPOSPrice(priceRange, currentPage)
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
            title={`Sisteme POS Noi ${pageTitle}`}
            laptopsData={laptopsData}
            breadcrumbs={posNewBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/sisteme-pos/nou?brand="}
            processors={processors}
            processorsLink={processorsLink}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            categoryLink={"/sisteme-pos/nou/"}
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

export default NewPOS;
