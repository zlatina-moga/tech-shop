import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/global/Navbar";
import * as productService from "../../services/productService";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { usePagination } from "../../hooks/usePagination";
import { serverCategories } from "../../data/categories";
import { serverNewBrcrmbs } from "../../data/breadcrumbs";
import MainSkeleton from "../../components/shared/MainSkeleton";
import Footer from "../../components/global/Footer";

const NewServers = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("/servere/noi-6");
  const router = useRouter();

  useEffect(() => {
    productService
      .getAllNewServers(currentPage)
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
    router.push(selectedSort);
    const sort = selectedSort.split("=")[1];
    productService
      .getSortedNewServers(currentPage, sort)
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedSort, currentPage]);

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
            title="Servere Noi"
            laptopsData={laptopsData}
            categories={serverCategories}
            breadcrumbs={serverNewBrcrmbs}
            sortCriteria={onSort}
            baseLink='/servere/noi-6'
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

export default NewServers;
