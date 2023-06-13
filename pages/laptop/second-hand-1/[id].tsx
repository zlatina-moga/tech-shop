import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import SingleDetailedView from "../../../components/shared/SingleDetailedView";
import { laptopSHBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as techSpecsService from '../../../services/techSpecsService';

const SecondHandLaptopDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [techDetails, setTechDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    itemService
      .getSecondHandLaptop(id)
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
  }, [id]);

  useEffect(() => {
    techSpecsService
      .getUpgrade(id)
      .then((result) => {
        setProductDetails(result);
      })
  }, [id])

  return (
    <>
      <Navbar />
      {loading ? (
        <DetailPageSkeleton />
      ) : (
        <SingleDetailedView itemData={itemData} breadcrumbs={laptopSHBrcrmbs}  techSpecs={techDetails} upgradeOptions={productDetails[40]} warrantyOptions={productDetails[24]} />
      )}
      <Footer />
    </>
  );
};

export default SecondHandLaptopDetails;
