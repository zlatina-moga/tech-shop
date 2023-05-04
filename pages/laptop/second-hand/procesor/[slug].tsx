import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../../services/productService";
import LaptopsPage from "../../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../../hooks/usePagination";
import Navbar from "../../../../components/global/Navbar";
import MainSkeleton from "../../../../components/shared/MainSkeleton";
import { sHLaptopsProcessorBrcrmbs } from "../../../../data/breadcrumbs";
import Footer from "../../../../components/global/Footer";
import * as sortingService from "../../../../services/sortingService";

const ProcDetail = () => {
  const router = useRouter();
  const { slug, brand, generatie } = router.query;
  const [itemData, setItemData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/laptop/second-hand/procesor/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/laptop/second-hand/procesor/${slug}`);

  useEffect(() => {
    sortingService.getProcessorsBrands(5, "second-hand-4", slug).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(8).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByProcessor(8, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getProcessorGenerationByProcessor(8, slug).then((r) => {
      setProcessorsGeneration(r);
    });
  }, [slug]);

  useEffect(() => {
    if (brand) {
      setShow(false);
      productService
        .getAllSHLaptopsBrandAndProcessor(currentPage, brand, slug)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink( `/laptop/second-hand/procesor/${slug}?brand=${brand}`);
        })
        .catch((err) => {
          console.log(err);
        });
        sortingService
        .getHighestPriceByBrandTypeAndProcessor(5, brand, slug, 'second-hand-4' )
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (generatie) {
      setShow(false);
      productService
        .getAllSHLaptopsGenerationAndProcessor(currentPage, generatie, slug)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(
            `/laptop/second-hand/procesor/${slug}?generatie=${generatie}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
        sortingService
        .getHighestPriceByGenerationAndProcessor(8, generatie, slug)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else {
      setShow(false);
      productService
        .getAllSHLaptopsByProcessor(currentPage, slug)
        .then((result) => {
          setShow(true);
          setItemData(result);
          setLoading(false);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/laptop/second-hand/procesor/${slug}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, slug, brand,generatie]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange) {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedSHLaptopsByProcessorPrice(
          currentPage,
          slug,
          sort,
          priceRange
        )
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (brand && selectedSort) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSHLaptopsByBrandAndProcessor(
          currentPage,
          brand,
          sort,
          slug
        )
        .then((result) => {
          setShow(true);
          setItemData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (generatie && selectedSort) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedSHLaptopsByGenerationAndProcessor(
          currentPage,
          slug,
          sort,
          generatie
        )
        .then((result) => {
          setShow(true);
          setItemData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      setShow(false);
      productService
        .getSortedSHLaptopsByProcessor(currentPage, slug, sort)
        .then((result) => {
          setShow(true);
          setItemData(result);
          setLoading(false);
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
    setShow(false);
    productService
      .getAllSHLaptopsByProcessorPrice(currentPage, slug, priceRange)
      .then((result) => {
        setItemData(result);
        setTotalPages(result[0].totalPages);
        setShow(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
            title={`Laptopuri Second Hand ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={sHLaptopsProcessorBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={`/laptop/second-hand/procesor/${slug}?brand=`}
            processors={processors}
            processorsLink={"/laptop/second-hand/procesor/"}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            processorsGeneration={processorsGeneration}
            processorsGenerationLink={`/laptop/second-hand/procesor/${slug}?generatie=`}
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

export default ProcDetail;
