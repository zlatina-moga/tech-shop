import { ILaptop } from "../data";
import { laptopsData } from "../data";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

const Laptops: React.FC<ILaptop> = (props: ILaptop) => {
  return (
    <div className={classNames("container-fluid pt-5", "laptops-page")}>
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">Laptops</span>
        </h2>
      </div>
      <div className="row px-xl-5 pb-3 justify-content-center">
        {laptopsData.map((l, idx) => (
          <div
            className={classNames(
              `col-lg-3 col-md-6 col-sm-12 pb-1`,
              "laptop-card"
            )}
            key={idx}
          >
            <div
              className={classNames(
                "card product-item border border-gray rounded mb-4",
                "inner-container"
              )}
            >
              <Link href={'/' + l.category + '/' + l.id}>
                <div
                  className={classNames(
                    "card-header product-img position-relative overflow-hidden bg-transparent",
                    "img-wrapper"
                  )}
                >
                  <Image className="img-fluid w-100" src={l.images[0]} alt="" />
                </div>
              </Link>
              <div className="card-body text-center p-3 pt-4">
                <h6 className="mb-3">{l.title}</h6>
                <div className="d-flex justify-content-center">
                  <h6 className="price">
                    {l.price} {l.currency}
                  </h6>
                  {/*<h6 className="text-muted ml-2">
                    <del>$123.00</del>
        </h6>*/}
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between bg-light">
                <Link href={l.id} className="btn btn-sm text-dark p-0">
                  <i className="fas fa-eye text-primary mr-1"></i>View Detail
                </Link>
                <a href="" className="btn btn-sm text-dark p-0">
                  <i className="fas fa-shopping-cart text-primary mr-1"></i>
                  Add To Cart
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laptops;
