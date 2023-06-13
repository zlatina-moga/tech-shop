import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../services/productService";
import LaptopsPage from "../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import Navbar from "../../../components/global/Navbar";
import MainSkeleton from "../../../components/shared/MainSkeleton";
import { posBrandsBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as sortingService from "../../../services/sortingService";

const BrandDetail = () => {
  const router = useRouter();
  const { slug, procesor } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/sisteme-pos/brand/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/sisteme-pos/brand/${slug}`);

  useEffect(() => {
    sortingService.getBrands(34).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessorsByBrand(34, slug).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByBrand(34, slug).then((response) => {
      setHighestPrice(response[1]);
    });
  }, [slug]);

  useEffect(() => {
    if (!router.isReady) return;
    if (procesor) {
      setShow(false);
      productService
        .getAlPOSBrandAndProcessor(currentPage, slug, procesor)
        .then((result) => {
          seItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/sisteme-pos/brand/${slug}?procesor=${procesor}`);
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByBrandAndProcessor(34, slug, procesor)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else {
      setShow(false);
      productService
        .geAllPOSBrands(currentPage, slug)
        .then((result) => {
          setLoading(false);
          setShow(true);
          seItemsData(result);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/sisteme-pos/brand/${slug}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.isReady, currentPage, slug, procesor]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange != '' && procesor && selectedSort != `/sisteme-pos/brand/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedBrandTypePOSPrice(
          currentPage,
          slug,
          sort,
          priceRange,
          procesor
        )
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (procesor && selectedSort != `/sisteme-pos/brand/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedBrandTypePOS(currentPage, slug, sort, procesor)
        .then((result) => {
          setShow(true);
          seItemsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange && !procesor && selectedSort != `/sisteme-pos/brand/${slug}`) {
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedPOSBrandsPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          seItemsData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != `/sisteme-pos/brand/${slug}`) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedPOSBrands(currentPage, slug, sort)
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
    if (priceRange != ''  && procesor) {
      setShow(false);
      productService
        .getBrandTypePOSPrice(currentPage, slug, priceRange, procesor)
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else  if (priceRange != '') {
      setShow(false);
      productService
        .geAllPOSBrandsPrice(currentPage, slug, priceRange)
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
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
            breadcrumbs={posBrandsBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/sisteme-pos/brand/"}
            processors={processors}
            processorsLink={`/sisteme-pos/brand/${slug}?procesor=`}
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

export default BrandDetail;
