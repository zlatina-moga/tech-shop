import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import SingleItemView from "../../../components/shared/SingleItemView";
import { camerasBreadCrmbs } from "../../../data/breadcrumbs";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import Footer from "../../../components/global/Footer";
import * as techSpecsService from "../../../services/techSpecsService";
import * as productService from "../../../services/productService";

const CameraDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [techDetails, setTechDetails] = useState([]);

  useEffect(() => {
    productService
    .getProductDetails(id)
      .then((result) => {
        setLoading(false);
        seItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
          breadcrumbs={camerasBreadCrmbs}
          techSpecs={techDetails}
          images={itemData[16]}
        />
      )}
      <Footer />
    </>
  );
};

export default CameraDetails;
