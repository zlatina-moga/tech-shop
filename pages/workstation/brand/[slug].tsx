import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../services/productService";
import LaptopsPage from "../../../components/shared/LaptopsPage";
import { usePagination } from "../../../hooks/usePagination";
import Navbar from "../../../components/global/Navbar";
import MainSkeleton from "../../../components/shared/MainSkeleton";
import { workstationBrandBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import { workstationCategories } from "../../../data/categories";
import * as sortingService from "../../../services/sortingService";

const BrandDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [itemData, setItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/workstation/brand/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    sortingService.getBrands(15).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(15).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByBrand(15, slug).then((response) => {
      setHighestPrice(response[1]);
    });
  }, [slug]);

  useEffect(() => {
    productService
      .getAllWorkstationsByBrand(currentPage, slug)
      .then((result) => {
        setLoading(false);
        setItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, slug]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange) {
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedWorkstationsByBrandPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          setItemsData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedWorkstationsByBrand(currentPage, slug, sort)
        .then((result) => {
          setLoading(false);
          setItemsData(result);
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
      .getAllWorkstationsByBrandPrice(currentPage, slug,  priceRange)
      .then((result) => {
        setItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [priceRange, currentPage]);

  const totalPages = itemData[0]?.totalPages;

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
            title={`Workstation ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={workstationBrandBrcrmbs}
            sortCriteria={onSort}
            baseLink={`/workstation/brand/${slug}`}
            categories={workstationCategories}
            brands={brands}
            brandLink={"/workstation/brand/"}
            processors={processors}
            processorsLink={"/workstation/procesor/"}
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

export default BrandDetail;
