import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import SingleItemView from "../../../components/shared/SingleItemView";
import { diverseBreadCrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";
import * as techSpecsService from '../../../services/techSpecsService';

const OtherAccessoryDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [techDetails, setTechDetails] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    itemService
      .getOtherAccessoryDetails(id)
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
      {loading ? <DetailPageSkeleton /> : <SingleItemView itemData={itemData} breadcrumbs={diverseBreadCrmbs} techSpecs={techDetails}/>}
      <Footer />
    </>
  );
};

export default OtherAccessoryDetails;
