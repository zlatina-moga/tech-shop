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
  categories?: any[];
  categories2?: any[];
  breadcrumbs?: any[];
  brands?: any;
  brandLink?: string;
  processors?: any;
  processorsLink?: string;
  sortCriteria?: any;
  baseLink?: string;
  highEnd?: number;
  priceRange?: any;
  className?: string;
  processorsGeneration?: any;
  processorsGenerationLink?: string;
  categoryLink?: string;
  multipleQueries?: boolean;
  screens?: any;
  screensLink?: string;
  secTitle?: string;
}

const LaptopsPage: React.FC<ILaptopPage> = ({
  title,
  laptopsData,
  categories,
  breadcrumbs,
  brands,
  brandLink,
  processors,
  processorsLink,
  sortCriteria,
  baseLink,
  highEnd,
  priceRange,
  className,
  processorsGeneration,
  processorsGenerationLink,
  categoryLink,
  categories2,
  multipleQueries,
  screens,
  screensLink,
  secTitle,
}) => {
  const [selected, setSelected] = useState("");
  const totalCount = laptopsData.length;

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
          maxWidth: "100rem",
          display: "flex",
        }}
      >
        <SideFilter
          categories={categories}
          breadcrumbs={breadcrumbs}
          brands={brands}
          brandLink={brandLink}
          processors={processors}
          processorsLink={processorsLink}
          maxPrice={highEnd}
          range={priceRange}
          processorsGeneration={processorsGeneration}
          processorsGenerationLink={processorsGenerationLink}
          categoryLink={categoryLink}
          categories2={categories2}
          screens={screens}
          screensLink={screensLink}
          secTitle={secTitle}
        />
        <div style={{ width: "80%" }}>
          <div className="text-center mb-4">
            <h1 className={`font-${veneer.variable} font-sans`}>{title}</h1>
            <p className="font-weight-medium">Total {totalCount} produse</p>
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
            {laptopsData.map((itemData, idx) => (
              <div
                className={classNames(`pb-1`, "laptop-card")}
                key={idx}
                style={{ maxWidth: "270px" }}
              >
                <div
                  className={classNames(
                    "card product-item border border-gray rounded mb-4",
                    "inner-container"
                  )}
                  style={{ alignItems: "stretch", height: "550px" }}
                >
                  <Link href={itemData[9].replace("citgrup", "pcbun")}>
                    <div
                      className={classNames(
                        "card-header product-img position-relative overflow-hidden bg-transparent",
                        "img-wrapper"
                      )}
                    >
                      {itemData[16].split(".")[1] && (
                        <div className="discount-container">
                          <div>
                            {itemData[16].split(".")[1] == 2 ? 
                              <p>20%</p>
                             : itemData[16].split(".")[1] == 4 ? 
                              <p>40%</p>
                              :
                              <p>{itemData[16].split(".")[1]}%</p>
                            }
                          </div>
                        </div>
                      )}

                      <img
                        className="img-fluid w-100"
                        src={itemData[8]}
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
                      {itemData[3]}
                    </h6>
                    {itemData[16].split(".")[1] && (
                      <div className="d-flex justify-content-center">
                        {itemData[16].split(".")[1] == 2 ? (
                          <del>{(Number(itemData[4]) + Number(itemData[4] * 0.2)).toFixed(2)} Lei + TVA</del>
                      ) : itemData[16].split(".")[1] == 25 ? (
                        <del>{(Number(itemData[5]) + Number(itemData[5] * 0.25)).toFixed(2)} Lei + TVA</del>
                      ) : itemData[16].split(".")[1] == 3 ? (
                        <del>{(Number(itemData[6]) + Number(itemData[6] * 0.3)).toFixed(2)} Lei + TVA</del>
                      ) : itemData[16].split(".")[1] == 35 ? (
                        <del>{(Number(itemData[7]) + Number(itemData[7] * 0.35)).toFixed(2)} Lei + TVA</del>
                      ) : itemData[16].split(".")[1] == 4 ? (
                        <del>{(Number(itemData[7]) + Number(itemData[7] * 0.4)).toFixed(2)} Lei + TVA</del>
                      ) : (
                       ''
                      )}
                      </div>
                    )}

                    <div className="d-flex justify-content-center">
                      {itemData[16].split(".")[1] == 2 ? (
                        <h6 className="price">{itemData[4]} Lei + TVA</h6>
                      ) : itemData[16].split(".")[1] == 25 ? (
                        <h6 className="price">{itemData[5]} Lei + TVA</h6>
                      ) : itemData[16].split(".")[1] == 3 ? (
                        <h6 className="price">{itemData[6]} Lei + TVA</h6>
                      ) : itemData[16].split(".")[1] == 35 ? (
                        <h6 className="price">{itemData[7]} Lei + TVA</h6>
                      ) : itemData[16].split(".")[1] == 4 ? (
                        <h6 className="price">{itemData[7]} Lei + TVA</h6>
                      ) : (
                        <h6 className="price">{itemData[17]} Lei + TVA</h6>
                      )}
                    </div>
                  </div>
                  <div className="card-footer w-100 bg-light">
                    <Link
                      href={itemData[9].replace("citgrup", "pcbun")}
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

export default LaptopsPage;
