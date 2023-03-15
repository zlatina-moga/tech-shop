import Skeleton from "react-loading-skeleton";
import classNames from "classnames";

const MainSkeleton = () => {
  const n = 20;
  const cards = [...Array(n)].map((e, i) => <SkeletonCard key={i} />);

  return (
    <div
      className={classNames("container-fluid pt-5", "laptops-page")}
      style={{
        maxWidth: "100rem",
        display: "flex",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="row">
          <div style={{ marginBottom: "30px" }}>
            <Skeleton width={100} height={30} />
          </div>
          <div
            className="sidebar-container"
            style={{ display: "block", maxWidth: "280px" }}
          >
            <div
              className="collapse show navbar-vertical navbar-light p-4"
              id="navbar-vertical-2"
              style={{
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
              }}
            >
              <Skeleton width={200} height={20} />
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #E8E3DF",
                }}
              ></div>
              <Skeleton width={160} height={20} />
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #E8E3DF",
                }}
              ></div>
              <Skeleton width={160} height={20} />
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #E8E3DF",
                }}
              ></div>
              <Skeleton width={160} height={20} />
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #E8E3DF",
                }}
              ></div>
              <Skeleton width={160} height={20} />
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #E8E3DF",
                }}
              ></div>
              <Skeleton width={160} height={20} />
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #E8E3DF",
                }}
              ></div>
              <Skeleton width={160} height={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="text-center mb-10">
          <Skeleton width={200} borderRadius={4} height={35} />
          <div
            className="row pb-3 justify-content-center"
            style={{ maxWidth: "98rem" }}
          >
            {cards}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div
      className={classNames(`pb-1`, "laptop-card")}
      style={{ maxWidth: "270px" }}
    >
      <div
        className={classNames(
          "card product-item border border-gray rounded mb-4",
          "inner-container"
        )}
        style={{
          alignItems: "stretch",
          height: "550px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className={classNames(
            "card-header product-img position-relative overflow-hidden bg-transparent",
            "img-wrapper"
          )}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Skeleton width={175} height={175} />
        </div>
        <div className="card-body text-center p-3 pt-4 relative">
          <Skeleton className="mb-3" width={175} height={70} />
          <Skeleton className="mb-3" width={175} height={25} />

          <div className="card-footer d-flex justify-content-between bg-light pt-4">
            <Skeleton width={70} height={20} />
            <Skeleton width={70} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSkeleton;
