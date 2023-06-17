import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import * as sortingService from "../services/sortingService";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../hooks/usePagination";
import { printerBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import { usePapaParse } from "react-papaparse";

const Imprimante = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  let [doubleFilteredData, setDoubleFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/imprimante");
  const router = useRouter();
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const { readRemoteFile } = usePapaParse();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);

  let pageSize = 64;
  //laptopsData = laptopsData.slice(1);
  const totalPages = Math.ceil(laptopsData.length / pageSize);

  useEffect(() => {
    //@ts-ignore
    readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_imprimante", {
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
          //console.log(results.data);
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(29).then((result) => {
      setBrands(result);
    });
    sortingService.getTypes(29).then((r) => {
      setCategories(r);
    });
    sortingService.getHighestPrice(29).then((response) => {
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

  const onCatSelect = (cat) => {
    router.push(`/imprimante?category=${cat}`);
    setMultupleSelected(true);
    setCategory(cat);
  };

  useEffect(() => {
    if (category == "refurbished") {
      let arr = laptopsData.filter((r) => r[2] == "Refurbished");
      setFilteredData(arr);
      sortingService.getBrands(30).then((result) => {
        setBrands(result);
      });
      sortingService.getHighestPrice(30).then((response) => {
        setHighestPrice(response[1]);
      });
    } else if (category == "second-hand") {
      let arr = laptopsData.filter((r) => r[2] == "Second Hand");
      setFilteredData(arr);
      sortingService.getBrands(31).then((result) => {
        setBrands(result);
      });
      sortingService.getHighestPrice(31).then((response) => {
        setHighestPrice(response[1]);
      });
    } else if (category == "nou") {
      let arr = laptopsData.filter((r) => r[2] == "Noi");
      setFilteredData(arr);
      sortingService.getBrands(53).then((result) => {
        setBrands(result);
      });
      sortingService.getHighestPrice(53).then((response) => {
        setHighestPrice(response[1]);
      });
    } else if (category == "consumabile") {
      let arr = laptopsData.filter((r) => r[2] == "Consumabile");
      setFilteredData(arr);
      sortingService.getBrands(93).then((result) => {
        setBrands(result);
      });
      sortingService.getHighestPrice(93).then((response) => {
        setHighestPrice(response[1]);
      });
    }
  }, [category]);

  const onBrandSelect = (br) => {
    router.push(`/imprimante?brand=${br}`);
    setMultupleSelected(true);
    setBrand(br);
  };

  useEffect(() => {
    if (category != '' && brand != "") {
      let arr = filteredData.filter((r) => r[18].toUpperCase() == brand.toUpperCase());
      setDoubleFilteredData(arr);
    }
    if (brand != "") {
      console.log(brand)
      let arr = laptopsData.filter((r) => r[18].toUpperCase() == brand.toUpperCase());
      setFilteredData(arr);
    }
  }, [brand, category]);

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

  /*let laptopsData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);*/

  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <>
          <LaptopsPage
            title="Imprimante"
            laptopsData={laptopsData}
            categories={categories}
            breadcrumbs={printerBrcrmbs}
            brands={brands}
            brandLink={"/imprimante/brand/"}
            sortCriteria={onSort}
            baseLink="/imprimante"
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            categoryLink={"/imprimante/"}
            catSelect={onCatSelect}
            brandSelect={onBrandSelect}
            filteredData={filteredData}
            doubleFilteredData={doubleFilteredData}
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

export default Imprimante;
