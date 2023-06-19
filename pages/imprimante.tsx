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
  const [baseLink, setBaseLink] = useState("/imprimante");
  const [totalPages, setTotalPages] = useState(1);

  let pageSize = 64;
  const getTotalPages = Math.ceil(laptopsData.length / pageSize);
  const totalCount = laptopsData.length;

  useEffect(() => {
    if (filteredData.length > 0) {
      let getPages = Math.ceil(filteredData.length / pageSize);
      setTotalPages(getPages);
    } else {
      setTotalPages(getTotalPages);
    }
  }, [getTotalPages, filteredData.length, pageSize])

  useEffect(() => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_imprimante", {
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
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
    const sort = selectedSort.split("sort=")[1];

    if (filteredData.length > 0) {
      if (sort === "views") {
        filteredData = [...filteredData].sort((a, b) => (a[3] > b[3] ? 1 : -1));
        setFilteredData(filteredData);
      } else if (sort === "deals") {
        filteredData = [...filteredData].sort((a, b) => b[16] - a[16]);
        setFilteredData(filteredData);
      } else if (sort === "price") {
        filteredData = [...filteredData].sort((a, b) => a[17] - b[17]);
        setFilteredData(filteredData);
      } else if (sort === "-price") {
        filteredData = [...filteredData].sort((a, b) => b[17] - a[17]);
        setFilteredData(filteredData);
      }
    } else {
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
    }
  }, [selectedSort]);

  const onRangeSelect = (range) => {
    setPriceRange(range);
  };

  useEffect(() => {
    if (priceRange != "" && category != "" && brand != "") {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (priceRange != "" && (category != "" || brand != "")) {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (priceRange != "") {
      setShow(false);
      let arr = laptopsData.filter((r) => r[17] <= Number(priceRange));
      setLaptopsData(arr);
      setShow(true);
    }
  }, [priceRange, brand, category]);

  const onCatSelect = (cat) => {
    setCurrentPage(1);
    if (brand != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/imprimante?brand=${brand}&category=${cat}`);
      router.push(`/imprimante?brand=${brand}&category=${cat}`);
    } else if (router.asPath.includes('category')){
      setBaseLink(`/imprimante?category=${cat}`);
      router.push(`/imprimante?category=${cat}`);
    } else {
      setBaseLink(`/imprimante?category=${cat}`);
      router.push(`/imprimante?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (category != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/imprimante?category=${category}&brand=${br}`);
      router.push(`/imprimante?category=${category}&brand=${br}`);
    } else if (router.asPath.includes('brand')) {
      setBaseLink(`/imprimante?brand=${br}`);
      router.push(`/imprimante?brand=${br}`);
    }  else {
      setBaseLink(`/imprimante?brand=${br}`);
      router.push(`/imprimante?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  };

  let matchBrand = brands.find((x) => x.slug == brand);

  useEffect(() => {
    if (category != "" && brand != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(30).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(30, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(31).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(31, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        let arr2 = laptopsData
          .filter((r) => r[2] == "Consumabile")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        let newArr = arr.concat(arr2);
        setFilteredData(newArr);
        sortingService.getBrands(53).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(53, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (brand != "") {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByBrand(29, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrand(29, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (category != "") {
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
        let arr2 = laptopsData.filter((r) => r[2] == "Consumabile");
        let newArr = arr.concat(arr2);
        setFilteredData(newArr);
        sortingService.getBrands(53).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(53).then((response) => {
          setHighestPrice(response[1]);
        });
      }
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

  let data = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    if (filteredData.length > 0) {
      return filteredData.slice(firstPageIndex, lastPageIndex);
    } else if (laptopsData.length > 0) {
      return laptopsData.slice(firstPageIndex, lastPageIndex);
    }
    
  }, [currentPage, laptopsData, pageSize, filteredData]);

  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <>
          <LaptopsPage
            title="Imprimante"
            laptopsData={data}
            categories={categories}
            breadcrumbs={printerBrcrmbs}
            brands={brands}
            sortCriteria={onSort}
            baseLink={baseLink}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            catSelect={onCatSelect}
            brandSelect={onBrandSelect}
            filteredData={filteredData}
            multipleQueries={multipleSelected}
            countShow
            totalCount={totalCount}
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
