import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import SingleItemView from "../../../components/shared/SingleItemView";
import { monitorSHBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as techSpecsService from "../../../services/techSpecsService";
import * as productService from "../../../services/productService";

const SecondHandMonitorDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [techDetails, setTechDetails] = useState([]);

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

  return (
    <>
      <Navbar />
      {loading ? (
        <DetailPageSkeleton />
      ) : (
        <SingleItemView
          itemData={itemData}
          breadcrumbs={monitorSHBrcrmbs}
          techSpecs={techDetails}
          images={itemData[16]}
        />
      )}
      <Footer />
    </>
  );
};

export default SecondHandMonitorDetails;
