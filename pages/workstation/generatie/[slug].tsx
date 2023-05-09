import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../services/productService";
import LaptopsPage from "../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import Navbar from "../../../components/global/Navbar";
import MainSkeleton from "../../../components/shared/MainSkeleton";
import { generationWorkstationBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as sortingService from "../../../services/sortingService";

const BrandDetail = () => {
  const router = useRouter();
  const { slug, procesor, brand } = router.query;
  const [itemData, setItemData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(`/workstation/generatie/${slug}`);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/workstation/generatie/${slug}`);
  const [processorsLink, setProcessorslink] = useState(`/workstation/generatie/${slug}?procesor=`);
  const [brandLink, setBrandLink] = useState(`/workstation/generatie/${slug}?brand=`)

  useEffect(() => {
    sortingService.getBrandsByGeneration(15, slug).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessorsByGeneration(15, slug).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByGen(15, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getProcessorGeneration(15).then((r) => {
      setProcessorsGeneration(r);
    });
  }, [slug]);

  useEffect(() => {
    if (brand && procesor) {
      setShow(false);
      productService
        .getAllWorkstationsGenerationBrandAndProcesorGeneration(currentPage, slug, brand, procesor)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/workstation/generatie/${slug}?procesor=${procesor}&brand=${brand}`);
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByBrandGenerationAndProcessor(15, brand, slug, procesor)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (procesor) {
      setShow(false);
      productService
        .getAllWorkstationsGenerationAndProcessor(currentPage, slug, procesor)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/workstation/generatie/${slug}?procesor=${procesor}`);
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByGenerationAndProcessor(15, slug, procesor)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessor(15, slug, procesor).then((result) => {
          setBrands(result);
        });
      setBrandLink(
          `/workstation/generatie/${slug}?procesor=${procesor}&brand=`
        );
    } else if (brand) {
      setShow(false);
      productService
        .getAllWorkstationsGenerationAndBrand(currentPage, slug, brand)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/workstation/generatie/${slug}?brand=${brand}`);
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByBrandAndGeneration(15, brand, slug)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByGenerationAndBrand(15, slug, brand).then((r) => {
          setProcessors(r);
        });
        setProcessorslink(
          `/workstation/generatie/${slug}?brand=${brand}&procesor=`
        );
    } else {
      setShow(false);
      productService
        .getAllWorkstationsByGeneration(currentPage, slug)
        .then((result) => {
          setLoading(false);
          setShow(true);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/workstation/generatie/${slug}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, slug, procesor, brand]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange && procesor && brand && selectedSort != `/workstation/generatie/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedWorkstationsByBrandProcessorAndGenerationPrice(
          currentPage,
          brand,
          sort,
          procesor,
          slug,
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
    } else if (priceRange && procesor && selectedSort != `/workstation/generatie/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByGenerationProcessorPrice(
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
    } else if (priceRange && brand && selectedSort != `/workstation/generatie/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByGenerationBrandPrice(
          currentPage,
          slug,
          sort,
          brand,
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
    } else if (procesor && brand && selectedSort != `/workstation/generatie/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByGenerationBrandProcessor(
          currentPage,
          slug,
          sort,
          procesor,
          brand
        )
        .then((result) => {
          setItemData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange && !procesor && !brand) {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedWorkstationsByGenerationPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (procesor && selectedSort != `/workstation/generatie/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByGenerationAndProcessor(
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
    } else if (brand && selectedSort != `/workstation/generatie/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByBrandAndGeneration(
          currentPage,
          brand,
          sort,
          slug
        )
        .then((result) => {
          setShow(true);
          setItemData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }  else if (selectedSort != `/workstation/generatie/${slug}`) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedWorkstationsByGeneration(currentPage, slug, sort)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
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
    if (priceRange && procesor && brand) {
      setShow(false);
      productService
        .getAllWorkstationsByBrandProcessorAndGenerationPrice(
          currentPage,
          brand,
          procesor,
          slug,
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
    } else if (priceRange && procesor) {
      setShow(false);
      productService
        .getWorkstationsByGenerationProcessorPrice(
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
    } else if (priceRange && brand) {
      setShow(false);
      productService
        .getWorkstationsByGenerationBrandPrice(
          currentPage,
          slug,
          brand,
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
    } else {
      setShow(false);
      productService
        .getAllWorkstationByGenerationPrice(currentPage, slug, priceRange)
        .then((result) => {
          setItemData(result);
          //setTotalPages(result[0].totalPages);
          setShow(true);
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
    pageTitle = slugToStr.split("-").slice(0, -1).join(" ");
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <>
          <LaptopsPage
            title={`Workstation ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={generationWorkstationBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={brandLink}
            processors={processors}
            processorsLink={processorsLink}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            processorsGeneration={processorsGeneration}
            processorsGenerationLink={`/workstation/generatie/`}
            categoryLink={"/workstation/"}
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
