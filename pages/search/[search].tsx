import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import * as productService from "../../services/productService";
import Navbar from "../../components/global/Navbar";
import MainSkeleton from "../../components/shared/MainSkeleton";

const ProcDetail = () => {
  const router = useRouter();
  const { search } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  let searchStr = '';
  if (search != undefined) {
    let searchToStr = search as string;
    searchStr = searchToStr.split('=')[1]
  }

  useEffect(() => {
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
        <main>
          <div
            className={classNames("container-fluid pt-5", "laptops-page")}
            style={{
              maxWidth: "100rem",
              display: "flex",
            }}
          >
            <div>
              <div className="text-center mb-4">
                <h1 className="px-5">Rezultatele cautarii pentru: {searchStr}</h1>
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
                      style={{ alignItems: "stretch", height: "450px", cursor:'pointer' }}
                    >
                      <div
                        className={classNames(
                          "card-header product-img position-relative overflow-hidden bg-transparent",
                          "img-wrapper"
                        )}
                        onClick={() =>
                          router.push(`/${l.permalink}`, undefined, {
                            shallow: true,
                          })
                        }
                      >
                        <img
                          className="img-fluid w-100"
                          src={l.featured_image.src}
                          alt=""
                          //style={{maxWidth: '200px'}}
                        />
                      </div>

                      <div className="card-body text-center p-3 pt-4 relative">
                        <h6
                          className="mb-3"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
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
        </main>
      )}
    </>
  );
};

export default ProcDetail;
