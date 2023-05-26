import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../services/productService";
import LaptopsPage from "../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import Navbar from "../../../components/global/Navbar";
import MainSkeleton from "../../../components/shared/MainSkeleton";
import { posProcBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as sortingService from "../../../services/sortingService";

const ProcDetail = () => {
  const router = useRouter();
  const { slug, brand } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/sisteme-pos/procesor/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/sisteme-pos/procesor/${slug}`);

  useEffect(() => {
    sortingService.getBrandsByProcessor(34, slug).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(34).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByProcessor(34, slug).then((response) => {
      setHighestPrice(response[1]);
    });
  }, [slug]);

  useEffect(() => {
    if (brand) {
      setShow(false);
      productService
        .getAlPOSBrandAndProcessor(currentPage, brand, slug)
        .then((result) => {
          setLoading(false);
          seItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/sisteme-pos/procesor/${slug}?brand=${brand}`);
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByBrandAndProcessor(34, brand, slug)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else {
      setShow(false);
      productService
        .getAllPOSByProcessor(currentPage, slug)
        .then((result) => {
          setLoading(false);
          seItemsData(result);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/sisteme-pos/procesor/${slug}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, slug, brand]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (
      priceRange != '' &&
      brand &&
      selectedSort != `/sisteme-pos/procesor/${slug}`
    ) {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedBrandTypePOSPrice(currentPage, brand, sort, priceRange, slug)
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (brand && selectedSort != `/sisteme-pos/procesor/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedBrandTypePOS(currentPage, brand, sort, slug)
        .then((result) => {
          setShow(true);
          seItemsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && !brand && selectedSort != `/sisteme-pos/procesor/${slug}`) {
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedPOSByProcessorPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          seItemsData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != `/sisteme-pos/procesor/${slug}`) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedPOSByProcessor(currentPage, slug, sort)
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
    if (priceRange != '' && brand) {
      setShow(false);
      productService
        .getBrandTypePOSPrice(currentPage, brand, priceRange, slug)
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '') {
      setShow(false);
      productService
        .getAllPOSByProcessorPrice(currentPage, slug, priceRange)
        .then((result) => {
          seItemsData(result);
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
            title={`Sisteme POS ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={posProcBrcrmbs}
            sortCriteria={onSort}
            baseLink={`/sisteme-pos/procesor/${slug}`}
            brands={brands}
            brandLink={`/sisteme-pos/procesor/${slug}?brand=`}
            processors={processors}
            processorsLink={"/sisteme-pos/procesor/"}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
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

export default ProcDetail;
