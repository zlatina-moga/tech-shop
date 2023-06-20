import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import * as sortingService from "../services/sortingService";
import LaptopsPage from "../components/shared/LaptopsPage";
import {  usePagination, DOTS  } from "../hooks/usePagination";
import { posBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import Footer from "../components/global/Footer";
import { usePapaParse } from "react-papaparse";

const SistemePOS = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/sisteme-pos");
  const router = useRouter();
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const { readRemoteFile } = usePapaParse();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/sisteme-pos");
  const [totalPages, setTotalPages] = useState(1);
  const [processor, setProcessor] = useState("");

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
  }, [getTotalPages, filteredData.length, pageSize]);

  useEffect(() => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_sisteme-pos",{
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(34).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(34).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPrice(34).then((response) => {
      setHighestPrice(response[1]);
    })
    sortingService.getTypes(34).then((r) => {
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
    if (priceRange != "" && category != "" && brand != "" && processor != "") {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (
      priceRange != "" &&
      (category != "" || brand != "" || processor != "")
    ) {
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
  }, [priceRange, brand, category, processor]);

  const onCatSelect = (cat) => {
    setCurrentPage(1);
    if (
      processor != "" &&
      brand != "" &&
      !router.asPath.includes("category")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${cat}&brand=${brand}&procesor=${processor}`
      );
      router.push(
        `/sisteme-pos?category=${cat}&brand=${brand}&procesor=${processor}`
      );
    } else if (
      processor != "" &&
      brand != "" &&
      !router.asPath.includes("category")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${cat}&brand=${brand}&procesor=${processor}`
      );
      router.push(
        `/sisteme-pos?category=${cat}&brand=${brand}&procesor=${processor}`
      );
    } else if (
      processor != "" &&
      brand != "" &&
      !router.asPath.includes("category")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${cat}&brand=${brand}&procesor=${processor}`
      );
      router.push(
        `/sisteme-pos?category=${cat}&brand=${brand}&procesor=${processor}`
      );
    } else if (
      processor != "" &&
      !router.asPath.includes("category")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${cat}&procesor=${processor}`
      );
      router.push(
        `/sisteme-pos?category=${cat}&procesor=${processor}`
      );
    } else if (
      brand != "" &&
      !router.asPath.includes("category")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${cat}&brand=${brand}`
      );
      router.push(
        `/sisteme-pos?category=${cat}&brand=${brand}`
      );
    } else if (
      processor != "" &&
      brand != "" &&
      !router.asPath.includes("category")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${cat}&brand=${brand}&procesor=${processor}`
      );
      router.push(
        `/sisteme-pos?category=${cat}&brand=${brand}&procesor=${processor}`
      );
    } else if (
      processor != "" &&
      !router.asPath.includes("category")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${cat}&procesor=${processor}`
      );
      router.push(
        `/sisteme-pos?category=${cat}&procesor=${processor}`
      );
    } else if (
      brand != "" &&
      !router.asPath.includes("category")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${cat}&brand=${brand}`
      );
      router.push(
        `/sisteme-pos?category=${cat}&brand=${brand}`
      );
    } else if (router.asPath.includes("category")) {
      setBaseLink(`/sisteme-pos?category=${cat}`);
      router.push(`/sisteme-pos?category=${cat}`);
    } else {
      setBaseLink(`/sisteme-pos?category=${cat}`);
      router.push(`/sisteme-pos?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (
      processor != "" &&
      category != "" &&
      !router.asPath.includes("brand")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${category}&procesor=${processor}&brand=${br}`
      );
      router.push(
        `/sisteme-pos?category=${category}&procesor=${processor}&brand=${br}`
      );
    } else if (
      processor != "" &&
      !router.asPath.includes("brand")
    ) {
      setBaseLink(
        `/sisteme-pos?procesor=${processor}&brand=${br}`
      );
      router.push(
        `/sisteme-pos?procesor=${processor}&brand=${br}}`
      );
    } else if (
      category != "" &&
      !router.asPath.includes("brand")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${category}&brand=${br}`
      );
      router.push(
        `/sisteme-pos?category=${category}&brand=${br}`
      );
    } else if (router.asPath.includes("brand")) {
      setBaseLink(`/sisteme-pos?brand=${br}`);
      router.push(`/sisteme-pos?brand=${br}`);
    } else {
      setBaseLink(`/sisteme-pos?brand=${br}`);
      router.push(`/sisteme-pos?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  };

  const onProcessorSelect = (processor) => {
    setCurrentPage(1);
    if (
      brand != "" &&
      category != "" &&
      !router.asPath.includes("procesor")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${category}&brand=${brand}&procesor=${processor}`
      );
      router.push(
        `/sisteme-pos?category=${category}&brand=${brand}&procesor=${processor}`
      );
    }  else if (
      brand != "" &&
      !router.asPath.includes("procesor")
    ) {
      setBaseLink(
        `/sisteme-pos?brand=${brand}&procesor=${processor}`
      );
      router.push(
        `/sisteme-pos?brand=${brand}&procesor=${processor}`
      );
    } else if (
      category != "" &&
      !router.asPath.includes("procesor")
    ) {
      setBaseLink(
        `/sisteme-pos?category=${category}&procesor=${processor}`
      );
      router.push(
        `/sisteme-pos?category=${category}&procesor=${processor}`
      );
    } else if (router.asPath.includes("procesor")) {
      setBaseLink(`/sisteme-pos?procesor=${processor}`);
      router.push(`/sisteme-pos?procesor=${processor}`);
    } else {
      setBaseLink(`/sisteme-pos?procesor=${processor}`);
      router.push(`/sisteme-pos?procesor=${processor}`);
    }
    setMultupleSelected(true);
    setProcessor(processor);
  };

  let matchBrand = brands.find((x) => x.slug == brand);
  let matchProc = processors.find((x) => x.slug == processor);

  useEffect(() => {
    if (category != "" && brand != "" && processor != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[27].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessor(35, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[27].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(36, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            
            
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[27].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(58, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
  
            
      }
    } else if (category != "" && brand != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(35, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(35, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });        
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(36, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(36, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(58, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(58, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
      }
    } else if (category != "" && processor != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[27].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(35, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(35, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[27].toLowerCase() ==  processor.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(36, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(36, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[27].toLowerCase() ==  processor.split('-').join(' '));
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(58, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(58, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (brand != '' && processor != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[27].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrand(34, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessor(34, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
    } else if (brand != "") {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByBrand(34, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrand(34, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrand(34, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
          setProcessors(result);
        });
    } else if (category != "") {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished");
        setFilteredData(arr);
        sortingService.getBrands(35).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(35).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(35).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand");
        setFilteredData(arr);
        sortingService.getBrands(36).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(36).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(36).then((r) => setProcessors(r))

      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Noi");
        setFilteredData(arr);
        sortingService.getBrands(58).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(58).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(58).then((r) => setProcessors(r))
      }
    } else if (processor != "") {
      let arr = laptopsData.filter(
        (r) => r[27].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByProcessor(34, `${matchProc.slug}-${matchProc.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessor(34,`${matchProc.slug}-${matchProc.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessor(34,`${matchProc.slug}-${matchProc.id}`).then((response) => {
        setBrands(response)
      });
    } 
  }, [brand, category, processor]);

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
            title="Sisteme POS"
            laptopsData={data}
            categories={categories}
            breadcrumbs={posBrcrmbs}
            brands={brands}
            processors={processors}
            sortCriteria={onSort}
            baseLink={baseLink}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            catSelect={onCatSelect}
            brandSelect={onBrandSelect}
            filteredData={data}
            multipleQueries={multipleSelected}
            countShow
            totalCount={totalCount}
            procSelect={onProcessorSelect}
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
                  {paginationRange &&  paginationRange.map((page) => (
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

export default SistemePOS;
