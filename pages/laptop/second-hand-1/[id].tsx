import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import Loader from "../../../components/global/Loader/Loader";
import SingleDetailedView from "../../../components/shared/SingleDetailedView";
import { laptopSHBrcrmbs } from "../../../data/breadcrumbs";

const features = ["RAM", "Hard Disk"];

const SecondHandLaptopDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getSecondHandLaptop(id)
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
        <Loader />
      ) : (
        <SingleDetailedView itemData={itemData} features={features} breadcrumbs={laptopSHBrcrmbs} />
      )}
    </>
  );
};

export default SecondHandLaptopDetails;
