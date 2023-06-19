import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import * as sortingService from "../services/sortingService";
import Footer from "../components/global/Footer";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../hooks/usePagination";
import { networkCategories } from "../data/categories";
import { networkBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import { usePapaParse } from "react-papaparse";

const Retails = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/retelistica");
  const router = useRouter();
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const { readRemoteFile } = usePapaParse();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/retelistica");
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
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_retelistica", {
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(44).then((result) => {
      setBrands(result);
    });
    sortingService.getHighestPrice(44).then((response) => {
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
      setBaseLink(`/retelistica?brand=${brand}&category=${cat}`);
      router.push(`/retelistica?brand=${brand}&category=${cat}`);
    } else if (router.asPath.includes('category')){
      setBaseLink(`/retelistica?category=${cat}`);
      router.push(`/retelistica?category=${cat}`);
    } 
    else {
      setBaseLink(`/retelistica?category=${cat}`);
      router.push(`/retelistica?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (category != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/retelistica?category=${category}&brand=${br}`);
      router.push(`/retelistica?category=${category}&brand=${br}`);
    } else if (router.asPath.includes('brand')) {
      setBaseLink(`/retelistica?brand=${br}`);
      router.push(`/retelistica?brand=${br}`);
    } else {
      setBaseLink(`/retelistica?brand=${br}`);
      router.push(`/retelistica?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  }

  let matchBrand = brands.find((x) => x.slug == brand);

  useEffect(() => {
    if (category != "" && brand != "") {
      if (category == "access-point-uri") {
        let arr = laptopsData
          .filter((r) => r[2] == "Access Point-uri")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(73).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(73, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "adaptoare-wireless") {
        let arr = laptopsData
          .filter((r) => r[2] == "Adaptoare Wireless")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(71).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(71, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "placi-de-retea") {
        let arr = laptopsData
          .filter((r) => r[2] == "Placi de retea")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(70).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(70, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "routere") {
        let arr = laptopsData
          .filter((r) => r[2] == "Routere")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(69).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(69, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "switch-uri") {
        let arr = laptopsData
          .filter((r) => r[2] == "Switch-uri")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(72).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(72, `${matchBrand.slug}-${matchBrand.id}`)
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
        .getTypesByBrand(44, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrand(44, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (category == "access-point-uri") {
      let arr = laptopsData
        .filter((r) => r[2] == "Access Point-uri")
      setFilteredData(arr);
      sortingService.getBrands(73).then((result) => {
        setBrands(result);
      });
      sortingService
        .getHighestPrice(73)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (category == "adaptoare-wireless") {
      let arr = laptopsData
        .filter((r) => r[2] == "Adaptoare Wireless")
      setFilteredData(arr);
      sortingService.getBrands(71).then((result) => {
        setBrands(result);
      });
      sortingService
        .getHighestPrice(71)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (category == "placi-de-retea") {
      let arr = laptopsData
        .filter((r) => r[2] == "Placi de retea")
      setFilteredData(arr);
      sortingService.getBrands(70).then((result) => {
        setBrands(result);
      });
      sortingService
        .getHighestPrice(70)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (category == "routere") {
      let arr = laptopsData
        .filter((r) => r[2] == "Routere")
       
      setFilteredData(arr);
      sortingService.getBrands(69).then((result) => {
        setBrands(result);
      });
      sortingService
        .getHighestPrice(69)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (category == "switch-uri") {
      let arr = laptopsData
        .filter((r) => r[2] == "Switch-uri")
      
      setFilteredData(arr);
      sortingService.getBrands(72).then((result) => {
        setBrands(result);
      });
      sortingService
        .getHighestPrice(72)
        .then((response) => {
          setHighestPrice(response[1]);
        });
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
      let newA = filteredData.slice(firstPageIndex, lastPageIndex);
      return newA;
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
            title="Retelistica"
            laptopsData={data}
            categories2={networkCategories}
            breadcrumbs={networkBrcrmbs}
            brands={brands}
            sortCriteria={onSort}
            baseLink={baseLink}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            catSelect={onCatSelect}
            brandSelect={onBrandSelect}
            filteredData={data}
            multipleQueries={multipleSelected}
            countShow={false}
            totalCount={totalCount}
          />
          {currentPage === 0 || totalPages < 2 ? null : (
            <nav>
              <ul className="pagination justify-content-center flex-wrap">
                <>
                  <li className="page-item" style={{ cursor: "pointer" }}>
                    <a className="page-link" onClick={prevPage}>
                      <i id='arrow' className="fas fa-arrow-left text-primary mr-1"></i>
                    </a>
                  </li>
                  {paginationRange &&
                    paginationRange.map((page) => (
                      <li
                        className={`page-item ${
                          currentPage == page ? "active" : ""
                        }  ${page == DOTS ? "dots" : ""}`}
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
                      <i id='arrow' className="fas fa-arrow-right text-primary mr-1"></i>
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

export default Retails;
