import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../../services/productService";
import LaptopsPage from "../../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../../hooks/usePagination";
import Navbar from "../../../../components/global/Navbar";
import MainSkeleton from "../../../../components/shared/MainSkeleton";
import { brandSHComputersBrcrmbs } from "../../../../data/breadcrumbs";
import Footer from "../../../../components/global/Footer";
import * as sortingService from "../../../../services/sortingService";

const BrandDetail = () => {
  const router = useRouter();
  const { slug, procesor } = router.query;
  const [itemData, setItemData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/calculatoare/second-hand/brand/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    sortingService.getBrands(4).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessorsByBrand(4, slug).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByBrand(4, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getProcessorGenerationByBrand(4, slug).then((r) => {
      setProcessorsGeneration(r);
    })
    sortingService.getTypes(4).then((r) => {
      setCategories(r);
    });
  }, [slug]);

  useEffect(() => {
    if (procesor) {
      setShow(false)
      productService
        .getAllSHComputersBrandAndProcessor(currentPage, slug, procesor)
        .then((result) => {
          setShow(true)
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShow(false)
      productService
      .getAllSHComputersBrand(currentPage, slug)
      .then((result) => {
        setShow(true)
        setItemData(result);
        setLoading(false)
        setTotalPages(result[0].totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [currentPage, slug, procesor]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange) {
      setShow(false)
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedSHComputersByBrandPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      setShow(false)
      productService
        .getSortedSHComputersByBrand(currentPage, slug, sort)
        .then((result) => {
          setShow(true)
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setLoading(false)
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
      .getAllSHComputersByBrandPrice(currentPage, slug, priceRange)
      .then((result) => {
        setItemData(result);
        setTotalPages(result[0].totalPages);
        setShow(true);
        setLoading(false)
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
            title={`Calculatoare Second Hand ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={brandSHComputersBrcrmbs}
            categories={categories}
            sortCriteria={onSort}
            baseLink={`/calculatoare/second-hand/brand/${slug}`}
            brands={brands}
            brandLink={"/calculatoare/second-hand/brand/"}
            processors={processors}
            processorsLink={`/calculatoare/second-hand/brand/${slug}?procesor=`}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            processorsGeneration={processorsGeneration}
            processorsGenerationLink={'/calculatoare/'}
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

export default BrandDetail;
