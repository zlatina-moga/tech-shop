import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import SingleDetailedView from "../../../components/shared/SingleDetailedView";
import { workstationRefBrcrmbs } from "../../../data/breadcrumbs";

const RefurnishedWorkstationDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getRefurbishedWorkstation(id)
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
      {loading ? (
        <DetailPageSkeleton />
      ) : (
        <SingleDetailedView itemData={itemData} breadcrumbs={workstationRefBrcrmbs}/>
      )}
    </>
  );
};

export default RefurnishedWorkstationDetails;
