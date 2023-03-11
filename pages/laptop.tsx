import { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import * as productService from "../services/productService";
import * as sortingService from "../services/sortingService";
import Loader from "../components/global/Loader/Loader";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination } from "../hooks/usePagination";
import { laptopCategories } from "../data/categories";
import { laptopBrcrmbs } from "../data/breadcrumbs";

const Laptopuri = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    productService
      .getAllLaptops(currentPage)
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  useEffect(() => {
    sortingService.getBrands(5).then((result) => {
      setBrands(result);
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
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <LaptopsPage
            title="Laptopuri"
            laptopsData={laptopsData}
            categories={laptopCategories}
            breadcrumbs={laptopBrcrmbs}
            brands={brands}
            brandLink={'/laptop/brand/'}
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
    </>
  );
};

export default Laptopuri;
