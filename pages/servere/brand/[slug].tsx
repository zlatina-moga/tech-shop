import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../services/productService";
import LaptopsPage from "../../../components/shared/LaptopsPage";
import { usePagination } from "../../../hooks/usePagination";
import Navbar from "../../../components/global/Navbar";
import MainSkeleton from "../../../components/shared/MainSkeleton";
import { serverBrandBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import { serverCategories } from "../../../data/categories";
import * as sortingService from "../../../services/sortingService";

const BrandDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [itemData, setItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(`/servere/brand/${slug}`);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);

  useEffect(() => {
    sortingService.getBrands(9).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(9).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByBrand(9, slug).then((response) => {
      setHighestPrice(response[1]);
    });
  }, []);

  useEffect(() => {
    productService
      .getAllServersByBrand(currentPage, slug)
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
    router.push(selectedSort);
    const sort = selectedSort.split('=')[1]
    productService
      .getSortedServersByBrand(currentPage, slug, sort)
      .then((result) => {
        setLoading(false);
        setItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedSort, currentPage]);

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
            title={`Servere ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={serverBrandBrcrmbs}
            sortCriteria={onSort}
            baseLink={`/servere/brand/${slug}`}
            categories={serverCategories}
            brands={brands}
            brandLink={"/servere/brand/"}
            processors={processors}
            processorsLink={"/servere/procesor/"}
            highEnd={highestPrice}
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
