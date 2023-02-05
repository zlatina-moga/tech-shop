import { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import * as productService from "../services/productService";
import Loader from "../components/global/Loader/Loader";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../hooks/usePagination";

const LaptopuriNoi = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    productService
      .getAllNewLaptops(currentPage)
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const totalPages = laptopsData[0]?.totalPages;

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalPages,
    siblingCount: 1,
  });
  if (currentPage === 0 || totalPages < 2) {
    return null;
  }

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
        <Loader />
      ) : (
        <>
        <LaptopsPage title="New Laptops" laptopsData={laptopsData} />
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
        </>
      )}
    </>
  );
};

export default LaptopuriNoi;
