import { useState, useEffect ,useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import * as sortingService from "../services/sortingService";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../hooks/usePagination";
import { componentCategories } from "../data/categories";
import { componentBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import { usePapaParse } from "react-papaparse";

const Componente = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/componente");
  const router = useRouter();
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const { readRemoteFile } = usePapaParse();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/componente");
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
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_componente", {
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(24).then((result) => {
      setBrands(result);
    });
    sortingService.getHighestPrice(24).then((response) => {
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
      setBaseLink(`/componente?brand=${brand}&category=${cat}`);
      router.push(`/componente?brand=${brand}&category=${cat}`);
    } else if (router.asPath.includes('category')){
      setBaseLink(`/componente?category=${cat}`);
      router.push(`/componente?category=${cat}`);
    } 
    else {
      setBaseLink(`/componente?category=${cat}`);
      router.push(`/componente?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (category != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/componente?category=${category}&brand=${br}`);
      router.push(`/componente?category=${category}&brand=${br}`);
    } else if (router.asPath.includes('brand')) {
      setBaseLink(`/componente?brand=${br}`);
      router.push(`/componente?brand=${br}`);
    } else {
      setBaseLink(`/componente?brand=${br}`);
      router.push(`/componente?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  }

  let matchBrand = brands.find((x) => x.slug == brand);

  useEffect(() => {
    if (category != "" && brand != "") {
      if (category == "alimentator-laptop") {
        let arr = laptopsData
          .filter((r) => r[2] == "Alimentator laptop")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(81).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(81, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "barebone-calculator") {
        let arr = laptopsData
          .filter((r) => r[2] == "Barebone calculator")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(89).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(89, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "baterie-laptop") {
        let arr = laptopsData
          .filter((r) => r[2] == "Baterie Laptop")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(80).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(80, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "caddy-server") {
        let arr = laptopsData
          .filter((r) => r[2] == "Caddy server")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(83).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(83, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "carcasa-si-surse") {
        let arr = laptopsData
          .filter((r) => r[2] == "Carcasa si Surse")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(88).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(88, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "controller-raid") {
        let arr = laptopsData
          .filter((r) => r[2] == "Controller Raid")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(86).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(86, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "coolere-si-radiatoare") {
        let arr = laptopsData
          .filter((r) => r[2] == "Coolere si radiatoare")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(92).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(92, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "hard-disk") {
        let arr = laptopsData
          .filter((r) => r[2] == "Hard Disk")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(74).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(74, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "masca-bay-server") {
        let arr = laptopsData
          .filter((r) => r[2] == "Masca Bay server")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(85).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(85, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "memorie-ram") {
        let arr = laptopsData
          .filter((r) => r[2] == "Memorie RAM")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(75).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(75, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "palmrest") {
        let arr = laptopsData
          .filter((r) => r[2] == "Palmrest")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(82).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(82, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "placa-de-baza-calculator") {
        let arr = laptopsData
          .filter((r) => r[2] == "Placa de baza calculator")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(94).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(94, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "placa-de-retea") {
        let arr = laptopsData
          .filter((r) => r[2] == "Placa de retea")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(87).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(87, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "placa-video") {
        let arr = laptopsData
          .filter((r) => r[2] == "Placa Video")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(76).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(76, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "procesor") {
        let arr = laptopsData
          .filter((r) => r[2] == "Procesor")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(77).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(77, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "railkit-server") {
        let arr = laptopsData
          .filter((r) => r[2] == "RailKit server")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(84).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(84, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "tastatura-laptop") {
        let arr = laptopsData
          .filter((r) => r[2] == "Tastatura laptop")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(79).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(79, `${matchBrand.slug}-${matchBrand.id}`)
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
        .getTypesByBrand(24, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrand(24, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (category != "") {
      if (category == "alimentator-laptop") {
        let arr = laptopsData
          .filter((r) => r[2] == "Alimentator laptop")
        setFilteredData(arr);
        sortingService.getBrands(81).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(81)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "barebone-calculator") {
        let arr = laptopsData
          .filter((r) => r[2] == "Barebone calculator")
         
        setFilteredData(arr);
        sortingService.getBrands(89).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(89)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "baterie-laptop") {
        let arr = laptopsData
          .filter((r) => r[2] == "Baterie Laptop")

        setFilteredData(arr);
        sortingService.getBrands(80).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(80)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "caddy-server") {
        let arr = laptopsData
          .filter((r) => r[2] == "Caddy server")
         
        setFilteredData(arr);
        sortingService.getBrands(83).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(83)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "carcasa-si-surse") {
        let arr = laptopsData
          .filter((r) => r[2] == "Carcasa si Surse")
          
        setFilteredData(arr);
        sortingService.getBrands(88).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(88)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "controller-raid") {
        let arr = laptopsData
          .filter((r) => r[2] == "Controller Raid")
         
        setFilteredData(arr);
        sortingService.getBrands(86).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(86)
          .then((response) => {
            setHighestPrice(response[1]);
          });

      } else if (category == "coolere-si-radiatoare") {
        let arr = laptopsData
          .filter((r) => r[2] == "Coolere si radiatoare")
          
        setFilteredData(arr);
        sortingService.getBrands(92).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(92)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "hard-disk") {
        let arr = laptopsData
          .filter((r) => r[2] == "Hard Disk")
         
        setFilteredData(arr);
        sortingService.getBrands(74).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(74)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "masca-bay-server") {
        let arr = laptopsData
          .filter((r) => r[2] == "Masca Bay server")
         
        setFilteredData(arr);
        sortingService.getBrands(85).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(85)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "memorie-ram") {
        let arr = laptopsData
          .filter((r) => r[2] == "Memorie RAM")
          
        setFilteredData(arr);
        sortingService.getBrands(75).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(75)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "palmrest") {
        let arr = laptopsData
          .filter((r) => r[2] == "Palmrest")
        
        setFilteredData(arr);
        sortingService.getBrands(82).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(82)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "placa-de-baza-calculator") {
        let arr = laptopsData
          .filter((r) => r[2] == "Placa de baza calculator")
         
        setFilteredData(arr);
        sortingService.getBrands(94).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(94)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "placa-de-retea") {
        let arr = laptopsData
          .filter((r) => r[2] == "Placa de retea")
        
        setFilteredData(arr);
        sortingService.getBrands(87).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(87)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "placa-video") {
        let arr = laptopsData
          .filter((r) => r[2] == "Placa Video")
         
        setFilteredData(arr);
        sortingService.getBrands(76).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(76)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "procesor") {
        let arr = laptopsData
          .filter((r) => r[2] == "Procesor")
          
        setFilteredData(arr);
        sortingService.getBrands(77).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(77)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "railkit-server") {
        let arr = laptopsData
          .filter((r) => r[2] == "RailKit server")
         
        setFilteredData(arr);
        sortingService.getBrands(84).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(84)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "tastatura-laptop") {
        let arr = laptopsData
          .filter((r) => r[2] == "Tastatura laptop")
         
        setFilteredData(arr);
        sortingService.getBrands(79).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPrice(79)
          .then((response) => {
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
            title="Componente"
            laptopsData={data}
            categories2={componentCategories}
            breadcrumbs={componentBrcrmbs}
            brands={brands}
            //brandLink={"/componente/brand/"}
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

export default Componente;
