import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../../services/productService";
import LaptopsPage from "../../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../../hooks/usePagination";
import Navbar from "../../../../components/global/Navbar";
import MainSkeleton from "../../../../components/shared/MainSkeleton";
import { brandRefServersBrcrmbs } from "../../../../data/breadcrumbs";
import Footer from "../../../../components/global/Footer";
import * as sortingService from "../../../../services/sortingService";

const BrandDetail = () => {
  const router = useRouter();
  const { slug, procesor } = router.query;
  const [itemData, setItemData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/servere/refurbished/brand/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/servere/refurbished/brand/${slug}`);

  useEffect(() => {
    sortingService.getBrands(10).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessorsByBrand(10, slug).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByBrand(10, slug).then((response) => {
      setHighestPrice(response[1]);
    });
  }, [slug]);

  useEffect(() => {
    if (!router.isReady) return;
    if (procesor) {
      setShow(false);
      productService
        .getAllRefServerBrandAndProcessor(currentPage, slug, procesor)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/servere/refurbished/brand/${slug}?procesor=${procesor}`);
        })
        .catch((err) => {
          console.log(err);
        });
        sortingService
        .getHighestPriceByBrandTypeAndProcessor(9, slug, procesor, 'refurbished-2')
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else {
      setShow(false);
      productService
        .getAllRefServersBrand(currentPage, slug)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setBaseLink(`/servere/refurbished/brand/${slug}`);
        });
    }
  }, [router.isReady, currentPage, slug, procesor]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange != ''  && procesor  && selectedSort != `/servere/refurbished/brand/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefServersByBrandProcessorPrice (
          currentPage,
          slug,
          sort,
          procesor,
          priceRange
        )
        .then((result) => {
          setItemData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange  != '' && !procesor && selectedSort != `/servere/refurbished/brand/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedRefServersByBrandPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setLoading(false)
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (procesor && selectedSort != `/servere/refurbished/brand/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefServersByBrandAndProcessor(
          currentPage,
          slug,
          sort,
          procesor
        )
        .then((result) => {
          setShow(true);
          setItemData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != `/servere/refurbished/brand/${slug}`) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      setShow(false);
      productService
        .getSortedRefServersByBrand(currentPage, slug, sort)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
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
    if (priceRange != '' && procesor) {
      setShow(false);
      productService
        .getAllRefServersByBrandProcessorPrice(
          currentPage,
          slug,
          procesor,
          priceRange
        )
        .then((result) => {
          setItemData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '') {
      setShow(false);
      productService
        .getAllRefServerByBrandPrice(currentPage, slug, priceRange)
        .then((result) => {
          setItemData(result);
          //setTotalPages(result[0].totalPages);
          setShow(true);
          setLoading(false)
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
            title={`Servere Refurbished ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={brandRefServersBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/servere/refurbished/brand/"}
            processors={processors}
            processorsLink={`/servere/refurbished/brand/${slug}?procesor=`}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            multipleQueries={multipleSelected}
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

export default BrandDetail;
