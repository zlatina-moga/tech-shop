import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../../../services/productService";
import LaptopsPage from "../../../../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../../../../hooks/usePagination";
import Navbar from "../../../../components/global/Navbar";
import MainSkeleton from "../../../../components/shared/MainSkeleton";
import { refGenerationLaptopsBrcrmbs } from "../../../../data/breadcrumbs";
import Footer from "../../../../components/global/Footer";
import * as sortingService from "../../../../services/sortingService";

const ProcDetail = () => {
  const router = useRouter();
  const { slug, procesor, brand } = router.query;
  const [itemData, setItemData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState(
    `/laptop/refurbished/generatie/${slug}`
  );
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState(
    `/laptop/refurbished/generatie/${slug}`
  );
  const [processorsLink, setProcessorslink] = useState(`/laptop/refurbished/generatie/${slug}?procesor=`);
  const [brandLink, setBrandLink] = useState(`/laptop/refurbished/generatie/${slug}?brand=`)

  useEffect(() => {
    sortingService
      .getGenerationBrands(5, "refurbished-2", slug)
      .then((result) => {
        setBrands(result);
      });
    sortingService.getProcessorsByGeneration(7, slug).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPriceByGen(7, slug).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService
      .getProcessorGenerationByType(5, "refurbished-2")
      .then((r) => {
        setProcessorsGeneration(r);
      });
    sortingService.getHighestPriceByGen(7, slug).then((response) => {
      setHighestPrice(response[1]);
    });
  }, [slug]);

  useEffect(() => {
    if (!router.isReady) return;
    if (brand && procesor) {
      setShow(false);
      productService
        .getAllRefLaptopsGenerationBrandAndProcesor(currentPage, slug, brand, procesor)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/laptop/refurbished/generatie/${slug}?procesor=${procesor}&brand=${brand}`);
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByBrandGenerationAndProcessor(7, brand, slug, procesor)
        .then((response) => {
          setHighestPrice(response[1]);
        });
    } else if (procesor) {
      setShow(false);
      productService
        .getAllRefLaptopsGenerationAndProcessor(currentPage, slug, procesor)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(
            `/laptop/refurbished/generatie/${slug}?procesor=${procesor}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByGenerationTypeAndProcessor(
          5,
          slug,
          procesor,
          "refurbished-2"
        )
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessor(7, slug, procesor).then((result) => {
          setBrands(result);
        });
        setBrandLink(
          `/laptop/refurbished/generatie/${slug}?procesor=${procesor}&brand=`
        );
    } else if (brand) {
      setShow(false);
      productService
        .getAllRefLaptopsGenerationAndBrand(currentPage, slug, brand)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
          setMultupleSelected(true);
          setBaseLink(`/laptop/refurbished/generatie/${slug}?brand=${brand}`);
        })
        .catch((err) => {
          console.log(err);
        });
      sortingService
        .getHighestPriceByBrandTypeAndGeneration(
          5,
          brand,
          slug,
          "refurbished-2"
        )
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByGenerationAndBrand(7, slug, brand).then((r) => {
          setProcessors(r);
        });
        setProcessorslink(
          `/laptop/refurbished/generatie/${slug}?brand=${brand}&procesor=`
        );
    } else {
      productService
        .getAllRefLaptopsByGeneration(currentPage, slug)
        .then((result) => {
          setLoading(false);
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setBaseLink(`/laptop/refurbished/generatie/${slug}`);
          setProcessorslink(`${baseLink}?procesor=`)
          setBrandLink(`${baseLink}?brand=`)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.isReady, currentPage, slug, procesor, brand, baseLink]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    if (priceRange != '' && procesor && brand && selectedSort != `/laptop/refurbished/generatie/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[3];
      productService
        .getSortedRefLaptopsByBrandProcessorAndGenerationPrice(
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
    } else if (priceRange != '' && procesor && selectedSort != `/laptop/refurbished/generatie/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefLaptopsByGenerationProcessorPrice(
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
    } else if (priceRange != '' && brand && selectedSort != `/laptop/refurbished/generatie/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefLaptopsByBrandGenerationPrice(
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
    } else if (procesor && brand && selectedSort != `/laptop/refurbished/generatie/${slug}` ) {
      setShow(false);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefLaptopsByGenerationBrandProcessor(
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
    } else if (priceRange != '' && !brand && !procesor && selectedSort != `/laptop/refurbished/generatie/${slug}`) {
      setShow(false);
      const sort = selectedSort.split("=")[1];
      productService
        .getSortedRefLaptopsByGenPrice(currentPage, slug, sort, priceRange)
        .then((result) => {
          setItemData(result);
          setTotalPages(result[0].totalPages);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (procesor && selectedSort != `/laptop/refurbished/generatie/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefLaptopsByGenerationAndProcessor(
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
    } else if (brand && selectedSort != `/laptop/refurbished/generatie/${slug}`) {
      setShow(false);
      router.push(selectedSort);
      const sort = selectedSort.split("=")[2];
      productService
        .getSortedRefLaptopsByBrandAndGeneration(
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
    } else if (selectedSort != `/laptop/refurbished/generatie/${slug}`) {
      router.push(selectedSort);
      const sort = selectedSort.split("=")[1];
      setShow(false);
      productService
        .getSortedRefLaptopsByGeneration(currentPage, slug, sort)
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
    if (priceRange != '' && procesor && brand) {
      setShow(false);
      productService
        .getAllRefLaptopsByBrandProcessorAndGenerationPrice(
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
    } else if (priceRange != '' && procesor) {
      setShow(false);
      productService
        .getRefLaptopsByGenerationProcessorPrice(
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
    } else if (priceRange != '' && brand) {
      setShow(false);
      productService
        .getRefLaptopsByGenerationBrandPrice(
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
    } else if (priceRange != '') {
      setShow(false);
      productService
        .getAllRefLaptopsByGenerationPrice(currentPage, slug, priceRange)
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
            title={`Laptopuri Refurbished ${pageTitle}`}
            laptopsData={itemData}
            breadcrumbs={refGenerationLaptopsBrcrmbs}
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
            processorsGenerationLink={`/laptop/refurbished/generatie/`}
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
