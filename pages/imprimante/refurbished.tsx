import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { printerRefBrcrmbs } from "../../data/breadcrumbs";
import MainSkeleton from "../../components/shared/MainSkeleton";
import Footer from "../../components/global/Footer";
import * as sortingService from "../../services/sortingService";
import { usePapaParse } from "react-papaparse";

const RefPrinters = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("/imprimante/refurbished");
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const { brand } = router.query;
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/imprimante/refurbished");
  const { readRemoteFile } = usePapaParse();

  useEffect(() => {
    //@ts-ignore
    readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_imprimante",  {
        skipEmptyLines: true,
        complete: (results) => {
          let data = results.data.filter((r) => r[2] == "Refurbished");
          console.log(data);
          setLaptopsData(data);
          console.log(results.data);
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  const totalPages = Math.ceil(laptopsData.length / 64);

  useEffect(() => {
    sortingService.getBrands(30).then((result) => {
      setBrands(result);
    });
    sortingService.getHighestPrice(30).then((response) => {
      setHighestPrice(response[1]);
    });
  }, []);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    router.push(selectedSort);
    const sort = selectedSort.split("=")[1];

    if (sort === "views") {
      laptopsData = [...laptopsData].sort((a, b) => (a[3] > b[3] ? 1 : -1));
      setLaptopsData(laptopsData);
    } else if (sort === "deals") {
      laptopsData = [...laptopsData].sort((a, b) => b[16] - a[16]);
      setLaptopsData(laptopsData);
    } else if (sort === "price") {
      laptopsData = [...laptopsData].sort((a, b) => a[17] - b[17]);
      setLaptopsData(laptopsData);
    } else if (sort === "-price") {
      laptopsData = [...laptopsData].sort((a, b) => b[17] - a[17]);
      setLaptopsData(laptopsData);
    }
  }, [selectedSort]);

  const onRangeSelect = (range) => {
    setPriceRange(range);
  };

  useEffect(() => {
    if (priceRange != "") setShow(false);
    let arr = [...laptopsData].filter((r) => r[17] <= Number(priceRange));
    setLaptopsData(arr);
    setShow(true);
  }, [priceRange]);

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
  if (brand != undefined) {
    let slugToStr = brand as string;
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
            title={`Imprimante Refurbished ${pageTitle}`}
            laptopsData={laptopsData}
            breadcrumbs={printerRefBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/imprimante/refurbished?brand="}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            categoryLink={"/imprimante/refurbished/"}
            multipleQueries={multipleSelected}
          />
          {currentPage === 0 || totalPages < 2 ? null : (
            <nav>
              <ul className="pagination justify-content-center flex-wrap">
                <>
                  <li className="page-item" style={{ cursor: "pointer" }}>
                    <a className="page-link" onClick={prevPage}>
                      <i
                        id="arrow"
                        className="fas fa-arrow-left text-primary mr-1"
                      ></i>
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
                      <i
                        id="arrow"
                        className="fas fa-arrow-right text-primary mr-1"
                      ></i>
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

export default RefPrinters;
