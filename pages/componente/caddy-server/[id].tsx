import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import SingleItemView from "../../../components/shared/SingleItemView";
import { caddyBrcrmbs } from "../../../data/breadcrumbs";

const features = ["Procesor", "Memorie"];

const CaddyDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getCaddy(id)
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
      {loading ? <DetailPageSkeleton /> : <SingleItemView itemData={itemData} breadcrumbs={caddyBrcrmbs}/>}
    </>
  );
};

export default CaddyDetails;
