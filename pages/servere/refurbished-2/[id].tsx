import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import SingleDetailedView from "../../../components/shared/SingleDetailedView";
import { serverRefBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as techSpecsService from "../../../services/techSpecsService";
import * as productService from "../../../services/productService";

const RefurbishedServerDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [techDetails, setTechDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    productService
      .getProductDetails(id)
      .then((result) => {
        setLoading(false);
        seItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady, id]);

  useEffect(() => {
    techSpecsService
      .getProductSpecs(id)
      .then((result) => {
        setTechDetails(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    techSpecsService
      .getUpgrade(id)
      .then((result) => {
        setProductDetails(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    productService
      .getRecommendedProducts(id)
      .then((res) => setData(res))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  

  return (
    <>
      <Navbar />
      {loading ? (
        <DetailPageSkeleton />
      ) : (
        <SingleDetailedView
          itemData={itemData}
          breadcrumbs={serverRefBrcrmbs}
          techSpecs={techDetails}
          upgradeOptions={productDetails[40]}
          warrantyOptions={productDetails[24]}
          images={itemData[16]}
          data={data}
        />
      )}
      <Footer />
    </>
  );
};

export default RefurbishedServerDetails;
