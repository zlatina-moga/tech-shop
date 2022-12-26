import { IComputer, computersData } from "../data";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import Navbar from "../components/global/Navbar";

const Computers: React.FC<IComputer> = (props: IComputer) => {
  return (
    <>
      <Navbar />
      <div className={classNames("container-fluid pt-5", "laptops-page")}>
        <div className="text-center mb-4">
          <h1 className="px-5">Computers</h1>
        </div>
        <div className="row px-xl-5 pb-3 justify-content-center">
          {computersData.map((l, idx) => (
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
                <Link href={"/" + l.category + "/" + l.id}>
                  <div
                    className={classNames(
                      "card-header product-img position-relative overflow-hidden bg-transparent",
                      "img-wrapper"
                    )}
                  >
                    <div className="discount-container">
                      <div>
                        <p>-20%</p>
                      </div>
                    </div>
                    <Image
                      className="img-fluid w-100"
                      src={l.images[0]}
                      alt=""
                    />
                  </div>
                </Link>
                <div className="card-body text-center p-3 pt-4">
                  <h6 className="mb-3">{l.title}</h6>
                  <div className="d-flex justify-content-center">
                    <h6 className="text-muted pb-2">
                      <del>
                        {l.oldPrice} {l.currency}
                      </del>
                    </h6>
                  </div>
                  <div className="d-flex justify-content-center">
                    <h6 className="price">
                      {l.price} {l.currency}
                    </h6>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light">
                  <Link
                    href={"/" + l.category + "/" + l.id}
                    className="btn btn-sm text-dark p-0"
                  >
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
    </>
  );
};

export default Computers;