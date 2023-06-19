import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import * as sortingService from "../services/sortingService";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../hooks/usePagination";
import { accessoryBreadCrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import { usePapaParse } from "react-papaparse";
import { accessoryCategories } from "../data/categories";

const Accesorii = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/accesorii");
  const router = useRouter();
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const { readRemoteFile } = usePapaParse();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/accesorii");
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
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_accesorii", {
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(47).then((result) => {
      setBrands(result);
    });
    sortingService.getHighestPrice(47).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getAccessoriesTypes(47).then((r) => {
      setCategories(r);
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
      setBaseLink(`/accesorii?category=${cat}&brand=${brand}`);
      router.push(`/accesorii?category=${cat}&brand=${brand}`);
    } else if (router.asPath.includes('category')) {
      setBaseLink(`/accesorii?category=${cat}`);
      router.push(`/accesorii?category=${cat}`);
    } else {
      setBaseLink(`/accesorii?category=${cat}`);
      router.push(`/accesorii?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (category != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/accesorii?category=${category}&brand=${br}`);
      router.push(`/accesorii?category=${category}&brand=${br}`);
    } else if (router.asPath.includes('brand')) {
      setBaseLink(`/accesorii?brand=${br}`);
      router.push(`/accesorii?brand=${br}`);
    } else {
      setBaseLink(`/accesorii?brand=${br}`);
      router.push(`/accesorii?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  };

  let matchBrand = brands.find((x) => x.slug == brand);

  useEffect(() => {
    if (category != "" && brand != "") {
      if (category == "genti") {
        let arr = laptopsData
          .filter((r) => r[2] == "Genti")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(60).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(60, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "casti") {
        let arr = laptopsData
          .filter((r) => r[2] == "Casti")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(67).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(67, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "periferice-diverse") {
        let arr = laptopsData
          .filter((r) => r[2] == "Periferice Diverse")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(65).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(65, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "camere-web") {
        let arr = laptopsData
          .filter((r) => r[2] == "Camere Web")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(62).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(62, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "cabluri-si-adaptoare") {
        let arr = laptopsData
          .filter((r) => r[2] == "Cabluri si Adaptoare")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(68).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(68, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "docking-station") {
        let arr = laptopsData
          .filter((r) => r[2] == "Docking Station")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(66).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(66, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "tastaturi") {
        let arr = laptopsData
          .filter((r) => r[2] == "Tastaturi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(64).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(64, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "mouse") {
        let arr = laptopsData
          .filter((r) => r[2] == "Mouse")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(61).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(61, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "gaming-console") {
        let arr = laptopsData
          .filter((r) => r[2] == "Gaming & Console")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(91).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(91, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "videoproiectoare") {
        let arr = laptopsData
          .filter((r) => r[2] == "Videoproiectoare")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(90).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(90, `${matchBrand.slug}-${matchBrand.id}`)
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
        .getTypesByBrand(47, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrand(47, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (category != "") {
      if (category == "genti") {
        let arr = laptopsData.filter((r) => r[2] == "Genti");
        setFilteredData(arr);
        sortingService.getBrands(60).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(60).then((response) => {
          setHighestPrice(response[1]);
        });
      } else if (category == "casti") {
        let arr = laptopsData.filter((r) => r[2] == "Casti");
        setFilteredData(arr);
        sortingService.getBrands(67).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(67).then((response) => {
          setHighestPrice(response[1]);
        });
      } else if (category == "periferice-diverse") {
        let arr = laptopsData.filter((r) => r[2] == "Periferice Diverse");
        setFilteredData(arr);
        sortingService.getBrands(65).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(65).then((response) => {
          setHighestPrice(response[1]);
        });
      } else if (category == "camere-web") {
        let arr = laptopsData.filter((r) => r[2] == "Camere Web");
        setFilteredData(arr);
        sortingService.getBrands(62).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(62).then((response) => {
          setHighestPrice(response[1]);
        });
      } else if (category == "cabluri-si-adaptoare") {
        let arr = laptopsData.filter((r) => r[2] == "Cabluri si Adaptoare");
        setFilteredData(arr);
        sortingService.getBrands(68).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(68).then((response) => {
          setHighestPrice(response[1]);
        });
      } else if (category == "docking-station") {
        let arr = laptopsData.filter((r) => r[2] == "Docking Station");
        setFilteredData(arr);
        sortingService.getBrands(66).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(66).then((response) => {
          setHighestPrice(response[1]);
        });
      } else if (category == "tastaturi") {
        let arr = laptopsData.filter((r) => r[2] == "Tastaturi");
        setFilteredData(arr);
        sortingService.getBrands(64).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(64).then((response) => {
          setHighestPrice(response[1]);
        });
      } else if (category == "mouse") {
        let arr = laptopsData.filter((r) => r[2] == "Mouse");
        setFilteredData(arr);
        sortingService.getBrands(61).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(61).then((response) => {
          setHighestPrice(response[1]);
        });
      } else if (category == "gaming-console") {
        let arr = laptopsData.filter((r) => r[2] == "Gaming & Console");
        setFilteredData(arr);
        sortingService.getBrands(91).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(91).then((response) => {
          setHighestPrice(response[1]);
        });
      } else if (category == "videoproiectoare") {
        let arr = laptopsData.filter((r) => r[2] == "Videoproiectoare");
        setFilteredData(arr);
        sortingService.getBrands(90).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(90).then((response) => {
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
            title="Accesorii"
            laptopsData={data}
            categories2={accessoryCategories}
            breadcrumbs={accessoryBreadCrmbs}
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
                      <i
                        id="arrow"
                        className="fas fa-arrow-left text-primary mr-1"
                      ></i>
                    </a>
                  </li>
                  {paginationRange.map((page) => (
                    <li
                      className={`page-item ${
                        currentPage == page ? "active" : ""
                      } ${page == DOTS ? "dots" : ""} `}
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

export default Accesorii;
