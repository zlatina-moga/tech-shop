import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import * as productService from "../services/productService";
import * as sortingService from "../services/sortingService";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination } from "../hooks/usePagination";
import { posCategories } from "../data/categories";
import { posBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import Footer from "../components/global/Footer";

const SistemePOS = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/sisteme-pos");
  const router = useRouter();
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    productService
      .geAllPOS(currentPage)
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange) {
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedPOSPrice(priceRange, currentPage, sort)
        .then((result) => {
          setLaptopsData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedPOS(currentPage, sort)
        .then((result) => {
          setLoading(false);
          setLaptopsData(result);
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
    productService
      .geAllPOSPrice(priceRange, currentPage)
      .then((result) => {
        setLaptopsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [priceRange, currentPage]);

  useEffect(() => {
    sortingService.getBrands(34).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(34).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPrice(34).then((response) => {
      setHighestPrice(response[1]);
    });
  }, []);

  const totalPages = laptopsData[0]?.totalPages;

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

  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <>
          <LaptopsPage
            title="Sisteme POS"
            laptopsData={laptopsData}
            categories={posCategories}
            breadcrumbs={posBrcrmbs}
            brands={brands}
            brandLink={"/sisteme-pos/brand/"}
            processors={processors}
            processorsLink={"/sisteme-pos/procesor/"}
            sortCriteria={onSort}
            baseLink="/sisteme-pos"
            highEnd={highestPrice}
            priceRange={onRangeSelect}
          />
          {currentPage === 0 || totalPages < 2 ? null : (
            <nav>
              <ul className="pagination justify-content-center flex-wrap">
                <>
                  <li className="page-item" style={{ cursor: "pointer" }}>
                    <a className="page-link" onClick={prevPage}>
                      Previous
                    </a>
                  </li>
                  {paginationRange.map((page) => (
                    <li
                      className={`page-item ${
                        currentPage == page ? "active" : ""
                      } `}
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
                      Next
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

export default SistemePOS;
