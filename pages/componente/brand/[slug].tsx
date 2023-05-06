import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../services/productService";
import LaptopsPage from "../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import Navbar from "../../../components/global/Navbar";
import MainSkeleton from "../../../components/shared/MainSkeleton";
import { componentBrandBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as sortingService from "../../../services/sortingService";

const BrandDetail = () => {
  const router = useRouter();
  const { slug, componenta } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(`/componente/brand/${slug}`);
  const [brands, setBrands] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/componente/brand/${slug}`);

  useEffect(() => {
    sortingService.getBrands(24).then((result) => {
      setBrands(result);
    });
    sortingService.getHighestPriceByBrand(24, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getComponentsByBrand(24, slug).then((res) => {
      setCategories(res);
    });
  }, [slug]);

  useEffect(() => {
    if (componenta) {
      setShow(false);
      productService
        .geAllBrandComponentsByType(currentPage, slug, componenta)
        .then((result) => {
          setLoading(false);
          seItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/componente/brand/${slug}?componenta=${componenta}`);
        });
      sortingService
        .getHighestPriceByComponentAndBrand(24, slug, componenta)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else {
      setShow(false);
      productService
        .geAllBrandComponents(currentPage, slug)
        .then((result) => {
          setLoading(false);
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/componente/brand/${slug}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, slug, componenta]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if ( priceRange && componenta && selectedSort != `/componente/brand/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedBrandTypeComponentsPrice(
          currentPage,
          slug,
          sort,
          priceRange,
          componenta
        )
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (componenta && selectedSort != `/componente/brand/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedBrandTypeComponents(currentPage, slug, sort, componenta)
        .then((result) => {
          setShow(true);
          seItemsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange && !componenta) {
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedBrandComponentsPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          seItemsData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != `/componente/brand/${slug}`) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedBrandComponents(currentPage, slug, sort)
        .then((result) => {
          setLoading(false);
          seItemsData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSort, currentPage, priceRange]);

  const onRangeSelect = (range) => {
    setPriceRange(range);
  };

  useEffect(() => {
    if (priceRange && componenta) {
      setShow(false);
      productService
        .getBrandTypeComponentsPrice(currentPage, slug, priceRange, componenta)
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShow(false);
      productService
        .geAllBrandComponentsPrice(currentPage, slug, priceRange)
        .then((result) => {
          seItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [priceRange, currentPage, slug]);

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
  if (slug != undefined) {
    let slugToStr = slug as string;
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
            title={`Componente ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={componentBrandBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            processors={categories}
            processorsLink={`/componente/brand/${slug}?componenta=`}
            brands={brands}
            brandLink={"/componente/brand/"}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            secTitle={"Tip"}
            multipleQueries={multipleSelected}
          />
          {currentPage === 0 || totalPages < 2 ? null : (
            <nav>
              <ul className="pagination justify-content-center flex-wrap">
                <>
                  <li className="page-item" style={{ cursor: "pointer" }}>
                    <a className="page-link" onClick={prevPage}>
                      <i className="fas fa-arrow-left text-primary mr-1"></i>
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
                      <i className="fas fa-arrow-right text-primary mr-1"></i>
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

export default BrandDetail;
