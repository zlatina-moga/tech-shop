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
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(`/calculatoare/refurbished/brand/${slug}`);
  const [processorsGenerationLink, setProcessorsGenerationlink] = useState(`/calculatoare/refurbished/brand/${slug}?generatie=`);
  const [processorsLink, setProcessorsLink] = useState(`/calculatoare/refurbished/brand/${slug}?procesor=`)

  useEffect(() => {
    sortingService.getBrands(2).then((result) => {
      setBrands(result);
    });
    sortingService
      .getProcessorsByBrandAndType(1, slug, "refurbished-2")
      .then((res) => {
        setProcessors(res);
      });
    sortingService.getHighestPriceByBrand(2, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService
      .getProcessorGenerationByBrandAndType(1, slug, "refurbished-2")
      .then((r) => {
        setProcessorsGeneration(r);
      });
  }, [slug]);

  useEffect(() => {
    if (!router.isReady) return;
    if (procesor && generatie) {
      setShow(false);
      productService
        .getAllRefComputersGenerationBrandAndProcesor(currentPage, generatie, slug, procesor)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(
            `/calculatoare/refurbished/brand/${slug}?procesor=${procesor}&generatie=${generatie}`
          );
        });
      sortingService
        .getHighestPriceByBrandGenerationAndProcessor(2, slug, generatie, procesor)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (procesor) {
      setShow(false);
      productService
        .getAllRefComputersBrandAndProcessor(currentPage, slug, procesor)
        .then((result) => {
          setShow(true);
          setItemData(result);
          setLoading(false);
          setTotalPages(result[0].totalPages);
          setMultupleSelected(true);
          setBaseLink(
            `/calculatoare/refurbished/brand/${slug}?procesor=${procesor}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByBrandTypeAndProcessor(
          1,
          slug,
          procesor,
          "refurbished-2"
        )
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getGenerationsByProcessor(2, slug, procesor).then((r) => {
          setProcessorsGeneration(r);
        });
        setProcessorsGenerationlink(
          `/calculatoare/refurbished/brand/${slug}?procesor=${procesor}&generatie=`
        );
    } else if (generatie) {
      setShow(false);
      productService
        .getAllRefwComputersGenerationAndBrand(currentPage, generatie, slug)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(
            `/calculatoare/refurbished/brand/${slug}?generatie=${generatie}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByBrandAndGeneration(2, slug, generatie)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByGenerationAndBrand(2, generatie, slug).then((r) => {
          setProcessors(r);
        });
        setProcessorsLink(
          `/calculatoare/refurbished/brand/${slug}?generatie=${generatie}&procesor=`
        );
    } else {
      setShow(false);
      productService
        .getAllRefComputersBrand(currentPage, slug)
        .then((result) => {
          setShow(true);
          setItemData(result);
          setLoading(false);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/calculatoare/refurbished/brand/${slug}`);
          setProcessorsLink(`${baseLink}?procesor=`)
          setProcessorsGenerationlink(`${baseLink}?generatie=`)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.isReady, currentPage, slug, procesor, generatie, baseLink]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange != '' && procesor && generatie && selectedSort != `/calculatoare/refurbished/brand/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedRefComputersByBrandProcessorAndGenerationPrice(
          currentPage,
          slug,
          sort,
          procesor,
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
    } else if (priceRange != '' && procesor && selectedSort != `/calculatoare/refurbished/brand/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByBrandProcessorPrice(
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
    } else if (priceRange != '' && generatie && selectedSort != `/calculatoare/refurbished/brand/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByBrandGenerationPrice(
          currentPage,
          slug,
          sort,
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
    } else if (procesor && generatie && selectedSort != `/calculatoare/refurbished/brand/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByBrandProcessorAndGeneration(
          currentPage,
          slug,
          sort,
          procesor,
          generatie
        )
        .then((result) => {
          setItemData(result);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (priceRange != '' && !procesor && !generatie && selectedSort != `/calculatoare/refurbished/brand/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedRefComputersByBrandPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          setItemData(result);
          setLoading(false);
          setShow(true);
          setTotalPages(result[0].totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (procesor && selectedSort != `/calculatoare/refurbished/brand/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByBrandAndProcessor(
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
    } else if (generatie && selectedSort != `/calculatoare/refurbished/brand/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefComputersByBrandAndGeneration(
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
    } else if (selectedSort != `/calculatoare/refurbished/brand/${slug}`) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      setShow(false);
      productService
        .getSortedRefComputersByBrand(currentPage, slug, sort)
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
    if (priceRange != '' && procesor && generatie) {
      setShow(false);
      productService
        .getAllRefComputersByBrandProcessorAndGenerationPrice(
          currentPage,
          slug,
          procesor,
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
    } else if (priceRange != '' && procesor) {
      setShow(false);
      productService
        .getAllRefComputersByBrandProcessorPrice(
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
    } else if (priceRange != '' && generatie) {
      setShow(false);
      productService
        .getAllRefComputersByBrandGenerationPrice(
          currentPage,
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
    } else if (priceRange != ''){
      setShow(false);
    productService
      .getAllRefComputersByBrandPrice(currentPage, slug, priceRange)
      .then((result) => {
        setItemData(result);
        setLoading(false);
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
            sortCriteria={onSort}
            baseLink={baseLink}
            brands={brands}
            brandLink={"/calculatoare/refurbished/brand/"}
            processors={processors}
            processorsLink={processorsLink}
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

export default BrandDetail;
