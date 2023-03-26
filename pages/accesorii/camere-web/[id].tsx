import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import SingleItemView from "../../../components/shared/SingleItemView";
import { camerasBreadCrmbs } from "../../../data/breadcrumbs";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import Footer from "../../../components/global/Footer";

const CameraDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getCamera(id)
      .then((result) => {
        setLoading(false);
        seItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      {loading ? <DetailPageSkeleton /> : <SingleItemView itemData={itemData} breadcrumbs={camerasBreadCrmbs}/>}
      <Footer />
    </>
  );
};

export default CameraDetails;
