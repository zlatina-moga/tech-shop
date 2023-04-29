import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../../services/productService";
import LaptopsPage from "../../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../../hooks/usePagination";
import Navbar from "../../../../components/global/Navbar";
import MainSkeleton from "../../../../components/shared/MainSkeleton";
import { brandRefComputersBrcrmbs } from "../../../../data/breadcrumbs";
import Footer from "../../../../components/global/Footer";
import * as sortingService from "../../../../services/sortingService";

const BrandDetail = () => {
  const router = useRouter();
  const { slug, procesor, generatie } = router.query;
  const [itemData, setItemData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/calculatoare/refurbished/brand/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    sortingService.getBrands(2).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessorsByBrand(2, slug).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByBrand(2, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getProcessorGenerationByBrand(2, slug).then((r) => {
      setProcessorsGeneration(r);
    });
    sortingService.getTypes(2).then((r) => {
      setCategories(r);
    });
  }, [slug]);

  useEffect(() => {
    if (procesor) {
      setShow(false);
      productService
        .getAllRefComputersBrandAndProcessor(currentPage, slug, procesor)
        .then((result) => {
          setShow(true);
          setItemData(result);
          setLoading(false)
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (generatie) {
      setShow(false);
      productService
        .getAllRefComputersGenerationAndBrand(currentPage, generatie, slug)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShow(false);
      productService
        .getAllRefComputersBrand(currentPage, slug)
        .then((result) => {
          setShow(true);
          setItemData(result);
          setLoading(false)
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, slug, procesor, generatie]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange) {
      setShow(false)
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedRefComputersByBrandPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          setItemData(result);
          setLoading(false)
          setShow(true)
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      setShow(false)
      productService
        .getSortedRefComputersByBrand(currentPage, slug, sort)
        .then((result) => {
          setShow(true)
          setItemData(result);
          setLoading(false)
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSort, currentPage]);

  /*useEffect(() => {
    const sort = selectedSort.split("=")[1];
    if (priceRange) {
     if (procesor) {
        productService
          .getSortedRefComputersByBrandPriceAndProcessor(
            currentPage,
            slug,
            sort,
            priceRange,
            procesor
          )
          .then((result) => {
            setItemData(result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        productService
          .getSortedRefComputersByBrandPrice(
            currentPage,
            slug,
            sort,
            priceRange
          )
          .then((result) => {
            setItemData(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (sort && procesor) {
      router.push(selectedSort);
      productService
        .getSortedRefComputersByBrandAndProcessor(
          currentPage,
          slug,
          sort,
          procesor
        )
        .then((result) => {
          setLoading(false);
          setItemData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.push(selectedSort);
      productService
        .getSortedRefComputersByBrand(currentPage, slug, sort)
        .then((result) => {
          setLoading(false);
          setItemData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSort, currentPage, priceRange, slug, procesor]);*/

  const onRangeSelect = (range) => {
    setPriceRange(range);
  };

  useEffect(() => {
    setShow(false);
    productService
      .getAllRefComputersByBrandPrice(currentPage, slug, priceRange)
      .then((result) => {
        setItemData(result);
        setLoading(false)
        setTotalPages(result[0].totalPages);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [priceRange, currentPage]);

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
            title={`Calculatoare Refurbished ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={brandRefComputersBrcrmbs}
            categories={categories}
            sortCriteria={onSort}
            baseLink={`/calculatoare/refurbished/brand/${slug}`}
            brands={brands}
            brandLink={"/calculatoare/refurbished/brand/"}
            processors={processors}
            processorsLink={`/calculatoare/refurbished/brand/${slug}?procesor=`}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            processorsGeneration={processorsGeneration}
            processorsGenerationLink={`/calculatoare/refurbished/brand/${slug}?generatie=`}
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
