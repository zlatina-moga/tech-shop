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
  breadcrumbs?: any[];
  brands?: any;
  brandLink?: string;
  processors?: any;
  processorsLink?: string;
  sortCriteria?: any;
  baseLink?: string;
  highEnd?: number;
  priceRange?: any;
  className?: string
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
  className
}) => {
  const [selected, setSelected] = useState("");
  const totalCount = laptopsData.map((l) => l.itemsCount)[0];


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
        />
        <div>
          <div className="text-center mb-4">
            <h1 className={`font-${veneer.variable} font-sans`}>{title}</h1>
            <p className="font-weight-medium">{totalCount}</p>
            <div>
              <label className="mr-2">Sortează după:</label>
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
                <option value={`${baseLink}?sort=price`}>Preț ascendent</option>
                <option value={`${baseLink}?sort=-price`}>
                  Preț descendent
                </option>
              </select>
            </div>
          </div>

          <div
            className={classNames("row pb-3 justify-content-center, ml-xl-5", className)}
            style={{ maxWidth: "98rem", justifyContent: 'center' }}
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
                    {itemData.oldPrice && (
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

export default LaptopsPage;
