import { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Meta from "../layouts/Meta";
import SideFilter from "./SideFilter";
import localFont from "@next/font/local";

const veneer = localFont({
  src: [
    {
      path: "../../public/fonts/Veneer-Three.ttf",
      weight: "400",
    },
  ],
  variable: "--font-verneer",
});

interface ILaptopPage {
  title: string;
  laptopsData: any[];
  filteredData?: any[];
  categories?: any[];
  categories2?: any[];
  breadcrumbs?: any[];
  brands?: any;
  processors?: any;
  sortCriteria?: any;
  baseLink?: string;
  highEnd?: number;
  priceRange?: any;
  className?: string;
  processorsGeneration?: any;
  multipleQueries?: boolean;
  screens?: any;
  secTitle?: string;
  catSelect?: any;
  brandSelect?: any;
  countShow?: boolean;
  totalCount?: number;
  scrSelect?: any;
  procSelect?: any;
  generationSelect?: any;
  videoCards?: any[];
  videoSelect?: any;
  reset?: any;
}

const LicensePage: React.FC<ILaptopPage> = ({
  title,
  laptopsData,
  categories,
  breadcrumbs,
  brands,
  processors,
  sortCriteria,
  baseLink,
  highEnd,
  priceRange,
  className,
  processorsGeneration,
  categories2,
  multipleQueries,
  screens,
  secTitle,
  catSelect,
  brandSelect,
  countShow,
  totalCount,
  scrSelect,
  procSelect,
  generationSelect,
  videoCards,
  videoSelect,
  filteredData,
  reset
}) => {
  const [selected, setSelected] = useState("");

  const handleSort = (e) => {
    setSelected(e.target.value);
    sortCriteria(e.target.value);
  };

  return (
    <>
      <Meta title={title} keywords={title} description={title} />
      <div
        className={classNames("container-fluid pt-5", "laptops-page")}
        style={{
          maxWidth: "90rem",
          display: "flex",
        }}
      >
        <SideFilter
          categories={categories}
          breadcrumbs={breadcrumbs}
          brands={brands}
          processors={processors}
          maxPrice={highEnd}
          range={priceRange}
          processorsGeneration={processorsGeneration}
          categories2={categories2}
          screens={screens}
          secTitle={secTitle}
          selectCategory={catSelect}
          selectBrand={brandSelect}
          countShow={countShow}
          selectScreen={scrSelect}
          selectProcessor={procSelect}
          selectGeneration={generationSelect}
          videoCards={videoCards}
          selectVideo={videoSelect}
          processorsFrequency={''}
          selectFrequency
          resetClicked={reset}
        />
        <div style={{ width: "100%" }}>
          <div className="text-center mb-4">
            <h1 className={`font-${veneer.variable} font-sans`}>{title}</h1>
            {totalCount > 1 ? (
              <p className="font-weight-medium">Total {totalCount} produse</p>
            ) : (
              <p className="font-weight-medium">Total {totalCount} produs</p>
            )}
            <div>
              <label className="mr-2">Sortează după:</label>
              {multipleQueries ? (
                <select
                  className="border border-primary p-2 rounded-1"
                  onChange={handleSort}
                  value={selected}
                >
                  <option value={baseLink}>Cele mai vândute</option>
                  <option value={`${baseLink}&sort=views`}>
                    Cele mai accesate
                  </option>
                  <option value={`${baseLink}&sort=deals`}>Reduceri</option>
                  <option value={`${baseLink}&sort=price`}>
                    Preț ascendent
                  </option>
                  <option value={`${baseLink}&sort=-price`}>
                    Preț descendent
                  </option>
                </select>
              ) : (
                <select
                  className="border border-primary p-2 rounded-1"
                  onChange={handleSort}
                  value={selected}
                >
                  <option value={baseLink}>Cele mai vândute</option>
                  <option value={`${baseLink}?sort=views`}>
                    Cele mai accesate
                  </option>
                  <option value={`${baseLink}?sort=deals`}>Reduceri</option>
                  <option value={`${baseLink}?sort=price`}>
                    Preț ascendent
                  </option>
                  <option value={`${baseLink}?sort=-price`}>
                    Preț descendent
                  </option>
                </select>
              )}
            </div>
          </div>

          <div
            className={classNames(
              "row pb-3 justify-content-center, ml-xl-5",
              className
            )}
            style={{ maxWidth: "98rem", justifyContent: "center" }}
          >
            {filteredData && filteredData.length > 0
              ? filteredData.map((itemData, idx) => (
                  <div
                    className={classNames(`pb-1`, "laptop-card")}
                    key={idx}
                    style={{ maxWidth: "250px" }}
                  >
                    <div
                      className={classNames(
                        "card product-item border border-gray rounded mb-4",
                        "inner-container"
                      )}
                      style={{ alignItems: "stretch", height: "550px" }}
                    >
                      <Link href={itemData.id}>
                        <div
                          className={classNames(
                            "card-header product-img position-relative overflow-hidden bg-transparent",
                            "img-wrapper"
                          )}
                        >
                          {itemData.discount && (
                            <div className="discount-container">
                              <div>
                                <p>{itemData.discount}</p>
                              </div>
                            </div>
                          )}

                          <img
                            className="img-fluid w-100"
                            src={
                              itemData.imgLink
                                ? itemData.imgLink
                                : itemData.imgLink1
                            }
                            alt=""
                            //style={{maxWidth: '200px'}}
                          />
                        </div>
                      </Link>
                      <div className="card-body text-center p-3 pt-4 relative">
                        <h6
                          className="mb-3"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxHeight: "95px",
                          }}
                        >
                          {itemData.title}
                        </h6>
                        {itemData.oldPrice &&
                          itemData.oldPrice.split(".")[1] && (
                            <div className="d-flex justify-content-center">
                              <h6 className="text-muted pb-2 price-2">
                                <del>{itemData.oldPrice}</del>
                              </h6>
                            </div>
                          )}

                        <div className="d-flex justify-content-center">
                          <h6 className="price">{itemData.price} + TVA</h6>
                        </div>
                      </div>
                      <div className="card-footer w-100 bg-light">
                        <Link
                          href={itemData.id}
                          className="btn btn-primary add-to-cart"
                        >
                          Vezi detalii
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : laptopsData.map((itemData, idx) => (
                  <div
                    className={classNames(`pb-1`, "laptop-card")}
                    key={idx}
                    style={{ maxWidth: "250px" }}
                  >
                    <div
                      className={classNames(
                        "card product-item border border-gray rounded mb-4",
                        "inner-container"
                      )}
                      style={{ alignItems: "stretch", height: "550px" }}
                    >
                      <Link href={itemData.id}>
                        <div
                          className={classNames(
                            "card-header product-img position-relative overflow-hidden bg-transparent",
                            "img-wrapper"
                          )}
                        >
                          {itemData.discount && (
                            <div className="discount-container">
                              <div>
                                <p>{itemData.discount}</p>
                              </div>
                            </div>
                          )}

                          <img
                            className="img-fluid w-100"
                            src={
                              itemData.imgLink
                                ? itemData.imgLink
                                : itemData.imgLink1
                            }
                            alt=""
                            //style={{maxWidth: '200px'}}
                          />
                        </div>
                      </Link>
                      <div className="card-body text-center p-3 pt-4 relative">
                        <h6
                          className="mb-3"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxHeight: "95px",
                          }}
                        >
                          {itemData.title}
                        </h6>
                        {itemData.oldPrice &&
                          itemData.oldPrice.split(".")[1] && (
                            <div className="d-flex justify-content-center">
                              <h6 className="text-muted pb-2 price-2">
                                <del>{itemData.oldPrice}</del>
                              </h6>
                            </div>
                          )}

                        <div className="d-flex justify-content-center">
                          <h6 className="price">{itemData.price} + TVA</h6>
                        </div>
                      </div>
                      <div className="card-footer w-100 bg-light">
                        <Link
                          href={itemData.id}
                          className="btn btn-primary add-to-cart"
                        >
                          Vezi detalii
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LicensePage;
