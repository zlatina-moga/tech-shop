import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../services/productService";
import LaptopsPage from "../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import Navbar from "../../../components/global/Navbar";
import MainSkeleton from "../../../components/shared/MainSkeleton";
import { workstationProcBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as sortingService from "../../../services/sortingService";

const ProcDetail = () => {
  const router = useRouter();
  const { slug, brand, generatie } = router.query;
  const [itemData, setItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/workstation/procesor/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/workstation/procesor/${slug}`);
  const [processorsGenerationLink, setProcessorsGenerationlink] = useState(`/workstation/procesor/${slug}?generatie=`);
  const [brandLink, setBrandLink] = useState(`/workstation/procesor/${slug}?brand=`)

  useEffect(() => {
    sortingService.getBrandsByProcessor(15,slug).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(15).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByProcessor(15, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getProcessorGenerationByProcessor(15, slug).then((r) => {
      setProcessorsGeneration(r);
    });
  }, [slug]);

  useEffect(() => {
    if (brand && generatie) {
      setShow(false);
      productService
        .getAllWorkstationsGenerationBrandAndProcesorGeneration(currentPage, generatie, brand, slug)
        .then((result) => {
          setLoading(false);
          setItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(
            `/workstation/procesor/${slug}?brand=${brand}&generatie=${generatie}`
          );
        });
      sortingService
        .getHighestPriceByBrandGenerationAndProcessor(15, brand, generatie, slug)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (brand) {
      setShow(false);
      productService
        .getAllWorkstationsBrandAndProcessor(currentPage, brand, slug)
        .then((result) => {
          setLoading(false);
          setItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/workstation/procesor/${slug}?brand=${brand}`);
        })
        .catch((err) => {
          console.log(err);
        });
        sortingService
        .getHighestPriceByBrandAndProcessor(15, brand, slug)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getGenerationsByProcessor(15, brand, slug).then((r) => {
          setProcessorsGeneration(r);
        });
        setProcessorsGenerationlink(
          `/workstation/procesor/${slug}?brand=${brand}&generatie=`
        );
    } else if (generatie) {
      setShow(false);
      productService
        .getAllWorkstationsGenerationAndProcessor(currentPage, generatie, slug)
        .then((result) => {
          setLoading(false);
          setItemsData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/workstation/procesor/${slug}?generatie=${generatie}`);
        })
        .catch((err) => {
          console.log(err);
        });
        sortingService
        .getHighestPriceByGenerationAndProcessor(15, generatie, slug)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessor(15, generatie, slug).then((result) => {
          setBrands(result);
        });
        setBrandLink(
          `/workstation/procesor/${slug}?generatie=${generatie}&brand=`
        );
    } else {
      setShow(false);
      productService
      .getAllWorkstationsByProcessor(currentPage, slug)
      .then((result) => {
        setLoading(false);
        setItemsData(result);
        setShow(true);
        setTotalPages(result[0].totalPages);
        setBaseLink(`/workstation/procesor/${slug}`);
        setBrandLink(`${baseLink}?brand=`)
        setProcessorsGenerationlink(`${baseLink}?generatie=`)
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }, [currentPage, slug, brand, generatie, baseLink]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange != '' && generatie && brand && selectedSort != `/workstation/procesor/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedWorkstationsByBrandProcessorAndGenerationPrice(
          currentPage,
          brand,
          sort,
          slug,
         generatie,
          priceRange
        )
        .then((result) => {
          setItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && generatie && selectedSort != `/workstation/procesor/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByGenerationProcessorPrice(
          currentPage,
          generatie,
          sort,
          slug,
          priceRange
        )
        .then((result) => {
          setItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && brand && selectedSort != `/workstation/procesor/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByBrandProcessorPrice(
          currentPage,
          brand,
          sort,
          slug,
          priceRange
        )
        .then((result) => {
          setItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (generatie && brand && selectedSort != `/workstation/procesor/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByBrandProcessorAndGeneration(
          currentPage,
          brand,
          sort,
          slug,
          generatie,
        )
        .then((result) => {
          setItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && !generatie && !brand && selectedSort != `/workstation/procesor/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedWorkstationsByProcessorPrice(
          currentPage,
          slug,
          sort,
          priceRange
        )
        .then((result) => {
          setItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (brand && selectedSort != `/workstation/procesor/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByBrandAndProcessor(currentPage, brand, sort, slug)
        .then((result) => {
          setShow(true);
          setItemsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (generatie && selectedSort != `/workstation/procesor/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedWorkstationsByGenerationAndProcessor(
          currentPage,
          slug,
          sort,
          generatie
        )
        .then((result) => {
          setShow(true);
          setItemsData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }  else if (selectedSort != `/workstation/procesor/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedWorkstationsByProcessor(currentPage, slug, sort)
        .then((result) => {
          setShow(true);
          setItemsData(result);
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
    if (priceRange != '' && generatie && brand) {
      setShow(false);
      productService
        .getAllWorkstationsByBrandProcessorAndGenerationPrice(
          currentPage,
          brand,
          slug,
          generatie,
          priceRange
        )
        .then((result) => {
          setItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && generatie) {
      setShow(false);
      productService
        .getWorkstationsByGenerationProcessorPrice(
          currentPage,
          generatie,
          slug,
          priceRange
        )
        .then((result) => {
          setItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && brand) {
      setShow(false);
      productService
        .getAllWorkstationsByBrandProcessorPrice(
          currentPage,
          brand,
          slug,
          priceRange
        )
        .then((result) => {
          setItemsData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '') {
      setShow(false);
      productService
        .getAllWorkstationsByProcessorPrice(currentPage, slug, priceRange)
        .then((result) => {
          setItemsData(result);
         // setTotalPages(result[0].totalPages);
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
    pageTitle = slugToStr.replaceAll("-", " ");
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
            breadcrumbs={workstationProcBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={brandLink}
            processors={processors}
            processorsLink={"/workstation/procesor/"}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            processorsGeneration={processorsGeneration}
            processorsGenerationLink={processorsGenerationLink}
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

export default ProcDetail;
