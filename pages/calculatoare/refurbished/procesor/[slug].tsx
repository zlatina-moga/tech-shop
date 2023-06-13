import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../../services/productService";
import LaptopsPage from "../../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../../hooks/usePagination";
import Navbar from "../../../../components/global/Navbar";
import MainSkeleton from "../../../../components/shared/MainSkeleton";
import { compRefComputersBrcrmbs } from "../../../../data/breadcrumbs";
import Footer from "../../../../components/global/Footer";
import * as sortingService from "../../../../services/sortingService";

const ProcDetail = () => {
  const router = useRouter();
  const { slug, brand, generatie } = router.query;
  const [itemData, setItemData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/calculatoare/refurbished/procesor/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/calculatoare/refurbished/procesor/${slug}`);
  const [processorsGenerationLink, setProcessorsGenerationlink] = useState(`/calculatoare/refurbished/procesor/${slug}?generatie=`);
  const [brandLink, setBrandLink] = useState(`/calculatoare/refurbished/procesor/${slug}?brand=`)

  useEffect(() => {
    sortingService
      .getProcessorsBrands(1, "refurbished-2", slug)
      .then((result) => {
        setBrands(result);
      });
    sortingService.getProcessors(2).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByProcessor(2, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getProcessorGenerationByProcessor(2, slug).then((r) => {
      setProcessorsGeneration(r);
    });
  }, [slug]);

  useEffect(() => {
    if (!router.isReady) return;
    if (brand && generatie) {
      setShow(false);
      productService
      .getAllRefComputersGenerationBrandAndProcesor(currentPage, generatie, brand, slug)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(
            `/calculatoare/refurbished/procesor/${slug}?brand=${brand}&generatie=${generatie}`
          );
        });
      sortingService
        .getHighestPriceByBrandGenerationAndProcessor(1, brand, generatie, slug)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (brand) {
      setShow(false);
      productService
        .getAllRefComputersBrandAndProcessor(currentPage, brand, slug)
        .then((result) => {
          setShow(true);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setMultupleSelected(true);
          setBaseLink(
            `/calculatoare/refurbished/procesor/${slug}?brand=${brand}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByBrandTypeAndProcessor(1, brand, slug, "refurbished-2")
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getGenerationsByProcessor(2, brand, slug).then((r) => {
          setProcessorsGeneration(r);
        });
        setProcessorsGenerationlink(
          `/calculatoare/refurbished/procesor/${slug}?brand=${brand}&generatie=`
        );
    } else if (generatie) {
      setShow(false);
      productService
        .getAllRefComputersGenerationAndProcessor(currentPage, generatie, slug)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(
            `/calculatoare/refurbished/procesor/${slug}?generatie=${generatie}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByGenerationAndProcessor(2, generatie, slug)
        .then((response) => {
          setHighestPrice(response[1]);
        });

        sortingService.getBrandsByGenerationAndProcessor(2, generatie, slug).then((result) => {
          setBrands(result);
        });
        setBrandLink(
          `/calculatoare/refurbished/procesor/${slug}?generatie=${generatie}&brand=`
        );
    } else {
      setShow(false);
      productService
        .getAllRefComputersProcessor(currentPage, slug)
        .then((result) => {
          setShow(true);
          setItemData(result);
          setLoading(false);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/calculatoare/refurbished/procesor/${slug}`);
          setBrandLink(`${baseLink}?brand=`)
          setProcessorsGenerationlink(`${baseLink}?generatie=`)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.isReady, currentPage, slug, brand, generatie, baseLink]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange != '' && generatie && brand && selectedSort != `/calculatoare/refurbished/procesor/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedRefComputersByBrandProcessorAndGenerationPrice(
          currentPage,
          brand,
          sort,
          slug,
         generatie,
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
    } else if (priceRange != '' && generatie && selectedSort != `/calculatoare/refurbished/procesor/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByGenerationProcessorPrice(
          currentPage,
          generatie,
          sort,
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
    } else if (priceRange != '' && brand && selectedSort != `/calculatoare/refurbished/procesor/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByBrandProcessorPrice(
          currentPage,
          brand,
          sort,
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
    } else if (generatie && brand && selectedSort != `/calculatoare/refurbished/procesor/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByBrandProcessorAndGeneration(
          currentPage,
          brand,
          sort,
          slug,
          generatie,
        )
        .then((result) => {
          setItemData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && !brand && !generatie && selectedSort != `/calculatoare/refurbished/procesor/${slug}`  ) {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedRefComputersByProcessorPrice(
          currentPage,
          slug,
          sort,
          priceRange
        )
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (brand && selectedSort != `/calculatoare/refurbished/procesor/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByBrandAndProcessor(
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
    } else if (generatie && selectedSort != `/calculatoare/refurbished/procesor/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByGenerationAndProcessor(
          currentPage,
          slug,
          sort,
          generatie
        )
        .then((result) => {
          setShow(true);
          setItemData(result);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSort != `/calculatoare/refurbished/procesor/${slug}`) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      setShow(false);
      productService
        .getSortedRefComputersByProcessor(currentPage, slug, sort)
        .then((result) => {
          setShow(true);
          setItemData(result);
          setLoading(false);
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
        .getRefComputersByGenerationBrandProcessorPrice(
          currentPage,
          generatie,
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
    } else if (priceRange != '' && generatie) {
      setShow(false);
      productService
        .getRefComputersByGenerationProcessorPrice(
          currentPage,
          generatie,
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
    } else if (priceRange != '' && brand) {
      setShow(false);
      productService
        .getAllRefComputersByBrandProcessorPrice(
          currentPage,
          brand,
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
    } else if (priceRange != '') {
      setShow(false);
      productService
        .getAllRefComputersByProcessorPrice(currentPage, slug, priceRange)
        .then((result) => {
          setItemData(result);
          //setTotalPages(result[0].totalPages);
          setShow(true);
          setLoading(false);
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
            title={`Calculatoare Refurbished ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={compRefComputersBrcrmbs}
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={brandLink}
            processors={processors}
            processorsLink={"/calculatoare/refurbished/procesor/"}
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
