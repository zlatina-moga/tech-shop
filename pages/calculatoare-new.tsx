import { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import * as productService from "../services/productService";
import Loader from "../components/global/Loader/Loader";
import LaptopsPage from "../components/shared/LaptopsPage";
import Pagination from "../components/shared/Pagination";

const Calculatoare = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    productService
      .getAllNewComputers(currentPage)
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const totalPages = laptopsData[0]?.totalPages;
  const pageNumbers = [...Array(totalPages).keys()].slice(1); // add + 1 to array

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
          <LaptopsPage title="New Computers" laptopsData={laptopsData} />
          <nav>
            <ul className="pagination justify-content-center flex-wrap">
              <>
                <li className="page-item">
                  <a className="page-link" onClick={prevPage}>
                    Previous
                  </a>
                </li>
                {pageNumbers.map((page) => (
                  <li
                    className={`page-item ${
                      currentPage == page ? "active" : ""
                    } `}
                    key={page}
                  >
                    <a
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </a>
                  </li>
                ))}
                <li className="page-item">
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

export default Calculatoare;
