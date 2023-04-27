import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../services/productService";
import LaptopsPage from "../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import Navbar from "../../../components/global/Navbar";
import MainSkeleton from "../../../components/shared/MainSkeleton";
import { procLaptopsBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as sortingService from "../../../services/sortingService";

const ProcDetail = () => {
  const router = useRouter();
  const { slug, brand, generatie } = router.query;
  const [itemData, setItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(`/laptop/procesor/${slug}`);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    sortingService.getBrandsByProcessor(5,slug).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(5).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByProcessor(5, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getProcessorGenerationByProcessor(5, slug).then((r) => {
      setProcessorsGeneration(r);
    });
  }, [slug]);

  useEffect(() => {
    if (brand) {
      setShow(false);
      productService
        .getAllLaptopsBrandAndProcessor(currentPage, brand, slug)
        .then((result) => {
          setLoading(false);
          setItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (generatie) {
      setShow(false);
      productService
        .getAllLaptopsGenerationAndProcessor(currentPage, generatie, slug)
        .then((result) => {
          setLoading(false);
          setItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      productService
        .getAllLaptopsByProcessor(currentPage, slug)
        .then((result) => {
          setLoading(false);
          setItemsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, slug, brand, generatie]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange) {
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedLaptopsByProcessorPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          setItemsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedLaptopsByProcessor(currentPage, slug, sort)
        .then((result) => {
          setLoading(false);
          setItemsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSort, currentPage]);

  const onRangeSelect = (range) => {
    setPriceRange(range);
  };

  useEffect(() => {
    setShow(false);
    productService
      .getAllLaptopsByProcessorPrice(currentPage, slug, priceRange)
      .then((result) => {
        setItemsData(result);
        setTotalPages(result[0].totalPages);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
  if (slug != undefined) {
    let slugToStr = slug as string;
    pageTitle = slugToStr.replaceAll("-", " ");
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <>
          <LaptopsPage
            title={`Laptopuri ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={procLaptopsBrcrmbs}
            sortCriteria={onSort}
            baseLink={`/laptop/procesor/${slug}`}
            brands={brands}
            processors={processors}
            processorsLink={"/laptop/procesor/"}
            brandLink={`/laptop/procesor/${slug}?brand=`}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            processorsGeneration={processorsGeneration}
            processorsGenerationLink={`/laptop/procesor/${slug}?generatie=`}
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

export default ProcDetail;
