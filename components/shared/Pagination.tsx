import { useState } from "react";
import Link from "next/link";

const Pagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

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
    <nav>
      <ul className="pagination justify-content-center flex-wrap">
        <>
          <li className="page-item">
            <a className="page-link" href="#" tabIndex={-1} onClick={prevPage}>
              Previous
            </a>
          </li>
          {pageNumbers.map((page) => (
            <li
              className={`page-item ${currentPage == page ? "active" : ""} `}
              key={page}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" onClick={nextPage}>
              Next
            </a>
          </li>
        </>
      </ul>
    </nav>
  );
};

export default Pagination;