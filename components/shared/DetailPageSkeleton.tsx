import Skeleton from "react-loading-skeleton";

const DetailPageSkeleton = () => {
  return (
    <div className="page-details">
      <div>
        <div className="row px-5">
          <nav aria-label="breadcrumb " className="second ">
            <ol className="breadcrumb indigo lighten-6 first px-md-4">
              <Skeleton width={150} height={30} />
            </ol>
          </nav>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Skeleton
            width={750}
            height={40}
            style={{
              paddingBottom: "30px",
            }}
          />
        </div>

        <div className="container-fluid py-5" style={{ maxWidth: "90rem" }}>
          <div className="row px-xl-5">
            <div className="col-lg-5 pb-5">
              <Skeleton width={400} height={400} />
            </div>
            <div className="col-lg-7 pb-5 parent-container">
              <div className="first-container">
                <Skeleton className="mb-4 details" width={300} height={150} />
                <div
                  className="d-flex align-items-center img-container"
                  style={{ marginTop: "10px" }}
                >
                  <Skeleton
                    width={50}
                    height={50}
                    style={{ marginRight: "20px" }}
                  />
                  <Skeleton width={220} height={50} />
                </div>
                <div
                  className="d-flex align-items-center img-container"
                  style={{ marginTop: "10px" }}
                >
                  <Skeleton
                    width={50}
                    height={50}
                    style={{ marginRight: "20px" }}
                  />
                  <Skeleton width={220} height={50} />
                </div>
                <div
                  className="d-flex align-items-center img-container"
                  style={{ marginTop: "10px" }}
                >
                  <Skeleton
                    width={50}
                    height={50}
                    style={{ marginRight: "20px" }}
                  />
                  <Skeleton width={220} height={50} />
                </div>
                <div
                  className="d-flex align-items-center img-container"
                  style={{ marginTop: "10px" }}
                >
                  <Skeleton
                    width={50}
                    height={50}
                    style={{ marginRight: "20px" }}
                  />
                  <Skeleton width={220} height={50} />
                </div>
              </div>
              <div className="second-container">
                <div className="price-container">
                  <Skeleton width={400} height={70} className="mb-3 price" />
                  <div className="delivery mb-3">
                    <Skeleton
                      width={50}
                      height={50}
                      style={{ marginRight: "20px" }}
                    />
                    <Skeleton width={220} height={50} />
                  </div>
                  
                  <Skeleton width={400} height={60} style={{marginTop: '50px'}}/>

                  <Skeleton width={300} height={20} style={{marginTop: '30px'}} />
                  <Skeleton width={400} height={60} style={{marginTop: '50px'}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageSkeleton;
