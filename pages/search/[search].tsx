import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as productService from "../../services/productService";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { usePagination } from "../../hooks/usePagination";
import Navbar from "../../components/global/Navbar";
import MainSkeleton from "../../components/shared/MainSkeleton";
import { procComputersBrcrmbs } from "../../data/breadcrumbs";
import classNames from "classnames";
import Link from "next/link";

const ProcDetail = () => {
  const router = useRouter();
  const { search } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(search);
    productService
      .getSearchedItems(search)
      .then((result) => {
        setLoading(false);
        seItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <>
          <div
            className={classNames("container-fluid pt-5", "laptops-page")}
            style={{
              maxWidth: "100rem",
              display: "flex",
            }}
          >
            <div>
              <div className="text-center mb-4">
                <h1 className="px-5">Results:</h1>
              </div>
              <div
                className="row pb-3 justify-content-center"
                style={{ maxWidth: "98rem" }}
              >
                {itemData.map((l, idx) => (
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
                      <Link href={l.permalink}>
                        <div
                          className={classNames(
                            "card-header product-img position-relative overflow-hidden bg-transparent",
                            "img-wrapper"
                          )}
                        >
                          <img
                            className="img-fluid w-100"
                            src={l.src}
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
                          {l.name}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProcDetail;
