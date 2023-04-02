import { useDispatch } from "react-redux";
import classNames from "classnames";
import Link from "next/link";
import Meta from "../../components/layouts/Meta";
import SideFilter from "./SideFilter";
import { addProduct } from "../../services/redux/cartRedux";

interface ILaptopPage {
  title: string;
  laptopsData: any[];
  categories?: any[];
  breadcrumbs?: any[];
  brands?: any;
  brandLink?: string;
  processors?: any;
  processorsLink?: string;
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
}) => {
  const dispatch = useDispatch();
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
        />
        <div className="">
          <div className="text-center mb-4">
            <h1 className="px-5">{title}</h1>
          </div>
          <div
            className="row pb-3 justify-content-center"
            style={{ maxWidth: "98rem" }}
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
                        src={itemData.imgLink ? itemData.imgLink : itemData.imgLink1}
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
                  <div className="card-footer d-flex justify-content-between bg-light">
                    <Link href={itemData.id} className="btn btn-sm text-dark p-1">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                    <button
                      className="btn btn-sm text-dark p-1"
                      onClick={() => ""} //dispatch(addProduct({ l, quantity: 1 }))}
                    >
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </button>
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
