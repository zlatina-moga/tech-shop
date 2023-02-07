import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

interface ILaptopPage {
  title: string;
  laptopsData: any[];
}

const LaptopsPage: React.FC<ILaptopPage> = ({ title, laptopsData }) => {
  return (
    <>
      <div
        className={classNames("container-fluid pt-5", "laptops-page")}
        style={{ maxWidth: "100rem" }}
      >
        <div className="text-center mb-4">
          <h1 className="px-5">{title}</h1>
        </div>

        <div className="row px-xl-5 pb-3 justify-content-center">
          {laptopsData.map((l, idx) => (
            <div
              className={classNames(
                `col-lg-3 col-md-6 col-sm-12 pb-1`,
                "laptop-card"
              )}
              key={idx}
              style={{ maxWidth: "320px",  }}
            >
              <div
                className={classNames(
                  "card product-item border border-gray rounded mb-4",
                  "inner-container"
                )}
                style={{alignItems: 'stretch', height: '550px'}}
              >
                {/*<Link href={"/" + l.category + "/" + l.id}>*/}
                <Link href="/">
                  <div
                    className={classNames(
                      "card-header product-img position-relative overflow-hidden bg-transparent",
                      "img-wrapper"
                    )}
                  >
                    {/*<div className="discount-container">
                        <div>
                          <p>-20%</p>
                        </div>
                      </div>*/}

                    <img
                      className="img-fluid w-100"
                      src={l.imgLink ? l.imgLink : l.imgLink1}
                      alt=""
                      //style={{maxWidth: '200px'}}
                    />
                  </div>
                </Link>
                <div className="card-body text-center p-3 pt-4 relative">
                  <h6 className="mb-3" style={{overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '150px'}}>{l.title}</h6>
                  {l.oldPrice ? (
                    <div className="d-flex justify-content-center">
                      <h6 className="text-muted pb-2">
                        <del>
                          {l.oldPrice} {l.currency}
                        </del>
                      </h6>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="d-flex justify-content-center">
                    <h6 className="price">{l.price}</h6>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light">
                  <Link href={"/" + l.id} className="btn btn-sm text-dark p-0">
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

export default LaptopsPage;
