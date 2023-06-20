import { useState, useEffect, useMemo  } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import * as sortingService from "../services/sortingService";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../hooks/usePagination";
import { monitorBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import { usePapaParse } from "react-papaparse";

const Monitoare = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/monitoare");
  const router = useRouter();
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const [screens, setScreens] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/monitoare");
  const { readRemoteFile } = usePapaParse();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [screen, setScreen] = useState("");

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
    readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_monitoare", {
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(18).then((result) => {
      setBrands(result);
    });
    sortingService.getHighestPrice(18).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getTypes(18).then((r) => {
      setCategories(r);
    });
    sortingService.getScreenSizes(18).then((res) => {
      setScreens(res);
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
    if (priceRange != "" && category != "" && brand != "" && screen != '') {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (priceRange != "" && (category != "" || brand != "" || screen != '')) {
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
  }, [priceRange, brand, category, screen]);

  const onCatSelect = (cat) => {
    setCurrentPage(1);
    if (brand != "" && screen !='' && !(router.asPath.includes('category'))) {
      setBaseLink(`/monitoare?brand=${brand}&screen=${screen}&category=${cat}`);
      router.push(`/monitoare?brand=${brand}&screen=${screen}&category=${cat}`);
    } else if (screen != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/monitoare?screen=${screen}&category=${cat}`);
      router.push(`/monitoare?screen=${screen}&category=${cat}`);
    } else if (brand != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/monitoare?brand=${brand}&category=${cat}`);
      router.push(`/monitoare?brand=${brand}&category=${cat}`);
    } else if (router.asPath.includes('category')){
      setBaseLink(`/monitoare?category=${cat}`);
      router.push(`/monitoare?category=${cat}`);
    } else {
      setBaseLink(`/monitoare?category=${cat}`);
      router.push(`/monitoare?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (category != "" && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/monitoare?brand=${brand}&screen=${screen}&category=${category}`);
      router.push(`/monitoare?brand=${brand}&screen=${screen}&category=${category}`);
    } else if (screen != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/monitoare?screen=${screen}&brand=${br}`);
      router.push(`/monitoare?screen=${screen}&brand=${br}`);
    } else if (category != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/monitoare?category=${category}&brand=${br}`);
      router.push(`/monitoare?category=${category}&brand=${br}`);
    } else if (router.asPath.includes('brand')){
      setBaseLink(`/monitoare?brand=${br}`);
      router.push(`/monitoare?brand=${br}`);
    } else {
      setBaseLink(`/monitoare?brand=${br}`);
      router.push(`/monitoare?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  };

  const onScreenSelect = (scr) => {
    setCurrentPage(1);
    if (brand != "" && category != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/monitoare?category=${category}&brand=${brand}&screen=${scr}`);
      router.push(`/monitoare?category=${category}&brand=${brand}&screen=${scr}`);
    } else if (category != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/monitoare?category=${category}&screen=${scr}`);
      router.push(`/monitoare?category=${category}&screen=${scr}`);
    } else if (brand != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/monitoare?brand=${brand}&screen=${scr}`);
      router.push(`/monitoare?brand=${brand}&screen=${scr}`);
    } else if (router.asPath.includes('screen')){
      setBaseLink(`/monitoare?screen=${scr}`);
      router.push(`/monitoare?screen=${scr}`);
    } else {
      setBaseLink(`/monitoare?screen=${scr}`);
      router.push(`/monitoare?screen=${scr}`);
    }
    setMultupleSelected(true);
    setScreen(scr)
  };

  let matchBrand = brands.find((x) => x.slug == brand);
  let matchScreen = screens.find((x) => x.slug == screen);

  useEffect(() => {
    if (category != "" && brand != "" && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28] == screen.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrands(19).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrandAndScreen(19, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getScreenSizesByBrand(19, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setScreens(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28] == screen.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrands(20).then((result) => {
          setBrands(result);
        });
        sortingService
        .getHighestPriceByBrandAndScreen(20, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getScreenSizesByBrand(20, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setScreens(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28] == screen.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrands(54).then((result) => {
          setBrands(result);
        });
        sortingService
        .getHighestPriceByBrandAndScreen(54, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getScreenSizesByBrand(54, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setScreens(res);
          });
      }
    } else if (category != "" && brand != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(19).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(19, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getScreenSizesByBrand(19, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setScreens(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(20).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(20, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getScreenSizesByBrand(20, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setScreens(res);
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
        sortingService.getBrands(54).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(54, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getScreenSizesByBrand(54, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setScreens(res);
          });
      }
    } else if (category != "" && screen != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[28] == screen.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrandsByScreenSizes(19, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByScreen(19,  `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[28] == screen.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrandsByScreenSizes(20, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByScreen(20,  `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[28] == screen.split('-').join(' ')
          );

        setFilteredData(arr);
        sortingService.getBrands(54).then((result) => {
          setBrands(result);
        });
        sortingService
        .getHighestPriceByScreen(54, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      }
    } else if (brand != "" && screen !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[28] == screen.split('-').join(' ')
      );
      setFilteredData(arr);
      sortingService
        .getTypesByBrand(18, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });

      sortingService
        .getHighestPriceByBrandAndScreen(18, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });

        sortingService
        .getScreenSizesByBrand(18, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (brand != "") {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByBrand(18, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });

      sortingService
        .getHighestPriceByBrand(18, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });

        sortingService
        .getScreenSizesByBrand(18, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (category != "") {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished");
        setFilteredData(arr);
        sortingService.getBrands(19).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(19).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getScreenSizes(19).then((res) => {
          setScreens(res);
        });
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand");
        setFilteredData(arr);
        sortingService.getBrands(20).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(20).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getScreenSizes(20).then((res) => {
          setScreens(res);
        });
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Noi");
        let arr2 = laptopsData.filter((r) => r[2] == "Consumabile");
        let newArr = arr.concat(arr2);
        setFilteredData(newArr);
        sortingService.getBrands(54).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(54).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getScreenSizes(54).then((res) => {
          setScreens(res);
        });
      }
    }  else if (screen != "") {
      let arr = laptopsData.filter(
        (r) => r[28] == screen.split('-').join(' ')
      );
      setFilteredData(arr);
      sortingService
        .getTypesByScreen(18, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });

      sortingService
        .getHighestPriceByScreen(18, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });

        sortingService
        .getBrandsByScreenSizes(18, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setBrands(response);
        });
    }
  }, [brand, category, screen]);

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
            title={`Monitoare`}
            laptopsData={data}
            categories={categories}
            breadcrumbs={monitorBrcrmbs}
            brands={brands}
            sortCriteria={onSort}
            baseLink={baseLink}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            screens={screens}
            multipleQueries={multipleSelected}
            countShow
            totalCount={totalCount}
            catSelect={onCatSelect}
            brandSelect={onBrandSelect}
            filteredData={data}
            scrSelect={onScreenSelect}
          />
          {currentPage === 0 || totalPages < 2 ? null : (
            <nav id="pagination-container">
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

export default Monitoare;
