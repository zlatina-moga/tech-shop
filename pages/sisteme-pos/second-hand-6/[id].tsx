import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import SingleDetailedView from "../../../components/shared/SingleDetailedView";
import { posSHBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as techSpecsService from '../../../services/techSpecsService';

const SecondHandPOSDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [techDetails, setTechDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    itemService
      .getSecondHandPOS(id)
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

  return (
    <>
      <Navbar />
      {loading ? <DetailPageSkeleton /> : <SingleDetailedView itemData={itemData} breadcrumbs={posSHBrcrmbs} techSpecs={techDetails} upgradeOptions={productDetails[40]} warrantyOptions={productDetails[24]}/>}
      <Footer />
    </>
  );
};

export default SecondHandPOSDetails;
